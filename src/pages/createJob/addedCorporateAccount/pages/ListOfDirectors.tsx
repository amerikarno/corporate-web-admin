import { Card } from "@/components/ui/card";
import { useListOfDirector } from "../hook/useListOfDirector";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsDirector } from "../components/formDirectorInfo";
//import { columnsListOfDirectors } from "../constants/columns";
import { TDirector } from "../constants2/types";
import { TCorporateData, TDirector as TDirectorEdit } from "../../constant/type";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  removeDirector,
  setDirectorEdit,
} from "@/features/ListOfDirectorSlice/listOfDirectorSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { mapDataToTDirector } from "../libs/utils";
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

type TListOfDirectorsProps = {
};

export function ListOfDirectors({}: TListOfDirectorsProps) {
  const dispatch = useDispatch();
  const { handleSubmitDirectors } = useListOfDirector();

  const token = getCookies();
  const listOfDirectorData: TDirector[] = useSelector<RootState>(
    (state) => state.listOfDirector?.listOfDirectors
  ) as TDirector[];
  const [choosedEditData, setChoosedEditData] = useState<TDirector>();
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };
  console.log(listOfDirectorData);

  const corporateCode = localStorage.getItem("corporateCode") || "";
  const corporatesInfo: TCorporateData = useSelector<RootState>((state) => state.editCorporate) as TCorporateData;
  const fetchedData = async () =>{
    try{
      const res = await axios
      .post(
        "/api/v1/corporate/query",
        { corporateCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 200) {
        console.log(res);
        const listofdirectors = res.data[0].Directors || [];
        const updateDirector: TDirector[] = listofdirectors
          .map((listofdirector: TDirectorEdit) => ({
            ...listofdirector,
            listofdirector: listofdirector.personalId,
          }))
          .map(mapDataToTDirector)
          .filter((item: any) => item !== null) as TDirector[];

        dispatch(setDirectorEdit(updateDirector));
        console.log("director data fetched successfully.", updateDirector);
      } else {
        console.log(
          "Failed to fetch jurisdirectortic data or data is not an array."
        );
      }
    }catch(error){
      console.error("Error fetching director data:", error);
    }
  }

  useEffect(() => {
    if(corporateCode)
      fetchedData();
    else{
      console.log("corporateCode not found")
    }
  }, []);

  const handleDelete = async (data: TDirector) => {
    console.log(data);
    try {
      const token = getCookies();
      const res = await axios.post(
        "/api/v1/personals/delete",
        { personalId: data.personalId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("delete successful");
        dispatch(removeDirector(data.personalId));
      }
    } catch (error) {
      console.log("delete fail ,", error);
    }
  };

  const columnsListOfDirectors: TableColumn<TDirector>[] = [
    {
      name: "Title",
      selector: (row) => row.fullNames[0]?.title || "",
    },
    {
      name: "Firstname",
      selector: (row) => row.fullNames[0]?.firstName || "",
    },
    {
      name: "Lastname",
      selector: (row) => row.fullNames[0]?.lastName || "",
    },
    {
      name: "CitizenID",
      selector: (row) => row.citizenId || "",
    },
    {
      name: "PassportID",
      selector: (row) => row.passportId || "",
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality || "",
    },
    {
      cell: (row: TDirector) => (
        <Button
          onClick={() => {
            setChoosedEditData(row);
            console.log(row);
          }}
        >
          Edit
        </Button>
      ),
      ignoreRowClick: true,
    },
    {
      cell: (row: TDirector) => (
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
            title="List of Directors"
            columns={columnsListOfDirectors}
            data={listOfDirectorData}
            clearSelectedRows
          />
        </Card>

        <FormIndividualsDirector
          clearChoosedEditData={clearChoosedEditData}
          choosedEditData={choosedEditData}
          onsubmit={handleSubmitDirectors}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
