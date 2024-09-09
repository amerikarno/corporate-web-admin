import { TCorporateInfo } from "../constants/types";
import { Card } from "@/components/ui/card";
import { FormCorporateInfo } from "../components/formCorporateInfo";
import { TCorporateInfoSchema } from "../constants/schemas";
import { TCorporateData } from "../../constant/type";

type TPageCorporateInfoProps = {
  initData?: TCorporateInfoSchema;
  corporatesInfo?: TCorporateData;
  handleSubmitCorporateInfo: (data: TCorporateInfo) => Promise<void>;
};
export function PageCorporateInfo({
  corporatesInfo,
  handleSubmitCorporateInfo,
  initData,
}: TPageCorporateInfoProps) {
  return (
    <>
      <div className="p-4 space-y-8">
      <Card className=" p-4 space-y-6">
          <h1 className="text-xl font-bold">Juristic Infomations</h1>
          <div className="flex">
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic ID</h1>
                <h1 className="">: {corporatesInfo?.CorporateCode ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic Investor Name</h1>
                <h1 className="">: {corporatesInfo?.Info.name ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Commercial Number</h1>
                <h1 className="">: {corporatesInfo?.Info.registrationNo ?? ""}</h1>
              </div>
            </div>
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Tax ID</h1>
                <h1 className="">: {corporatesInfo?.Info.taxId ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Date Of Incorporation</h1>
                <h1 className="">: {corporatesInfo?.Info.dateOfIncorporation.split("T")[0]}</h1>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-xl font-bold">Instructions</p>
          <div className="pt-4">
            In order to access the services offered by DIGITAL ASSET
            COMPANY LIMITED, you will need to complete and submit this account
            opening application form, due diligence questionnaire and
            declaration for accredited/institutional investors.
          </div>
        </Card>
        <FormCorporateInfo
          onsubmit={handleSubmitCorporateInfo}
          initData={initData}
          corporatesInfo={corporatesInfo}
        />
      </div>
    </>
  );
}
