import { Card } from "@/components/ui/card";
import { useAuthorizePerson } from "../hook/useAuthorizePerson";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormAuthorizedPerson } from "../components/formAuthorization";
//import { columnsAuthorizePerson } from "../constants/columns";
//import { useEffect, useState } from "react";
import { TAuthorizePerson } from "../constants/types";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { removeAuthorizedPerson, setAuthorizedPersons } from "@/features/authorizedPerson/authorizedPersonSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { TAuthorizedPerson as TAuthorizedPersonEdit, TCorporateData} from "../../constant/type";
import { mapDataToTAuthoirzedPerson } from "../libs/utils";
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
} from "@/components/ui/alert-dialog"
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";

type TPageAuthorizedPersonProps = {
};

export function PageAuthorizedPerson({
}: TPageAuthorizedPersonProps) {
  const { handleSubmitAuthorize} =useAuthorizePerson();
  const dispatch = useDispatch();
  const corporatesInfo = useSelector<RootState>((state) => state.editCorporate) as TCorporateData;
  const authorizedPersonData: TAuthorizePerson[] = useSelector<RootState>((state) => state.authorizedPerson?.authorizedPersons || []) as TAuthorizePerson[];
  console.log(authorizedPersonData)
  const token = getCookies();
  const [choosedEditData,setChoosedEditData] = useState<TAuthorizePerson>();
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };
  const corporateCode = localStorage.getItem("corporateCode") || "";
  const fetchedData = async () => {
    try{
      const res = await axios.post("/api/v1/corporate/query", { corporateCode }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if(res.status === 200){
        console.log(res)
        const authorizedPerson = res.data[0]?.AuthorizedPersons || [];;
        console.log(authorizedPerson)
        const updateAuthorized: TAuthorizePerson[] = authorizedPerson.map((authorized: TAuthorizedPersonEdit) => ({
          ...authorized,
          personalId: authorized.personalId, 
        }))
        .map(mapDataToTAuthoirzedPerson)
        .filter((item:any) => item !== null) as TAuthorizePerson[];
        
        dispatch(setAuthorizedPersons(updateAuthorized));
        dispatch(setCorporateData(res.data[0]));
        console.log("authorized person data fetched successfully.", updateAuthorized);
      } else {
        console.log("Failed to fetch authorized person data or data is not an array.");
      }
    }catch(error){
      console.error("Error fetching Authorized Person data:", error);
    }
  }

  useEffect(() => {
    fetchedData();
  },[])
  
  const handleDelete = async (data: TAuthorizePerson) => {
  console.log(data)
  try{
        const token = getCookies();
        const res = await axios.post("/api/v1/personals/delete",{personalId : data.personalId},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.status === 200){
          console.log("delete successful")
          dispatch(removeAuthorizedPerson(data.personalId));
        }
      }catch(error){
        console.log("delete fail ,",error)
      }
    };;

  const columnsAuthorizePerson: TableColumn<TAuthorizePerson>[] = [
    {
      name: "Title",
      selector: (row: TAuthorizePerson) => row.fullNames[0].title || "",
    },
    {
      name: "Firstname",
      selector: (row: TAuthorizePerson) => row.fullNames[0].firstName || "",
    },
    {
      name: "Lastname",
      selector: (row: TAuthorizePerson) => row.fullNames[0].lastName || "",
    },
    {
      name: "CitizenID",
      selector: (row: TAuthorizePerson) => row.citizenId || "",
    },
    {
      name: "PassportID",
      selector: (row: TAuthorizePerson) => row.passportId || "",
    },
    {
      name: "Nationality",
      selector: (row: TAuthorizePerson) => row.nationality || "",
    },

    {
      cell: (row: TAuthorizePerson) => (
        <Button onClick={() => {{setChoosedEditData(row) 
          console.log(row)}}
        }>Edit</Button>
      ),
      ignoreRowClick: true,
    },
    {
      cell: (row: TAuthorizePerson) => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="bg-red-600 text-white">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>handleDelete(row)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <>
      <div className="p-4 space-y-8">
        <Card className=" p-4 space-y-6">
          <h1 className="text-xl font-bold">Juristic Infomations</h1>
          <div className="flex">
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic ID</h1>
                <h1 className="">: {corporatesInfo?.CorporateCode ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic Investor Name</h1>
                <h1 className="">: {corporatesInfo?.Info.name ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Commercial Number</h1>
                <h1 className="">: {corporatesInfo?.Info.registrationNo ?? ""}</h1>
              </div>
            </div>
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Tax ID</h1>
                <h1 className="">: {corporatesInfo?.Info.taxId ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Date Of Incorporation</h1>
                <h1 className="">: {corporatesInfo?.Info.dateOfIncorporation.split("T")[0]}</h1>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <DataTable
            title="Authorized person of Juristic Investor for traction"
            columns={columnsAuthorizePerson}
            data={authorizedPersonData}
          />
        </Card>
        <FormAuthorizedPerson
          clearChoosedEditData={clearChoosedEditData}
          choosedEditData={choosedEditData}
          onsubmit={handleSubmitAuthorize}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}

