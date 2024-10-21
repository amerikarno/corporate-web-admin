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
import { useDispatch } from "react-redux";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import { clearCorporateData } from "@/features/editCorporateData/editCorporateData";
import { PageAttorney } from "./pages/PageAttorny";

type TPage = {
  page?: string;
};

export default function EditCorporateAccount() {
  if (!isAllowedPage(2001)) {
    return <UnAuthorize />;
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { page } = useParams<TPage>();
  let pageId = page ? Number(page) : 1;

  const mappingPages: TMapPages = {
    1: <PageCorporateInfo />,
    2: <PageJuristicType />,
    3: <PageContactPerson />,
    4: <ListOfDirectors />,
    5: <PageIndividualShareholder />,
    6: <PageJuristicShareholder />,
    7: <PageAuthorizedPerson />,
    8: <PageAttorney />,
    9: <PageBankAccount />,
    10: <UploadFiles />,
    11: <PageSuitTest />,
  };

  const handlePages = (type: string) => {
    if (type == "next") {
      navigate(`/create-job/change-corporate-account/edit/${pageId + 1}`);
    } else if (type == "submit") {
    } else if (type == "submit2") {
    } else if (type == "done") {
      localStorage.clear();
      dispatch(clearCorporateData());
      navigate(`/create-job/change-corporate-account/edit`);
    } else {
      navigate(`/create-job/change-corporate-account/edit/${pageId - 1}`);
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
