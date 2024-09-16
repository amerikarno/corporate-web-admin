import { Card } from "@/components/ui/card";
import { FormCorporateTypeAndIncome } from "../components/formCorporateInfo2";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { TCorporateData } from "../../constant/type";
import { mapDataToTCorporateInfo } from "../libs/utils";
import { useCorporateInfo } from "../hook/useCorporateInfo";

type TPageJuristicTypeProps = {};
export function PageJuristicType({}: TPageJuristicTypeProps) {
  const { currentCorporatesInfo } = useCorporateInfo();
  const corporateCode = localStorage.getItem("corporateCode") || "";
  const corporateData: TCorporateData = useSelector<RootState>(
    (state) => state.editCorporate
  ) as TCorporateData;
  // console.log("corporateData", corporateData);
  // const [isSecondFormPass, setIsSecondFormPass] = useState<boolean>(false);
  const initFormData = mapDataToTCorporateInfo(corporateData);
  // console.log(currentCorporatesInfo)
  return (
    <>
      <div className="p-4 space-y-8">
        <Card className=" p-4 space-y-6">
          <h1 className="text-xl font-bold">Juristic Infomations</h1>
          <div className="flex">
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic ID</h1>
                <h1 className="">: {corporateData?.CorporateCode ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic Investor Name</h1>
                <h1 className="">: {initFormData?.name ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Commercial Number</h1>
                <h1 className="">: {initFormData?.registrationNo ?? ""}</h1>
              </div>
            </div>
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Tax ID</h1>
                <h1 className="">: {initFormData?.taxId ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Date Of Incorporation</h1>
                <h1 className="">: {initFormData?.dateofincorporation}</h1>
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
