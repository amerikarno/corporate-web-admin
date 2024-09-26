import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TAssetInfoSchema } from "./schemas";
import { TAssetData, TAssetInfo } from "./types";
import "./addedico.css"
import { Input } from "@/components/Input";
import { FaUpload } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { RiProfileLine } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const AddedIcoInfo = () => {

    const fetchedData = useSelector((state: RootState) => state.assetData.data);

    const mapFetchedToInfo = (fetchedData: TAssetData) => {
        return {
            asset: {
                ...fetchedData.asset
            },
            Info:{
                ...fetchedData.info
            }
        }
    }
    useEffect(()=>{
        if(fetchedData){
            if(fetchedData.asset.image){
                //handle image later
            }
            reset(mapFetchedToInfo(fetchedData))
        }
    },[fetchedData])

    const {
        register,
        handleSubmit,
        formState: {isSubmitting},
        reset,
      } = useForm<TAssetInfo>({
        resolver: zodResolver(TAssetInfoSchema),
      });

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
      };;

      const onSubmit = async (data: TAssetInfo) => {
       if(file){
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB < 2.0) {
                const formData = new FormData();
                formData.append("file", file);
                const body = { 
                    ...data,
                    asset: {
                        ...data.asset,
                        image: formData
                    }
                }
                console.log("form1 ico body :",body)
            }
        }
     };

    return (
        <div className="flex justify-evenly p-5 md:p-10 md:pb-0">
            <div className="w-full md:w-3/4">
                <hr className="horizontal-line-top" />
                <form className="flex flex-col items-center space-y-24" onSubmit={handleSubmit(onSubmit)}>
                    <div className="ico-card space-y-8">
                        <div className="w-full flex items-center my-5 mb-0 space-x-2">
                            <h1 className="text-lg md:text-xl font-bold">Investment Details</h1>
                            <span className="text-xl"><RiProfileLine /></span>
                        </div>
                        <div className="w-full flex space-x-8">
                            <div className="w-1/2">
                                <div onClick={handleDivClick} className="text-sm flex items-center cursor-pointer justify-between px-5 w-full text-white font-bold bg-slate-800 h-full max-h-12 rounded-lg">
                                    <span>Upload Profile </span>
                                    <div className="text-lg font-white"><FaUpload /></div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                    />
                                </div>
                                {
                                    file && (
                                        <div className="absolute text-xs">
                                            <span>{file.name}</span>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="w-1/2">
                                <Input
                                    {...register("asset.issueBy")}
                                    label="Issue By"
                                    id="issueBy"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full flex space-x-8">
                            <div className="w-1/2">
                                <Input 
                                    {...register("asset.name")}
                                    label="Company Name"
                                    id="assetName"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="w-1/2">
                                <Input
                                    {...register("asset.description")}
                                    label="Description"
                                    id="description"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full flex space-x-8">
                            <div className="w-1/2">
                                <Input
                                    {...register("asset.catagory")}
                                    label="Product Catagory"
                                    id="catagory"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="w-1/2">
                                <Input
                                    {...register("asset.return")}
                                    label="Expect Return"
                                    id="expectReturn"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full flex space-x-8">
                            <div className="w-1/2">
                                <Input
                                    {...register("asset.region")}
                                    label="Region"
                                    id="region"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="w-1/2">
                                <Input
                                    {...register("asset.minimum")}
                                    label="Minimum Subscription Limit"
                                    id="minimum"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full flex items-center my-5 mb-0 space-x-2">
                            <h1 className="text-lg md:text-xl font-bold">Investment Terms</h1>
                            <span className="text-xl"><GrMoney /></span>
                        </div>
                        <div className="w-full flex space-x-8">
                            <div className="w-1/2">
                                <Input
                                    {...register("info.totalIssuance")}
                                    label="Total Issuance"
                                    id="totalIssuance"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="w-1/2">
                                <Input
                                    {...register("info.totalAmountRaised")}
                                    label="Total Amount Raised"
                                    id="totalAmountRaised"
                                    disabled={isSubmitting}
                                />
                            </div>
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
                            <div className="w-1/2">
                                <Input
                                    {...register("info.minimumInvestmentAmount")}
                                    label="Minimum Investment Amount"
                                    id="minimumInvestmentAmount"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full flex space-x-8">
                            <div className="w-1/2">
                                <Input
                                    {...register("info.minimumInvestmentQuantity")}
                                    label="Minimum Investment Quantity"
                                    disabled={isSubmitting}
                            />
                            </div>
                            <div className="w-1/2">
                                <Input
                                    {...register("info.issueUnitPrice")}
                                    label="Issue Unit Price"
                                    id="issueUnitPrice"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-5 bottom-8">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Loading..." : "Next Form"}
                        </Button>
                    </div>
                </form>
                {/* <hr className="horizontal-line-bottom" /> */}
            </div>
        </div>
    )
    }

export default AddedIcoInfo
