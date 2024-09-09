import { useNavigate, useParams } from "react-router-dom";
// import { TCorporateData } from "../constant/type";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/app/store";
// import { isAllowedPage } from "@/lib/utils";
// import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
// import { useEffect, useState } from "react";
// import { getCookies } from "@/lib/Cookies";
// import axios from "@/api/axios";
// import {
//   clearCorporateData,
//   setCorporateData,
// } from "@/features/editCorporateData/editCorporateData";
import AddIndividualAccount from "./addIndividualAccount";
import BasicInfo from "./basicInfo/basicInfo";
import SuitTestFatca from "./suitTestFatca/suitTestFatca";
import IdentityVerification from "./identityVerification/identityVerification";
import { IndividualFooter } from "../addedCorporateAccount/components/IndividualFooter";

type TPage = {
  page?: string;
};

export default function PageAddIndividualAccount() {
  // Ensure hooks are called unconditionally and in the same order
  // const dispatch = useDispatch();
  // const [corporateCode, setCorporateCode] = useState("");

  // const corporateData: TCorporateData = useSelector<RootState>(
  //   (state) => state.editCorporate
  // ) as TCorporateData;

  // const initFormData = mapDataToTCorporateInfo(corporateData);

  const { page } = useParams<TPage>();
  let pageId = page ? Number(page) : 1;

  const navigate = useNavigate();
  // const { handleSubmitCorporateInfo, currentCorporatesInfo } = useCorporateInfo();

  type TMapPages = {
    [key: number]: JSX.Element;
  };
  const mappingPages: TMapPages = {
    1: <AddIndividualAccount />,
    2: <BasicInfo />,
    3: <SuitTestFatca />,
    4: <IdentityVerification />,
  };

  const handlePages = (type: string) => {
    if (type === "next") {
      navigate(`/create-job/added-individual-account/${pageId + 1}`);
    } else if (type == "done") {
      localStorage.clear();
      navigate(`/create-job/added-individual-account`);
    } else {
      navigate(`/create-job/added-individual-account/${pageId - 1}`);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {mappingPages[pageId]}
      <IndividualFooter
        handlePages={handlePages}
        pageId={pageId}
        totalPages={Object.keys(mappingPages).length}
      />
    </div>
  );
}
