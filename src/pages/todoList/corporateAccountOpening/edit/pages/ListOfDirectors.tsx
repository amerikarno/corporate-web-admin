import { Card } from "@/components/ui/card";
import { useListOfDirector } from "../hook/useListOfDirector";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsDirector } from "../components/formDirectorInfo";
//import { columnsListOfDirectors } from "../constants/columns";
import { TDirector } from "../constants/types";
import { TDirector as TDirectorEdit } from "../../constant/type"
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { removeDirector, setDirectorEdit } from "@/features/ListOfDirectorSlice/listOfDirectorSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useEffect, useState } from "react";

type TListOfDirectorsProps = {
  corporateCode: string;
};

export function ListOfDirectors({ corporateCode }: TListOfDirectorsProps) {
  const dispatch = useDispatch();
  const { handleSubmitDirectors } =
    useListOfDirector();

  const token = getCookies();
  const listOfDirectorData : TDirectorEdit[] = useSelector<RootState>(
      (state) => state.listOfDirector?.listOfDirectors) as TDirectorEdit[];
  const [choosedEditData,setChoosedEditData] = useState<TDirectorEdit>();
  const clearChoosedEditData = () => {
        setChoosedEditData(undefined);
      };
  console.log(listOfDirectorData)
    

    useEffect(() => {
      axios.post("/api/v1/corporate/query", { corporateCode }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("API Response:", res.data);
  
        if (res.status === 200) {
          const listofdirectors = res.data[0].Directors;
          const updateDirector:TDirectorEdit[] = listofdirectors.map((director : any) => {
            return {
              ...director,
              personalId: director.personalId,
            };
          });

          dispatch(setDirectorEdit(updateDirector));
          console.log("director data fetched successfully.", listofdirectors);
        } else {
          console.log("Failed to fetch director data or data is not an array.");
        }
      })
      .catch((error) => {
        console.error("Error fetching director data:", error);
      });
  }, [corporateCode, dispatch, token]);


    const handleDelete = async (data: TDirectorEdit) => {
      console.log(data)
      try{
        const token = getCookies();
        const res = await axios.post("/api/v1/personals/delete",{personalId : data.personalId},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.status === 200){
          console.log("delete successful")
          dispatch(removeDirector(data.personalId));
        }
      }catch(error){
        console.log("delete fail ,",error)
      }
    };

    const columnsListOfDirectors: TableColumn<TDirectorEdit>[] = [
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
        cell: (row: TDirectorEdit) => (
          <Button onClick={() => setChoosedEditData(row)}>Edit</Button>
        ),
        ignoreRowClick: true,
      },
      {
        cell: (row: TDirectorEdit) => (
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
          clearChoosedEditData={clearChoosedEditData}
          choosedEditData={choosedEditData}
          onsubmit={handleSubmitDirectors}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}


