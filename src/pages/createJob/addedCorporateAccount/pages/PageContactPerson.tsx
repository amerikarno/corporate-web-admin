import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsContactPerson } from "../components/formContactPerson";
//import { columnsContactPerson } from "../constants/columns";
import { useContactPerson } from "../hook/useContactPerson";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  removeContactPerson,
  setContactPersons,
} from "@/features/contactPersonSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { TContact, TCorporateData } from "../../constant/type";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";

type TPageContactPersonProps = {
};

export function PageContactPerson({
}: TPageContactPersonProps) {
  const dispatch = useDispatch();
  const contactPersonData: TContact[] = useSelector<RootState>(
    (state) => state.contactPerson?.contactPersons
  ) as TContact[];
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };

  const token = getCookies();
  const { handleSubmitContactPerson } = useContactPerson();
  const [choosedEditData, setChoosedEditData] = useState<TContact>();
  const registerId = localStorage.getItem("registerId") || "";
  const corporatesInfo: TCorporateData = useSelector<RootState>((state) => state.editCorporate) as TCorporateData;

  const fetchedData = async () => {
    try {
      console.log(token)
      console.log({registerId})
      const res = await axios
      .post(
        "/api/v1/corporate/query",
        { registerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 200) {
        const contacts = res.data[0]?.Contact || [];
        const updatedContacts: TContact[] = contacts.map((contact: any) => {
          return {
            ...contact,
            personalId: contact.personalId,
          };
        });
        dispatch(setContactPersons(updatedContacts));
        dispatch(setCorporateData(res.data[0]));
        console.log("Contact data fetched successfully.", contacts);
      } else {
        console.log("Failed to fetch contact data or data is not an array.");
      }
    }catch(error){
      console.error("Error fetching contact data:", error);
    }
  }
  useEffect(() => {
    if(registerId)
      fetchedData();
    else{
      console.log("registerId not found")
    }
  }, []);

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
      selector: (row: TContact) => row.fullNames?.[0]?.title || "",
    },
    {
      name: "Firstname",
      selector: (row: TContact) => row.fullNames?.[0]?.firstName || "",
    },
    {
      name: "Lastname",
      selector: (row: TContact) => row.fullNames?.[0]?.lastName || "",
    },
    {
      name: "Position",
      selector: (row: TContact) => row.position || "",
    },
    {
      name: "Division",
      selector: (row: TContact) => row.division || "",
    },
    {
      name: "Email",
      selector: (row: TContact) => row.email || "",
    },
    {
      name: "Phone Number",
      selector: (row: TContact) => row.telephone || "",
    },

    {
      cell: (row: TContact) => (
        <Button onClick={() => setChoosedEditData(row)} data-testid={`editButton-${row.personalId}`}>Edit</Button>
      ),
      ignoreRowClick: true,
    },
    {
      cell: (row: TContact) => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="bg-red-600 text-white"  data-testid={`deleteButton-${row.personalId}`}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction data-testid={`confirmDelete-${row.personalId}`} onClick={()=>handleDelete(row) }>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
        <Card className=" p-4 space-y-6">
          <h1 className="text-xl font-bold">Juristic Infomations</h1>
          <div className="flex">
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic ID</h1>
                <h1 className="">: {corporatesInfo?.registerId ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic Investor Name</h1>
                <h1 className="">: {corporatesInfo?.Info.name ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Commercial Number</h1>
                <h1 className="">
                  : {corporatesInfo?.Info.registrationNo ?? ""}
                </h1>
              </div>
            </div>
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Tax ID</h1>
                <h1 className="">: {corporatesInfo?.Info.taxId ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Date Of Incorporation</h1>
                <h1 className="">
                  : {corporatesInfo?.Info.dateOfIncorporation.split("T")[0]}
                </h1>
              </div>
            </div>
          </div>
        </Card>
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
          registerId={registerId}
        />
      </div>
    </>
  );
}
