import { FaKey } from "react-icons/fa";
import { TAssetKeyInfo } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { FaBookmark } from "react-icons/fa";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { useNavigate } from "react-router-dom";

const AddedIcoKeyInfo = () => {

  const fetchedData = useSelector((state: RootState) => state.assetData.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const icoCode = localStorage.getItem("icoCode")

  const keyInfoList =[
    { name: "Please Select Key" },
    { name: "Network", type: "selector" },
    { name: "Precision", type: "text" },
    { name: "Capital Structure", type: "text" },
    { name: "Classification", type: "text" },
    { name: "Product Type", type: "text" },
    { name: "Creation Time", type: "date" },
    { name: "Release Time", type: "date" },
    { name: "Completion Time", type: "date" },
  ];

  const keyInformationForSelector = [{ name: "BNB Smart Chain Mainnet" }];

  const [keyValuePairs, setKeyValuePairs] = useState([
    { key: "", type: "", value: "" },
  ]);

  useEffect(() => {
    if (fetchedData?.keyInformation) {
      const newKeyValuePairs = Object.keys(fetchedData.keyInformation).map(keyHeader => {
        switch (keyHeader) {
          case "network":
            return { key: "Network", type: "selector", value: fetchedData.keyInformation.network };
          case "precision":
            return { key: "Precision", type: "text", value: fetchedData.keyInformation.precision };
          case "capitalStructure":
            return { key: "Capital Structure", type: "text", value: fetchedData.keyInformation.capitalStructure };
          case "classiFication":
            return { key: "Classification", type: "text", value: fetchedData.keyInformation.classiFication };
          case "productType":
            return { key: "Product Type", type: "text", value: fetchedData.keyInformation.productType };
          case "creationTime":
            return { key: "Creation Time", type: "date", value: fetchedData.keyInformation.creationTime.split("T")[0] };
          case "releaseTime":
            return { key: "Release Time", type: "date", value: fetchedData.keyInformation.releaseTime.split("T")[0] };
          case "compleationTime":
            return { key: "Completion Time", type: "date", value: fetchedData.keyInformation.compleationTime.split("T")[0] };
          default:
            return null;
        }
      }).filter(item => item !== null);
  
      setKeyValuePairs(newKeyValuePairs as { key: string; type: string; value: string }[]);
    }
  }, [fetchedData]);

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

  const convertToTAssetKeyInfo = (data: { keyInformation: { key: string, type: string, value: string }[] }): TAssetKeyInfo => {
    const keyInfo: TAssetKeyInfo['keyInformation'] = {};

    data.keyInformation.forEach((item) => {
      switch (item.key) {
        case 'Network':
          keyInfo.network = item.value;
          break;
        case 'Precision':
          keyInfo.precision = item.value;
          break;
        case 'Capital Structure':
          keyInfo.capitalStructure = item.value;
          break;
        case 'Classification':
          keyInfo.classiFication = item.value;
          break;
        case 'Product Type':
          keyInfo.productType = item.value;
          break;
        case 'Creation Time':
          keyInfo.creationTime = item.value;
          break;
        case 'Release Time':
          keyInfo.releaseTime = item.value;
          break;
        case 'Completion Time':
          keyInfo.compleationTime = item.value;
          break;
        default:
          break;
      }
    });

    return { keyInformation: keyInfo };
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let body:any = convertToTAssetKeyInfo({ keyInformation: keyValuePairs });
    body = { 
      keyInformation: {
        icoCode, 
        ...body.keyInformation,
        creationTime: !isNaN(Date.parse(body?.keyInformation?.creationTime)) ? new Date(body?.keyInformation?.creationTime).toISOString() : "",
        releaseTime: !isNaN(Date.parse(body?.keyInformation?.releaseTime)) ? new Date(body?.keyInformation?.releaseTime).toISOString() : "",
        compleationTime: !isNaN(Date.parse(body?.keyInformation?.compleationTime)) ? new Date(body?.keyInformation?.compleationTime).toISOString() : "",
      }
    };
    dispatch(setTestCorporateData(body));
    console.log(body);

    if(icoCode){
      if(fetchedData?.keyInformation === null){
        try{
          const res = await axios.post('/api/v1/ico/keyInformation/create',body, {
            headers: {
              Authorization: `Bearer ${getCookies()}`,
            },
          })
          if(res.status === 200){
            console.log("create ico form3 success",res)
            navigate("/create-job/added-ico/4")
          }else{
            console.log("create ico form3 fail",res)
          }
        }catch(error){
          console.log("create ico form3 fail",error)
        }    
      }else{
        try{
          const res = await axios.post('/api/v1/ico/keyInformation/update',body, {
            headers: {
              Authorization: `Bearer ${getCookies()}`,
            },
          })
          if(res.status === 200){
            console.log("update ico form3 success",res)
            navigate("/create-job/added-ico/4")
          }else{
            console.log("update ico form3 fail",res)
          }
        }catch(error){
          console.log("update ico form3 fail",error)
        }    
      }
    }else{
      console.log("no ico id")
    }
  }

  return (
    <div className="flex justify-evenly p-5 md:p-10 md:pb-0">
      <div className="w-full md:w-3/4">
        <hr className="horizontal-line-top" />
        <form className="flex flex-col items-center space-y-4">
          <div className="ico-card space-y-8 rounded-b-[10px]">
            <div className="w-full flex items-center my-5 mb-0 space-x-2">
                <h1 className="text-lg md:text-xl font-bold">Key Information</h1>
                <span className="text-xl"><FaKey /></span>
            </div>
          </div>
          <div className="w-full flex flex-col space-y-4">
            {keyValuePairs.map((pair, index) => (
                <div data-testid={`keyInformation-${index}`} className="ico-dropdown-card items-center relative space-x-4" key={index}>
                    <div data-testid={`addKeyInformationBtn-${index}`} onClick={handleAddKey} className={`rounded-l-sm hover:bg-slate-750 absolute flex justify-center items-center h-28 w-10 left-0 md:-left-10 bg-slate-800 cursor-pointer ${index !== keyValuePairs.length - 1 ? 'hidden' : ''}`}>
                        <AiOutlinePlus  className="text-white md:text-3xl hover:text-4xl transition-all" />
                    </div>
                    <div data-testid={`markKeyInformationBtn-${index}`} className={`rounded-r-sm hover:bg-slate-750 absolute flex justify-center items-center h-28 w-10 right-0 bg-slate-800 ${index === keyValuePairs.length - 1 ? 'hidden' : ''}`}>
                        <FaBookmark  className="text-white md:text-xl transition-all" />
                    </div>
                    <select
                    data-testid={`dropDownKeyInformationBtn-${index}`}
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
                    ) : pair.type === "text" ? (
                    <Input data-testid={`inputTypeText-${index}`} placeholder="please specify here..." className="w-1/2 h-12 pl-4 bg-gray-200 px-2 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline" value={pair.value || ""} onChange={(event) => handleValueChange(index, event)} />
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

export default AddedIcoKeyInfo;