import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormJuristicShareholders } from "../components/formJuristicShareholders";
//import { columnsJuristicShareHolders } from "../constants/columns";
import { useJuristicShareholders } from "../hook/useJuristicShareholders";
import { TJuristicsShareholders } from "../constants/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type TPageJuristicShareholderProps = {
  corporateCode: string;
};

export function PageJuristicShareholder({
  corporateCode,
}: TPageJuristicShareholderProps) {
  const { juristics, handleSubmitJuristics , setJuristics } = useJuristicShareholders();
  const [juristicsData, setJuristicsData] = useState<TJuristicsShareholders[]>([]);
  useEffect(()=>{
    setJuristicsData(juristics)
  },[juristics])

  const handleDelete = (index: number) => {
    const newData = [...juristicsData];
    newData.splice(index, 1); 
    setJuristicsData(newData); 
    setJuristics(newData); 
  };

  const columnsJuristicShareHolders: TableColumn<TJuristicsShareholders>[] =
  [
    {
      name: "Name",
      selector: (row: TJuristicsShareholders) => row.juristicName || "",
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
      name: "Actions",
      cell: (row: TJuristicsShareholders, index : number) => (
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
            title="Juristics shareholders of juristic's owner"
            columns={columnsJuristicShareHolders}
            data={juristicsData}
            clearSelectedRows
          />
        </Card>
        <FormJuristicShareholders
          onsubmit={handleSubmitJuristics}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
