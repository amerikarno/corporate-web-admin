import { Card } from "@/components/ui/card";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { TFxExchange } from "./constant/schemas";
import { fxExchangeSchema } from "./constant/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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



export default function FxExchangeEdit() {
  if (!isAllowedPage(2005)) {
    return <UnAuthorize />;
  }

  const dispatch = useDispatch();

  const [selectedCorporateCode, setSelectedCorporateCode] =
    useState<string>("");

  const [mockedCorporateCodes, setFetchedCorporateCodes] = useState<
    { corporateCode: number }[]
  >([]);
  const [choosedEditData, setChoosedEditData] = useState<TFxExchange>();
  const clearChoosedEditData = () => {
    setChoosedEditData(undefined);
  };

  const orderTradeData: TFxExchange[] = useSelector<RootState>(
    (state) => state.orderTrade?.orderTrades || []
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

//   const fetchOrderList = async () => {
//     try {
//       const token = getCookies();
//       const res = await axios.get("/api/v1/transaction/order/get", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.status === 200) {
//         // console.log(res.data);
//         const orderTrades = res.data || [];

//         const uniqueOrderTrades = orderTrades.filter(
//           (order: any, index: any, self: any) =>
//             index === self.findIndex((t: any) => t.id === order.id)
//         );

//         dispatch(setOrderTrades(uniqueOrderTrades));
//         // console.log("OrderTrade data fetched successfully.", uniqueOrderTrades);
//       } else {
//         console.log("Failed to fetch orderTrade");
//       }
//     } catch (error) {
//       console.log("Fetching order list of this role error!", error);
//     }
//   };

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

  const columnsOrderTrade: TableColumn<TFxExchange>[] = [
    {
      name: "Corporate Code",
      selector: (row: TFxExchange) => row.corporateCode || "",
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

//   useEffect(() => {
//     const orderListDatatoInputField = choosedEditData || {
//       corporateCode: 0,
//       cryptoAmount: 0,
//       cryptoPrice: 0,
//       currency: "",
//       fiatAmount: 0,
//     };
//     reset(orderListDatatoInputField);

//     console.log("use effect", orderListDatatoInputField);
//   }, [choosedEditData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TFxExchange>({
    resolver: zodResolver(fxExchangeSchema),
  });

  useEffect(() => {
    // fetchOrderList();
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
      exchange:"USD/THB"
    };
    console.log(choosedEditData);
    console.log(body);

    // try {
    //   const token = getCookies();
    //   if (body.id) {
    //     const res = await axios.post("/api/v1/transaction/order/edit", body, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     if (res.status === 200) {
    //       reset();
    //       clearChoosedEditData();
    //       setSelectedCorporateCode("");
    //       console.log("edit successful");
    //     //   fetchOrderList();
    //     } else {
    //       console.log("edit failed");
    //     }
    //   } else {
    //     const res = await axios.post("/api/v1/transaction/order/create", body, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     if (res.status === 200) {
    //       reset();
    //       clearChoosedEditData();
    //       setSelectedCorporateCode("");
    //       console.log("save successful");
    //       fetchOrderList();
    //     } else {
    //       console.log("save failed");
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="md:p-10 flex flex-col justify-center space-y-4">
      <Card className="p-4 w-full">
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
                    value={selectedCorporateCode}
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
            <div className="flex flex-col items-center space-y-8 py-8">
                <div className="">
                    <Input
                        {...register("exchangeSpread")}
                        label="Exchange Spread"
                        id="exchangeSpread"
                        disabled={isSubmitting}
                        type="number"
                        inputClassName="w-[20rem] md:w-[25rem]"
                    />
                    {errors.exchangeSpread && (
                        <p className="text-red-500 text-sm px-2">
                        {errors.exchangeSpread.message}
                        </p>
                    )}
                </div>
                <div className="w-full flex justify-center relative">
                    <hr className="w-full h-px border-slate-800 border-2 dark:bg-gray-700"></hr>
                    <div className="bg-slate-800 p-2 rounded-full absolute -bottom-5">
                        <CgArrowsExchangeAltV   style={{color:"white", fontSize:"1.5rem"}}/>
                    </div>
                </div>
                <div className="">
                    <Input
                        {...register("operationSpread")}
                        label="Operation Spread"
                        id="operationSpread"
                        disabled={isSubmitting}
                        type="number"
                        inputClassName="w-[20rem] md:w-[25rem]"
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
                    type="number"
                    inputClassName="w-[20rem] md:w-[25rem]"
                />
                {errors.exchangeRate &&(
                    <p className="text-red-500 text-sm px-2">
                    {errors.exchangeRate.message}
                    </p>
                )}
            </div>
            {/* <hr className="w-full h-px border-gray-200 border-2 dark:bg-gray-700"></hr> */}
            <div className="flex justify-center">
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
