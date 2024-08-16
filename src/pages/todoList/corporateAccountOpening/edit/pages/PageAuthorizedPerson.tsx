import { Card } from "@/components/ui/card";
import { useAuthorizePerson } from "../hook/useAuthorizePerson";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormAuthorizedPerson } from "../components/formAuthorization";
//import { columnsAuthorizePerson } from "../constants/columns";
//import { useEffect, useState } from "react";
import { TAuthorizePerson } from "../constants/types";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { removeAuthorizedPerson, setAuthorizedPersons } from "@/features/authorizedPerson/authorizedPersonSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { TAuthorizedPerson as TAuthorizedPersonEdit} from "../../constant/type";
import { mapDataToTAuthoirzedPerson } from "../libs/utils";

type TPageAuthorizedPersonProps = {
  corporateCode: string;
};

export function PageAuthorizedPerson({
  corporateCode,
}: TPageAuthorizedPersonProps) {
  const { handleSubmitAuthorize} =useAuthorizePerson();
  const dispatch = useDispatch();
  const authorizedPersonData: TAuthorizePerson[] = useSelector<RootState>((state) => state.authorizedPerson?.authorizedPersons || []) as TAuthorizePerson[];
  console.log(authorizedPersonData)
  const token = getCookies();
  const [choosedEditData,setChoosedEditData] = useState<TAuthorizePerson>();
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };

  useEffect(() => {
    axios.post("/api/v1/corporate/query", { corporateCode }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("API Response:", res.data);

      if (res.status === 200) {
        console.log(res)
        const authorizedPerson = res.data[0]?.AuthorizedPersons || [];;
        console.log(authorizedPerson)
        const updateAuthorized: TAuthorizePerson[] = authorizedPerson.map((authorized: TAuthorizedPersonEdit) => ({
          ...authorized,
          personalId: authorized.personalId, 
        }))
        .map(mapDataToTAuthoirzedPerson)
        .filter((item:any) => item !== null) as TAuthorizePerson[];
        
        dispatch(setAuthorizedPersons(updateAuthorized));
        console.log("authorized person data fetched successfully.", updateAuthorized);
      } else {
        console.log("Failed to fetch authorized person data or data is not an array.");
      }
    })
    .catch((error) => {
      console.error("Error fetching Authorized Person data:", error);
    });
  }, [corporateCode, dispatch, token , choosedEditData]);
  
  const handleDelete = async (data: TAuthorizePerson) => {
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
          dispatch(removeAuthorizedPerson(data.personalId));
        }
      }catch(error){
        console.log("delete fail ,",error)
      }
    };;

  const columnsAuthorizePerson: TableColumn<TAuthorizePerson>[] = [
    {
      name: "Title",
      selector: (row: TAuthorizePerson) => row.fullNames[0].title || "",
    },
    {
      name: "Firstname",
      selector: (row: TAuthorizePerson) => row.fullNames[0].firstName || "",
    },
    {
      name: "Lastname",
      selector: (row: TAuthorizePerson) => row.fullNames[0].lastName || "",
    },
    {
      name: "CitizenID",
      selector: (row: TAuthorizePerson) => row.citizenId || "",
    },
    {
      name: "PassportID",
      selector: (row: TAuthorizePerson) => row.passportId || "",
    },
    {
      name: "Nationality",
      selector: (row: TAuthorizePerson) => row.nationality || "",
    },
    {
      cell: (row: TAuthorizePerson) => (
        <Button onClick={() => handleDelete(row)}>Delete</Button>
      ),
      ignoreRowClick: true,
    },
    {
      cell: (row: TAuthorizePerson) => (
        <Button onClick={() => {{setChoosedEditData(row) 
          console.log(row)}}
        }>Edit</Button>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Authorized person of Juristic Investor for traction"
            columns={columnsAuthorizePerson}
            data={authorizedPersonData}
          />
        </Card>
        <FormAuthorizedPerson
          clearChoosedEditData={clearChoosedEditData}
          choosedEditData={choosedEditData}
          onsubmit={handleSubmitAuthorize}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}

