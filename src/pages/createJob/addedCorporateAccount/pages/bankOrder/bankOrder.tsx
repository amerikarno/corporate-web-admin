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
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { bank } from "@/constant/variables";

export default function BankOrderEdit() {
  if (!isAllowedPage(2020)) {
    return <UnAuthorize />;
  }

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

  const orderTradeData: TBankOrder[] = useSelector<RootState>(
    (state) => state.orderTrade?.orderTrades || []
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

  //   const fetchOrderList = async () => {
  //     try {
  //       const token = getCookies();
  //       const res = await axios.get("/api/v1/transaction/order/get", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (res.status === 200) {
  //         console.log(res.data);
  //         const orderTrades = res.data || [];

  //         const uniqueOrderTrades = orderTrades.filter((order:any, index:any, self:any) =>
  //           index === self.findIndex((t:any) => t.id === order.id)
  //         );

  //         dispatch(setOrderTrades(uniqueOrderTrades));
  //         console.log("OrderTrade data fetched successfully.", uniqueOrderTrades);
  //       } else {
  //         console.log("Failed to fetch orderTrade");
  //       }
  //     } catch (error) {
  //       console.log("Fetching order list of this role error!", error);
  //     }
  //   };

  const columnsOrderTrade: TableColumn<TBankOrder>[] = [
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
      corporateCode: 0,
    };
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
    // fetchOrderList();
    fetchCorporateCodes();
  }, [reset]);

  const onSubmit = async (data: TBankOrder) => {
    let body: TBankOrder = {
      ...data,
      operations: buySell,
      // corporateCode: choosedEditData?.corporateCode || 0,
    };
    console.log(choosedEditData);
    console.log(body);
    try {
      const token = getCookies();
      if (body.corporateCode && body.corporateCode !== 0) {
        const res = await axios.post("/api/v1/transaction/bank/edit", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          reset();
          clearChoosedEditData();
          //   setSelectedCorporateCode("");
          console.log("edit successful");
          //   fetchOrderList();
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
          clearChoosedEditData();
          //   setSelectedCorporateCode("");
          console.log("save successful");
          //   fetchOrderList();
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
            <Card className=" p-4 md:space-y-4 md:p-10 md:w-[60%] space-y-4">
              <div className="flex justify-center ">
                <div className="w-2/3">
                <Input
                      {...register("corporateCode")}
                      label="Corporate Code"
                      id="corporateCode"
                      disabled={isSubmitting}
                      list="corporateCodes"
                    />
                    {errors.corporateCode && (
                      <p className="text-red-500 text-sm px-2">
                        {errors.corporateCode.message}
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
                <div className="w-2/3 flex flex-col">
                  <select
                    {...register("bankName")}
                    className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                            text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                  >
                    <option value="">Select Bank</option>
                    {bank.map((status) => (
                      <option key={status.code} value={status.name}>
                        {status.name}
                      </option>
                    ))}
                  </select>
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
          data={orderTradeData.map((orderTrade, index) => ({
            ...orderTrade,
            key: index,
          }))}
          clearSelectedRows
        />
      </Card>
    </div>
  );
}
