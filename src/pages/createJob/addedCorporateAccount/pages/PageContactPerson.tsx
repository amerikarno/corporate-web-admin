import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsContactPerson } from "../components/formContactPerson";
//import { columnsContactPerson } from "../constants/columns";
import { useContactPerson } from "../hook/useContactPerson";
// import { TContactPerson } from "../constants/types";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { removeContactPerson } from "@/features/contactPersonSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";

type TPageContactPersonProps = {
  corporateCode: string;
};

type TContactPersonWithID = {
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
  personalId?: string;
};

export function PageContactPerson({ corporateCode }: TPageContactPersonProps) {
  const dispatch = useDispatch();
  const { handleSubmitContactPerson } = useContactPerson();
  const contactPersonData: TContactPersonWithID[] = useSelector<RootState>(
    (state) => state.contactPerson?.contactPersons || []
  ) as TContactPersonWithID[];
  console.log(contactPersonData);
  const handleDelete = async (data: TContactPersonWithID) => {
    console.log(data);
    try {
      const token = getCookies();
      const res = await axios.post(
        "/api/v1/corporate/delete/contact",
        { personalId: data.personalId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("delete successful");
        dispatch(removeContactPerson(data.personalId));
      }
    } catch (error) {
      console.log("delete failed", error);
    }
  };

  const columnsContactPerson: TableColumn<TContactPersonWithID>[] = [
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
      name: "Position",
      selector: (row) => row.contacts?.[0]?.position || "",
    },
    {
      name: "Division",
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
      cell: (row: TContactPersonWithID) => (
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
