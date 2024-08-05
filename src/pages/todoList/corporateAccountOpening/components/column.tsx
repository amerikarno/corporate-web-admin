import { TableColumn } from "react-data-table-component";
import { TCorporateData } from "../constant/type";
import { Pencil } from "lucide-react";

export const columnsCorporateInfo: TableColumn<TCorporateData>[] =
  [
    {
      name: "Juristic ID",
      selector: (row: TCorporateData) => row.CorporateCode || "",
    },
    {
      name: "Juristic Name",
      selector: (row: TCorporateData) => row.Info?.name || "",
    },
    {
      name: "",
      cell: (row: TCorporateData) => (
        <Pencil
          className="h-4 hover:cursor-pointer"
          onClick={() => console.log(row)}
        />
      ),
      ignoreRowClick: true,
    },
  ];
