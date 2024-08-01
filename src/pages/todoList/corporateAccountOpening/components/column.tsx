import { TableColumn } from "react-data-table-component";
import { TCorporateAccountOpeningInfo } from "../constant/type";
import { Pencil } from "lucide-react";

export const columnsCorporateInfo: TableColumn<TCorporateAccountOpeningInfo>[] =
  [
    {
      name: "Jusristic ID",
      selector: (row: TCorporateAccountOpeningInfo) => row.corporateCode || "",
    },
    {
      name: "Juristic Name",
      selector: (row: TCorporateAccountOpeningInfo) => row.corporateName || "",
    },
    {
      name: "Tax ID",
      selector: (row: TCorporateAccountOpeningInfo) => row.taxId || "",
    },
    {
      name: "",
      cell: (row: TCorporateAccountOpeningInfo) => (
        <Pencil
          className="h-4 hover:cursor-pointer"
          onClick={() => console.log(row)}
        />
      ),
      ignoreRowClick: true,
    },
  ];
