import { FaKey } from "react-icons/fa";
import { TAssetKeyInfo } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

const AddedIcoKeyInfo = () => {

const {
    register,
    handleSubmit,
    formState: {isSubmitting},
    reset,
    } = useForm<TAssetKeyInfo>({
    // resolver: zodResolver(TAssetInfoSchema),
});
  const fetchedData = useSelector((state: RootState) => state.assetData.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const icoCode = localStorage.getItem("icoCode")

  const keyInformationForSelector = [{ name: "BNB Smart Chain Mainnet" }];

  useEffect(() => {
    console.log(fetchedData)
    if (fetchedData?.keyInformation) {
        const mapFetchedDataToKeyInfo = {
            keyInformation:{
                network: fetchedData?.keyInformation.network,
                precision: fetchedData?.keyInformation.precision,
                capitalStructure: fetchedData?.keyInformation.capitalStructure,
                classiFication: fetchedData?.keyInformation.classiFication,
                productType: fetchedData?.keyInformation.productType,
                creationTime: fetchedData?.keyInformation.creationTime.split("T")[0],
                releaseTime: fetchedData?.keyInformation.releaseTime.split("T")[0],
                compleationTime: fetchedData?.keyInformation.compleationTime.split("T")[0],
            }
        }
        reset(mapFetchedDataToKeyInfo);
    }
  }, [fetchedData]);

  const onSubmit = async (data:TAssetKeyInfo) => {
    const body = {
        keyInformation:{
            ...data.keyInformation,
            icoCode: icoCode,
            creationTime: data?.keyInformation?.creationTime
            ? new Date(data.keyInformation.creationTime)
            : undefined,
            releaseTime: data?.keyInformation?.releaseTime
            ? new Date(data.keyInformation.releaseTime)
            : undefined,
            compleationTime: data?.keyInformation?.compleationTime
            ? new Date(data.keyInformation.compleationTime)
            : undefined,
        }
    };
    dispatch(setTestCorporateData({keyInformation:{
        ...data.keyInformation,
        icoCode: icoCode,
        creationTime: data?.keyInformation?.creationTime
        ? new Date(data.keyInformation.creationTime).toISOString()
        : undefined,
        releaseTime: data?.keyInformation?.releaseTime
        ? new Date(data.keyInformation.releaseTime).toISOString()
        : undefined,
        compleationTime: data?.keyInformation?.compleationTime
        ? new Date(data.keyInformation.compleationTime).toISOString()
        : undefined,
    }}));
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
        <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="ico-card space-y-8 rounded-b-[10px]">
            <div className="w-full flex items-center my-5 mb-0 space-x-2">
                <h1 className="text-lg md:text-xl font-bold">Key Information</h1>
                <span className="text-xl"><FaKey /></span>
            </div>
            <div className="w-full grid grid-cols-2 grid-rows-4 gap-8">
                <div className="">
                    <Input  {...register("keyInformation.precision")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Precision*" />
                </div>
                <div className="">
                    <Input  {...register("keyInformation.capitalStructure")} 
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Capital Structure*" />
                </div>
                <div className="">
                    <Input  {...register("keyInformation.productType")} 
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Product Type*" />
                </div>
                <div className="">
                    <Input  {...register("keyInformation.classiFication")} 
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Classification*" />
                </div>
                <div className="">
                    <select
                        {...register("keyInformation.network")}
                        data-testid="networkTest"
                        className="w-full h-full bg-[#002f18] text-white px-2 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                    <option value="">Please Select Network Information</option>
                        {keyInformationForSelector.map((status) => (
                    <option key={status.name} data-testid={status.name} value={status.name}>
                        {status.name}
                    </option>))}
                    </select>
                </div>
                <div className="">
                    <Input  {...register("keyInformation.creationTime")} 
                    label="Creation Time"
                    data-testid="Creation Time"
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="date" placeholder="Creation Time*" />
                </div>
                <div className="">
                    <Input  {...register("keyInformation.releaseTime")} 
                    label="Release Time"
                    data-testid="Release Time"
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="date" placeholder="Release Time*" />
                </div>
                <div className="">
                    <Input  {...register("keyInformation.compleationTime")} 
                    label="Compleation Time"
                    data-testid="Compleation Time"
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="date" placeholder="Compleation Time*" />
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

export default AddedIcoKeyInfo;