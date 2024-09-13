import { Card } from "@/components/ui/card";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { TBankOrder } from "./constant/type";
import { bankOrderSchema } from "./constant/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import DataTable, { TableColumn } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { bank } from "@/constant/variables";
import { setBankOrder } from "@/features/bankOrder/bankOrdersSlice";
import { BsBank2 } from "react-icons/bs";

export default function BankOrderEdit() {
  if (!isAllowedPage(2020)) {
    return <UnAuthorize />;
  }
  const dispatch = useDispatch();
  const [buySell, setBuySell] = useState<string>("depostie");
  //   const [selectedCorporateCode, setSelectedCorporateCode] =
  //     useState<string>("");
  //   const [selectedTradingPair, setSelectedTradingPair] = useState<string>("");
    const [mockedCorporateCodes, setFetchedCorporateCodes] = useState<
      { corporateCode: number }[]
    >([]);
  const [choosedEditData, setChoosedEditData] = useState<TBankOrder>();
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };
  const [bankRemove,setBankRemove] = useState(false)

  const handleBankChange = (e:any) =>{
    console.log(e.target.value)
    if(e.target.value === ""){
      setBankRemove(false)
    }else{
      setBankRemove(true)
    }
  }

  const getStatus = (status?: number) => {
    if (status === -1) {
      return "Reject";
    } else if (status === 0) {
      return "Pending";
    } else if (status === 1) {
      return "Checked";
    } else if (status === 2) {
      return "Approved";
    } else {
      return "";
    }
  };

  const orderBank: TBankOrder[] = useSelector<RootState>(
    (state) => state.bankOrder?.bankOrders || []
  ) as TBankOrder[];

    const fetchCorporateCodes = async () => {
      try {
        const token = getCookies();

        const res = await axios.post(
          "/api/v1/corporate/query/all",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          const corporateCodes = res.data.map((item: any) => ({
            corporateCode: item.CorporateCode,
          }));
          setFetchedCorporateCodes(corporateCodes);
        } else {
          console.log("Failed to fetch corporate codes");
        }
      } catch (error) {
        console.log("Error fetching corporate codes:", error);
      }
    };

    const fetchOrderList = async () => {
      try {
        const token = getCookies();
        const res = await axios.get("/api/v1/transaction/bank/get/individual", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          console.log(res.data);
          const orderTrades = res.data || [];

          const uniqueOrderTrades = orderTrades.filter((order:any, index:any, self:any) =>
            index === self.findIndex((t:any) => t.id === order.id)
          );

          dispatch(setBankOrder(uniqueOrderTrades));
          console.log("OrderTrade data fetched successfully.", uniqueOrderTrades);
        } else {
          console.log("Failed to fetch orderTrade");
        }
      } catch (error) {
        console.log("Fetching order list of this role error!", error);
      }
    };

  const columnsOrderTrade: TableColumn<TBankOrder>[] = [
    {
      name: "CorporateCode",
      selector: (row: TBankOrder) => row.accountId || "",
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
      name: "Deposite/Withdraw",
      selector: (row: TBankOrder) => row.operations || "",
    },
    {
      name: "Order Value",
      selector: (row: TBankOrder) => row.orderValue || "",
    },
    {
      name: "Status",
      selector: (row: TBankOrder) => getStatus(row.transactionStatus) || "",
    },
    {
      cell: (row: TBankOrder) => (
        <Button
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

  useEffect(() => {
    const orderListDatatoInputField = choosedEditData || {
      bankName: "",
      bankAccount: "",
      operations: "",
      orderValue: 0,
      accountId: 0,
    };
    if(choosedEditData?.bankName){
      setBankRemove(true)
    }else{
      setBankRemove(false)
    }
    reset(orderListDatatoInputField);
    setBuySell(choosedEditData?.operations || "deposite");
    console.log("use effect", orderListDatatoInputField);
  }, [choosedEditData]);

  const handleBuySell = (value: string) => {
    setBuySell(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TBankOrder>({
    resolver: zodResolver(bankOrderSchema),
  });

  useEffect(() => {
    fetchOrderList();
    fetchCorporateCodes();
  }, [reset]);

  const onSubmit = async (data: TBankOrder) => {
    let body: TBankOrder = {
      ...data,
      operations: buySell,
      id:choosedEditData?.id || "",
    };
    console.log(choosedEditData);
    console.log(body);
    try {
      const token = getCookies();
      if (body.id && body.id !== "") {
        const res = await axios.post("/api/v1/transaction/bank/edit", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          reset();
          setBankRemove(false)
          clearChoosedEditData();
          //   setSelectedCorporateCode("");
          console.log("edit successful");
            fetchOrderList();
        } else {
          console.log("edit failed");
        }
      } else {
        const res = await axios.post("/api/v1/transaction/bank/create", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          reset();
          setBankRemove(false)
          clearChoosedEditData();
          //   setSelectedCorporateCode("");
          console.log("save successful");
          fetchOrderList();
        } else {
          console.log("save failed");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:p-10 flex flex-col justify-center space-y-4">
      <Card className="p-4 w-full">
        <h1 className="font-bold md:text-xl py-4">Cash Deposit/Withdraw</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex justify-center">
            <Card className="w-2/3 p-4 md:space-y-4 md:p-10  space-y-4">
              <div className="flex justify-center ">
                <div className="w-2/3">
                <Input
                      {...register("accountId")}
                      label="Corporate Code"
                      id="accountId"
                      disabled={isSubmitting}
                      list="corporateCodes"
                    />
                    {errors.accountId && (
                      <p className="text-red-500 text-sm px-2">
                        {errors.accountId.message}
                      </p>
                    )}
                    <datalist id="corporateCodes">
                      {mockedCorporateCodes.map((code, index) => (
                        <option key={index} value={code.corporateCode}>
                          {code.corporateCode}
                        </option>
                      ))}
                    </datalist>
                </div>
              </div>
              <div className="flex justify-center ">
                <div className="w-2/3 ">
                  <div className="relative">
                    <select
                      {...register("bankName")}
                      onChange={handleBankChange}
                      className="h-12 cursor-pointer bg-slate-800 focus:ring-gray-200 hover:bg-slate-900 border border-slate-800 text-white text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none appearance-none"
                        >
                      <option value="">Select Bank</option>
                      {bank.map((status) => (
                        <option key={status.code} value={status.name}>
                          {status.name}
                        </option>
                      ))}
                    </select>
                    {!bankRemove && <BsBank2 className="absolute text-xl right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white" />}
                  </div>
                  {errors.bankName && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.bankName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center ">
                <div className="w-2/3">
                  <Input
                    {...register("bankAccount")}
                    label="Bank Account ID"
                    id="bankAccount"
                    disabled={isSubmitting}
                  />
                  {errors.bankAccount && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.bankAccount.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex pt-4 gap-4 items-center justify-center">
                <div className="w-2/3 border-slate-800"></div>
              </div>
              <div className="flex flex-row justify-center text-xs md:text-base">
                <div
                  className={`flex justify-center select-none cursor-default w-1/4 text-white px-4 py-2 rounded-l transition-colors duration-300 ${
                    buySell === "deposite" ? "bg-slate-800" : "bg-slate-500"
                  }`}
                  onClick={() => handleBuySell("deposite")}
                >
                  Deposite
                </div>
                <div
                  className={`flex justify-center select-none cursor-default w-1/4 text-white px-4 py-2 rounded-r transition-colors duration-300 ${
                    buySell === "withdraw" ? "bg-slate-800" : "bg-slate-500"
                  }`}
                  onClick={() => handleBuySell("withdraw")}
                >
                  Withdraw
                </div>
              </div>
              <div className="flex justify-center ">
                <div className="w-2/3 space-y-4">
                  <Input
                    {...register("orderValue")}
                    label="Order Value"
                    id="orderValue"
                    disabled={isSubmitting}
                  />
                  {errors.orderValue && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.orderValue.message}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Card>
      <Card className="p-4 w-full">
        <DataTable
          title="Cash Deposit/Withdraw Lists"
          columns={columnsOrderTrade}
          data={orderBank.map((orderTrade, index) => ({
            ...orderTrade,
            key: index,
          }))}
          clearSelectedRows
        />
      </Card>
    </div>
  );
}
