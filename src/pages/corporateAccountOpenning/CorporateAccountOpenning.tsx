import { useCorporateInfo } from "./hook/useCorporateInfo";
import { TMapPages } from "./constants/types";
import { Form1 } from "./pages/form1";
import { Form2 } from "./pages/form2";
import { Form3 } from "./pages/form3";
import { Form4 } from "./pages/form4";
import { Form5 } from "./pages/form5";
import { Form6 } from "./pages/form6";
import { Form7 } from "./pages/form7";
import { Form8 } from "./pages/form8";
import { useNavigate, useParams } from "react-router-dom";
import { CreateCorporateFooter } from "./components/footer";

type TPage = {
  page?: string;
};

export default function CorporateAccountOpenning() {
  const { page } = useParams<TPage>();
  const pageId = page ? Number(page) : 1;
  const navigate = useNavigate();
  const {
    corporatesInfo,
    handleSubmitCorporateInfo,
    currentCorporatesInfo,
    corporateCode,
  } = useCorporateInfo();

  const mappingPages: TMapPages = {
    1: (
      <Form1
        corporatesInfo={corporatesInfo}
        handleSubmitCorporateInfo={handleSubmitCorporateInfo}
      />
    ),
    2: (
      <Form2
        currentCorporatesInfo={currentCorporatesInfo}
        corporateCode={corporateCode}
      />
    ),
    3: <Form3 corporateCode={corporateCode} />,
    4: <Form4 corporateCode={corporateCode} />,
    5: <Form5 corporateCode={corporateCode} />,
    6: <Form6 corporateCode={corporateCode} />,
    7: <Form7 corporateCode={corporateCode} />,
    8: <Form8 corporateCode={corporateCode} />,
  };

  const handlePages = (type: string) => {
    if (type == "next") {
      navigate(`/corporate/create/${pageId + 1}`);
    } else {
      navigate(`/corporate/create/${pageId - 1}`);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {mappingPages[pageId]}
      <CreateCorporateFooter handlePages={handlePages} pageId={pageId} />
    </div>
  );
}
