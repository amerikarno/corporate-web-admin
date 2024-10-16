import { Card } from "@/components/ui/card";
import { FormCorporateInfo } from "../components/formCorporateInfo";
import { TCorporateData } from "../../constant/type";
import { useEffect } from "react";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCorporateData,
  setCorporateData,
} from "@/features/editCorporateData/editCorporateData";
import { useCorporateInfo } from "../hook/useCorporateInfo";
import { mapDataToTCorporateInfo } from "../libs/utils";
import { RootState } from "@/app/store";

export function PageCorporateInfo() {
  const corporateData: TCorporateData = useSelector<RootState>(
    (state) => state.editCorporate
  ) as TCorporateData;
  const dispatch = useDispatch();

  const fetchCorporateData = async () => {
    try {
      const corporateCode = localStorage.getItem("corporateCode") || "";

      if (corporateCode) {
        const response = await axios.post(
          "/api/v1/corporate/query",
          { corporateCode: corporateCode },
          {
            headers: {
              Authorization: `Bearer ${getCookies()}`,
            },
          }
        );
        // console.log(response);
        dispatch(setCorporateData(response.data[0]));
      } else {
        dispatch(clearCorporateData());
        // console.log("corporateCode not found");
      }
    } catch (error) {
      console.error("Error fetching corporate data:", error);
    }
  };

  useEffect(() => {
    fetchCorporateData();
  }, [dispatch]);

  const initFormData = mapDataToTCorporateInfo(corporateData);
  const { handleSubmitCorporateInfo } = useCorporateInfo();

  return (
    <>
      <div className="p-4 space-y-8">
        <Card className="p-4">
          <p className="text-xl font-bold">Instructions</p>
          <div className="pt-4">
            In order to access the services offered by Ico COMPANY
            LIMITED, you will need to complete and submit this account opening
            application form, due diligence questionnaire and declaration for
            accredited/institutional investors.
          </div>
        </Card>
        <FormCorporateInfo
          onsubmit={handleSubmitCorporateInfo}
          initData={initFormData}
          corporatesInfo={corporateData}
        />
      </div>
    </>
  );
}
