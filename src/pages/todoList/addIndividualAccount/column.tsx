import { TableColumn } from "react-data-table-component";
import { TIndividualData } from "./type";
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
import { Button } from "@/components/ui/button";

  const handleApproveClick = (row: TIndividualData) => {
    console.log(row);
  };

export const ColumnsOfIndividualSearch: TableColumn<TIndividualData>[] = [
  {
    name: "Individualc ID",
    selector: (row: TIndividualData) => row.id || "",
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
    cell: (row: TIndividualData) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-[#002f18] hover:bg-[#5cc95c] hover:font-bold max-w-[85px] transition-all text-white">Approve</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col">
              <span>{`Individualc ID : ${row.id}`}</span>
              <span>{`Individual Name : ${row.thName}`}</span>
              <span>{`Individual Email : ${row.email}`}</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>handleApproveClick(row)}>Approve</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    ),
    ignoreRowClick: true,
  },
];
