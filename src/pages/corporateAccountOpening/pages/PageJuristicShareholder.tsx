import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormJuristicShareholders } from "../components/formJuristicShareholders";
//import { columnsJuristicShareHolders } from "../constants/columns";
import { useJuristicShareholders } from "../hook/useJuristicShareholders";
import { TJuristicsShareholders } from "../constants/types";
//import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { removeJuristicShareholder } from "@/features/juristicShareholderSlice/juristicShareholderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";

type TPageJuristicShareholderProps = {
  corporateCode: string;
};

export function PageJuristicShareholder({
  corporateCode,
}: TPageJuristicShareholderProps) {
  const {  handleSubmitJuristics } =
    useJuristicShareholders();
  const juristicShareholderData: TJuristicsShareholders[] = useSelector<RootState>((state) => state.juristicShareholder?.juristicShareholders || []) as TJuristicsShareholders[];
  console.log(juristicShareholderData);
  const dispatch = useDispatch();


  const handleDelete = async (data: TJuristicsShareholders) => {
    console.log(data)
      try{
        const token = getCookies();
        const res = await axios.post("/api/v1/juristic/delete",{juristicId : data.juristicId},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.status === 200){
          console.log("delete successful")
          dispatch(removeJuristicShareholder(data.juristicId));
        }
      }catch(error){
        console.log("delete fail ,",error)
      }
  };

  const columnsJuristicShareHolders: TableColumn<TJuristicsShareholders>[] = [
    {
      name: "Name",
      selector: (row) => row.juristicName || "",
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
      cell: (row: TJuristicsShareholders) => (
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
            title="Juristics shareholders of juristic's owner"
            columns={columnsJuristicShareHolders}
            data={juristicShareholderData}
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
