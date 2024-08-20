import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsShareholders } from "../components/formIndividualsShareholders";
// import { columnsShareHolders } from "../constants/columns";
import { useShareholders } from "../hook/useShareholders";
import { TIndividualsShareholders } from "../constants/types";
//import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { removeIndividualShareholder } from "@/features/individualShareholder/individualShareholderSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";

type TPageIndividualShareholderProps = {
  corporateCode: string;
};

export function PageIndividualShareholder({
  corporateCode,
}: TPageIndividualShareholderProps) {
  const { handleSubmitShareholders } = useShareholders();
  const shareholderData: TIndividualsShareholders[] = useSelector<RootState>(
    (state) => state.individualShareholder?.individualShareholders || []
  ) as TIndividualsShareholders[];
  console.log(JSON.stringify(shareholderData, null, 2));
  const dispatch = useDispatch();

  const handleDelete = async (data: TIndividualsShareholders) => {
    console.log(data);
    try {
      const token = getCookies();
      const res = await axios.post(
        "/api/v1/personals/delete",
        { personalId: data.personalId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("delete successful");
        dispatch(removeIndividualShareholder(data.personalId));
      }
    } catch (error) {
      console.log("delete fail ,", error);
    }
  };

  const columnsShareHolders: TableColumn<TIndividualsShareholders>[] = [
    {
      name: "Title",
      selector: (row) => row.fullNames[0]?.title || "",
    },
    {
      name: "Firstname",
      selector: (row) => row.fullNames[0]?.firstName || "",
    },
    {
      name: "Lastname",
      selector: (row) => row.fullNames[0]?.lastName || "",
    },
    {
      name: "CitizenID",
      selector: (row) => row.citizenId || "",
    },
    {
      name: "PassportID",
      selector: (row) => row.passportId || "",
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality || "",
    },
    {
      name: "Share Percentage",
      selector: (row) => row.sharePercentage.toString() || "",
    },
    {
      cell: (row: TIndividualsShareholders) => (
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
            title="List of Shareholders holding from 25% of shares"
            columns={columnsShareHolders}
            data={shareholderData}
            clearSelectedRows
          />
        </Card>
        <FormIndividualsShareholders
          onsubmit={handleSubmitShareholders}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
