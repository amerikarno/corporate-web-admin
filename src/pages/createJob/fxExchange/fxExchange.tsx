import { Card } from "@/components/ui/card";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { TFxExchange } from "./constant/schemas";
import { fxExchangeSchema } from "./constant/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import DataTable, { TableColumn } from "react-data-table-component";
import { setFxExchanges } from "@/features/fxExchange/fxExhangeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { SiExpertsexchange } from "react-icons/si";
// import { FaMoneyBillWave } from "react-icons/fa6";
import "./scrollbar.css";

export default function FxExchangeEdit() {
  if (!isAllowedPage(2005)) {
    return <UnAuthorize />;
  }

  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currencyPairs = [
    { 0: "THB", 1: "USD" , 2:"THB / USD" },
    // { 0: "THB", 1: "EUR" , 2:"THB / EUR" },
    // { 0: "THB", 1: "AUD" , 2:"THB / AUD" },
    { 0: "USD", 1: "THB" , 2:"USD / THB" },
    // { 0: "EUR", 1: "THB" , 2:"EUR / THB" },
    // { 0: "AUD", 1: "THB" , 2:"AUD / THB" },
  ];

  const dispatch = useDispatch();
  const [youSend,setYouSend] = useState<string>("THB");
  const [recipientGets,setRecipientGets] = useState<string>("USD");
  const [youSendValue,setYouSendValue] = useState<number | null>(null);
  const [exchangeResult,setExchangeResult] = useState<number>(0);
  const [exchangeSpread, setExchangeSpread] = useState<number | null>(null);
  const [operationSpread, setOperationSpread] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const formatNumberWithCommas = (number: number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPair, setSelectedPair] = useState('THB / USD');

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleYouSend = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYouSend(e.target.value);
    const pair:any = currencyPairs.find(pair => pair[2] === selectedPair);
    console.log(pair)
    if (pair) {
      setRecipientGets(pair[0] === e.target.value ? pair[1] : pair[0]);
    }
  }

  const handleSelectPair = (pair: { 0: string, 1: string }) => {
    setYouSend(pair[0]);
    setRecipientGets(pair[1]);
    setSelectedPair(`${pair[0]} / ${pair[1]}`);
    setIsDropdownOpen(false);
  };

  const handleRecipientGets = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    setRecipientGets(e.target.value)
    const pair:any = currencyPairs.find(pair => pair[2] === selectedPair);
    console.log(pair)
    if (pair) {
      setYouSend(pair[0] === e.target.value ? pair[1] : pair[0]);
    }
  }

  const handleYouSendValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYouSendValue(parseFloat(e.target.value) || null);
  };

  const handleExchangeSpreadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExchangeSpread(parseFloat(e.target.value) || null);
  };

  const handleOperationSpreadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperationSpread(parseFloat(e.target.value) || null);
  };

  const handleExchangeRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExchangeRate(parseFloat(e.target.value) || null);
  };

  const [selectedCorporateCode, setSelectedCorporateCode] =
    useState<string>("");

    // const mockeddata: TFxExchange[] = [{
    //   corporateCode: 80000014,
    //   exchangeRate: 231,
    //   exchangeSpread: 132,
    //   operationSpread: 546,
    //   exchange: "THB/USD",
    //   transactionStatus: 0,
    // }]

  const [mockedCorporateCodes, setFetchedCorporateCodes] = useState<
    { corporateCode: number }[]
  >([]);
  const [choosedEditData, setChoosedEditData] = useState<TFxExchange>();
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };

  const fxExchangeData: TFxExchange[] = useSelector<RootState>(
    (state) => state.fxExchange?.fxExchanges || []
  ) as TFxExchange[];

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
      const res = await axios.get("/api/v1/transaction/exchange/get/corporate", {
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

        dispatch(setFxExchanges(uniqueOrderTrades));
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

  const generateOptions = (selectedPair: string) => {
    if (selectedPair === "THB / USD") {
      return ["THB", "USD"];
    }else if (selectedPair === "THB / EUR"){
      return ["THB", "EUR"];
    }else if (selectedPair === "THB / AUD"){
      return ["THB", "AUD"];
    }else if (selectedPair === "USD / THB"){
      return ["USD", "THB"];
    }else if (selectedPair === "EUR / THB"){
      return ["EUR", "THB"];
    }else if (selectedPair === "AUD / THB"){
      return ["AUD", "THB"];
    }
    
    return [];
  };

  const columnsFxExchange: TableColumn<TFxExchange>[] = [
    {
      name: "Corporate Code",
      selector: (row: TFxExchange) => row.corporateCode || "",
    },
    {
      name:"Buy Amount",
      selector:(row: TFxExchange) => row.buyCurrency || "",
    },
    {
      name: "Exchange Pairs",
      selector: (row: TFxExchange) => row.exchange || "",
    },
    {
      name: "Exchange Rate",
      selector: (row: TFxExchange) => row.exchangeRate || "",
    },
    {
      name: "Exchange Spread",
      selector: (row: TFxExchange) => row.exchangeSpread || "",
    },
    {
      name: "Operation Spread",
      selector: (row: TFxExchange) => row.operationSpread || "",
    },
    {
      name: "Status",
      selector: (row: TFxExchange) => getStatus(row.transactionStatus) || "",
    },
    {
      cell: (row: TFxExchange) => (
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
    // console.log(exchangeSpread)
    // console.log(operationSpread)
    // console.log(exchangeRate)
    // console.log(youSendValue)
    if (exchangeSpread !== null && operationSpread !== null && exchangeRate !== null && youSendValue !== null) {
      const sum = youSendValue + exchangeSpread + operationSpread * exchangeRate;
      setExchangeResult(sum);
    }else if(exchangeSpread || operationSpread || exchangeRate || youSendValue === null){
      setExchangeResult(0);
    }
  }, [exchangeSpread, operationSpread, exchangeRate,youSendValue,choosedEditData]);

  useEffect(() => {
    const orderListDatatoInputField = choosedEditData || {
      corporateCode: undefined,
      exchangeRate:undefined,
      exchangeSpread:undefined,
      operationSpread:undefined,
    };
    const [firstVariable, secondVariable] = choosedEditData?.exchange?.split('/') || ["THB", "USD"];
    console.log({0 : firstVariable , 1 : secondVariable})
    handleSelectPair({0 : firstVariable , 1 : secondVariable});
    setYouSend(firstVariable);
    setRecipientGets(secondVariable);
    setExchangeSpread(choosedEditData?.exchangeSpread || 0);
    setOperationSpread(choosedEditData?.operationSpread || 0);
    setExchangeRate(choosedEditData?.exchangeRate || 0);
    setYouSendValue(choosedEditData?.buyCurrency || 0);
    reset(orderListDatatoInputField);

    console.log(choosedEditData)

    console.log("use effect", orderListDatatoInputField);
  }, [choosedEditData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TFxExchange>({
    resolver: zodResolver(fxExchangeSchema),
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

  const onSubmit = async (data: TFxExchange) => {
   
    let body: TFxExchange = {
      ...data,
      exchange:`${youSend}/${recipientGets}`
    };
    console.log(choosedEditData);
    console.log(body);

    try {
      const token = getCookies();
      if (body.id) {
        const res = await axios.post("/api/v1/transaction/exchange/edit", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          reset();
          setExchangeResult(0);
          clearChoosedEditData();
          setSelectedCorporateCode("");
          console.log("edit successful");
          fetchOrderList();
        } else {
          console.log("edit failed");
        }
      } else {
        const res = await axios.post("/api/v1/transaction/exchange/create", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          reset();
          setExchangeResult(0);
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
    <div className="md:p-10 flex flex-col justify-center space-y-4">
      <Card className="p-4 w-full">
      <h1 className="font-bold md:text-xl py-4">FX Exchange</h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
          <Card className="p-16 py-8 flex flex-col items-center space-y-4">
            <div className="flex flex-row justify-start w-full">
                <span className="flex justify-center items-center font-bold md:text-xl py-4">FX Exchange<span><SiExpertsexchange /></span></span>
            </div>
            <div className="">
                <Input
                    {...register("corporateCode")}
                    label="Corporate Code"
                    id="corporateCode"
                    disabled={isSubmitting}
                    onChange={handleCorporateCodeChange}
                    list="corporateCodes"
                    autoComplete="off"
                    inputClassName="w-[20rem] md:w-[25rem]"
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
            <div className="flex flex-row justify-center space-x-[1rem]">
                <div className="w-1/2">
                    <Input
                        {...register("exchangeSpread")}
                        onChange={handleExchangeSpreadChange}
                        label="Exchange Spread"
                        id="exchangeSpread"
                        disabled={isSubmitting}
                        inputClassName="w-[10rem] md:w-[12rem]"
                    />
                    {errors.exchangeSpread && (
                        <p className="text-red-500 text-sm px-2">
                        {errors.exchangeSpread.message}
                        </p>
                    )}
                </div>
                <div className="w-1/2">
                    <Input
                        {...register("operationSpread")}
                        onChange={handleOperationSpreadChange}
                        label="Operation Spread"
                        id="operationSpread"
                        disabled={isSubmitting}
                        inputClassName="w-[10rem] md:w-[12rem]"
                    />
                    {errors.operationSpread && (
                        <p className="text-red-500 text-sm px-2">
                        {errors.operationSpread.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="">
                <Input
                    {...register("exchangeRate")}
                    label="Exchange Rate"
                    id="exchangeRate"
                    disabled={isSubmitting}
                    inputClassName="w-[20rem] md:w-[25rem]"
                    onChange={handleExchangeRateChange}
                />
                {errors.exchangeRate &&(
                    <p className="text-red-500 text-sm px-2">
                    {errors.exchangeRate.message}
                    </p>
                )}
            </div>
            <div className="w-full flex justify-center">
              <div className="relative w-full " ref={dropdownRef}>
                <div className="absolute text-white top-3 left-[30%]">
                  {/* <FaMoneyBillWave/> */}
                </div>
                <button 
                  id="dropdownDefaultButton" 
                  data-dropdown-toggle="dropdown" 
                  className="text-white bg-slate-700 w-full hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800" 
                  type="button"
                  onClick={handleDropdownToggle}
                >
                  {selectedPair}
                  <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
                <div id="dropdown" className={`z-10 ${isDropdownOpen ? '' : 'hidden'} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700`}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-28 overflow-auto custom-scrollbar" aria-labelledby="dropdownDefaultButton">
                      {currencyPairs.map((pair, index) => (
                        <li key={index} onClick={() => handleSelectPair(pair)}>
                          <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                            {pair[0]} / {pair[1]}
                          </a>
                        </li>
                      ))}
                    </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-8 py-4">
              <div className="flex w-[20rem] md:w-[25rem]">
                <select
                  value={youSend}
                  onChange={handleYouSend}
                  id="categories"
                  className="flex-shrink-0 z-9 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  {generateOptions(selectedPair).map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                </select>
                <div className="relative w-full">
                  <input
                    {...register("buyCurrency")}
                    onChange={handleYouSendValue}
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-9 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:outline-none"
                    placeholder="You Send"
                  />
                </div>
              </div>
                <div className="w-full flex justify-center relative">
                    <hr className="w-full h-px border-slate-800 border-2 dark:bg-gray-700"></hr>
                    <div className="bg-slate-800 p-2 rounded-full absolute -bottom-5">
                        <CgArrowsExchangeAltV   style={{color:"white", fontSize:"1.5rem"}}/>
                    </div>
                </div>
                <div className="flex w-[20rem] md:w-[25rem]">
                  <select
                  value={recipientGets}
                  onChange={handleRecipientGets}
                    id="categories"
                    className="flex-shrink-0 z-9 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                  > 
                     {generateOptions(selectedPair).map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                  </select>
                  <div className="relative w-full">
                    <input
                      disabled={true}
                      type="search"
                      id="search-dropdown"
                      className="block p-2.5 w-full z-9 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Recipient Gets"
                      value={exchangeResult || ""}
                    />
                  </div>
              </div>
            </div>
            <div className="flex justify-center pt-4 relative">
                <span className="-top-4 text-gray-400 text-sm absolute">Recipient Gets : {formatNumberWithCommas(exchangeResult)} {recipientGets}</span>
                <Button className="w-[20rem]">
                    Submit
                </Button>
            </div>
          </Card>
        </form>
      </Card>
      <Card className="p-4 w-full">
        <DataTable
          title="Rejected FX Exchange Lists"
          columns={columnsFxExchange}
          data={fxExchangeData.map((orderTrade, index) => ({
            ...orderTrade,
            key: index,
          }))}
          clearSelectedRows
        />
      </Card>
    </div>
  );
}
