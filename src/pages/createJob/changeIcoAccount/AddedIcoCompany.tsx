import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TAssetData, TCompanyMember, TMember } from "./types";
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
import { setAssetData } from "@/features/addedIcoData/AddedIcoData";

const AddedIcoCompany = () => {

  const callFetchData = async () => {
    try{
      const res = await axios.get("/api/v1/ico/query", {
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        },
      })
      if(res.status == 200){
        const matchedData = res.data.find((item: { registerId: string }) => item.registerId === registerId);
        if (matchedData) {
          const assetData:TAssetData = matchedData;
          dispatch(setAssetData(assetData));
        }
      }
    }catch(error){
      console.log("can not query data", error)
    }

  }

  const fetchedData = useSelector((state: RootState) => state.assetData.data);
  
  const dispatch = useDispatch();

  const registerId = localStorage.getItem("registerId");
  
  useEffect(() => {
    if (fetchedData?.companyMembers) {
      const updatedMembers = fetchedData.companyMembers.map((member) => ({
        ...member,
        registerId: member.registerId.toString(),
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TCompanyMember>({
    resolver: zodResolver(TAssetCompanyMemberSchema),
  });

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
    }else{
      reset({
        companyMembers: [{
          firstName: "",
          midName: "",
          lastName: "",
          position: "",
          history: "",
          picture: undefined,
          registerId: "",
          memberId: ""
        }]
      });
    }
  }, [choosedEditData]);

  const onSubmit = async (data: TCompanyMember) => {

    if(registerId){
      if ((file && (file.length / (1024 * 1024) < 2.0)) || !file) {
              const body = { 
                companyMembers: [{
                    ...data.companyMembers[0],
                    registerId:registerId.toString(),
                    picture:file,
                    memberId:choosedEditData?.id
                }]
            }
          console.log("form5 ico body :", body);
          
          if (file !== null) {
            // const base64String = btoa(String.fromCharCode(...file));
            dispatch(setTestCorporateData({
              ...body,
              companyMembers: [{
                ...body.companyMembers,
              }],
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
                reset();
                console.log("update ico form5 success",res)
                callFetchData();
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
                reset();
                console.log("create ico form5 success",res);
                callFetchData();
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
    try {
      const token = getCookies();
      console.log(data)
      const res = await axios.post(
        "/api/v1/ico/members/delete",
        { memberId: data.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        reset();
        console.log("delete successful");
        callFetchData();
        setChoosedEditData(null);
      }
    } catch (error) {
      console.log("delete failed", error);
    }
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
          data-testid={`editButton-${row.id}`}
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
            <Button variant="outline" className="bg-red-600 text-white" data-testid={`deleteButton-${row.id}`}>
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
              <AlertDialogAction onClick={() => handleDelete(row)} data-testid={`confirmButton-${row.id}`}>
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
    <div className="flex flex-col items-center">
        <div className="w-full flex flex-col justify-center md:flex-row p-5 md:p-10 md:pb-0 space-y-8 md:space-y-0">
            <div className="w-full md:w-1/2">
                <form className="flex flex-col items-center space-y-8 md:space-y-24" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full p-8 my-4 md:px-12 md:w-full md:pl-20 mr-auto rounded-2xl rounded-r-none shadow-2xl bg-white">
                    <div className="flex">
                    <h1 className="font-bold uppercase text-2xl md:text-5xl">Company<br />Member</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 my-5">
                      <Input {...register("companyMembers.0.firstName")} label="First Name*" id="firstname" />
                      <Input {...register("companyMembers.0.midName")} label="Middle Name*" id="middlename" />
                      <Input {...register("companyMembers.0.lastName")}  label="Last Name*" id="lastname" />
                      <Input {...register("companyMembers.0.position")} label="Position*" id="position" />
                      <div className="min-h-12">
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
                      <Input label="History*" id="history" {...register("companyMembers.0.history")}/>
                    </div>
                    <div className="flex justify-center">
                    <Button type="submit" className="px-16 mt-4 min-h-12" disabled={isSubmitting}>
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
        <div className="min-w-[20rem] w-4/5 p-10">
            <hr className="horizontal-line-top" />
            <Card className="">
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