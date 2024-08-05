import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsContactPerson } from "../components/formContactPerson";
//import { columnsContactPerson } from "../constants/columns";
import { useContactPerson } from "../hook/useContactPerson";
import { TContactPerson } from "../constants/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type TPageContactPersonProps = {
  corporateCode: string;
};

export function PageContactPerson({ corporateCode }: TPageContactPersonProps) {
  const { contact, handleSubmitContactPerson , setContactPerson } = useContactPerson();
  const [contactPersonData, setContactPersonData] = useState<TContactPerson[]>([]);
  useEffect(()=>{
    setContactPersonData(contact)
  },[contact])

  const handleDelete = (index: number) => {
    const newData = [...contactPersonData];
    newData.splice(index, 1); 
    setContactPersonData(newData); 
    setContactPerson(newData); 
  };

const columnsContactPerson: TableColumn<TContactPerson>[] = [
  {
    name: "Title",
    selector: (row) => row.fullNames[0].title || "",
  },
  {
    name: "Firstname",
    selector: (row) => row.fullNames[0].firstName || "",
  },
  {
    name: "Lastname",
    selector: (row) => row.fullNames[0].lastName || "",
  },
  {
    name: "CitizenID",
    selector: (row) => row.position || "",
  },
  {
    name: "PassportID",
    selector: (row) => row.division || "",
  },
  {
    name: "Email",
    selector: (row) => row.email || "",
  },
  {
    name: "Phone Number",
    selector: (row) => row.telephone || "",
  },
  {
    cell: (row : TContactPerson , index : number) => (
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
            title="Contact Person"
            columns={columnsContactPerson}
            data={contactPersonData}
            clearSelectedRows
          />
        </Card>
        <FormIndividualsContactPerson
          onsubmit={handleSubmitContactPerson}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
