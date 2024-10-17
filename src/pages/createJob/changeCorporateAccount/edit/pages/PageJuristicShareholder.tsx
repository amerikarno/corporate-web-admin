import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormJuristicShareholders } from "../components/formJuristicShareholders";
//import { columnsJuristicShareHolders } from "../constants/columns";
import { useJuristicShareholders } from "../hook/useJuristicShareholders";
import { TJuristicsShareholders } from "../constants/types";
//import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  removeJuristicShareholder,
  setJuristicShareholder,
} from "@/features/juristicShareholderSlice/juristicShareholderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import {
  TCorporateData,
  TJuristic as TJuristicEdit,
} from "../../constant/type";
import { useEffect, useState } from "react";
import { mapDataToTJuristicShareholder } from "../libs/utils";
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

type TPageJuristicShareholderProps = {};

export function PageJuristicShareholder({}: TPageJuristicShareholderProps) {
  const { handleSubmitJuristics } = useJuristicShareholders();

  const juristicShareholderData: TJuristicsShareholders[] =
    useSelector<RootState>(
      (state) => state.juristicShareholder?.juristicShareholders || []
    ) as TJuristicsShareholders[];
  // console.log(juristicShareholderData);
  const dispatch = useDispatch();
  const token = getCookies();
  const corporateCode = localStorage.getItem("corporateCode") || "";
  const corporatesInfo: TCorporateData = useSelector<RootState>(
    (state) => state.editCorporate
  ) as TCorporateData;

  const [choosedEditData, setChoosedEditData] =
    useState<TJuristicsShareholders>();
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
        const juristicShareholder = res.data[0].Juristics || [];
        const updateJuristic: TJuristicsShareholders[] = juristicShareholder
          .map((juristic: TJuristicEdit) => ({
            ...juristic,
            juristicId: juristic.id,
            sharePercentage: juristic.sharePercentage/100000,
          }))
          .map(mapDataToTJuristicShareholder)
          .filter((item: any) => item !== null) as TJuristicsShareholders[];

        dispatch(setJuristicShareholder(updateJuristic));
        console.log("juristic data fetched successfully.", updateJuristic);
      } else {
        console.log("Failed to fetch juristic data or data is not an array.");
      }
    } catch (error) {
      console.error("Error fetching juristic data:", error);
    }
  };

  useEffect(() => {
    if(corporateCode)
      fetchedData();
    else{
      console.log("corporateCode not found")
    }
  }, []);

  const handleDelete = async (data: TJuristicsShareholders) => {
    console.log(data);
    try {
      const token = getCookies();
      const res = await axios.post(
        "/api/v1/juristic/delete",
        { juristicId: data.juristicId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        // console.log("delete successful");
        dispatch(removeJuristicShareholder(data.juristicId));
      }
    } catch (error) {
      console.log("delete fail ,", error);
    }
  };

  const columnsJuristicShareHolders: TableColumn<TJuristicsShareholders>[] = [
    {
      name: "Name",
      selector: (row) => row.juristicName || "",
    },
    {
      name: "RegistrationNo",
      selector: (row: TJuristicsShareholders) => row.registrationNo || "",
    },
    {
      name: "Registered Country",
      selector: (row: TJuristicsShareholders) => row.registeredCountry || "",
    },
    {
      name: "Share Percentage",
      selector: (row: TJuristicsShareholders) => row.sharePercentage || "",
    },

    {
      cell: (row: TJuristicsShareholders) => (
        <Button
          onClick={() => {
            setChoosedEditData(row);
          }}
          data-testid={`editButton-${row.juristicId}`}
        >
          Edit
        </Button>
      ),
      ignoreRowClick: true,
    },
    {
      cell: (row: TJuristicsShareholders) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" data-testid={`deleteButton-${row.juristicId}`} className="bg-red-600 text-white">
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
              <AlertDialogAction data-testid={`confirmDelete-${row.juristicId}`} onClick={() => handleDelete(row)}>
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
            title="Juristics shareholders of juristic's owner"
            columns={columnsJuristicShareHolders}
            data={juristicShareholderData}
            clearSelectedRows
          />
        </Card>
        <FormJuristicShareholders
          clearChoosedEditData={clearChoosedEditData}
          choosedEditData={choosedEditData}
          onsubmit={handleSubmitJuristics}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
