import { useCorporateInfo } from "./hook/useCorporateInfo";
import { TMapPages } from "./constants/types";
import { PageCorporateInfo } from "./pages/PageCorporateInfo";
import { PageJuristicType } from "./pages/PageJuristicType";
import { ListOfDirectors } from "./pages/ListOfDirectors";
import { PageAuthorizedPerson } from "./pages/PageAuthorizedPerson";
import { PageContactPerson } from "./pages/PageContactPerson";
import { PageIndividualShareholder } from "./pages/PageIndividualShareholder";
import { PageJuristicShareholder } from "./pages/PageJuristicShareholder";
import { PageBankAccount } from "./pages/PageBankAccount";
import { useNavigate, useParams } from "react-router-dom";
import { CreateCorporateFooter } from "./components/footer";
import UploadFiles from "./pages/uploadFiles/uploadFiles";
import { PageSuitTest } from "./pages/PageSuitTest";
import { TCorporateData } from "../constant/type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { mapDataToTCorporateInfo } from "./libs/utils";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import { useEffect, useState } from "react";
import {
  clearCorporateData,
  setCorporateData,
} from "@/features/editCorporateData/editCorporateData";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { PageAttorney } from "./pages/PageAttorny";

type TPage = {
  page?: string;
};

export function EditCorporateAccount() {
  if (!isAllowedPage(3001)) {
    return <UnAuthorize />;
  }

  const corporateData: TCorporateData = useSelector<RootState>(
    (state) => state.editCorporate
  ) as TCorporateData;
  // console.log("corporateData", corporateData);
  // const [isSecondFormPass, setIsSecondFormPass] = useState<boolean>(false);
  const initFormData = mapDataToTCorporateInfo(corporateData);
  const [corporateCode, setCorporateCode] = useState("");
  const dispatch = useDispatch();
  const { page } = useParams<TPage>();
  let pageId = page ? Number(page) : 1;

  useEffect(() => {
    const fetchCorporateData = async () => {
      try {
        const corporateCode = localStorage.getItem("corporateCode") || "";
        setCorporateCode(corporateCode);
        console.log(corporateCode);

        if(corporateCode){
          const response = await axios.post(
            "/api/v1/corporate/query",
            { corporateCode: corporateCode },
            {
              headers: {
                Authorization: `Bearer ${getCookies()}`,
              },
            }
          );
          console.log(response);
          dispatch(setCorporateData(response.data[0]));
        }else{
          dispatch(clearCorporateData());
          console.log("corporateCode not found")
        }
      } catch (error) {
        console.error("Error fetching corporate data:", error);
      }
    };

    fetchCorporateData();
  }, []);

  const navigate = useNavigate();
  const { handleSubmitCorporateInfo } = useCorporateInfo();

  // const corporateCode: string = corporateData?.CorporateCode.toString() ?? "";
  // console.log(corporateCode)
  // console.log(corporateData)

  const mappingPages: TMapPages = {
    1: (
      <PageCorporateInfo
        corporatesInfo={corporateData}
        initData={initFormData}
        handleSubmitCorporateInfo={handleSubmitCorporateInfo}
      />
    ),
    2: <PageJuristicType />,
    3: <PageContactPerson />,
    4: <ListOfDirectors />,
    5: <PageIndividualShareholder />,
    6: <PageJuristicShareholder />,
    7: <PageAuthorizedPerson />,
    8: <PageAttorney />,
    9: <PageBankAccount />,
    10: <UploadFiles />,
    11: (
      <PageSuitTest
        corporateCode={corporateCode}
        corporatesInfo={corporateData}
      />
    ),
  };

  const handlePages = (type: string) => {
    if (type == "next") {
      navigate(`/todo-list/corporate-account-opening/edit/${pageId + 1}`);
    } else if (type == "submit") {
    } else if (type == "submit2") {
    } else if (type == "done") {
      localStorage.clear();
      dispatch(clearCorporateData());
      navigate(`/todo-list/corporate-account-opening`);
    } else {
      navigate(`/todo-list/corporate-account-opening/edit/${pageId - 1}`);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {mappingPages[pageId]}
      <CreateCorporateFooter
        handlePages={handlePages}
        pageId={pageId}
        totalPages={Object.keys(mappingPages).length}
      />
    </div>
  );
}
