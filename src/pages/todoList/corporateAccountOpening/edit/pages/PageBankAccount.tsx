import { Card } from "@/components/ui/card";
import DataTable, { TableColumn } from "react-data-table-component";
import { FormBank } from "../components/formBank";
// import { columnsBank } from "../constants/columns";
import { useBank } from "../hook/useBank";
//import { useEffect, useState } from "react";
import { TBank } from "../constants/types";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { removeBank, setBank } from "@/features/bankSlice/bankSlice";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { TBank as TBankEdit } from "../../constant/type";
import { mapDataToTBank } from "../libs/utils";

type TPageBankAccountProps = {
  corporateCode: string;
};

type TBankWithID = {
  CorporateCode?:string;
  bank : TBank[];
  BankId?: string;
}
export function PageBankAccount({ corporateCode }: TPageBankAccountProps) {
  const {  handleSubmitBank } = useBank();
  const bankData: TBankWithID[] = useSelector<RootState>((state) => state.bank?.banks || []) as TBankWithID[];
  const dispatch = useDispatch();

  const token = getCookies();
  const [choosedEditData,setChoosedEditData] = useState<TBankWithID>();
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
          const banks = res.data[0].Banks;
          const updateBanks: TBankWithID[] = banks.map((bank: TBankEdit) => ({
            ...bank,
          }))
          .map(mapDataToTBank)
          .filter((item:any) => item !== null) as TBankWithID[];
          
          dispatch(setBank(updateBanks));
          console.log("bank data fetched successfully.", updateBanks);
        } else {
          console.log("Failed to fetch bank data or data is not an array.");
        }
      })
      .catch((error) => {
        console.error("Error fetching bank data:", error);
      });
    }, [corporateCode, dispatch, token , choosedEditData]);

    
  console.log(bankData)
  const handleDelete = async (data: TBankWithID) => {
    console.log(data)
    try{
      const token = getCookies();
      const res = await axios.post("/api/v1/bank/delete",{BankId : data.BankId},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 200){
        console.log("delete successful")
        dispatch(removeBank(data.BankId));
      }
    }catch(error){
      console.log("delete fail ,",error)
    }
  };;

  const columnsBank: TableColumn<TBankWithID>[] = [
    {
      name: "AccountType",
      selector: (row) => row.bank?.[0].accountType || "",
    },
    {
      name: "BankName",
      selector: (row) => row.bank?.[0].bankName || "",
    },
    {
      name: "AccountNo",
      selector: (row) => row.bank?.[0].accountNo || "",
    },
    {
      name: "AccountLocation",
      selector: (row) => row.bank?.[0].accountLocation || "",
    },
    {
      name: "SwiftCode",
      selector: (row) => row.bank?.[0].swiftCode || "",
    },
    // {
    //   name: "Address",
    //   selector: (row: TDirector) => row.addresses || '',
    // },
    {
      cell: (row: TBankWithID) => (
        <Button onClick={() => handleDelete(row)}>Delete</Button>
      ),
      ignoreRowClick: true,
    },
    {
      cell: (row: TBankWithID) => (
        <Button onClick={() => {setChoosedEditData(row)
          console.log(row)
        }}>Edit</Button>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Bank Accounts Intended to Deposit and Withdraw Fiat Fund"
            columns={columnsBank}
            data={bankData}
            clearSelectedRows
          />
        </Card>
        <FormBank 
        onsubmit={handleSubmitBank} 
        corporateCode={corporateCode}
        clearChoosedEditData={clearChoosedEditData}
        choosedEditData={choosedEditData} />
      </div>
    </>
  );
}
