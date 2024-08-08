import { Card } from "@/components/ui/card";
import { useListOfDirector } from "../hook/useListOfDirector";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsDirector } from "../components/formDirectorInfo";
//import { columnsListOfDirectors } from "../constants/columns";
import { TDirector,TSubAddress } from "../constants/types";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { removeDirector } from "@/features/ListOfDirectorSlice/listOfDirectorSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";

type TListOfDirectorsProps = {
  corporateCode: string;
};

// type TDirectorWithID = {
//   directors : {
//     corporateCode?: string;
//     fullNames: {
//       title: string;
//       firstName: string;
//       lastName: string;
//     }[];
//     citizenId?: string;
//     passportId?: string;
//     expiryDate: Date;
//     nationality: string;
//     addresses: TSubAddress[];
//     types?: number;
//   }[],
//   personalID?:string;
// };


export function ListOfDirectors({ corporateCode }: TListOfDirectorsProps) {
  const dispatch = useDispatch();
  const { handleSubmitDirectors } =
    useListOfDirector();
    const listOfDirectorData: TDirector[] = useSelector<RootState>((state) => state.listOfDirector?.listOfDirectors || []) as TDirector[];
    console.log(listOfDirectorData)
    
    const handleDelete = async (data: TDirector) => {
      console.log(data)
      try{
        const token = getCookies();
        const res = await axios.post("/api/v1/personals/delete",{personalID : data.personalID},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.status === 200){
          console.log("delete successful")
          dispatch(removeDirector(data.personalID));
        }
      }catch(error){
        console.log("delete fail ,",error)
      }
    };

    const columnsListOfDirectors: TableColumn<TDirector>[] = [
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
        cell: (row: TDirector) => (
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
            title="List of Directors"
            columns={columnsListOfDirectors}
            data={listOfDirectorData}
            clearSelectedRows
          />
        </Card>

        <FormIndividualsDirector
          onsubmit={handleSubmitDirectors}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
function dispatch(arg0: { payload: any; type: "listOfDirector/removeDirector"; }) {
  throw new Error("Function not implemented.");
}

