import axios from "@/api/axios";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bank } from "@/constant/variables";
import { getCookies } from "@/lib/Cookies";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BsBank2 } from "react-icons/bs";
import { FaPeopleGroup, FaPerson } from "react-icons/fa6";
// import { mockCorporateTransactionData } from "./constant/utils";
type TBankOrder = {
  corporateCode?: number | null;
  customerCode?: number | null;
  bankName: string;
  bankAccount: string;
  orderValue: number | null;
  operations?: string;
  id?:string;
  transactionStatus?: number;
}

const CustomLoader = () => (
  <div className="flex justify-center items-center p-4 pt-20">
      <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-green-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="ml-4 text-[#082c14]">Loading...</span>
  </div>
);

const bankOrder = () => {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<TBankOrder>({
  });
  
  const [loading, setLoading] = useState(false);
  const [depostieWithdraw,setDepositWithdraw] = useState("deposit")
  const [corporateIndividual,setCorporateIndividual] = useState("corporate")
  const [bankRemove,setBankRemove] = useState(false)
  const [choosedEditData, setChoosedEditData] = useState<TBankOrder | null>();
  const [corporateTransactionData, setCorporateTransactionData] = useState<TBankOrder[]>([]);
  const [individualTransactionData, setIndividualTransactionData] = useState<TBankOrder[]>([]);

  const corporateColumn: TableColumn<TBankOrder>[] = [
    {
      name: "Corporate Code",
      selector: (row: TBankOrder) => row.corporateCode || "",
    },
    {
      name: "Bank Name",
      selector: (row: TBankOrder) => row.bankName || "",
    },
    {
      name: "Bank Account",
      selector: (row: TBankOrder) => row.bankAccount || "",
    },
    {
      name: "Deposit/Withdraw",
      selector: (row: TBankOrder) => row.operations || "",
    },
    {
      name: "Order Value",
      selector: (row: TBankOrder) => row.orderValue || "",
    },
    {
      name: "Status",
      selector: (row: TBankOrder) => {
        if (row.transactionStatus === -1) {
          return "Rejected";
        } else if (row.transactionStatus === 0) {
          return "Pending";
        } else if (row.transactionStatus === 1) {
          return "Checked";
        } else if (row.transactionStatus === 2) {
          return "Approved";
        }
        return "Unknown";
      },
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      cell: (row: TBankOrder) => (
        <Button
          data-testid={`editButton-${row.id}`}
          onClick={() => {
            setChoosedEditData(row);
          }}
        >
          Edit
        </Button>
      ),
      ignoreRowClick: true,
    },
  ];

  const individualColumn: TableColumn<TBankOrder>[] = [
    {
      name: "Customer Code",
      selector: (row: TBankOrder) => row.customerCode || "",
    },
    {
      name: "Bank Name",
      selector: (row: TBankOrder) => row.bankName || "",
    },
    {
      name: "Bank Account",
      selector: (row: TBankOrder) => row.bankAccount || "",
    },
    {
      name: "Deposit/Withdraw",
      selector: (row: TBankOrder) => row.operations || "",
    },
    {
      name: "Order Value",
      selector: (row: TBankOrder) => row.orderValue || "",
    },
    {
      name: "Status",
      selector: (row: TBankOrder) => {
        if (row.transactionStatus === -1) {
          return "Rejected";
        } else if (row.transactionStatus === 0) {
          return "Pending";
        } else if (row.transactionStatus === 1) {
          return "Checked";
        } else if (row.transactionStatus === 2) {
          return "Approved";
        }
        return "Unknown";
      },
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      cell: (row: TBankOrder) => (
        <Button
          data-testid={`editButton-${row.id}`}
          onClick={() => {
            setChoosedEditData(row);
          }}
        >
          Edit
        </Button>
      ),
      ignoreRowClick: true,
    },
  ];

  const handleBankChange = (e:any) =>{
    console.log(e.target.value)
    if(e.target.value === ""){
      setBankRemove(false)
    }else{
      setBankRemove(true)
    }
  }

  const handleFloatValue = (value: number | null): number => {
    if (!value) return 0;

    let newValue = value.toString();

    if (!newValue.includes(".")) {
      newValue += ".00000";
    } else {
      const [integerPart, decimalPart] = newValue.split(".");
      newValue = integerPart + "." + (decimalPart + "00000").slice(0, 5);
    }

    return Math.round(parseFloat(newValue) * 100000);
  };

  const onSubmit = async (data: TBankOrder) => {
    let body : TBankOrder = {
      ...data,
      bankName: data.bankName,
      bankAccount: data.bankAccount,
      orderValue: handleFloatValue(Number(data.orderValue)),
      id: choosedEditData?.id || undefined,
      operations: depostieWithdraw,
      corporateCode: data.corporateCode ? Number(data.corporateCode) : undefined,  
      customerCode: data.customerCode ? Number(data.customerCode) : undefined  
    }
    console.log(body)
  };

  const fetchIndividualData = async () => {
    try{
      const res = await axios.post("/api/v1/transaction/bank/corporate/get",{},{
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        }
      })
      if(res.status === 200){
        setIndividualTransactionData(res?.data || [])
        setChoosedEditData(null);
        console.log("fetch individual data success",res);
      }else{
        console.log("fetch individual data failed",res);;
      }
    }catch(error){
      console.log("fetch individual data error",error);
    }
  }

  const fetchCorporateData = async () => {
    try{
      const res = await axios.post("/api/v1/transaction/bank/individual/get",{},{
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        }
      })
      if(res.status === 200){
        setCorporateTransactionData(res?.data || [])
        setChoosedEditData(null);
        console.log("fetch corporate data success",res);
      }else{
        console.log("fetch corporate data failed",res);;
      }
    }catch(error){
      console.log("fetch corporate data error",error);
    }
  }

  useEffect(()=>{
    if(choosedEditData){
      reset({
        corporateCode: choosedEditData?.corporateCode,
        customerCode: choosedEditData?.customerCode,
        bankName: choosedEditData?.bankName,
        bankAccount: choosedEditData?.bankAccount,
        orderValue: choosedEditData?.orderValue,
      })
      setDepositWithdraw(choosedEditData?.operations ?? "deposit")
    }else{
      reset({
        corporateCode: null,
        customerCode: null,
        bankName: "",
        bankAccount: "",
        orderValue: null,
      })
      setDepositWithdraw("deposit")
    }
  },[choosedEditData])

  useEffect(() => {
    setLoading(true);
    fetchIndividualData().then(() => {
      setLoading(false);
    });
    fetchCorporateData().then(() => {
      setLoading(false);
    });
    setChoosedEditData(null);
    // setCorporateTransactionData(mockCorporateTransactionData); //mock data here
  },[corporateIndividual])

  return (
    <div className="flex md:flex-row flex-col md:space-x-4 justify-center pt-20 md:px-16 min-h-[40rem] lg:px-4">
      <form className="flex flex-col space-y-4 md:w-2/5 "onSubmit={()=>handleSubmit(onSubmit)}>
      {/* <form className="flex space-x-4" onSubmit={handleSubmit(onSubmit)}> */}
          <Card className="p-4 relative rounded-t-xl overflow-hidden max-h-40">
              <div className="w-full flex space-x-2 py-1 bg-[#003019] absolute top-0 left-0 justify-end">
                <div className="p-1 rounded-full bg-white"></div>
                <div className="p-1 rounded-full bg-white "></div>
                <div className="p-1 rounded-full bg-white "></div>
                <div className="p-1 rounded-full bg-[#003019]"></div>
              </div>
            <div className="">
              <span className="flex justify-start items-center font-bold md:text-xl py-2 gap-2">Corporate or Individual<span>{corporateIndividual === "corporate" ? <FaPeopleGroup /> : <FaPerson />}</span></span>
            </div>
            <div>
              <span className={`cursor-pointer transition-colors duration-300 ${
                  corporateIndividual === "corporate" ? "text-blue-600 font-bold" : "text-gray-500"
                }`} onClick={()=>setCorporateIndividual("corporate")}>Corporate</span> / <span className={`cursor-pointer transition-colors duration-300 ${
                  corporateIndividual === "individual" ? "text-blue-600 font-bold" : "text-gray-500"
                }`} onClick={()=>setCorporateIndividual("individual")} >Individual</span>
            </div>
          </Card>
        <div className="relative rounded-b-xl overflow-hidden bg-white p-8 rounded-md border-2 min-h-[35rem]">
              <span className="flex justify-start items-center font-bold md:text-xl py-4 pb-8 gap-2">Cash Deposit/Withdraw<span><BiMoneyWithdraw /></span></span>
              <div className="flex flex-col space-y-4">
                {corporateIndividual === "corporate" ? 
                (<Input label="Corporate Code" type="number " id="corporateCode" {...register("corporateCode")}/>) 
                :
                (<Input label="Customer Code" type="number" id="customerCode" {...register("customerCode")}/>)
                }
                <div className="relative">
                    <select
                      {...register("bankName")}
                      data-testid="bankName"
                      onChange={handleBankChange}
                      className="h-12 cursor-pointer bg-[#003019] focus:ring-gray-200 hover:bg-[#002614] border border-slate-800 text-white text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none appearance-none"
                        >
                      <option value="">Select Bank</option>
                      {bank.map((status) => (
                        <option key={status.code} data-testid={status.name} value={status.name}>
                          {status.name}
                        </option>
                      ))}
                    </select>
                    {!bankRemove && <BsBank2 className="absolute text-xl right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white" />}
                </div>
                <Input label="Bank Account ID" id="bankAccount" {...register("bankAccount")}/>
                <div className="flex justify-center">
                  <div onClick={()=>setDepositWithdraw("deposit")} className={`border-2 p-2 pl-6 pr-1 rounded-l-full hover:cursor-pointer bg-${depostieWithdraw === "deposit" ? "[#003019]" : ""} font-${depostieWithdraw === "deposit" ? "bold" : ""} text-${depostieWithdraw === "deposit" ? "white" : ""} transition-all duration-300
      sm:pl-4 sm:pr-2 md:pl-2 md:pr-1 lg:pl-6
    `}>
                      Deposit
                  </div>
                  <div onClick={()=>setDepositWithdraw("withdraw")} className={`border-2 p-2 pr-6 pl-1 rounded-r-full hover:cursor-pointer bg-${depostieWithdraw === "withdraw" ? "[#003019]" : ""} font-${depostieWithdraw === "withdraw" ? "bold" : ""} text-${depostieWithdraw === "withdraw" ? "white" : ""} transition-all duration-300
      sm:pr-4 sm:pl-2 md:pr-2 md:pl-1 lg:pr-6
    `}>
                      Withdraw
                  </div>
                </div>
                  <Input label="Order Value" id="orderValue" {...register("orderValue")} type="number"/>
                <div className="pt-20 flex justify-end">
                  <Button className="bg-[#003019] hover:bg-[#002614]" type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
                </div>
              </div>
              {/* <div className="w-full flex space-x-2 py-2 bg-[#003019] absolute bottom-0 left-0 justify-end">
                <div className="p-1 rounded-full bg-white"></div>
                <div className="p-1 rounded-full bg-white "></div>
                <div className="p-1 rounded-full bg-white "></div>
                <div className="p-1 rounded-full bg-[#003019]"></div>
              </div> */}
              <div className="w-full flex space-x-2 py-2 bg-white absolute bottom-0 left-0 justify-start">
                <div className="p-1 rounded-full bg-white"></div>
                <div className="p-1 rounded-full bg-[#003019] "></div>
                <div className="p-1 rounded-full bg-[#003019] "></div>
                <div className="p-1 rounded-full bg-[#003019]"></div>
              </div>
        </div>
      </form>
      <Card className="md:p-4 md:w-3/5">
        <DataTable
          title={`List Of ${corporateIndividual === "corporate" ? "Corporate" : "Individual"} Deposit/Withdraw Transactions`}
          columns={corporateIndividual === "corporate" ? corporateColumn : individualColumn}
          data={corporateIndividual === "corporate" ? corporateTransactionData : individualTransactionData}
          clearSelectedRows
          pagination
          paginationPerPage={20}
          progressComponent={<CustomLoader />}
          progressPending={loading}
          noDataComponent={
            <div className="">
              No Data Available
            </div>
          }
        />
      </Card>
    </div>
  )
}

export default bankOrder
