import { RootState } from "@/app/store";
import { Input } from "@/components/Input";
import { Card } from "@/components/ui/card";
import { TAssetData } from "@/pages/createJob/changeIcoAccount/types";
import { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaCircle, FaKey, FaQuestionCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { RiProfileLine } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";
import { useSelector } from "react-redux";
import { columnsMember } from "./utils";

export default function LandingPageIco() {

    const assetData = useSelector((state: RootState) => state.assetData.data);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
      } = useForm<TAssetData>({
      });

      createTheme('solarized', {
        text: {
          primary: '#000000',
        },
        background: {
          default: '#FFFFFF',
        },
        context: {
          text: '#FFFFFF',
        },
        divider: {
          default: '#000000',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      }, 'dark');

      const totalAmountRaisedUnit = assetData?.info?.totalAmountRaised.split(" ")[1]
      const totalIssuanceUnit = assetData?.info?.totalIssuance.split(" ")[1]
      const minimumInvestmentAmountUnit = assetData?.info?.minimumInvestmentAmount.split(" ")[1]
      const minimumInvestmentQuantityUnit = assetData?.info?.minimumInvestmentQuantity.split(" ")[1]
      const issueUnitPriceUnit = assetData?.info?.issueUnitPrice.split(" ")[1]

      const investmentPeriodUnit = assetData?.issuanceTerms?.investmentPeriod.split(" ")[1];
      const dividendYieldUnit = assetData?.issuanceTerms?.dividendYield.split(" ")[1];
      const grossMarginUnit = assetData?.issuanceTerms?.grossMargin.split(" ")[1];
      const equityMultipleUnit = assetData?.issuanceTerms?.equityMultiple.split(" ")[1];
      const profitUnit = assetData?.issuanceTerms?.profit.split(" ")[1];
      const leverageUnit = assetData?.issuanceTerms?.leverage.split(" ")[1];

      const updatedMembers = assetData?.companyMembers.map((member) => ({
        ...member,
        icoCode: String(member.icoCode),
      })) || [];

      useEffect(() => {
        if(assetData){
            reset(assetData)
            if(assetData.info.totalAmountRaised){
                const value = assetData.info.totalAmountRaised.split(" ")[0];
                setValue("info.totalAmountRaised",value);
            }
            if(assetData.info.totalIssuance){
                const value = assetData.info.totalIssuance.split(" ")[0];
                setValue("info.totalIssuance",value);
            }
            if(assetData.info.minimumInvestmentAmount){
                const value = assetData.info.minimumInvestmentAmount.split(" ")[0];
                setValue("info.minimumInvestmentAmount",value);
            }
            if(assetData.info.minimumInvestmentQuantity){
                const value = assetData.info.minimumInvestmentQuantity.split(" ")[0];
                setValue("info.minimumInvestmentQuantity",value);
            }
            if(assetData.info.issueUnitPrice){
                const value = assetData.info.issueUnitPrice.split(" ")[0];
                setValue("info.issueUnitPrice",value);
            }
            if(assetData?.keyInformation?.creationTime){
                setValue("keyInformation.creationTime",assetData?.keyInformation?.creationTime.split("T")[0]);
            }
            if(assetData?.keyInformation?.releaseTime){
                setValue("keyInformation.releaseTime",assetData?.keyInformation?.releaseTime.split("T")[0]);
            }
            if(assetData?.keyInformation?.compleationTime){
                setValue("keyInformation.compleationTime",assetData?.keyInformation?.compleationTime.split("T")[0]);
            }
            if(assetData?.issuanceTerms.investmentPeriod){
                setValue("issuanceTerms.investmentPeriod", assetData?.issuanceTerms.investmentPeriod.split(" ")[0]);
            }
            if(assetData?.issuanceTerms.dividendYield){
                setValue("issuanceTerms.dividendYield", assetData?.issuanceTerms.dividendYield.split(" ")[0]);
            }
            if(assetData?.issuanceTerms.grossMargin){
                setValue("issuanceTerms.grossMargin", assetData?.issuanceTerms.grossMargin.split(" ")[0]);
            }
            if(assetData?.issuanceTerms.equityMultiple){
                setValue("issuanceTerms.equityMultiple", assetData?.issuanceTerms.equityMultiple.split(" ")[0]);
            }
            if(assetData?.issuanceTerms.profit){
                setValue("issuanceTerms.profit", assetData?.issuanceTerms.profit.split(" ")[0]);
            }
            if(assetData?.issuanceTerms.leverage){
                setValue("issuanceTerms.leverage", assetData?.issuanceTerms.leverage.split(" ")[0]);
            }
        }
      }, [])

  return (
    <div className="p-8 flex flex-col space-y-8">
      <div className="overflow-hidden w-full px-14 flex flex-col items-center space-y-8">
            <div className="w-full flex flex-col md:flex-row md:w-4/5 justify-center">
                <div className="w-full p-8 my-4 md:px-12 md:w-full md:pl-20 mr-auto rounded-2xl rounded-r-none shadow-2xl bg-white">
                    <div className="flex">
                    <h1 className="font-bold uppercase text-2xl md:text-5xl m-4">Investment<br />Information</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-5">
                        {/* <div className="min-h-12 ">
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
                        </div> */}
                        <Input  {...register("asset.issueBy")}  label="Issue By*" id="issueBy"/>
                        <Input  {...register("asset.name")}  label="Company Name*" id="companyName" />
                        <Input  {...register("asset.description")}  label="Description*" id="description"/>
                        <Input  {...register("asset.category")}  label="Product Category*" id="productCategory"/>
                        <Input  {...register("asset.return")}  label="Expect Return*" id="expectReturn"/>
                        <Input  {...register("asset.region")}  label="Region*" id="region"/>
                        <Input  {...register("asset.minimum")}  label="Minimum Subscription Limit*" id="minimumSubscriptionLimit"/>
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
        <div className="w-full flex-col md:w-4/5 justify-center pb-8">
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
                        />
                    </div>
                <div className="w-1/2 flex space-x-4">
                    <div className="w-4/5">
                        <Input
                        {...register("info.totalAmountRaised")}
                        label="Total Amount Raised"
                        id="totalAmountRaised"
                        type="number"
                        step="0.01"
                        />
                    </div>
                    <div className="w-1/5">
                        <Input
                        label="Unit"
                        value={totalAmountRaisedUnit}
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
                            type="number"
                            step="0.01"
                            />
                        </div>
                        <div className="w-1/5">
                            <Input
                            label="Unit"
                            value={totalIssuanceUnit}
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
                                    type="number"
                                    step="0.01"
                                />
                            </div>
                        <div className="w-1/5">
                            <Input
                            label="Unit"
                            value={minimumInvestmentAmountUnit}
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
                            type="number"
                            step="0.01"
                            />
                        </div>
                        <div className="w-1/5">
                            <Input
                            label="Unit"
                            value={minimumInvestmentQuantityUnit}
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
                                    type="number"
                                    step="0.01"
                                    />
                            </div>
                            <div className="w-1/5">
                                <Input
                                label="Unit"
                                value={issueUnitPriceUnit}
                                data-testid="issueUnitPriceUnit"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-center">
            <div className="w-full md:w-3/4">
                    <hr className="horizontal-line-top" />
                        <div className="ico-card space-y-8 rounded-b-[10px]">
                        <div className="w-full flex items-center my-5 mb-0 space-x-2">
                                <h1 className="text-lg md:text-xl font-bold">Company Details</h1>
                                <span className="text-xl"><BiSolidMessageSquareDetail /></span>
                            </div>
                            <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="message" className="font-medium text-gray-900 dark:text-white">Company Information</label>
                            <textarea value={(assetData?.details?.find(detail => detail.header === "Company Information")?.content || '')}  id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your company information here..."></textarea>
                            </div>
                            <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="message" className="font-medium text-gray-900 dark:text-white">Business Model</label>
                            <textarea value={(assetData?.details?.find(detail => detail.header === "Business Model")?.content || '')} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your business model here..."></textarea>
                            </div>
                            <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="message" className="font-medium text-gray-900 dark:text-white">Use of Proceeds</label>
                            <textarea value={(assetData?.details?.find(detail => detail.header === "Use of Proceeds")?.content || '')} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your use of proceeds here..."></textarea>
                            </div>
                            <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="message" className="font-medium text-gray-900 dark:text-white">Fundraising Milestone</label>
                            <textarea value={(assetData?.details?.find(detail => detail.header === "Fundraising Milestone")?.content || '')} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your fundraising milestone here..."></textarea>
                            </div>           
                        </div>
                        <div className="ico-card space-y-8 relative rounded-t-[10px] mt-8">
                            <div className="w-full flex items-center my-5 mb-0 space-x-2">
                                <h1 className="text-lg md:text-xl font-bold">Company FAQ</h1>
                                <span className="text-xl"><FaQuestionCircle /></span>
                            </div>
                            {assetData?.faq.map((faq, index) => (
                            <div key={index} className="w-full flex flex-col space-y-2">
                                <label htmlFor={`faq-${index}`} className="font-medium text-gray-900 dark:text-white">Frequently Asked Questions {index+1}</label>
                                <textarea
                                data-testid={`faq-question-${index+1}`}
                                id={`faq-${index}`}
                                rows={2}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your question here..."
                                value={faq.question}
                                />
                                <textarea
                                data-testid={`faq-answer-${index+1}`}
                                id={`faq-${index}`}
                                rows={2}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your answer here..."
                                value={faq.answer}
                                />
                            </div>
                            ))}
                        </div>
                    <hr className="horizontal-line-bottom " />
                </div>
            </div>
            <div className="flex justify-evenly md:pb-0">
                <div className="w-full md:w-3/4">
                    <hr className="horizontal-line-top" />
                    <div className="ico-card space-y-8 rounded-b-[10px]">
                        <div className="w-full flex items-center my-5 mb-0 space-x-2">
                            <h1 className="text-lg md:text-xl font-bold">Key Information</h1>
                            <span className="text-xl"><FaKey /></span>
                        </div>
                        <div className="w-full grid grid-cols-2 grid-rows-4 gap-5">
                            <div className="">
                                <Input  {...register("keyInformation.precision")} type="number" step="0.01" label="Precision*" id="precision"/>
                            </div>
                            <div className="">
                                <Input  {...register("keyInformation.capitalStructure")} 
                                label="Capital Structure*" id="capitalStructure" />
                            </div>
                            <div className="">
                                <Input  {...register("keyInformation.productType")} 
                                label="Product Type*" id="productType"/>
                            </div>
                            <div className="">
                                <Input  {...register("keyInformation.classiFication")} 
                                label="Classification*" id="classiFication"/>
                            </div>
                            <div className="">
                                <Input
                                    {...register("keyInformation.network")}
                                    label="network*" id="network"
                                >
                                </Input>
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
                </div>
            </div>
            <div className="flex justify-center">
            <div className="w-full md:w-3/4">
                <hr className="horizontal-line-top" />
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
        </div>
      </div>
      <div className="flex justify-center">
        <Card className=" w-3/4">
                {assetData?.companyMembers && (
                <DataTable
                title="Member of company"
                columns={columnsMember}
                data={updatedMembers}
                className="w-1/4 pb-4"
                theme="solarized"
                />
            )}
        </Card>
      </div>
    </div>
  )
}
