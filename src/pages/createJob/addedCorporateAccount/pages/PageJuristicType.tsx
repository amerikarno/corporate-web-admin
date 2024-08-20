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
          <div className="flex">
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic ID</h1>
                <h1 className="">
                  : {currentCorporatesInfo?.corporateCode ?? ""}
                </h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic Investor Name</h1>
                <h1 className="">: {currentCorporatesInfo?.name ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Commercial Number</h1>
                <h1 className="">
                  : {currentCorporatesInfo?.registrationNo ?? ""}
                </h1>
              </div>
            </div>
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Tax ID</h1>
                <h1 className="">: {currentCorporatesInfo?.taxId ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Date Of Incorporation</h1>
                <h1 className="">
                  : {currentCorporatesInfo?.dateofincorporation}
                </h1>
              </div>
            </div>
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
