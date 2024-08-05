import { Card } from "@/components/ui/card";
import { TCorporateInfo } from "../constants/types";
import { FormCorporateTypeAndIncome } from "../components/formCorporateInfo2";

type TPageJuristicTypeProps = {
  currentCorporatesInfo: TCorporateInfo;
  corporateCode?: string;
};
export function PageJuristicType({
  currentCorporatesInfo,
  corporateCode,
}: TPageJuristicTypeProps) {
  return (
    <>
      <div className="p-4 space-y-8">
        <Card className=" p-4 space-y-6">
          <h1 className="text-xl font-bold">Juristic Infomations</h1>
          <div className="flex flex-row">
            <h1 className="w-1/4 font-bold">Juristic ID</h1>
            <h1 className="w-3/4">
              : {currentCorporatesInfo?.corporateCode ?? ""}
            </h1>
          </div>
          <div className="flex flex-row">
            <h1 className="w-1/4 font-bold">Juristic Name</h1>
            <h1 className="w-3/4">: {currentCorporatesInfo?.name ?? ""}</h1>
          </div>
          <div className="flex flex-row">
            <h1 className="w-1/4 font-bold">Commercial Number</h1>
            <h1 className="w-3/4">
              : {currentCorporatesInfo?.registrationNo ?? ""}
            </h1>
          </div>
          <div className="flex flex-row">
            <h1 className="w-1/4 font-bold">Tax ID</h1>
            <h1 className="w-3/4">: {currentCorporatesInfo?.taxId ?? ""}</h1>
          </div>
          <div className="flex flex-row">
            <h1 className="w-1/4 font-bold">Date Of Incorporation</h1>
            <h1 className="w-3/4">
              :{" "}
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
