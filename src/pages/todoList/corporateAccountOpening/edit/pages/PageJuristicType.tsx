import { Card } from "@/components/ui/card";
import { FormCorporateTypeAndIncome } from "../components/formCorporateInfo2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { TCorporateData } from "../../constant/type";
import { mapDataToTCorporateInfo } from "../libs/utils";
import { useEffect } from "react";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";

export function PageJuristicType() {
  const corporateData: TCorporateData = useSelector<RootState, TCorporateData>(
    (state) => state.editCorporate
  ) as TCorporateData;

  const dispatch = useDispatch();
  const initFormData = mapDataToTCorporateInfo(corporateData);
  const registerId = localStorage.getItem("registerId");

  useEffect(() => {
    const fetchCorpInfo = async () => {
      try {
        const queryResponse = await axios.post(
          "/api/v1/corporate/query",
          { registerId: registerId },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${getCookies()}`,
            },
          }
        );
        if (queryResponse.status === 200 && queryResponse.data.length > 0) {
          dispatch(setCorporateData(queryResponse.data[0]));
        } else {
          alert("Failed to retrieve corporate data after creation.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (registerId !== null) {
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
                <h1 className="">: {corporateData?.registerId ?? ""}</h1>
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
        <FormCorporateTypeAndIncome />
      </div>
    </>
  );
}
