import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsShareholders } from "../components/formIndividualsShareholders";
// import { columnsShareHolders } from "../constants/columns";
import { useShareholders } from "../hook/useShareholders";
//import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  removeIndividualShareholder,
  setIndividualShareholder,
} from "@/features/individualShareholder/individualShareholderSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { TCorporateData, TIndividualShareholder as TIndividualShareholderEdit } from "../../constant/type";
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

type TPageIndividualShareholderProps = {
  corporateCode: string;
  corporatesInfo?: TCorporateData;
};

export function PageIndividualShareholder({
  corporateCode,
  corporatesInfo
}: TPageIndividualShareholderProps) {
  const dispatch = useDispatch();
  const token = getCookies();
  const shareholderData: TIndividualShareholderEdit[] = useSelector<RootState>(
    (state) => state.individualShareholder?.individualShareholders || []
  ) as TIndividualShareholderEdit[];
  const [choosedEditData, setChoosedEditData] =
    useState<TIndividualShareholderEdit>();

  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };

  useEffect(() => {
    axios
      .post(
        "/api/v1/corporate/query",
        { corporateCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.status === 200) {
          const individualshareholder =
            res.data[0]?.IndividualShareholders || [];
          if (individualshareholder && individualshareholder.length > 0) {
            // const updateIndividual:TIndividualShareholderEdit[] = individualshareholder.map((indivudual: any) => ({
            //   ...indivudual,
            // }));
            dispatch(setIndividualShareholder(individualshareholder));
            console.log(
              "indivudual data fetched successfully.",
              individualshareholder
            );
          } else {
            console.log("No individual shareholder data found.");
          }
        } else {
          console.log(
            "Failed to fetch indivudual data or data is not an array."
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching indivudual data:", error);
      });
  }, [corporateCode, dispatch, token]);

  const { handleSubmitShareholders } = useShareholders();
  console.log(shareholderData);

  const handleDelete = async (data: TIndividualShareholderEdit) => {
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
        dispatch(removeIndividualShareholder(data.personalId));
      }
    } catch (error) {
      console.log("delete fail ,", error);
    }
  };

  const columnsShareHolders: TableColumn<TIndividualShareholderEdit>[] = [
    {
      name: "Title",
      selector: (row) => row.fullNames?.[0]?.title || "",
    },
    {
      name: "Firstname",
      selector: (row) => row.fullNames?.[0]?.firstName || "",
    },
    {
      name: "Lastname",
      selector: (row) => row.fullNames?.[0]?.lastName || "",
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
      name: "Share Percentage",
      selector: (row) => row.sharePercentage?.toString() || "",
    },

    {
      cell: (row: TIndividualShareholderEdit) => (
        <Button onClick={() => setChoosedEditData(row)}>Edit</Button>
      ),
      ignoreRowClick: true,
    },
    {
      cell: (row: TIndividualShareholderEdit) => (
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
            title="List of Shareholders holding from 25% of shares"
            columns={columnsShareHolders}
            data={shareholderData}
            clearSelectedRows
          />
        </Card>
        <FormIndividualsShareholders
          clearChoosedEditData={clearChoosedEditData}
          choosedEditData={choosedEditData}
          onsubmit={handleSubmitShareholders}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
