import { TbMoneybag } from "react-icons/tb";
import { TAssetIssuance } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


const AddedIssuance = () => {

    const {
        register,
        handleSubmit,
        formState: {isSubmitting},
        reset,
        setValue,
        } = useForm<TAssetIssuance>({
        // resolver: zodResolver(TAssetInfoSchema),
    });

    const fetchedData = useSelector((state: RootState) => state.assetData.data);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const icoCode = localStorage.getItem("icoCode")
    
    useEffect(() => {
        if(fetchedData?.issuanceTerms){
            const mapFetchedDataToIssuance = {
                issuanceTerms:{
                    investmentPeriod: fetchedData?.issuanceTerms.investmentPeriod,
                    dividendYield: fetchedData?.issuanceTerms.dividendYield,
                    grossMargin: fetchedData?.issuanceTerms.grossMargin,
                    equityMultiple: fetchedData?.issuanceTerms.equityMultiple,
                    profit: fetchedData?.issuanceTerms.profit,
                    leverage: fetchedData?.issuanceTerms.leverage,
                    investmentStructure: fetchedData?.issuanceTerms.investmentStructure,
                    distributionFrequency: fetchedData?.issuanceTerms.distributionFrequency
                }
            }
            reset(mapFetchedDataToIssuance);
            if(fetchedData?.issuanceTerms.investmentPeriod){
                setValue("issuanceTerms.investmentPeriod", fetchedData?.issuanceTerms.investmentPeriod.split(" ")[0]);
                setInvestmentPeriodUnit(fetchedData?.issuanceTerms.investmentPeriod.split(" ")[1]);
            }
            if(fetchedData?.issuanceTerms.dividendYield){
                setValue("issuanceTerms.dividendYield", fetchedData?.issuanceTerms.dividendYield.split(" ")[0]);
                setDividendYieldUnit(fetchedData?.issuanceTerms.dividendYield.split(" ")[1]);
            }
            if(fetchedData?.issuanceTerms.grossMargin){
                setValue("issuanceTerms.grossMargin", fetchedData?.issuanceTerms.grossMargin.split(" ")[0]);
                setGrossMarginUnit(fetchedData?.issuanceTerms.grossMargin.split(" ")[1]);
            }
            if(fetchedData?.issuanceTerms.equityMultiple){
                setValue("issuanceTerms.equityMultiple", fetchedData?.issuanceTerms.equityMultiple.split(" ")[0]);
                setEquityMultipleUnit(fetchedData?.issuanceTerms.equityMultiple.split(" ")[1]);
            }
            if(fetchedData?.issuanceTerms.profit){
                setValue("issuanceTerms.profit", fetchedData?.issuanceTerms.profit.split(" ")[0]);
                setProfitUnit(fetchedData?.issuanceTerms.profit.split(" ")[1]);
            }
            if(fetchedData?.issuanceTerms.leverage){
                setValue("issuanceTerms.leverage", fetchedData?.issuanceTerms.leverage.split(" ")[0]);
                setLeverageUnit(fetchedData?.issuanceTerms.leverage.split(" ")[1]);
            }
        }
    }, [fetchedData]);

  const [investmentPeriodUnit, setInvestmentPeriodUnit] = useState("Days");
  const [dividendYieldUnit, setDividendYieldUnit] = useState("%");
  const [grossMarginUnit, setGrossMarginUnit] = useState("%");
  const [equityMultipleUnit, setEquityMultipleUnit] = useState("%");
  const [profitUnit, setProfitUnit] = useState("%");
  const [leverageUnit, setLeverageUnit] = useState("%");

  const onSubmit = async (data: TAssetIssuance) => {

    const body = {
        issuanceTerms:{
            ...data.issuanceTerms,
            icoCode:icoCode,
            investmentPeriod: data.issuanceTerms.investmentPeriod 
            ? `${data.issuanceTerms.investmentPeriod} ${investmentPeriodUnit || "Days"}` 
            : undefined,
            dividendYield: data.issuanceTerms.dividendYield 
            ? `${data.issuanceTerms.dividendYield} ${dividendYieldUnit ? dividendYieldUnit : "%"}`
            : undefined,
            grossMargin: data.issuanceTerms.grossMargin 
            ? `${data.issuanceTerms.grossMargin} ${grossMarginUnit ? grossMarginUnit : "%"}`
            : undefined,
            equityMultiple: data.issuanceTerms.equityMultiple
            ? `${data.issuanceTerms.equityMultiple} ${equityMultipleUnit ? equityMultipleUnit : "%"}`
            : undefined,
            profit: data.issuanceTerms.profit 
            ? `${data.issuanceTerms.profit} ${profitUnit ? profitUnit : "%"}`
            : undefined,
            leverage: data.issuanceTerms.leverage
            ? `${data.issuanceTerms.leverage} ${leverageUnit ? leverageUnit : "%"}`
            : undefined,
        }
    }
    dispatch(setTestCorporateData(body));
    console.log(body);

    if(icoCode){
      if(fetchedData?.issuanceTerms === null){
        try{
          const res = await axios.post('/api/v1/ico/issuance/create',body, {
            headers: {
              Authorization: `Bearer ${getCookies()}`,
            },
          })
          if(res.status === 200){
            console.log("create ico form4 success",res)
            navigate("/create-job/change-ico/edit/5")
          }else{
            console.log("create ico form4 fail",res)
          }
        }catch(error){
          console.log("create ico form4 fail",error)
        }  
      }else{
        try{
          const res = await axios.post('/api/v1/ico/issuance/update',body, {
            headers: {
              Authorization: `Bearer ${getCookies()}`,
            },
          })
          if(res.status === 200){
            console.log("update ico form4 success",res)
            navigate("/create-job/change-ico/edit/5")
          }else{
            console.log("update ico form4 fail",res)
          }
        }catch(error){
          console.log("update ico form4 fail",error)
        }
      }
    }else{
      console.log("no ico id")
    }
  };

  return (
    <div className="flex justify-evenly p-5 md:p-10 md:pb-0">
      <div className="w-full md:w-3/4">
        <hr className="horizontal-line-top" />
        <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="ico-card space-y-8 rounded-b-[10px]">
            <div className="w-full flex items-center my-5 mb-0 space-x-2">
                <h1 className="text-lg md:text-xl font-bold">Issuance Terms</h1>
                <span className="text-xl"><TbMoneybag /></span>
            </div>
            <div className="w-full grid grid-cols-2 grid-rows-4 gap-7">
                <div className="flex items-center space-x-4">
                    <div className="w-4/5">
                        <Input  {...register("issuanceTerms.investmentPeriod")}
                        type="number"
                        step="0.01"
                        label="Investment Period*"
                        id="investmentPeriod" />
                    </div>
                    <div className="w-1/5">
                        <Input
                            className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            label="Unit"
                            value={investmentPeriodUnit}
                            onChange={(e) => setInvestmentPeriodUnit(e.target.value)}
                            data-testid="investmentPeriodUnit"
                        />
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center space-x-4">
                        <div className="w-4/5">
                            <Input  {...register("issuanceTerms.dividendYield")}
                            type="number"
                            step="0.01"
                            label="Dividend Yield*"
                            id="dividendYield" />
                        </div>
                        <div className="w-1/5">
                            <Input
                                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                label="Unit"
                                value={dividendYieldUnit}
                                onChange={(e) => setDividendYieldUnit(e.target.value)}
                                data-testid="dividendYieldUnit"
                            />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center space-x-4">
                        <div className="w-4/5">
                            <Input  {...register("issuanceTerms.grossMargin")}
                            type="number"
                            step="0.01"
                            label="Gross Margin*"
                            id="grossMargin" />
                        </div>
                        <div className="w-1/5">
                            <Input
                                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                label="Unit"
                                value={grossMarginUnit}
                                onChange={(e) => setGrossMarginUnit(e.target.value)}
                                data-testid="grossMarginUnit"
                            />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center space-x-4">
                        <div className="w-4/5">
                            <Input  {...register("issuanceTerms.equityMultiple")}
                            type="number"
                            step="0.01"
                            label="Equity Multiple*"
                            id="equityMultiple" />
                        </div>
                        <div className="w-1/5">
                            <Input
                                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                label="Unit"
                                value={equityMultipleUnit}
                                onChange={(e) => setEquityMultipleUnit(e.target.value)}
                                data-testid="equityMultipleUnit"
                            />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center space-x-4">
                        <div className="w-4/5">
                            <Input  {...register("issuanceTerms.profit")}
                            type="number"
                            step="0.01"
                            label="Profit*"
                            id="profit" />
                        </div>
                        <div className="w-1/5">
                            <Input
                                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                label="Unit"
                                value={profitUnit}
                                onChange={(e) => setProfitUnit(e.target.value)}
                                data-testid="profitUnit"
                            />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center space-x-4">
                        <div className="w-4/5">
                            <Input  {...register("issuanceTerms.leverage")}
                            type="number"
                            step="0.01"
                            label="Leverage*"
                            id="leverage" />
                        </div>
                        <div className="w-1/5">
                            <Input
                                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                label="Unit"
                                value={leverageUnit}
                                onChange={(e) => setLeverageUnit(e.target.value)}
                                data-testid="leverageUnit"
                            />
                        </div>
                    </div>
                </div>
                <div className="">
                    <Input  {...register("issuanceTerms.investmentStructure")} 
                    label="Investment Structure*" id="investmentStructure" />
                </div>
                <div className="">
                    <Input  {...register("issuanceTerms.distributionFrequency")} 
                    label="Distribution Frequency*" id="distributionFrequency" />
                </div>
           </div>
          </div>
          <div className="absolute right-5 bottom-8">
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Next Form"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddedIssuance;