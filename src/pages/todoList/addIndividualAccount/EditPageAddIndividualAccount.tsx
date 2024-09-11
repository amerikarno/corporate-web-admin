import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/app/store";
// import { mapDataToTCorporateInfo } from "./libs/utils";
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
import { IndividualFooter } from "./IndividualFooter";

type TPage = {
  page?: string;
};

export default function EditPageAddIndividualAccount() {
  //   if (!isAllowedPage(2001)) {
  //     return <UnAuthorize />;
  //   }

  //   const dispatch = useDispatch();
  //   const [corporateCode, setCorporateCode] = useState("");

  //   const corporateData: TCorporateData = useSelector<RootState>(
  //     (state) => state.editCorporate
  //   ) as TCorporateData;

  //   const initFormData = mapDataToTCorporateInfo(corporateData);

  const { page } = useParams<TPage>();
  let pageId = page ? Number(page) : 1;

  const navigate = useNavigate();
  //   const { handleSubmitCorporateInfo, currentCorporatesInfo } =
  //     useCorporateInfo();

  //const corporateCode: string = corporateData?.CorporateCode.toString() ?? "";

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
    if (type == "next") {
      navigate(`/todo-list/individual-account-opening/edit/${pageId + 1}`);
    } else if (type == "Done") {
      localStorage.clear();
      navigate(`/todo-list/individual-account-opening/`);
    } else {
      navigate(`/todo-list/individual-account-opening/edit/${pageId - 1}`);
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
