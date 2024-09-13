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
import { MdCurrencyExchange } from "react-icons/md";
export default function OrderTradeEdit() {
  if (!isAllowedPage(2005)) {
    return <UnAuthorize />;
  }

  const dispatch = useDispatch();
  const [buySell, setBuySell] = useState<string>("buy");
  const [selectedCorporateCode, setSelectedCorporateCode] =
    useState<string>("");
  const [selectedTradingPair, setSelectedTradingPair] =
    useState<string>("THB/USDT");
  const [mockedCorporateCodes, setFetchedCorporateCodes] = useState<
    { corporateCode: number }[]
  >([]);
  const [choosedEditData, setChoosedEditData] = useState<TOrderTrade>();
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };
  const [sellCurrency, setSellCurrency] = useState<string>("");
  const tradingPair = [{ name: "THB/USDT" }, { name: "THB/USDC" }];
  const buyCurrency = [{ name: "THB" }, { name: "USD" }];

  const orderTradeData: TOrderTrade[] = useSelector<RootState>(
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
        // console.log(res.data);
        const orderTrades = res.data || [];

        const uniqueOrderTrades = orderTrades.filter(
          (order: any, index: any, self: any) =>
            index === self.findIndex((t: any) => t.id === order.id)
        );

        dispatch(setOrderTrades(uniqueOrderTrades));
        // console.log("OrderTrade data fetched successfully.", uniqueOrderTrades);
      } else {
        console.log("Failed to fetch orderTrade");
      }
    } catch (error) {
      console.log("Fetching order list of this role error!", error);
    }
  };

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
      name: "Status",
      selector: (row: TOrderTrade) => getStatus(row.transactionStatus) || "",
    },
    {
      cell: (row: TOrderTrade) => (
        <Button
          onClick={() => {
            setChoosedEditData(row);
          }}
          disabled={row.transactionStatus === 1 || row.transactionStatus === 2}
        >
          Edit
        </Button>
      ),
      ignoreRowClick: true,
    },
  ];

  useEffect(() => {
    const orderListDatatoInputField = choosedEditData || {
      corporateCode: 0,
      cryptoAmount: null,
      cryptoPrice: null,
      currency: "",
      fiatAmount: null,
    };
    reset(orderListDatatoInputField);
    if (choosedEditData?.operations === "buy") {
      setBuySell("buy");
    } else if (choosedEditData?.operations === "sell") {
      setBuySell("sell");
      if (choosedEditData) {
        const cur = choosedEditData.pair.split("/");
        setSellCurrency(cur[1]);
      }
    } else {
      setBuySell("buy");
    }

    console.log("use effect", orderListDatatoInputField);
  }, [choosedEditData]);

  const handleBuySell = (value: string) => {
    setBuySell(value);
    if (value === "sell") {
      const cur = selectedTradingPair.split("/");
      setSellCurrency(cur[1]);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TOrderTrade>({
    resolver: zodResolver(orderTradeSchema),
  });

  useEffect(() => {
    fetchOrderList();
    fetchCorporateCodes();
  }, [reset]);

  const handleCorporateCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedCorporateCode(event.target.value);
  };

  const handleTradingPairChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTradingPair(event.target.value);
    const cur = event.target.value.split("/");
    setSellCurrency(cur[1]);
  };

  const onSubmit = async (data: TOrderTrade) => {
    const currency = buySell === "sell" ? sellCurrency : data.currency;
    let body: TOrderTrade = {
      ...data,
      operations: buySell,
      currency: currency,
      id: choosedEditData?.id,
    };
    console.log(choosedEditData);
    console.log(body);

    try {
      const token = getCookies();
      if (body.id) {
        const res = await axios.post("/api/v1/transaction/order/edit", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          reset();
          clearChoosedEditData();
          setSelectedCorporateCode("");
          console.log("edit successful");
          fetchOrderList();
        } else {
          console.log("edit failed");
        }
      } else {
        const res = await axios.post("/api/v1/transaction/order/create", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          reset();
          clearChoosedEditData();
          setSelectedCorporateCode("");
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
    <div className="md:p-4 flex flex-col justify-center space-y-4">
      <Card className="p-4 w-full">
        <h1 className="font-bold md:text-xl py-4">Orders / Trades</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex justify-center">
            <Card className="w-2/3 p-4 md:space-y-4 md:p-10">
              <div className="w-full flex justify-center items-center">
                <div className="w-2/3">
                  <Input
                    {...register("corporateCode")}
                    label="Corporate Code"
                    id="corporateCode"
                    disabled={isSubmitting}
                    value={selectedCorporateCode}
                    onChange={handleCorporateCodeChange}
                    list="corporateCodes"
                    autoComplete="off"
                    inputClassName=""
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
              <div className="flex items-center justify-center pt-4">
                <div className="w-1/2 ">
                  <div className="relative">
                     {/* <label className="absolute bg-white text-xs rounded-full border-none -top-4">Pairs</label> */}
                      <select
                        id="pair"
                        {...register("pair")}
                        value={selectedTradingPair}
                        onChange={handleTradingPairChange}
                        disabled={isSubmitting}
                        className="h-11 cursor-pointer bg-slate-700 focus:ring-gray-200 hover:bg-slate-900 border border-slate-800 text-white text-base rounded-md block w-full py-2.5 px-4 focus:outline-none appearance-none"
                      >
                        <option value="THB/USTD" disabled>
                          THB/USDT
                        </option>
                        {tradingPair.map((pair, index) => (
                          <option key={index} value={pair.name}>
                            {pair.name}
                          </option>
                        ))}
                      </select>
                      <MdCurrencyExchange className="absolute text-xl right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white" />
                    </div>
                  {errors.pair && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.pair.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-center pb-4">
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
              <div className="flex gap-4 items-center ">
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
                  <select
                    {...register("currency")}
                    // onChange={handleCurrencyChange}
                    className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                  >
                    <option value="">Currency</option>
                    {/* <option value="THB">THB</option>
                    <option value="USD">USD</option> */}
                    {buySell === "buy" ? (
                      buyCurrency.map((currency, index) => (
                        <option key={index} value={currency.name}>
                          {currency.name}
                        </option>
                      ))
                    ) : (
                      <option value={sellCurrency}>{sellCurrency}</option>
                    )}
                  </select>
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
      <Card className="p-4 w-full">
        <DataTable
          title="Rejected Orders / Trades Lists"
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
