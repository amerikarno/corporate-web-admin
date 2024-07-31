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

type TPage = {
  page?: string;
};

export default function CorporateAccountOpenning() {
  const { page } = useParams<TPage>();
  let pageId = page ? Number(page) : 1;


  const navigate = useNavigate();
  const {
    corporatesInfo,
    handleSubmitCorporateInfo,
    currentCorporatesInfo,
  } = useCorporateInfo();
  
  const corporateCode: string = currentCorporatesInfo?.corporateCode ?? "";
  console.log(currentCorporatesInfo)
  console.log(corporateCode)
  const mappingPages: TMapPages = {
    1: (
      <PageCorporateInfo
        corporatesInfo={corporatesInfo}
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
  };

  const handlePages = (type: string) => {
        if (type == "next") {
        navigate(`/create-job/added-corporate-account/${pageId + 1}`);
        } else {
        navigate(`/create-job/added-corporate-account/${pageId - 1}`);
        }
  };

  return (
    <div className="space-y-8 pb-8">
      {mappingPages[pageId]}
      <CreateCorporateFooter handlePages={handlePages} pageId={pageId} corporateCode={corporateCode} />
    </div>
  );
}
