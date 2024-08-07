import { Card } from "@/components/ui/card";
import { useListOfDirector } from "../hook/useListOfDirector";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsDirector } from "../components/formDirectorInfo";
//import { columnsListOfDirectors } from "../constants/columns";
import { TDirector } from "../constants/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type TListOfDirectorsProps = {
  corporateCode: string;
};
export function ListOfDirectors({ corporateCode }: TListOfDirectorsProps) {
  const { directors, handleSubmitDirectors, setDirectors } =
    useListOfDirector();
  const [directorsData, setDirectorsData] = useState<TDirector[]>([]);
  useEffect(() => {
    setDirectorsData(directors);
  }, [directors]);

  const handleDelete = (index: number) => {
    const newData = [...directorsData];
    newData.splice(index, 1);
    setDirectorsData(newData);
    setDirectors(newData);
  };

  const columnsListOfDirectors: TableColumn<TDirector>[] = [
    {
      name: "Title",
      selector: (row: TDirector) => row.fullNames[0].title || "",
    },
    {
      name: "Firstname",
      selector: (row: TDirector) => row.fullNames[0].firstName || "",
    },
    {
      name: "Lastname",
      selector: (row: TDirector) => row.fullNames[0].lastName || "",
    },
    {
      name: "CitizenID",
      selector: (row: TDirector) => row.citizenId || "",
    },
    {
      name: "PassportID",
      selector: (row: TDirector) => row.passportId || "",
    },
    {
      name: "Expired Date",
      selector: (row: TDirector) =>
        row.expiryDate ? row.expiryDate.toLocaleDateString() : "",
    },
    {
      name: "Nationality",
      selector: (row: TDirector) => row.nationality || "",
    },
    // {
    //   name: "Address",
    //   selector: (row: TDirector) => row.addresses || '',
    // },
    {
      cell: (_: TDirector, index: number) => (
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
            title="List of Directors"
            columns={columnsListOfDirectors}
            data={directorsData}
            clearSelectedRows
          />
        </Card>

        <FormIndividualsDirector
          onsubmit={handleSubmitDirectors}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
