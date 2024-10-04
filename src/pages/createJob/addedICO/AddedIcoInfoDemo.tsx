import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TAssetInfoSchema } from "./schemas";
import { TAssetData, TAssetInfo } from "./types";
import "./addedico.css"
import { Input } from "@/components/Input";
import { FaCircle, FaUpload } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { RiProfileLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";
import { useNavigate } from "react-router-dom";

const AddedIcoInfoDemo = () => {

    const fetchedData = useSelector((state: RootState) => state.assetData.data);

    const icoCode = localStorage?.getItem("icoCode") || "";

    const mapFetchedToInfo = (fetchedData: TAssetData) => {
        return {
            asset: {
                ...fetchedData.asset
            },
            info:{
                ...fetchedData.info
            }
        }
    }

    useEffect(()=>{
        if(fetchedData){
             if (fetchedData.asset.image) {
                //handle auto fill image
            }
            reset(mapFetchedToInfo(fetchedData))
            if(fetchedData.info.totalAmountRaised){
                const value = fetchedData.info.totalAmountRaised.split(" ")[0];
                const unit = fetchedData.info.totalAmountRaised.split(" ")[1];
                setValue("info.totalAmountRaised",value);
                setTotalAmountRaisedUnit(unit);
            }
            if(fetchedData.info.totalIssuance){
                const value = fetchedData.info.totalIssuance.split(" ")[0];
                const unit = fetchedData.info.totalIssuance.split(" ")[1];
                setValue("info.totalIssuance",value);
                setTotalIssuanceUnit(unit);
            }
            if(fetchedData.info.minimumInvestmentAmount){
                const value = fetchedData.info.minimumInvestmentAmount.split(" ")[0];
                const unit = fetchedData.info.minimumInvestmentAmount.split(" ")[1];
                setValue("info.minimumInvestmentAmount",value);
                setMinimumInvestmentAmountUnit(unit);
            }
            if(fetchedData.info.minimumInvestmentQuantity){
                const value = fetchedData.info.minimumInvestmentQuantity.split(" ")[0];
                const unit = fetchedData.info.minimumInvestmentQuantity.split(" ")[1];
                setValue("info.minimumInvestmentQuantity",value);
                setMinimumInvestmentQuantityUnit(unit);
            }
            if(fetchedData.info.issueUnitPrice){
                const value = fetchedData.info.issueUnitPrice.split(" ")[0];
                const unit = fetchedData.info.issueUnitPrice.split(" ")[1];
                setValue("info.issueUnitPrice",value);
                setIssueUnitPriceUnit(unit);
            }
        }
    },[fetchedData])

    const {
        register,
        handleSubmit,
        formState: {isSubmitting},
        reset,
        setValue,
      } = useForm<TAssetInfo>({
        resolver: zodResolver(TAssetInfoSchema),
      });
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [totalAmountRaisedUnit,setTotalAmountRaisedUnit] = useState("Baht");
      const [totalIssuanceUnit,setTotalIssuanceUnit] = useState("DA");
      const [minimumInvestmentAmountUnit,setMinimumInvestmentAmountUnit] = useState("Baht");
      const [minimumInvestmentQuantityUnit,setMinimumInvestmentQuantityUnit] = useState("DA");
      const [issueUnitPriceUnit,setIssueUnitPriceUnit] = useState("Baht");
      const [file, setFile] = useState<File | null>(null);
      const fileInputRef = useRef<HTMLInputElement>(null);
      const handleFileChange  = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setFile(file);
        }
      };

      const handleDivClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };

      function formDataToString(formData: FormData): string {
        const entries: Array<[string, string]> = [];
        
        formData.forEach((value, key) => {
          if (value instanceof File) {
            entries.push([key, `File: ${value.name}, size: ${value.size}`]);
          } else {
            entries.push([key, value.toString()]);
          }
        });
        
        return entries.map(entry => `${entry[0]}=${entry[1]}`).join('&');
      }

      const onSubmit = async (data: TAssetInfo) => {
        if ((file && (file.size / (1024 * 1024) < 2.0)) || !file) {
            const formData = new FormData();
            if (file) {
              const formData = new FormData();
              formData.append("file", file);
            }
            const body = { 
                ...data,
                asset: {
                    ...data.asset,
                    icoCode: icoCode,
                    image:file ? formData : undefined,
                    logo:"fixed image",
                    title:"Elite Consulting",
                },
                info:{
                    ...data.info,
                    icoCode: icoCode,
                    totalIssuance:`${data.info.totalIssuance} ${totalIssuanceUnit ? totalIssuanceUnit : "Baht"}`,
                    totalAmountRaised:`${data.info.totalAmountRaised} ${totalAmountRaisedUnit ? totalAmountRaisedUnit : "Baht"}`,
                    minimumInvestmentAmount:`${data.info.minimumInvestmentAmount} ${minimumInvestmentAmountUnit ? minimumInvestmentAmountUnit : "Baht"}`,
                    minimumInvestmentQuantity:`${data.info.minimumInvestmentQuantity} ${minimumInvestmentQuantityUnit ? minimumInvestmentQuantityUnit : "Baht"}`,
                    issueUnitPrice:`${data.info.issueUnitPrice} ${issueUnitPriceUnit ? issueUnitPriceUnit : "Baht"}`,
                }
            }
            console.log("form1 ico body :",body)
            
            if (file !== null) {
                dispatch(setTestCorporateData({
                  ...body,
                  asset: {
                    ...body.asset,
                    image: formDataToString(formData),
                  }
                }));
              } else {
                dispatch(setTestCorporateData(body));
              }

            if(!icoCode){
                try{
                    const res = await axios.post("/api/v1/ico/asset/create", body, {
                        headers: {
                            Authorization: `Bearer ${getCookies()}`,
                        },
                    })
                    if(res.status === 200){
                        console.log("create ico form1 success",res)
                        if(res.data){
                            localStorage.setItem("icoCode", res.data.icoCode.toString())
                            navigate("/create-job/change-ico/edit/2");
    
                        }else{
                            console.log("create success but didn't get icoCode back!")
                        }
                    }else{
                        console.log("create ico form1 fail",res)
                    }
                }catch(error){
                    console.log("create ico form1 failed", error)
                }
            }else{
                try{
                    const res = await axios.post("/api/v1/ico/asset/update", body, {
                        headers: {
                            Authorization: `Bearer ${getCookies()}`,
                        },
                    })
                    if(res.status === 200){
                        console.log("update ico form1 success",res)
                            navigate("/create-job/change-ico/edit/2");
                    }else{
                        console.log("update ico form1 fail",res)
                    }
                }catch(error){
                    console.log("update ico form1 failed", error)
                }
            }
        }else{
            console.log("image size is too big")
        }
     };

    return (
        <div className="overflow-hidden w-full flex flex-col justify-center md:flex-row p-5 md:p-0 md:pb-0 space-y-8 md:space-y-0">
            <form className="flex flex-col items-center pt-20 pb-16 space-y-8 md:space-y-16" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col md:flex-row md:w-4/5 justify-center">
                <div className="w-full p-8 my-4 md:px-12 md:w-full md:pl-20 mr-auto rounded-2xl rounded-r-none shadow-2xl bg-white">
                    <div className="flex">
                    <h1 className="font-bold uppercase text-2xl md:text-5xl">Investment<br />Information</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                        <div className="min-h-12 ">
                            <div onClick={handleDivClick} className="text-sm flex items-center cursor-pointer justify-between px-5 w-full text-white font-bold bg-slate-800 h-full max-h-12 rounded-lg">
                            <span>Upload profile</span>
                            <div className="text-lg font-white"><FaUpload /></div>
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                data-testid="uploadPicture"
                            />
                            </div>
                            {file && (
                            <div className="text-xs mt-2">
                                <span>File uploaded successfully</span>
                            </div>
                            )}
                        </div>
                        <Input  {...register("asset.issueBy")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Issue By*" />
                        <Input  {...register("asset.name")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Company Name*" />
                        <Input  {...register("asset.description")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Description*" />
                        <Input  {...register("asset.category")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Product Category*" />
                        <Input  {...register("asset.return")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Expect Return*" />
                        <Input  {...register("asset.region")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Region*" />
                        <Input  {...register("asset.minimum")} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" placeholder="Minimum Subscription Limit*" />
                    </div>
                </div>
                <div className="max-h-[40rem] overflow-hidden flex flex-col justify-between w-full min-w-40 md:w-1/2 px-8 py-12 bg-slate-800 rounded-2xl text-white">
                    <div className="flex flex-col space-y-4">
                        <h1 className="font-bold uppercase text-2xl md:text-4xl my-4">Investor Info</h1>
                        <p className="text-gray-400">• Required Fields: "Fields marked with an asterisk (*) are mandatory."</p>
                        <p className="text-gray-400">• Save and Review: "After filling out the form, review the information for any errors before submitting."</p>
                    </div>
                    <div className="flex space-x-2">
                        <FaCircle className="text-white"/>
                        <FaCircle className="text-white"/>
                        <FaCircle className="text-white"/>
                    </div>
                </div>
        </div>
        <div className="w-full flex-col md:w-4/5 justify-center">
            <hr className="horizontal-line-top w-full" />
            <div className="ico-card space-y-8 rounded-b-[10px]">
                <div className="w-full flex items-center my-5 mb-0 space-x-2">
                    <h1 className="text-lg md:text-xl font-bold">Investment Terms</h1>
                    <span className="text-xl"><RiProfileLine /></span>
                </div>    
                <div className="w-full flex space-x-8">
                    <div className="w-1/2">
                        <Input
                        {...register("info.contractInfomation")}
                        label="Contract Infomation"
                        id="contractInfomation"
                        disabled={isSubmitting}
                        />
                    </div>
                <div className="w-1/2 flex space-x-4">
                    <div className="w-4/5">
                        <Input
                        {...register("info.totalAmountRaised")}
                        label="Total Amount Raised"
                        id="totalAmountRaised"
                        disabled={isSubmitting}
                        type="number"
                        step="0.01"
                        />
                    </div>
                    <div className="w-1/5">
                        <Input
                        label="Unit"
                        value={totalAmountRaisedUnit}
                        onChange={(e) => setTotalAmountRaisedUnit(e.target.value)}
                        data-testid="totalAmountRaisedUnit"
                        />
                    </div>
                </div>
                </div>
                <div className="w-full flex space-x-8">
                    <div className="w-1/2 flex space-x-4">
                        <div className="w-4/5">
                            <Input
                            {...register("info.totalIssuance")}
                            label="Total Issuance"
                            id="totalIssuance"
                            disabled={isSubmitting}
                            type="number"
                            step="0.01"
                            />
                        </div>
                        <div className="w-1/5">
                            <Input
                            label="Unit"
                            value={totalIssuanceUnit}
                            onChange={(e) => setTotalIssuanceUnit(e.target.value)}
                            data-testid="totalIssuanceUnit"
                            />
                        </div>
                    </div>
                    <div className="w-1/2 flex space-x-4">
                            <div className="w-4/5">
                                <Input
                                    {...register("info.minimumInvestmentAmount")}
                                    label="Minimum Investment Amount"
                                    id="minimumInvestmentAmount"
                                    disabled={isSubmitting}
                                    type="number"
                                    step="0.01"
                                />
                            </div>
                        <div className="w-1/5">
                            <Input
                            label="Unit"
                            value={minimumInvestmentAmountUnit}
                            onChange={(e) => setMinimumInvestmentAmountUnit(e.target.value)}
                            data-testid="minimumInvestmentAmountUnit"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex space-x-8">
                    <div className="w-1/2 flex space-x-4">
                        <div className="w-4/5">
                            <Input
                            {...register("info.minimumInvestmentQuantity")}
                            label="Minimum Investment Quantity"
                            id="minimumInvestmentQuantity"
                            disabled={isSubmitting}
                            type="number"
                            step="0.01"
                            />
                        </div>
                        <div className="w-1/5">
                            <Input
                            label="Unit"
                            value={minimumInvestmentQuantityUnit}
                            onChange={(e) => setMinimumInvestmentQuantityUnit(e.target.value)}
                            data-testid="minimumInvestmentQuantityUnit"
                            />
                        </div>
                    </div>
                        <div className="w-1/2 flex space-x-4">
                            <div className="w-4/5">
                                <Input
                                    {...register("info.issueUnitPrice")}
                                    label="Issue Unit Price"
                                    id="issueUnitPrice"
                                    disabled={isSubmitting}
                                    type="number"
                                    step="0.01"
                                    />
                            </div>
                            <div className="w-1/5">
                                <Input
                                label="Unit"
                                value={issueUnitPriceUnit}
                                onChange={(e) => setIssueUnitPriceUnit(e.target.value)}
                                data-testid="issueUnitPriceUnit"
                                />
                            </div>
                        </div>
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
    )
    }

export default AddedIcoInfoDemo
