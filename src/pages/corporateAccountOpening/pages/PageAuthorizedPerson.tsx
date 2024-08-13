import { Card } from "@/components/ui/card";
import { useAuthorizePerson } from "../hook/useAuthorizePerson";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormAuthorizedPerson } from "../components/formAuthorization";
//import { columnsAuthorizePerson } from "../constants/columns";
//import { useEffect, useState } from "react";
import { TAuthorizePerson } from "../constants/types";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { removeAuthorizedPerson } from "@/features/authorizedPerson/authorizedPersonSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";

type TPageAuthorizedPersonProps = {
  corporateCode: string;
};

export function PageAuthorizedPerson({
  corporateCode,
}: TPageAuthorizedPersonProps) {
  const { handleSubmitAuthorize} =
    useAuthorizePerson();
    const dispatch = useDispatch();
    const authorizedPersonData: TAuthorizePerson[] = useSelector<RootState>((state) => state.authorizedPerson?.authorizedPersons || []) as TAuthorizePerson[];
    console.log(authorizedPersonData)
    const handleDelete = async (data: TAuthorizePerson) => {
      console.log(data)
      try{
        const token = getCookies();
        const res = await axios.post("/api/v1/personals/delete",{personalID : data.personalID},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.status === 200){
          console.log("delete successful")
          dispatch(removeAuthorizedPerson(data.personalID));
        }
      }catch(error){
        console.log("delete fail ,",error)
      }
    };;

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
      selector: (row: TAuthorizePerson) => row.passportId || "",
    },
    // {
    //   name: "Expired Date",
    //   selector: (row: TAuthorizePerson) =>
    //     row.expiryDate ? row.expiryDate.toISOString() : "",
    // },
    {
      name: "Nationality",
      selector: (row: TAuthorizePerson) => row.nationality || "",
    },
    // {
    //   name: "Address",
    //   selector: (row: TDirector) => row.addresses || '',
    // },
    {
      cell: (row: TAuthorizePerson) => (
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
            title="Authorized person of Juristic Investor for traction"
            columns={columnsAuthorizePerson}
            data={authorizedPersonData}
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

