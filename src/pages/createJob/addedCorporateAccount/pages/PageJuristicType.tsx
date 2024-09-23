import { Card } from "@/components/ui/card";
import { TCorporateInfo } from "../constants2/types";
import { FormCorporateTypeAndIncome } from "../components/formCorporateInfo2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { TCorporateData } from "../../constant/type";
import { mapDataToTCorporateInfo } from "../libs/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookies } from "@/lib/Cookies";
import { sleep } from "@/lib/utils";
import { setCurrentCorporateInfo } from "@/features/currentSelectedCorperate/currentCorperrateInfoSlice";
import axios from "@/api/axios";

// type TPageJuristicTypeProps = {
//   currentCorporatesInfo: TCorporateInfo;
//   corporateCode?: string;
// };
export function PageJuristicType() {
  const corporateData: TCorporateData = useSelector<RootState, TCorporateData>(
    (state) => state.editCorporate
  ) as TCorporateData;

  const currentCorporatesInfo: TCorporateInfo = useSelector<
    RootState,
    TCorporateInfo
  >((state) => state.currentCorporateInfo);
  const dispatch = useDispatch();
  // console.log("corporateData", corporateData);
  // const [isSecondFormPass, setIsSecondFormPass] = useState<boolean>(false);
  const initFormData = mapDataToTCorporateInfo(corporateData);
  const corporateCode = localStorage.getItem("corporateCode");

  useEffect(() => {
    const fetchCorpInfo = async () => {
      try {
        const queryResponse = await axios.post(
          "/api/v1/corporate/query",
          { corporateCode: corporateCode },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${getCookies()}`,
            },
          }
        );
        if (queryResponse.status === 200 && queryResponse.data.length > 0) {
          dispatch(setCurrentCorporateInfo(queryResponse.data[0]));
          // setCurrentCorporatesInfo(data);
        } else {
          alert("Failed to retrieve corporate data after creation.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (corporateCode !== null) {
      fetchCorpInfo();
    }
  }, [dispatch]);

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
          corporateCode={currentCorporatesInfo.corporateCode}
        />
      </div>
    </>
  );
}
