import DataTable from "react-data-table-component";
import { TCorporateInfo } from "../constants/types";
import { Card } from "@/components/ui/card";
import { columnsCorporateInfo } from "../constants/columns";
import { FormCorporateInfo } from "../components/formCorporateInfo";

type TPageCorporateInfoProps = {
  corporatesInfo: TCorporateInfo[];
  handleSubmitCorporateInfo: (data: TCorporateInfo) => Promise<void>;
};
export function PageCorporateInfo({
  corporatesInfo,
  handleSubmitCorporateInfo,
}: TPageCorporateInfoProps) {
  return (
    <>
      <div className="p-4 space-y-8">
        <Card className="p-4">
          <p className="text-xl font-bold">Instructions</p>
          <div className="pt-4">In order to access the services offered by FINANSIA DIGITAL ASSET COMPANY LIMITED, you will need to complete and submit this account opening application form, due diligence questionnaire and declaration for accredited/institutional investors.</div>
        </Card>
        <FormCorporateInfo onsubmit={handleSubmitCorporateInfo} />
      </div>
    </>
  );
}
