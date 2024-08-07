import { TableColumn } from "react-data-table-component";
import { TCorporateData } from "../constant/type";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const columnsCorporateInfo: TableColumn<TCorporateData>[] = [
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
    cell: (row: TCorporateData) => {
      const navigate = useNavigate();
      return (
        <Pencil
          className="h-4 hover:cursor-pointer"
          onClick={() =>
            navigate("/todo-list/corporate-account-opening/edit/1", {
              state: row,
            })
          }
        />
      );
    },
    ignoreRowClick: true,
  },
];
