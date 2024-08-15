import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormIndividualsShareholders } from "../components/formIndividualsShareholders";
// import { columnsShareHolders } from "../constants/columns";
import { useShareholders } from "../hook/useShareholders";
import { TIndividualsShareholders } from "../constants/types";
//import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { removeIndividualShareholder, setIndividualShareholder } from "@/features/individualShareholder/individualShareholderSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { TIndividualShareholder as TIndividualShareholderEdit } from "../../constant/type";

type TPageIndividualShareholderProps = {
  corporateCode: string;
};


export function PageIndividualShareholder({
  corporateCode,
}: TPageIndividualShareholderProps) {
  const dispatch = useDispatch();
  const token = getCookies();
  const shareholderData: TIndividualShareholderEdit[] = useSelector<RootState>((state) => state.individualShareholder?.individualShareholders || []) as TIndividualShareholderEdit[];
  const [choosedEditData,setChoosedEditData] = useState<TIndividualShareholderEdit>();

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
          const individualshareholder = res.data[0]?.IndividualShareholders;
          if (individualshareholder && individualshareholder.length > 0) {
            // const updateIndividual:TIndividualShareholderEdit[] = individualshareholder.map((indivudual: any) => ({
            //   ...indivudual,
            // }));
            dispatch(setIndividualShareholder(individualshareholder));
            console.log("indivudual data fetched successfully.", individualshareholder);
          } else {
            console.log("No individual shareholder data found.");
          }
        } else {
          console.log("Failed to fetch indivudual data or data is not an array.");
        }
      })
      .catch((error) => {
        console.error("Error fetching indivudual data:", error);
      });
  }, [dispatch]);


  const {handleSubmitShareholders } =useShareholders();
  console.log(shareholderData);
  
    const handleDelete = async(data: TIndividualShareholderEdit) => {
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
          dispatch(removeIndividualShareholder(data.personalId));
        }
      }catch(error){
        console.log("delete fail ,",error)
      }
    };
  

  const columnsShareHolders: TableColumn<TIndividualShareholderEdit>[] = [
    {
      name: "Title",
      selector: (row) => row.fullNames?.[0]?.title || "",
    },
    {
      name: "Firstname",
      selector: (row) => row.fullNames?.[0]?.firstName || "",
    },
    {
      name: "Lastname",
      selector: (row) => row.fullNames?.[0]?.lastName || "",
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
      name: "Share Percentage",
      selector: (row) => row.sharePercentage?.toString() || "",
    },
    {
      cell: ( row: TIndividualShareholderEdit) => (
        <Button onClick={() => handleDelete(row)}>Delete</Button>
      ),
      ignoreRowClick: true,
    },
    {
      cell: ( row: TIndividualShareholderEdit) => (
        <Button onClick={() => setChoosedEditData(row)}>Edit</Button>
      ),
      ignoreRowClick: true,
    },
  ];
  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="List of Shareholders holding from 25% of shares"
            columns={columnsShareHolders}
            data={shareholderData}
            clearSelectedRows
          />
        </Card>
        <FormIndividualsShareholders
          clearChoosedEditData={clearChoosedEditData}
          choosedEditData={choosedEditData}
          onsubmit={handleSubmitShareholders}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
