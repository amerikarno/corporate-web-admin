import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormBank } from "../components/formBank";
import { columnsBank } from "../constants/columns";
import { useBank } from "../hook/useBank";
import { useEffect, useState } from "react";
import { TBank } from "../constants/types";
import { Button } from "@/components/ui/button";

type TPageBankAccountProps = {
  corporateCode: string;
};
export function PageBankAccount({ corporateCode }: TPageBankAccountProps) {
  const { bank, handleSubmitBank , setBank} = useBank();
  const [bankData, setBankData] = useState<TBank[]>([]);
  useEffect(()=>{
    setBankData(bank)
  },[bank])

  const handleDelete = (index: number) => {
    const newData = [...bankData];
    newData.splice(index, 1); 
    setBankData(newData); 
    setBank(newData); 
  };

  const columnsBank: TableColumn<TBank>[] = [
    {
      name: "AccountType",
      selector: (row: TBank) => row.accountType || "",
    },
    {
      name: "BankName",
      selector: (row: TBank) => row.bankName || "",
    },
    {
      name: "AccountNo",
      selector: (row: TBank) => row.accountNo || "",
    },
    {
      name: "AccountLocation",
      selector: (row: TBank) => row.accountLocation || "",
    },
    {
      name: "SwiftCode",
      selector: (row: TBank) => row.swiftCode || "",
    },
    // {
    //   name: "Address",
    //   selector: (row: TDirector) => row.addresses || '',
    // },
    {
      cell: (row: TBank, index : number) => (
        <Button onClick={() => handleDelete(index)}>Delete</Button>
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
