import { TableColumn } from "react-data-table-component";
import { TIndividualData } from "./type";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIndividualData } from "@/features/fetchIndividualData/fetchIndividualDataSlice";

const EditButtonCell = ({ row }: { row: TIndividualData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    console.log(row);
    dispatch(setIndividualData(row));
    localStorage.setItem('cid', row.id.toString());
    navigate("/create-job/change-individual-account/edit/1", {
      state: row,
    });
  };

  return (
    <Pencil data-testid={`editButton-${row.registerId}`} className="h-4 hover:cursor-pointer" onClick={handleEditClick} />
  );
};

export const ColumnsOfIndividualSearch: TableColumn<TIndividualData>[] = [
  {
    name: "Individualc ID",
    selector: (row: TIndividualData) => row.registerId || "",
  },
  {
    name: "Individual Name",
    selector: (row: TIndividualData) => row.thName || "",
  },
  {
    name: "Individual Email",
    selector: (row: TIndividualData) => row.email || "",
  },
  {
    name: "",
    cell: (row: TIndividualData) => <EditButtonCell row={row} />,
    ignoreRowClick: true,
  },
];
