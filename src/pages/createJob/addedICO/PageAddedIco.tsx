import { useNavigate, useParams } from "react-router-dom";
import AddedIcoInfo from "./AddedIcoInfo";
import { FooterPageIco } from "./FooterPageIco";
import AddedIcoDetail from "./AddedIcoDetail";
import AddedIcoKeyInfo from "./AddedIcoKeyInfo";
import AddedIcoCompany from "./AddedIcoCompany";
import "./addedico.css"
import AddedIssuance from "./AddedIssuance";
import { useDispatch } from "react-redux";
import { setAssetData } from "@/features/addedIcoData/AddedIcoData";
import { TAssetData } from "./types";
type TPage = {
    page?: string;
};
type TMapPages = {
    [key: number]: JSX.Element;
}
  
const PageAddedIco = () => {

const navigate = useNavigate();
  const { page } = useParams<TPage>();
  let pageId = page ? Number(page) : 1;

  const mappingPages: TMapPages = {
    1: <AddedIcoInfo />,
    2: <AddedIcoDetail/>,
    3: <AddedIcoKeyInfo/>,
    4: <AddedIssuance/>,
    5: <AddedIcoCompany/>,
  };

  const handlePages = (type: string) => {
    if (type == "next") {
      navigate(`/create-job/added-ico/${pageId + 1}`);
    } else {
      navigate(`/create-job/added-ico/${pageId - 1}`);
    }
  };

  const dispatch = useDispatch();
  dispatch(setAssetData({
    id: 1,
    asset: {
      id: "asset-123",
      title: "Asset Title",
      logo: "https://example.com/logo.png",
      issueBy: "Issuer Name",
      image: "https://example.com/image.png",
      name: "Asset Name",
      description: "This is a description of the asset.",
      catagory: "Category",
      return: "5%",
      region: "Region",
      minimum: "1000",
    },
    info: {
      id: "info-123",
      totalIssuance: "500000",
      totalAmountRaised: "300000",
      contractInfomation: "Contract information details.",
      minimumInvestmentAmount: "100",
      minimumInvestmentQuantity: "10",
      issueUnitPrice: "50",
    },
    details: [
      {
        id: "detail-1",
        header: "Company Information",
        content: "This is the content for detail 1.",
      },
      {
        id: "detail-2",
        header: "Business Model",
        content: "This is the content for detail 2.",
      },
      {
        id: "detail-1",
        header: "Use of Proceeds",
        content: "This is the content for detail 3.",
      },
      {
        id: "detail-2",
        header: "Fundraising Milestone",
        content: "This is the content for detail 4.",
      },
    ],
    documents: ["https://example.com/document1.pdf", "https://example.com/document2.pdf"],
    images: ["https://example.com/image1.png", "https://example.com/image2.png"],
    videos: ["https://example.com/video1.mp4", "https://example.com/video2.mp4"],
    faq: [
      {
        id: "faq-1",
        question: "What is the return rate?",
        answer: "The return rate is 5%.",
      },
      {
        id: "faq-2",
        question: "What is the minimum investment?",
        answer: "The minimum investment is $1000.",
      },
    ],
    keyInformation: {
      id: "key-info-123",
      network: "BNB Smart Chain Mainnet",
      precision: "Precision Value",
      capitalStructure: "Capital Structure",
      classification: "Classification",
      productType: "Product Type",
      creationTime: "2022-01-01T00:00:00Z",
      releaseTime: "2022-01-02T00:00:00Z",
      compleationTime: "2022-01-03T00:00:00Z",
    },
    issuanceTerms: {
      id: "issuance-123",
      investmentPeriod: "1 Year",
      dividendYield: "2%",
      grossmargin: "10%",
      equityMultiple: "1.5x",
      profit: "20%",
      leverage: "1.2x",
      investmentStructure: "Equity",
      distributionFrequency: "Monthly",
    },
    companyMembers: [
      {
        id: "member-1",
        picture: "https://example.com/member1.png",
        firstName: "John",
        midName: "A.",
        lastName: "Doe",
        position: "CEO",
        history: "John has over 20 years of experience in the industry.",
      },
      {
        id: "member-2",
        picture: "https://example.com/member2.png",
        firstName: "Jane",
        midName: "B.",
        lastName: "Smith",
        position: "CTO",
        history: "Jane is a technology expert with a strong background in software development.",
      },
    ],
  }))

  return (
    <div className="flex flex-col min-h-[95vh] space-y-8 pb-8 relative">
      <div className="content">
        {mappingPages[pageId]}
      </div>
      <FooterPageIco
        handlePages={handlePages}
        pageId={pageId}
        totalPages={Object.keys(mappingPages).length}
      />
    </div>
  );
}

export default PageAddedIco
