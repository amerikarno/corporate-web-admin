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
        <Card className="p-4">
          <p className="text-xl font-bold">Instructions</p>
          <div className="pt-4">
            In order to access the services offered by FINANSIA DIGITAL ASSET
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
