import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsContactPerson } from "../components/formContactPerson";
//import { columnsContactPerson } from "../constants/columns";
import { useContactPerson } from "../hook/useContactPerson";
import { TContactPerson } from "../constants/types";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { removeContactPerson } from "@/features/contactPersonSlice";

type TPageContactPersonProps = {
  corporateCode: string;
};

type TContactPersonTest = {
  contacts: {
    fullNames: {
      title: string;
      firstName: string;
      lastName: string;
    }[];
    position: string;
    division: string;
    telephone: string;
    email: string;
  }[];
};

export function PageContactPerson({ corporateCode }: TPageContactPersonProps) {
  const dispatch = useDispatch();
  const { handleSubmitContactPerson , setContactPerson } = useContactPerson();
  const contactPersonData: TContactPerson[] = useSelector<RootState>((state) => state.contactPerson?.contactPersons || []) as TContactPerson[];

  const handleDelete = (data: TContactPerson) => {
    dispatch(removeContactPerson(data.personalID));
  };

const columnsContactPerson: TableColumn<TContactPersonTest>[] = [
  {
    name: "Title",
    selector: (row) => row.contacts?.[0]?.fullNames?.[0]?.title || "",
  },
  {
    name: "Firstname",
    selector: (row) => row.contacts?.[0]?.fullNames?.[0]?.firstName || "",
  },
  {
    name: "Lastname",
    selector: (row) => row.contacts?.[0]?.fullNames?.[0]?.lastName || "",
  },
  {
    name: "CitizenID",
    selector: (row) => row.contacts?.[0]?.position || "",
  },
  {
    name: "PassportID",
    selector: (row) => row.contacts?.[0]?.division || "",
  },
  {
    name: "Email",
    selector: (row) => row.contacts?.[0]?.email || "",
  },
  {
    name: "Phone Number",
    selector: (row) => row.contacts?.[0]?.telephone || "",
  },
  {
    cell: (row : TContactPerson) => (
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

