import { Card } from "@/components/ui/card";
import { useAuthorizePerson } from "../hook/useAuthorizePerson";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormAuthorizedPerson } from "../components/formAuthorization";
//import { columnsAuthorizePerson } from "../constants/columns";
import { useEffect, useState } from "react";
import { TAuthorizePerson } from "../constants/types";
import { Button } from "@/components/ui/button";

type TPageAuthorizedPersonProps = {
  corporateCode: string;
};

export function PageAuthorizedPerson({
  corporateCode,
}: TPageAuthorizedPersonProps) {
  const { authorize, handleSubmitAuthorize, setAuthorize } =
    useAuthorizePerson();
  const [authorizeData, setAuthorizeData] = useState<TAuthorizePerson[]>([]);
  useEffect(() => {
    setAuthorizeData(authorize);
  }, [authorize]);

  const handleDelete = (index: number) => {
    const newData = [...authorizeData];
    newData.splice(index, 1);
    setAuthorizeData(newData);
    setAuthorize(newData);
  };

  const columnsAuthorizePerson: TableColumn<TAuthorizePerson>[] = [
    {
      name: "Title",
      selector: (row: TAuthorizePerson) => row.fullNames[0].title || "",
    },
    {
      name: "Firstname",
      selector: (row: TAuthorizePerson) => row.fullNames[0].firstName || "",
    },
    {
      name: "Lastname",
      selector: (row: TAuthorizePerson) => row.fullNames[0].lastName || "",
    },
    {
      name: "CitizenID",
      selector: (row: TAuthorizePerson) => row.citizenId || "",
    },
    {
      name: "PassportID",
      selector: (row: TAuthorizePerson) => row.passportID || "",
    },
    {
      name: "Expired Date",
      selector: (row: TAuthorizePerson) =>
        row.expiryDate ? row.expiryDate.toLocaleDateString() : "",
    },
    {
      name: "Nationality",
      selector: (row: TAuthorizePerson) => row.nationality || "",
    },
    // {
    //   name: "Address",
    //   selector: (row: TDirector) => row.addresses || '',
    // },
    {
      name: "Actions",
      cell: (_: TAuthorizePerson, index: number) => (
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
            title="Authorized person of Juristic Investor for traction"
            columns={columnsAuthorizePerson}
            data={authorizeData}
          />
        </Card>
        <FormAuthorizedPerson
          onsubmit={handleSubmitAuthorize}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
