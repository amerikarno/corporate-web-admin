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
    name: "Register ID",
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
    name: "status",
    selector: (row: TIndividualData) => {
      if (row.status === -1) {
        return "Rejected";
      } else if (row.status === 0) {
        return "Pending";
      } else if (row.status === 1) {
        return "Approved";
      }
      return "Unknown";
    }
  },
  {
    cell: (row: TIndividualData) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-[#002f18] hover:bg-[#5cc95c] hover:font-bold max-w-[85px] transition-all text-white">Approve</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure? Approve</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col">
              <span>{`Register ID : ${row.id}`}</span>
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
  {
    cell: (row: TIndividualData) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-[#002f18] hover:bg-[#ca4047] hover:font-bold hover:text-white w-[85px] transition-all text-white">Reject</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure? Reject</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col">
              <span>{`Register ID : ${row.id}`}</span>
              <span>{`Individual Name : ${row.thName}`}</span>
              <span>{`Individual Email : ${row.email}`}</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>handleApproveClick(row)}>Reject</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    ),
    ignoreRowClick: true,
  },
];
