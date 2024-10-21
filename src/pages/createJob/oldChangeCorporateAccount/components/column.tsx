import { TableColumn } from "react-data-table-component";
import { TCorporateData } from "../constant/type";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";

const EditButtonCell = ({ row }: { row: TCorporateData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    console.log(row);
    dispatch(setCorporateData(row));
    localStorage.setItem('registerId', row.registerId.toString());
    navigate("/todo-list/corporate-account-opening/edit/1", {
      state: row,
    });
  };

  return (
    <Pencil data-testid={`editButton-${row.registerId}`} className="h-4 hover:cursor-pointer" onClick={handleEditClick} />
  );
};

export const columnsCorporateInfo: TableColumn<TCorporateData>[] = [
  {
    name: "Juristic ID",
    selector: (row: TCorporateData) => row.registerId || "",
  },
  {
    name: "Juristic Name",
    selector: (row: TCorporateData) => row.Info?.name || "",
  },
  {
    name: "",
    cell: (row: TCorporateData) => <EditButtonCell row={row} />,
    ignoreRowClick: true,
  },
];
