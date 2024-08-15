import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsContactPerson } from "../components/formContactPerson";
//import { columnsContactPerson } from "../constants/columns";
import { useContactPerson } from "../hook/useContactPerson";
import { TContactPerson } from "../constants/types";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addContactPerson, removeContactPerson, setContactPersons } from "@/features/contactPersonSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { TCorporateData,TContact } from "../../constant/type";
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";
import { Contact } from "lucide-react";
import { useEffect, useState } from "react";

type TPageContactPersonProps = {
  corporateCode: string;
};


export function PageContactPerson({ corporateCode }: TPageContactPersonProps) {
    const dispatch = useDispatch();
  const contactPersonData : TContact[] = useSelector<RootState>(
    (state) => state.contactPerson?.contactPersons) as TContact[];
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };


  const token = getCookies();
  const { handleSubmitContactPerson } = useContactPerson();
  const [choosedEditData,setChoosedEditData] = useState<TContact>();




  useEffect(() => {
    axios.post("/api/v1/corporate/query", { corporateCode }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("API Response:", res.data);

      if (res.status === 200) {
        const contacts = res.data[0]?.Contact;
        const updatedContacts:TContact[] = contacts.map((contact : any) => {
          return {
            ...contact,
            personalId: contact.personalID,
          };
        });
        dispatch(setContactPersons(updatedContacts));
        console.log("Contact data fetched successfully.", contacts);
      } else {
        console.log("Failed to fetch contact data or data is not an array.");
      }
    })
    .catch((error) => {
      console.error("Error fetching contact data:", error);
    });
}, [ dispatch]);
    

  console.log(contactPersonData);
  
  
  
  const handleDelete = async (data: TContact) => {
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
        //dispatch(setCorporateData({...corporateData, Contact:contactPersonData}));
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
        <Button onClick={() => {handleDelete(row)}}>Delete</Button>
      ),
      ignoreRowClick: true,
    },
    {
      cell: (row: TContact) => (
        <Button onClick={() => setChoosedEditData(row)}>Edit</Button>
      ),
      ignoreRowClick: true,
    },
    // {
    //   cell: (row: TContact) => (
    //     <Button onClick={() =>console.log(row)}>See Data Row</Button>
    //   ),
    //   ignoreRowClick: true,
    // },
    
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
          clearChoosedEditData={clearChoosedEditData}
          choosedEditData={choosedEditData}
          onsubmit={handleSubmitContactPerson}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
