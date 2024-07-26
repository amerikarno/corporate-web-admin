import { Card } from "@/components/ui/card";
import { TCorporateInfo } from "../constants/types";
import { FormCorporateTypeAndIncome } from "../components/formCorporateInfo2";

type TForm2Props = {
  currentCorporatesInfo: TCorporateInfo;
  corporateCode?: string;
};
export function Form2({ currentCorporatesInfo, corporateCode }: TForm2Props) {
  return (
    <>
      <div className="p-4 space-y-8">
        <Card className="h-80 p-4">
          <div className="flex flex-row">
            <h1 className="w-1/4">Juristic Name</h1>
            <h1 className="w-3/4">{currentCorporatesInfo?.name ?? ""}</h1>
          </div>
          <div className="flex flex-row">
            <h1 className="w-1/4">Commercial Number</h1>
            <h1 className="w-3/4">
              {currentCorporatesInfo?.registrationNo ?? ""}
            </h1>
          </div>
          <div className="flex flex-row">
            <h1 className="w-1/4">Tax ID</h1>
            <h1 className="w-3/4">{currentCorporatesInfo?.taxID ?? ""}</h1>
          </div>
          <div className="flex flex-row">
            <h1 className="w-1/4">Date Of Incorporation</h1>
            <h1 className="w-3/4">
              {currentCorporatesInfo?.dateofincorporation.toLocaleDateString(
                "th-TH"
              ) ?? ""}
            </h1>
          </div>
        </Card>
        <FormCorporateTypeAndIncome
          corporateInfo={currentCorporatesInfo}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
