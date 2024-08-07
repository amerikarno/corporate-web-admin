import { Card } from "@/components/ui/card";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { TOrderTrade } from "./constant/type";
import { orderTradeSchema } from "./constant/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
const mockedCorporateCodes = [
  { name: "60000001" },
  { name: "60000002" },
  { name: "60000003" },
  { name: "70000001" },
  { name: "70000002" },
  { name: "70000003" },
  { name: "80000001" },
  { name: "81000002" },
  { name: "80100003" },
  { name: "80010003" },
  // Add more mocked corporate codes as needed
];
export default function OrderTrade() {
  const [buySell, setBuySell] = useState<string>("Buy");
  const [selectedCorporateCode, setSelectedCorporateCode] =
    useState<string>("");
  const handleBuySell = (value: string) => {
    setBuySell(value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm<TOrderTrade>({
    resolver: zodResolver(orderTradeSchema),
    //values: individualsShareholder,
  });

  const handleCorporateCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedCorporateCode(event.target.value);
  };

  const onSubmit = async (data: TOrderTrade) => {
    let body: TOrderTrade = {
      ...data,
      buySell: buySell,
    };
    // try {
    //   const response = await fetch("/api/order-trade", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (response.ok) {
    //     console.log("Form submitted successfully");
    //   } else {
    //     console.error("Failed to submit form");
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
    console.log(body);
  };

  return (
    <div className="p-10 flex justify-center">
      <Card className="p-4 w-full">
        <h1 className="font-bold text-xl py-4">Orders / Trades</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row space-x-4">
            <div className="w-1/2">
              <Input
                {...register("corporateCode")}
                label="Corporate Code"
                id="corporateCode"
                disabled={isSubmitting}
                value={selectedCorporateCode}
                onChange={handleCorporateCodeChange}
                list="corporateCodes"
              />
              {errors.corporateCode && !selectedCorporateCode && (
                <p className="text-red-500 text-sm px-2">
                  {errors.corporateCode.message}
                </p>
              )}
              <datalist id="corporateCodes">
                {mockedCorporateCodes.map((code, index) => (
                  <option key={index} value={code.name}>
                    {code.name}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="w-1/2">
              <Input
                {...register("symbol")}
                label="Target Name"
                id="symbol"
                disabled={isSubmitting}
              />
              {errors.symbol && (
                <p className="text-red-500 text-sm px-2">
                  {errors.symbol.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Card className="space-y-4 p-10 w-[60%]">
              <div className="flex flex-row justify-center ">
                <button
                  className={`w-1/4 text-white px-4 py-2 rounded-l transition-colors duration-300 ${
                    buySell === "Buy" ? "bg-slate-800" : "bg-slate-500"
                  }`}
                  onClick={() => handleBuySell("Buy")}
                >
                  Buy
                </button>
                <button
                  className={`w-1/4 text-white px-4 py-2 rounded-r transition-colors duration-300 ${
                    buySell === "Sell" ? "bg-slate-800" : "bg-slate-500"
                  }`}
                  onClick={() => handleBuySell("Sell")}
                >
                  Sell
                </button>
              </div>
              <div className="flex flex-col space-y-4 items-center">
                <div className="w-1/2">
                  <Input
                    {...register("tradeAmount")}
                    label="Trade Amount"
                    id="tradeAmount"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    {...register("tradeValue")}
                    label="Trade Value"
                    id="tradeValue"
                    disabled={isSubmitting}
                  />
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
