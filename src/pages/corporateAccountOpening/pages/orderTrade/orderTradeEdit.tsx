import { Card } from "@/components/ui/card";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { TOrderTrade } from "./constant/type";
import { orderTradeSchema } from "./constant/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import DataTable, { TableColumn } from "react-data-table-component";
import { setOrderTrades } from "@/features/orderTrade/orderTradeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";

const tradingPair = [{ name: "THB/USTD" }, { name: "THB/USDC" }];

export default function OrderTradeEdit() {
  if (!isAllowedPage(2020)) {
    return <UnAuthorize />;
  }

  const dispatch = useDispatch(); // Move useDispatch here
  const [buySell, setBuySell] = useState<string>("buy");
  const [selectedCorporateCode, setSelectedCorporateCode] =
    useState<string>("");
  const [selectedTradingPair, setSelectedTradingPair] = useState<string>("");
  const [mockedCorporateCodes, setFetchedCorporateCodes] = useState<
    { corporateCode: number }[]
  >([]);
  const [choosedEditData, setChoosedEditData] =
    useState<TOrderTrade>();
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };
  
  const orderTradeData: TOrderTrade[] =
    useSelector<RootState>(
      (state) => state.orderTrade?.orderTrades || []
    ) as TOrderTrade[];

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
      const res = await axios.get("/api/v1/transaction/order/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res.data);
        const orderTrades = res.data || [];
        dispatch(setOrderTrades(orderTrades));
        console.log("OrderTrade data fetched successfully.", orderTrades);
      } else {
        console.log("Failed to fetch orderTrade");
      }
    } catch (error) {
      console.log("Fetching order list of this role error!", error);
    }
  };

  const columnsOrderTrade: TableColumn<TOrderTrade>[] = [
    {
      name: "Corporate Code",
      selector: (row: TOrderTrade) => row.corporateCode || "",
    },
    {
      name: "Buy/Sell",
      selector: (row: TOrderTrade) => row.operations || "",
    },
    {
      name: "pair",
      selector: (row: TOrderTrade) => row.pair || "",
    },
    {
      name: "Crypto Amount",
      selector: (row: TOrderTrade) => row.cryptoAmount || "",
    },
    {
      name: "Crypto Price",
      selector: (row: TOrderTrade) => row.cryptoPrice || "",
    },
    {
      name: "Fiat Amount",
      selector: (row: TOrderTrade) => row.fiatAmount || "",
    },
    {
      name: "Currency",
      selector: (row: TOrderTrade) => row.currency || "",
    },
    {
      cell: (row: TOrderTrade) => (
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
    fetchOrderList();
    fetchCorporateCodes();
  }, []);

  useEffect(() => {
    const orderListDatatoInputField = choosedEditData || {
    corporateCode: 0,  
    cryptoAmount: 0,
    cryptoPrice: 0,
    currency: "",
    fiatAmount:0,
    };
    reset(orderListDatatoInputField);
    setBuySell(choosedEditData?.operations || "buy");
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
  } = useForm<TOrderTrade>({
    resolver: zodResolver(orderTradeSchema),
  });

  const handleCorporateCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedCorporateCode(event.target.value);
  };

  const handleTradingPairChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTradingPair(event.target.value);
  };

  const onSubmit = async (data: TOrderTrade) => {
    let body: TOrderTrade = {
      ...data,
      operations: buySell,
      id:choosedEditData?.id
    };
    console.log(body);
    try {
      const token = getCookies();
      
      if(body.id){
        const res = await axios.post("/api/v1/transaction/order/edit", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        if (res.status === 200) {
            reset();
            clearChoosedEditData();
            console.log(res);
            console.log("edit successful");
        } else {
            console.log("edit failed");
        }
      }else{
        const res = await axios.post("/api/v1/transaction/order/create", body, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            });
            if (res.status === 200) {
                reset();
                clearChoosedEditData();
                console.log(res);
                console.log("save successful");
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
        <DataTable
              title="Rejected Orders / Trades Lists"
              columns={columnsOrderTrade}
              data={orderTradeData}
              clearSelectedRows
            />
      </Card>
      <Card className="p-4 w-full">
        <h1 className="font-bold md:text-xl py-4">Orders / Trades</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row space-x-4 justify-center">
            <div className="md:w-1/2 w-full">
              <Input
                {...register("corporateCode")}
                label="Corporate Code"
                id="corporateCode"
                disabled={isSubmitting}
                value={selectedCorporateCode}
                onChange={handleCorporateCodeChange}
                list="corporateCodes"
                autoComplete="off"
              />
              {errors.corporateCode && !selectedCorporateCode && (
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
          <div className="w-full flex justify-center">
            <Card className=" p-4 md:space-y-4 md:p-10 md:w-[60%]">
              <div className="flex flex-row justify-center ">
                <div
                  className={`flex justify-center select-none cursor-default w-1/4 text-white px-4 py-2 rounded-l transition-colors duration-300 ${
                    buySell === "buy" ? "bg-slate-800" : "bg-slate-500"
                  }`}
                  onClick={() => handleBuySell("buy")}
                >
                  Buy
                </div>
                <div
                  className={`flex justify-center select-none cursor-default w-1/4 text-white px-4 py-2 rounded-r transition-colors duration-300 ${
                    buySell === "sell" ? "bg-slate-800" : "bg-slate-500"
                  }`}
                  onClick={() => handleBuySell("sell")}
                >
                  Sell
                </div>
              </div>

              <div className="flex pt-4 gap-4 items-center justify-center">
                <div className="w-1/2 border-y-4">
                  <label
                    htmlFor="pair"
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                  <select
                    id="pair"
                    {...register("pair")}
                    value={selectedTradingPair}
                    onChange={handleTradingPairChange}
                    disabled={isSubmitting}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="" disabled>
                      trading pairs
                    </option>
                    {tradingPair.map((pair, index) => (
                      <option key={index} value={pair.name}>
                        {pair.name}
                      </option>
                    ))}
                  </select>
                  {errors.pair && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.pair.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex pt-4 gap-4 items-center ">
                <div className="w-1/2 space-y-4">
                  <Input
                    {...register("cryptoAmount")}
                    label="Crypto Amount"
                    id="cryptoAmount"
                    disabled={isSubmitting}
                  />
                  {errors.cryptoAmount && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.cryptoAmount.message}
                    </p>
                  )}
                  <Input
                    {...register("fiatAmount")}
                    label="Fiat Amount"
                    id="fiatAmount"
                    disabled={isSubmitting}
                  />
                  {errors.fiatAmount && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.fiatAmount.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2 space-y-4">
                  <Input
                    {...register("cryptoPrice")}
                    label="Crypto Price"
                    id="cryptoPrice"
                    disabled={isSubmitting}
                  />
                  {errors.cryptoPrice && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.cryptoPrice.message}
                    </p>
                  )}
                  <Input
                    {...register("currency")}
                    label="Currency"
                    id="currency"
                    disabled={isSubmitting}
                  />
                  {errors.currency && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.currency.message}
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
    </div>
  );
}
