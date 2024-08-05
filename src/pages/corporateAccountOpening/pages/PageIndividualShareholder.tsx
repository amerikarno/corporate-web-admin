import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsShareholders } from "../components/formIndividualsShareholders";
import { columnsShareHolders } from "../constants/columns";
import { useShareholders } from "../hook/useShareholders";
import { TIndividualsShareholders } from "../constants/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type TPageIndividualShareholderProps = {
  corporateCode: string;
};

export function PageIndividualShareholder({
  corporateCode,
}: TPageIndividualShareholderProps) {
  const { shareholders, handleSubmitShareholders,setShareholders } = useShareholders();
  const [shareholdersData, setShareholdersData] = useState<TIndividualsShareholders[]>([]);
  useEffect(()=>{
    setShareholdersData(shareholders)
  },[shareholders])

  const handleDelete = (index: number) => {
    const newData = [...shareholdersData];
    newData.splice(index, 1); 
    setShareholdersData(newData); 
    setShareholders(newData); 
  };

  const columnsShareHolders: TableColumn<TIndividualsShareholders>[] =
  [
    {
      name: "Title",
      selector: (row: TIndividualsShareholders) =>
        row.fullNames[0].title || "",
    },
    {
      name: "Firstname",
      selector: (row: TIndividualsShareholders) =>
        row.fullNames[0].firstName || "",
    },
    {
      name: "Lastname",
      selector: (row: TIndividualsShareholders) =>
        row.fullNames[0].lastName || "",
    },
    {
      name: "CitizenID",
      selector: (row: TIndividualsShareholders) => row.citizenId || "",
    },
    {
      name: "PassportID",
      selector: (row: TIndividualsShareholders) => row.passportId || "",
    },
    {
      name: "Expired Date",
      selector: (row: TIndividualsShareholders) =>
        row.expiryDate ? row.expiryDate.toLocaleDateString() : "",
    },
    {
      name: "Nationality",
      selector: (row: TIndividualsShareholders) =>
        row.nationality || "",
    },
    {
      name: "Share Percentage",
      selector: (row: TIndividualsShareholders) =>
        row.sharePercentage || "",
    },
    {
      name: "Actions",
      cell: (row: TIndividualsShareholders , index : number) => (
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
            title="List of Shareholders holding from 25% of shares"
            columns={columnsShareHolders}
            data={shareholdersData}
            clearSelectedRows
          />
        </Card>
        <FormIndividualsShareholders
          onsubmit={handleSubmitShareholders}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
