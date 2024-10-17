import { TableColumn } from "react-data-table-component";
import { TCorporateData } from "../constant/type";
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

const handleApproveClick = (row: TCorporateData) => {
  console.log(row);
};

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
    cell: (row: TCorporateData) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-[#002f18] hover:bg-[#5cc95c] hover:font-bold max-w-[85px] transition-all text-white">Approve</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col">
              <span>{`Juristic ID : ${row.CorporateCode}`}</span>
              <span>{`Juristic Name : ${row.Info.name}`}</span>
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
