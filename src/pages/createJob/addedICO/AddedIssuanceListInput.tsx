import { TbMoneybag } from "react-icons/tb";
import { TAssetIssuance } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { FaBookmark} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { useNavigate } from "react-router-dom";


const AddedIssuance = () => {


    const fetchedData = useSelector((state: RootState) => state.assetData.data);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const registerId = localStorage.getItem("registerId")
    
    useEffect(() => {
        if (fetchedData?.issuanceTerms) {
            const newKeyValuePairs = Object.keys(fetchedData.issuanceTerms).map(keyHeader => {
            switch (keyHeader) {
              case "investmentPeriod":
                return { key: "Investment Period", type: "text", value: fetchedData.issuanceTerms!.investmentPeriod.split(" ")[0] };
              case "dividendYield":
                return { key: "Dividend Yield", type: "text", value: fetchedData.issuanceTerms!.dividendYield.split(" ")[0] };
              case "grossMargin":
                return { key: "Gross Margin", type: "text", value: fetchedData.issuanceTerms!.grossMargin.split(" ")[0] };
              case "equityMultiple":
                return { key: "Equity Multiple", type: "text", value: fetchedData.issuanceTerms!.equityMultiple.split(" ")[0] };
              case "profit":
                return { key: "Profit", type: "text", value: fetchedData.issuanceTerms!.profit.split(" ")[0] };
              case "leverage":
                return { key: "Leverage", type: "text", value: fetchedData.issuanceTerms!.leverage.split(" ")[0]};
              case "investmentStructure":
                return { key: "Investment Structure", type: "text", value: fetchedData.issuanceTerms!.investmentStructure};
              case "distributionFrequency":
                return { key: "Distribution Frequency", type: "text", value: fetchedData.issuanceTerms!.distributionFrequency};
              default:
                return null;
            }
          }).filter(item => item !== null);
  
          setKeyValuePairs(newKeyValuePairs as { key: string; type: string; value: string }[]);
          
          if(fetchedData.issuanceTerms.investmentPeriod){
            const unit = fetchedData.issuanceTerms.investmentPeriod.split(" ")[1];
            setInvestmentPeriodUnit(unit);
          }
          if(fetchedData.issuanceTerms.dividendYield){
            const unit = fetchedData.issuanceTerms.dividendYield.split(" ")[1];
            setDividendYieldUnit(unit);
          }
          if(fetchedData.issuanceTerms.grossMargin){
            const unit = fetchedData.issuanceTerms.grossMargin.split(" ")[1];
            setGrossMarginUnit(unit);
          }
          if(fetchedData.issuanceTerms.equityMultiple){
            const unit = fetchedData.issuanceTerms.equityMultiple.split(" ")[1];
            setEquityMultipleUnit(unit);
          }
          if(fetchedData.issuanceTerms.profit){
            const unit = fetchedData.issuanceTerms.profit.split(" ")[1];
            setProfitUnit(unit);
          }
          if(fetchedData.issuanceTerms.leverage){
            const unit = fetchedData.issuanceTerms.leverage.split(" ")[1];
            setLeverageUnit(unit);
          }
        }
    }, [fetchedData]);

  const keyInfoList =[
    { name: "Please Select Key" },
    { name: "Investment Period", type: "text" },
    { name: "Dividend Yield", type: "text" },
    { name: "Gross Margin", type: "text" },
    { name: "Equity Multiple", type: "text" },
    { name: "Profit", type: "text" },
    { name: "Leverage", type: "text" },
    { name: "Investment Structure", type: "text" },
    { name: "Distribution Frequency", type: "text" },
  ];

  const keyInformationForSelector = [{ name: "BNB Smart Chain Mainnet" }];

  const [keyValuePairs, setKeyValuePairs] = useState([
    { key: "", type: "", value: "" },
  ]);

  const [investmentPeriodUnit, setInvestmentPeriodUnit] = useState("Days");
  const [dividendYieldUnit, setDividendYieldUnit] = useState("%");
  const [grossMarginUnit, setGrossMarginUnit] = useState("%");
  const [equityMultipleUnit, setEquityMultipleUnit] = useState("%");
  const [profitUnit, setProfitUnit] = useState("%");
  const [leverageUnit, setLeverageUnit] = useState("%");

  const handleKeyChange = (index: number, event: any) => {
    const newKeyValuePairs = [...keyValuePairs];
    newKeyValuePairs[index].key = event.target.value;
    const selectedKey = keyInfoList.find((key) => key.name === event.target.value);
    if (selectedKey) {
      newKeyValuePairs[index].type = selectedKey.type!;
      setKeyValuePairs(newKeyValuePairs);
    }
  };

  const handleValueChange = (index: number, event: any) => {
    const newKeyValuePairs = [...keyValuePairs];
    newKeyValuePairs[index].value = event.target.value;
    setKeyValuePairs(newKeyValuePairs);
  };

  const handleAddKey = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", type: "", value: "" }]);
  };

  const convertToTAssetKeyInfo = (data: { issuanceTerms: { key: string, type: string, value: string }[] }): TAssetIssuance => {
    const IssuanceKey: TAssetIssuance['issuanceTerms'] = {};

    data.issuanceTerms.forEach((item) => {
      switch (item.key) {
        case 'Investment Period':
            IssuanceKey.investmentPeriod = item.value;
          break;
        case 'Dividend Yield':
            IssuanceKey.dividendYield = item.value;
          break;
        case 'Gross Margin':
            IssuanceKey.grossMargin = item.value;
          break;
        case 'Equity Multiple':
            IssuanceKey.equityMultiple = item.value;
          break;
        case 'Profit':
            IssuanceKey.profit = item.value;
          break;
        case 'Leverage':
            IssuanceKey.leverage = item.value;
          break;
        case 'Investment Structure':
            IssuanceKey.investmentStructure = item.value;
          break;
        case 'Distribution Frequency':
            IssuanceKey.distributionFrequency = item.value;
          break;
        default:
          break;
      }
    });

    return { issuanceTerms: IssuanceKey };
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let body:any = convertToTAssetKeyInfo({ issuanceTerms: keyValuePairs });
    body = {
      issuanceTerms : {
        ...body.issuanceTerms,
        registerId:registerId,
        investmentPeriod:`${body.issuanceTerms.investmentPeriod} ${investmentPeriodUnit}`,
        dividendYield:`${body.issuanceTerms.dividendYield} ${dividendYieldUnit}`,
        grossMargin:`${body.issuanceTerms.grossMargin} ${grossMarginUnit}`,
        equityMultiple:`${body.issuanceTerms.equityMultiple} ${equityMultipleUnit}`,
        profit:`${body.issuanceTerms.profit} ${profitUnit}`,
        leverage:`${body.issuanceTerms.leverage} ${leverageUnit}`,
      }
    }
    dispatch(setTestCorporateData(body));
    console.log(body);

    if(registerId){
      if(fetchedData?.issuanceTerms === null){
        try{
          const res = await axios.post('/api/v1/ico/issuance/create',body, {
            headers: {
              Authorization: `Bearer ${getCookies()}`,
            },
          })
          if(res.status === 200){
            console.log("create ico form4 success",res)
            navigate("/create-job/added-ico/5")
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
            navigate("/create-job/added-ico/5")
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
        <form className="flex flex-col items-center space-y-4">
          <div className="ico-card space-y-8 rounded-b-[10px]">
            <div className="w-full flex items-center my-5 mb-0 space-x-2">
                <h1 className="text-lg md:text-xl font-bold">Issuance Terms</h1>
                <span className="text-xl"><TbMoneybag /></span>
            </div>
          </div>
          <div className="w-full flex flex-col space-y-4">
            {keyValuePairs.map((pair, index) => (
                <div data-testid={`issuanceTerms-${index}`} className="ico-dropdown-card items-center relative space-x-4" key={index}>
                    <div data-testid={`addIssuanceTermsBtn-${index}`} onClick={handleAddKey} className={`rounded-l-sm hover:bg-slate-750 absolute flex justify-center items-center h-28 w-10 left-0 md:-left-10 bg-slate-800 cursor-pointer ${index !== keyValuePairs.length - 1 ? 'hidden' : ''}`}>
                        <AiOutlinePlus  className="text-white md:text-3xl hover:text-4xl transition-all" />
                    </div>
                    <div data-testid={`markIssuanceTermsBtn-${index}`} className={`rounded-r-sm hover:bg-slate-750 absolute flex justify-center items-center h-28 w-10 right-0 bg-slate-800 ${index === keyValuePairs.length - 1 ? 'hidden' : ''}`}>
                        <FaBookmark  className="text-white md:text-xl transition-all" />
                    </div>
                    <select
                    data-testid={`dropDownIssuanceTermsBtn-${index}`}
                    className="h-12 cursor-pointer bg-slate-800 focus:ring-gray-200 hover:bg-slate-900 border border-slate-800 text-white text-base rounded-lg block w-1/2 py-2.5 px-2 focus:outline-none"
                    value={pair.key}
                    onChange={(event) => handleKeyChange(index, event)}
                    >
                    {keyInfoList.map((key) => (
                        <option data-testid={`${key.name}-${index}`} key={key.name} value={key.name}>
                        {key.name}
                        </option>
                    ))}
                    </select>
                    {pair.type === "selector" ? (
                    <div className="w-full">
                      <select
                        data-testid={`inputTypeSelector-${index}`}
                        className="w-1/2 h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                        value={pair.value}
                        onChange={(event) => handleValueChange(index, event)}
                        >
                        <option value="">Please Select Information</option>
                        {keyInformationForSelector.map((status) => (
                        <option data-testid={`${status.name}-${index}`} key={status.name} value={status.name}>
                            {status.name}
                        </option>
                        ))}
                      </select>
                    </div>
                    ) : pair.type === "text" ? 
                    (
                      pair.key === "Investment Period" ? (
                        <div className="w-full  space-x-4 flex">
                          <div className="w-1/2">
                            <Input
                              data-testid={`inputTypeText-${index}`}
                              placeholder="please specify here..."
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              value={pair.value || ""}
                              onChange={(event) => handleValueChange(index, event)}
                            />
                          </div>
                          <div className="w-1/5">
                            <Input
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              placeholder="Unit"
                              value={investmentPeriodUnit}
                              onChange={(e)=>setInvestmentPeriodUnit(e.target.value)}
                            />
                          </div>
                        </div>
                      ) : pair.key === "Dividend Yield" ? (
                        <div className="w-full  space-x-4 flex">
                          <div className="w-1/2">
                            <Input
                              data-testid={`inputTypeText-${index}`}
                              placeholder="please specify here..."
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              value={pair.value || ""}
                              onChange={(event) => handleValueChange(index, event)}
                            />
                          </div>
                          <div className="w-1/5">
                            <Input
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              placeholder="Unit"
                              value={dividendYieldUnit}
                              onChange={(e)=>setDividendYieldUnit(e.target.value)}
                            />
                          </div>
                        </div>
                      ) : pair.key === "Gross Margin" ? (
                        <div className="w-full  space-x-4 flex">
                          <div className="w-1/2">
                            <Input
                              data-testid={`inputTypeText-${index}`}
                              placeholder="please specify here..."
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              value={pair.value || ""}
                              onChange={(event) => handleValueChange(index, event)}
                            />
                          </div>
                          <div className="w-1/5">
                            <Input
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              placeholder="Unit"
                              value={grossMarginUnit}
                              onChange={(e)=>setGrossMarginUnit(e.target.value)}
                            />
                          </div>
                        </div>
                      ) : pair.key === "Equity Multiple" ? (
                        <div className="w-full  space-x-4 flex">
                          <div className="w-1/2">
                            <Input
                              data-testid={`inputTypeText-${index}`}
                              placeholder="please specify here..."
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              value={pair.value || ""}
                              onChange={(event) => handleValueChange(index, event)}
                            />
                          </div>
                          <div className="w-1/5">
                            <Input
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              placeholder="Unit"
                              value={equityMultipleUnit}
                              onChange={(e)=>setEquityMultipleUnit(e.target.value)}
                            />
                          </div>
                        </div>
                      ) : pair.key === "Profit" ? (
                        <div className="w-full  space-x-4 flex">
                          <div className="w-1/2">
                            <Input
                              data-testid={`inputTypeText-${index}`}
                              placeholder="please specify here..."
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              value={pair.value || ""}
                              onChange={(event) => handleValueChange(index, event)}
                            />
                          </div>
                          <div className="w-1/5">
                            <Input
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              placeholder="Unit"
                              value={profitUnit}
                              onChange={(e)=>setProfitUnit(e.target.value)}
                            />
                          </div>
                        </div>
                      ) : pair.key === "Leverage" ? (
                        <div className="w-full  space-x-4 flex">
                          <div className="w-1/2">
                            <Input
                              data-testid={`inputTypeText-${index}`}
                              placeholder="please specify here..."
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              value={pair.value || ""}
                              onChange={(event) => handleValueChange(index, event)}
                            />
                          </div>
                          <div className="w-1/5">
                            <Input
                              className="w-full h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                              placeholder="Unit"
                              value={leverageUnit}
                              onChange={(e)=>setLeverageUnit(e.target.value)}
                            />
                          </div>
                        </div>
                      ) : <Input
                      data-testid={`inputTypeText-${index}`}
                      placeholder="please specify here..."
                      className="w-1/2 h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
                      value={pair.value || ""}
                      onChange={(event) => handleValueChange(index, event)}
                    />
                    ) : pair.type === "date" ? (
                    <Input data-testid={`inputTypeDate-${index}`} type="date" className="w-1/2 h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline" value={pair.value || ""} onChange={(event) => handleValueChange(index, event)} />
                    ) : (
                    <Input value="" className="hidden" disabled={true} />
                    )}
                </div>
                ))}
          </div>
          <div className="absolute right-5 bottom-8">
            <Button onClick={handleSubmit}>Next Form</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddedIssuance;