import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TCompanyMember, TMember } from "./types";
import { TAssetCompanyMemberSchema } from "./schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { FaUpload } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card } from "@/components/ui/card";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";

const AddedIcoCompany = () => {

  const fetchedData = useSelector((state: RootState) => state.assetData.data);
  
  const dispatch = useDispatch();

  const icoCode = localStorage.getItem("icoCode");
  
  useEffect(() => {
    if (fetchedData?.companyMembers) {
      const updatedMembers = fetchedData.companyMembers.map((member) => ({
        ...member,
        icoCode: member.icoCode.toString(),
      }));
      setListOfMembers(updatedMembers);
    }
  }, [fetchedData]);
  
  const [listOfMembers, setListOfMembers] = useState<TMember[]>([]);
//   const [listOfMembers, setListOfMembers] = useState<TMember[]>([{id:"",picture:"",firstName:"",midName:"",lastName:"",position:"",history:""}]);
  const [file, setFile] = useState<Uint8Array | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [choosedEditData, setChoosedEditData] = useState<TMember | null>();

  const readFileDataAsBase64 = (e: React.ChangeEvent<HTMLInputElement>): Promise<string> => {
    const file = e.target.files?.[0];
  
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject('No file found');
      }
  
      const reader = new FileReader();
  
      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };
  
      reader.onerror = (err) => {
        reject(err);
      };
  
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const base64String = await readFileDataAsBase64(event);

      const byteString = atob(base64String.split(',')[1]);
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }

      setFile(byteArray);

    } catch (error) {
      console.error('Error reading file as Base64:', error);
    }
  }

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const mapChoosedDataToMmeber = (data: TMember) => {
    return {
      companyMembers: [
        {
          firstName: data.firstName || "",
          midName: data.midName || "",
          lastName: data.lastName || "",
          position: data.position || "",
          history: data.history || "",
        }
      ]
    }
  }

  const isBase64 = (str: string) => {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

useEffect(() => {
  if (choosedEditData) {
    
    if (choosedEditData.picture && isBase64(choosedEditData.picture)) {
      const decodedPicture = atob(choosedEditData.picture);
      const pictureArray = new Uint8Array(decodedPicture.length);
      for (let i = 0; i < decodedPicture.length; i++) {
      pictureArray[i] = decodedPicture.charCodeAt(i);
      }
      setFile(pictureArray);
  }
    reset(mapChoosedDataToMmeber(choosedEditData));
  }
}, [choosedEditData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TCompanyMember>({
    resolver: zodResolver(TAssetCompanyMemberSchema),
  });

  const onSubmit = async (data: TCompanyMember) => {

    if(icoCode){
      if ((file && (file.length / (1024 * 1024) < 2.0)) || !file) {
              const body = { 
                companyMembers: {
                    ...data.companyMembers[0],
                    icoCode:icoCode.toString(),
                    picture:file,
                    id:choosedEditData?.id
                }
            }
          console.log("form5 ico body :", body);
          
          if (file !== null) {
            const base64String = btoa(String.fromCharCode(...file));
            dispatch(setTestCorporateData({
              ...body,
              companyMembers: {
                ...body.companyMembers,
                picture: base64String,
              },
            }));
          } else {
            dispatch(setTestCorporateData(body));
          }
          
          if(choosedEditData){
            try{
              const res = await axios.post("/api/v1/ico/members/update", body, {
                headers: {
                  Authorization: `Bearer ${getCookies()}`,
                },
              })
              if(res.status === 200){
                console.log("update ico form5 success",res)
                const updatedMembers = listOfMembers.map(member => 
                  member.id === choosedEditData.id ? { ...body.companyMembers, picture: body.companyMembers.picture?.toString() , id:choosedEditData.id } : member
                );
                setListOfMembers(updatedMembers);
                setChoosedEditData(null);
              }else{
                console.log("update ico form5 fail",res)
              }
            }catch(error){
              console.log("update ico form5 fail",error)
            }
          }else{
            try{
              const res = await axios.post("/api/v1/ico/members/create", body, {
                headers: {
                  Authorization: `Bearer ${getCookies()}`,
                },
              })
              if(res.status === 200){
                console.log("create ico form5 success",res)
                setListOfMembers([...listOfMembers, ...data.companyMembers]);
              }else{
                console.log("create ico form5 fail",res)
              }
            }catch(error){
              console.log("create ico form5 fail",error)
            }
          }
      }else{
        console.log("image size is too big")
      }
    }else{
      console.log("no ico id")
    }

  };

  const handleDelete = async (data: TMember) => {
    console.log(data);
  };

  const columnsMember: TableColumn<TMember>[] = [
    {
      name: "Firstname",
      selector: (row: TMember) => row.firstName || "",
    },
    {
      name: "Middle Name",
      selector: (row: TMember) => row.midName || "",
    },
    {
      name: "Lastname",
      selector: (row: TMember) => row.lastName || "",
    },
    {
      name: "Position",
      selector: (row: TMember) => row.position || "",
    },
    {
      name: "Picture",
      selector: (row: TMember) => row.picture || "",
    },
    {
      name: "History",
      selector: (row: TMember) => row.history || "",
    },
    {
      cell: (row: TMember) => (
        <Button
          onClick={() => {
            {
              setChoosedEditData(row);
              console.log(row);
            }
          }}
        >
          Edit
        </Button>
      ),
      ignoreRowClick: true,
    },
    {
      cell: (row: TMember) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="bg-red-600 text-white">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove your
                data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(row)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="">
        <div className="w-full flex flex-col justify-center md:flex-row p-5 md:p-10 md:pb-0 space-y-8 md:space-y-0">
            <div className="w-full md:w-1/2">
                <form className="flex flex-col items-center space-y-8 md:space-y-24" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full p-8 my-4 md:px-12 md:w-full md:pl-20 mr-auto rounded-2xl rounded-r-none shadow-2xl bg-white">
                    <div className="flex">
                    <h1 className="font-bold uppercase text-2xl md:text-5xl">Company<br />Member</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                    <Input {...register("companyMembers.0.firstName")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="First Name*" />
                    <Input {...register("companyMembers.0.midName")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Middle Name*" />
                    <Input {...register("companyMembers.0.lastName")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Last Name*" />
                    <Input {...register("companyMembers.0.position")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Position*" />
                    <div className="min-h-12 col-span-1 md:col-span-2">
                        <div onClick={handleDivClick} className="text-sm flex items-center cursor-pointer justify-between px-5 w-full text-white font-bold bg-slate-800 h-full max-h-12 rounded-lg">
                        <span>Upload picture</span>
                        <div className="text-lg font-white"><FaUpload /></div>
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            data-testid="uploadPicture"
                        />
                        </div>
                        {file && (
                        <div className="text-xs mt-2">
                            <span>File uploaded successfully</span>
                        </div>
                        )}
                    </div>
                    </div>
                    <div className="my-4">
                    <textarea placeholder="History*" {...register("companyMembers.0.history")} className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div className="flex justify-center">
                    <Button type="submit" className="px-16 min-h-12" disabled={isSubmitting}>
                        {isSubmitting ? "Loading..." : "Save"}
                    </Button>
                    </div>
                </div>
                </form>
            </div>
            <div className="max-h-[40rem] overflow-hidden flex flex-col  justify-between w-full md:w-1/3 px-8 py-12 bg-slate-800 rounded-2xl text-white">
                <div className="flex flex-col space-y-4">
                <h1 className="font-bold uppercase text-2xl md:text-4xl my-4">Member Info</h1>
                <p className="text-gray-400">• Required Fields: "Fields marked with an asterisk (*) are mandatory."</p>
                <p className="text-gray-400">• Format Guidelines: "Ensure all information is accurate and up-to-date. Use proper formats for email and phone number."</p>
                <p className="text-gray-400">• Save and Review: "After filling out the form, review the information for any errors before submitting."</p>
                </div>
                <div className="flex space-x-2">
                <FaCircle className="text-white"/>
                <FaCircle className="text-white"/>
                <FaCircle className="text-white"/>
            </div>
        </div>
        </div>
        <div className="w-full p-20">
            <hr className="horizontal-line-top" />
            <Card >
                <DataTable
                    title="Member of company"
                    columns={columnsMember}
                    data={listOfMembers}
                    className="w-1/4 pb-4"
                />
            </Card>
        </div>
    </div>
  );
};

export default AddedIcoCompany;