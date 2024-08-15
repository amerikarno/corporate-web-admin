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
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { mapDataToTCorporateInfo } from "./libs/utils";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";

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
  console.log("corporateData", corporateData);
  // const [isSecondFormPass, setIsSecondFormPass] = useState<boolean>(false);
  const initFormData = mapDataToTCorporateInfo(corporateData);
  console.log("initFormData", initFormData);

  // const handleFormPassChange = (status: boolean) => {
  //   // setIsSecondFormPass(status);
  //   console.log(status);
  // };
  // const {} = useFormCorporateInfo2(handleFormPassChange);

  const { page } = useParams<TPage>();
  let pageId = page ? Number(page) : 1;

  const navigate = useNavigate();
  const { handleSubmitCorporateInfo, currentCorporatesInfo } =
    useCorporateInfo();

  const corporateCode: string = corporateData?.CorporateCo9de.toString() ?? "";
  // const corporateCode:string = corporateData?.CorporateCode.toString() ?? "";
  console.log(corporateCode)
  //const corporateCode :string = "80000010";
  const mappingPages: TMapPages = {
    1: (
      <PageCorporateInfo
        corporatesInfo={corporateData}
        initData={initFormData}
        handleSubmitCorporateInfo={handleSubmitCorporateInfo}
      />
    ),
    2: (
      <PageJuristicType
        currentCorporatesInfo={currentCorporatesInfo}
        corporateCode={corporateCode}
      />
    ),
    3: <PageContactPerson corporateCode={corporateCode} />,
    4: <ListOfDirectors corporateCode={corporateCode} />,
    5: <PageIndividualShareholder corporateCode={corporateCode} />,
    6: <PageJuristicShareholder corporateCode={corporateCode} />,
    7: <PageAuthorizedPerson corporateCode={corporateCode} />,
    8: <PageBankAccount corporateCode={corporateCode} />,
    9: <UploadFiles corporateCode={corporateCode} />,
    10: <PageSuitTest corporateCode={corporateCode} />,
  };

  const handlePages = (type: string) => {
    // if (type == "next") {
    //   navigate(`/create-job/added-corporate-account/${pageId + 1}`);
    // } else if (type == "submit") {
    //   console.log(corporateCode);
    //   if (corporateCode) {
    //     navigate(`/create-job/added-corporate-account/${pageId + 1}`);
    //   }
    // } else if (type == "submit2") {
    //   if (isSecondFormPass) {
    //     navigate(`/create-job/added-corporate-account/${pageId + 1}`);
    //   }
    // } else {
    //   navigate(`/create-job/added-corporate-account/${pageId - 1}`);
    // }
    if (type == "next") {
      navigate(`/todo-list/corporate-account-opening/edit/${pageId + 1}`);
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
