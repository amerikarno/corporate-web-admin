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
import { TCorporateData,TContact } from "../../constant/type";

type TPageContactPersonProps = {
  corporateCode: string;
};


export function PageContactPerson({ corporateCode }: TPageContactPersonProps) {
  const dispatch = useDispatch();
  const { handleSubmitContactPerson } = useContactPerson();

  const contactPersonData : TContact[] = useSelector<RootState>(
    (state) => state.contactPerson?.contactPersons) as TContact[];

  console.log(contactPersonData);
  const handleDelete = async (data: TContact) => {
    console.log(data);
    try {
      const token = getCookies();
      const res = await axios.post(
        "/api/v1/corporate/delete/contact",
        { personalID: data.personalID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("delete successful");
        dispatch(removeContactPerson(data.personalID));
      }
    } catch (error) {
      console.log("delete failed", error);
    }
  };

  const columnsContactPerson: TableColumn<TContact>[] = [
    {
      name: "Title",
      selector: (row : TContact) => row.fullNames?.[0]?.title || "",
    },
    {
      name: "Firstname",
      selector: (row : TContact) => row.fullNames?.[0]?.firstName || "",
    },
    {
      name: "Lastname",
      selector: (row : TContact) => row.fullNames?.[0]?.lastName || "",
    },
    {
      name: "CitizenID",
      selector: (row : TContact) => row.position || "",
    },
    {
      name: "PassportID",
      selector: (row : TContact) => row.division || "",
    },
    {
      name: "Email",
      selector: (row : TContact) => row.email || "",
    },
    {
      name: "Phone Number",
      selector: (row : TContact) => row.telephone || "",
    },
    {
      cell: (row: TContact) => (
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
