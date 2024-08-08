import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormBank } from "../components/formBank";
// import { columnsBank } from "../constants/columns";
import { useBank } from "../hook/useBank";
import { useEffect, useState } from "react";
import { TBank } from "../constants/types";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { removeBank } from "@/features/bankSlice/bankSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";

type TPageBankAccountProps = {
  corporateCode: string;
};

type TBankWithID = {
  bank : TBank[];
  BankId?: string;
}
export function PageBankAccount({ corporateCode }: TPageBankAccountProps) {
  const {  handleSubmitBank } = useBank();
  const bankData: TBankWithID[] = useSelector<RootState>((state) => state.bank?.banks || []) as TBankWithID[];
  const dispatch = useDispatch();
  console.log(bankData)
  const handleDelete = async (data: TBankWithID) => {
    console.log(data)
    try{
      const token = getCookies();
      const res = await axios.post("/api/v1/personals/delete",{BankId : data.BankId},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 200){
        console.log("delete successful")
        dispatch(removeBank(data.BankId));
      }
    }catch(error){
      console.log("delete fail ,",error)
    }
  };;

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
        <Button onClick={() => handleDelete(row)}>Delete</Button>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Bank Accounts Intended to Deposit and Withdraw Fiat Fund"
            columns={columnsBank}
            data={bankData}
            clearSelectedRows
          />
        </Card>
        <FormBank onsubmit={handleSubmitBank} corporateCode={corporateCode} />
      </div>
    </>
  );
}
