import { useCorporateInfo } from "../../corporateAccountOpening/hook/useCorporateInfo";
import { TMapPages } from "../../corporateAccountOpening/constants/types";
import { PageCorporateInfo } from "../../todoList/pages/PageCorporateInfoEdit";
// import { PageJuristicType } from "./pages/PageJuristicType";
// import { ListOfDirectors } from "./pages/ListOfDirectors";
// import { PageAuthorizedPerson } from "./pages/PageAuthorizedPerson";
// import { PageContactPerson } from "./pages/PageContactPerson";
// import { PageIndividualShareholder } from "./pages/PageIndividualShareholder";
// import { PageJuristicShareholder } from "./pages/PageJuristicShareholder";
// import { PageBankAccount } from "./pages/PageBankAccount";
import { useNavigate, useParams } from "react-router-dom";
import { CreateCorporateFooter } from "../../corporateAccountOpening/components/footer"
import { useEffect } from "react";
import axios from "axios";

type TPage = {
  page?: string;
};

export default function CorporateAccountOpenningEdit() {
  const { page } = useParams<TPage>();
  let pageId = page ? Number(page) : 1;

  const navigate = useNavigate();
  const { corporatesInfo, handleSubmitCorporateInfo, currentCorporatesInfo } =
    useCorporateInfo();


  const corporateCode: string = currentCorporatesInfo?.corporateCode ?? "";
  const mappingPages: TMapPages = {
    1: (
      <PageCorporateInfo
        corporatesInfo={corporateInfoMock}
        handleSubmitCorporateInfo={handleSubmitCorporateInfo}
      />
    ),
    // 2: (
    //   <PageJuristicType
    //     currentCorporatesInfo={currentCorporatesInfo}
    //     corporateCode={corporateCode}
    //   />
    // ),
    // 3: <PageContactPerson corporateCode={corporateCode} />,
    // 4: <ListOfDirectors corporateCode={corporateCode} />,
    // 5: <PageIndividualShareholder corporateCode={corporateCode} />,
    // 6: <PageJuristicShareholder corporateCode={corporateCode} />,
    // 7: <PageAuthorizedPerson corporateCode={corporateCode} />,
    // 8: <PageBankAccount corporateCode={corporateCode} />,
    // 9: <UploadFiles corporateCode={corporateCode} />,
  };

  const handlePages = (type: string) => {
    if (type == "next") {
      navigate(`todolist/edit/added-corporate-account/${pageId + 1}`);
    } else {
      navigate(`todolist/corporate-account-opening/edit/added-corporate-account/${pageId - 1}`);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {mappingPages[pageId]}
      <CreateCorporateFooter handlePages={handlePages} pageId={pageId} />
    </div>
  );
}
