import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormBank } from "../components/formBank";
// import { columnsBank } from "../constants/columns";
import { useBank } from "../hook/useBank";
//import { useEffect, useState } from "react";
import { TBank } from "../constants2/types";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { removeBank, setBank } from "@/features/bankSlice/bankSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { mapDataToTBank } from "../libs/utils";
import { TCorporateData } from "../../constant/type";
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

type TPageBankAccountProps = {
  corporateCode: string;
  corporatesInfo?: TCorporateData;
};

type TBankWithID = {
  CorporateCode?: string;
  bank: TBank[];
  BankId?: string;
};
export function PageBankAccount({ corporateCode,corporatesInfo }: TPageBankAccountProps) {
  const { handleSubmitBank } = useBank();
  const bankData: TBankWithID[] = useSelector<RootState>(
    (state) => state.bank?.banks || []
  ) as TBankWithID[];
  const dispatch = useDispatch();

  const token = getCookies();
  const [choosedEditData, setChoosedEditData] = useState<TBankWithID>();
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };

  useEffect(() => {
    const fetchBankData = async () => {
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
          const banks = res.data[0].Banks.map((bank: any) => ({
            ...bank,
            BankId: bank.id,
          }))
            .map(mapDataToTBank)
            .filter((item: any) => item !== null);

          dispatch(setBank(banks));
        }
      } catch (error) {
        console.error("Error fetching bank data:", error);
      }
    };

    fetchBankData();
  }, [corporateCode, dispatch, token]);

  console.log(bankData);
  const handleDelete = async (data: TBankWithID) => {
    console.log(data);
    try {
      const token = getCookies();
      const res = await axios.post(
        "/api/v1/bank/delete",
        { BankId: data.BankId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("delete successful");
        dispatch(removeBank(data.BankId));
      }
    } catch (error) {
      console.log("delete fail ,", error);
    }
  };

  const columnsBank: TableColumn<TBankWithID>[] = [
    {
      name: "AccountType",
      selector: (row) => row.bank?.[0].accountType || "",
    },
    {
      name: "BankName",
      selector: (row) => row.bank?.[0].bankName || "",
    },
    {
      name: "AccountNo",
      selector: (row) => row.bank?.[0].accountNo || "",
    },
    {
      name: "AccountLocation",
      selector: (row) => row.bank?.[0].accountLocation || "",
    },
    {
      name: "SwiftCode",
      selector: (row) => row.bank?.[0].swiftCode || "",
    },
    // {
    //   name: "Address",
    //   selector: (row: TDirector) => row.addresses || '',
    // },

    {
      cell: (row: TBankWithID) => (
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
      cell: (row: TBankWithID) => (
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
            title="Bank Accounts Intended to Deposit and Withdraw Fiat Fund"
            columns={columnsBank}
            data={bankData}
            clearSelectedRows
          />
        </Card>
        <FormBank
          onsubmit={handleSubmitBank}
          corporateCode={corporateCode}
          clearChoosedEditData={clearChoosedEditData}
          choosedEditData={choosedEditData}
        />
      </div>
    </>
  );
}
