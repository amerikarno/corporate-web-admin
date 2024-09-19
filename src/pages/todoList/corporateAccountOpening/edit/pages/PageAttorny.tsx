import { Card } from "@/components/ui/card";
import { useAttorney } from "../hook/useAttorney";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormAttorney } from "../components/formAttorney";
//import { columnsAuthorizePerson } from "../constants/columns";
//import { useEffect, useState } from "react";
import { TAttorney } from "../constants/types";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { removeAttorney, setAttorney } from "@/features/attorney/attorney";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { TCorporateData } from "../../constant/type";
import { mapDataToTAttorney } from "../libs/utils";
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
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";

type TPageAttorneyProps = {};

export function PageAttorney({}: TPageAttorneyProps) {
  const corporatesInfo: TCorporateData = useSelector<RootState>(
    (state) => state.editCorporate
  ) as TCorporateData;
  const corporateCode = localStorage.getItem("corporateCode") || "";
  const { handleSubmitAttorney } = useAttorney();
  const dispatch = useDispatch();
  const attorneyData: TAttorney[] = useSelector<RootState>(
    (state) => state.attorney?.attorneys || []
  ) as TAttorney[];
  console.log(attorneyData);
  const token = getCookies();
  const [choosedEditData, setChoosedEditData] = useState<TAttorney>();
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };

  const fetchedData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/corporate/query",
        { corporateCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res);
        if (Array.isArray(res.data[0]?.Attorneys)) {
          const updateAttorney = res.data[0].Attorneys.map(
            (attorneyitems: any) => ({
              ...attorneyitems,
              personalId: attorneyitems.personalId,
            })
          )
            .map(mapDataToTAttorney)
            .filter((item: any) => item !== null);

          dispatch(setAttorney(updateAttorney));
          dispatch(setCorporateData(res.data[0]));
          console.log("Attorney data fetched successfully.", updateAttorney);
        } else {
          console.log("Failed to fetch Attorney data or data is not an array.");
        }
      } else {
        console.log("Failed to fetch Attorney data or data is not an array.");
      }
    } catch (error) {
      console.error("Error fetching Attorney data:", error);
    }
  };

  useEffect(() => {
    if(corporateCode)
      fetchedData();
    else{
      console.log("corporateCode not found")
    }
  }, []);

  const handleDelete = async (data: TAttorney) => {
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
        dispatch(removeAttorney(data.personalId));
      }
    } catch (error) {
      console.log("delete fail ,", error);
    }
  };

  const columnsAttorney: TableColumn<TAttorney>[] = [
    {
      name: "Title",
      selector: (row: TAttorney) => row.fullNames[0].title || "",
    },
    {
      name: "Firstname",
      selector: (row: TAttorney) => row.fullNames[0].firstName || "",
    },
    {
      name: "Lastname",
      selector: (row: TAttorney) => row.fullNames[0].lastName || "",
    },
    {
      name: "CitizenID",
      selector: (row: TAttorney) => row.citizenId || "",
    },
    {
      name: "PassportID",
      selector: (row: TAttorney) => row.passportId || "",
    },
    {
      name: "Nationality",
      selector: (row: TAttorney) => row.nationality || "",
    },
    {
      name: "Telephone",
      selector: (row: TAttorney) => row.telephone || "",
    },
    {
      name: "Email",
      selector: (row: TAttorney) => row.email || "",
    },
    {
      cell: (row: TAttorney) => (
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
      cell: (row: TAttorney) => (
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
                <h1 className="">
                  : {corporatesInfo?.Info.registrationNo ?? ""}
                </h1>
              </div>
            </div>
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Tax ID</h1>
                <h1 className="">: {corporatesInfo?.Info.taxId ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Date Of Incorporation</h1>
                <h1 className="">
                  : {corporatesInfo?.Info.dateOfIncorporation.split("T")[0]}
                </h1>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <DataTable
            title="List of Attorney"
            columns={columnsAttorney}
            data={attorneyData}
          />
        </Card>
        <FormAttorney
          clearChoosedEditData={clearChoosedEditData}
          choosedEditData={choosedEditData}
          onsubmit={handleSubmitAttorney}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
