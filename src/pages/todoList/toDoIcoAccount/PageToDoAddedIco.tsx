import { useNavigate, useParams } from "react-router-dom";
import AddedIcoInfo from "./AddedIcoInfo";
import { FooterPageIco } from "./FooterPageIco";
import AddedIcoDetail from "./AddedIcoDetail";
import AddedIcoKeyInfo from "./AddedIcoKeyInfo";
import AddedIcoCompany from "./AddedIcoCompany";
import "./addedico.css"
import AddedIssuance from "./AddedIssuance";
import { useDispatch } from "react-redux";
import { clearAssetData, setAssetData } from "@/features/addedIcoData/AddedIcoData";
import { getCookies } from "@/lib/Cookies";
import { useEffect } from "react";
import axios from "@/api/axios";
import { TAssetData } from "./types";
type TPage = {
    page?: string;
};
type TMapPages = {
    [key: number]: JSX.Element;
}
  
const ToDoPageAddedIco = () => {

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
      navigate(`/todo-list/added-ico/edit/${pageId + 1}`);
    }else if(type == "Done"){
      navigate(`/todo-list/added-ico`);
      dispatch(clearAssetData());
      localStorage.clear();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(`/todo-list/added-ico/edit/${pageId - 1}`);
    }
  };

  const dispatch = useDispatch();
  const token = getCookies();

//   const mockedData = {
//     "registerId": "1",
//     "asset": {
//         "id": "5c5796d5-3e6f-4a4a-91dc-e369d5dffbb9",
//         "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//         "CreatedAt": "2024-09-27T12:14:54+07:00",
//         "DeletedAt": null,
//         "registerId": 1,
//         "title": "Digital Asset",
//         "logo": "getImages",
//         "issueBy": "Issue By Digital Asset",
//         "image": "image",
//         "name": "THGG",
//         "description": "Blockchain Innovations Global (B.I.G.)",
//         "category": "",
//         "return": "18%",
//         "region": "Asia",
//         "minimum": "250.00 USD"
//     },
//     "info": {
//         "CreatedAt": "0001-01-01T00:00:00Z",
//         "DeletedAt": null,
//         "registerId": "1",
//         "totalIssuance": "1000.00 DA",
//         "totalAmountRaised": "50000.00 USD",
//         "contractInfomation": "0xC92Ff5e3A94...89e7e8a5b378b",
//         "minimumInvestmentAmount": "1000.00 USD",
//         "minimumInvestmentQuantity": "1.00 DA",
//         "issueUnitPrice": "100.00 USD"
//     },
//     "details": [
//         {
//             "id": "1c10823f-eb96-4ff2-bb04-bfd7f514f217",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-09-27T12:07:20+07:00",
//             "DeletedAt": null,
//             "registerId": 1,
//             "header": "Business Model",
//             "content": "Lorem laborum dolore laborum laboris enim officia labore est ex duis sunt occaecat excepteur dolore est officia qui mollit excepteur fugiat dolore esse anim enim eiusmod nulla enim duis Lorem dolor ullamco ut mollit est dolore voluptate ex mollit aliquip nisi pariatur nisi sunt sit aute voluptate sit nostrud eu ut est dolor minim ea quis sit in sit reprehenderit tempor qui laboris sunt exercitation enim ad ipsum ad anim culpa incididunt labore duis aliqua tempor pariatur consequat cillum Lorem ut fugiat in cupidatat est aliqua do laborum eiusmod duis eu occaecat fugiat incididunt veniam velit ut id voluptate reprehenderit fugiat excepteur et pariatur labore aliqua deserunt tempor cillum nulla reprehenderit voluptate ad sunt labore sunt officia elit deserunt enim eiusmod amet adipisicing ad est do dolor velit eu nostrud nulla Lorem et labore est tempor occaecat Lorem nostrud veniam occaecat in aliquip occaecat enim velit quis reprehenderit sunt officia"
//         },
//         {
//             "id": "61675878-eda2-455a-9d5d-87527e020c25",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-09-27T12:07:20+07:00",
//             "DeletedAt": null,
//             "registerId": 1,
//             "header": "Fundraising Milestone",
//             "content": "consequat elit deserunt dolore sint veniam nulla labore minim exercitation Lorem reprehenderit ut Lorem nisi quis exercitation exercitation incididunt eu sit irure sint fugiat cupidatat id voluptate aliqua aute sint nisi dolor nulla nisi aliqua pariatur ex in velit culpa irure esse adipisicing aliquip fugiat dolore nulla commodo tempor magna occaecat duis sint excepteur cupidatat sit irure ex occaecat do laboris Lorem veniam fugiat cillum cillum reprehenderit excepteur incididunt anim do eu fugiat dolor enim ipsum quis id mollit non et velit elit cillum deserunt nulla nulla adipisicing qui nulla quis irure do laborum duis consectetur nostrud eiusmod officia nostrud"
//         },
//         {
//             "id": "83adbb30-267d-4cb8-ab23-23c46bbdbb48",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-09-27T12:07:20+07:00",
//             "DeletedAt": null,
//             "registerId": 1,
//             "header": "Use of Proceeds",
//             "content": "aliqua nulla ullamco in mollit duis magna Lorem dolor dolor in laborum mollit enim et fugiat nostrud aliquip eiusmod ullamco laboris labore mollit aute excepteur laboris ullamco minim eiusmod Lorem pariatur non commodo magna elit ullamco labore ad ullamco dolor sit quis veniam ullamco duis laborum non dolor culpa qui Lorem enim ea officia sint aliquip in occaecat incididunt cupidatat incididunt officia enim deserunt Lorem cupidatat ut laboris ea eiusmod aute sunt aliquip excepteur incididunt fugiat fugiat sunt esse id eiusmod consequat esse nostrud deserunt incididunt sint consequat culpa officia consectetur dolore aute quis aliquip elit voluptate magna eu dolor occaecat quis magna ipsum pariatur occaecat ea consectetur esse reprehenderit adipisicing ea mollit labore non reprehenderit mollit occaecat nisi minim velit consequat ad ea culpa labore ea irure nostrud fugiat eu amet laborum veniam incididunt duis duis officia nostrud dolore commodo aliquip non fugiat eiusmod culpa in id sit ut"
//         },
//         {
//             "id": "c9594b10-771d-47dd-958f-9af81abe078c",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-09-27T12:07:20+07:00",
//             "DeletedAt": null,
//             "registerId": 1,
//             "header": "Company Information",
//             "content": "tempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur"
//         }
//     ],
//     "documents": null,
//     "images": null,
//     "videos": null,
//     "faq": [
//         {
//             "id": "3963e9b5-1863-4762-a62a-0c97591f8d2c",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-09-27T12:07:20+07:00",
//             "DeletedAt": null,
//             "registerId": 1,
//             "question": "How long is the investment period?",
//             "answer": "The investment period is 5 years."
//         },
//         {
//             "id": "718a03dc-6a1a-4eaf-bdd4-ca16ab321b87",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-09-27T12:07:20+07:00",
//             "DeletedAt": null,
//             "registerId": 1,
//             "question": "What is the minimum investment?",
//             "answer": "The minimum investment is $1000."
//         },
//         {
//             "id": "cfc96365-3084-4e9e-a330-bc33a85fa2a0",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-09-27T12:07:20+07:00",
//             "DeletedAt": null,
//             "registerId": 1,
//             "question": "What is the expected return?",
//             "answer": "The expected return is 10% annually."
//         }
//     ],
//     "keyInformation": {
//         "CreatedAt": "0001-01-01T00:00:00Z",
//         "DeletedAt": null,
//         "registerId": "1",
//         "network": "BNB Smart Chain Mainnet",
//         "precision": "5",
//         "capitalStructure": "Independent Fund",
//         "classiFication": "Retail Investor",
//         "productType": "Others",
//         "creationTime": "2023-01-01T00:00:00+07:00",
//         "releaseTime": "2023-02-01T00:00:00+07:00",
//         "compleationTime": "2023-03-01T00:00:00+07:00"
//     },
//     "issuanceTerms": {
//         "CreatedAt": "0001-01-01T00:00:00Z",
//         "DeletedAt": null,
//         "registerId": "1",
//         "investmentPeriod": "120 yays",
//         "dividendYield": "20.00 %",
//         "grossMargin": "20.00",
//         "equityMultiple": "5.00 %",
//         "profit": "15.00 %",
//         "leverage": "20.00 %",
//         "investmentStructure": "/",
//         "distributionFrequency": "Quarterly"
//     },
//     "companyMembers": [
//         {
//             "id": "4334c8cb-7d73-4f04-b2ed-f64b952a36aa",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-09-27T12:07:42+07:00",
//             "DeletedAt": null,
//             "registerId": 1,
//             "picture": "img.png",
//             "firstName": "Emily",
//             "midName": "C",
//             "lastName": "Johnson",
//             "position": "COO",
//             "history": "Emily has a strong background in operations and management."
//         },
//         {
//             "id": "c8850919-a0a6-4f5c-8f2a-12eeb460c06d",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-09-27T12:07:42+07:00",
//             "DeletedAt": null,
//             "registerId": 1,
//             "picture": "img.png",
//             "firstName": "John",
//             "midName": "A",
//             "lastName": "Doe",
//             "position": "CEO",
//             "history": "John has over 20 years of experience in the industry."
//         },
//         {
//             "id": "cc368a9b-cc15-46f2-bb66-132c28a39c53",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-09-27T12:07:42+07:00",
//             "DeletedAt": null,
//             "registerId": 1,
//             "picture": "img.png",
//             "firstName": "Jane",
//             "midName": "B",
//             "lastName": "Smith",
//             "position": "CFO",
//             "history": "Jane is a financial expert with a background in investment banking."
//         }
//     ]
// };
// dispatch(setAssetData(mockedData));

  const registerId = localStorage.getItem("registerId");
  const fetchData = async () => {
    try{
      const res = await axios.post("/api/v1/ico/query",{}, {
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        },
      })
      if(res.status == 200){
        const matchedData = res.data.find((item: { registerId: string }) => item.registerId === registerId);
        if (matchedData) {
          const assetData:TAssetData = matchedData;
          dispatch(setAssetData(assetData));
        }
      }
    }catch(error){
      console.log("can not query data", error)
    }

  }

  useEffect(() => {
    if(registerId){
      fetchData();
    }else{
      console.log("no registerId")
    }
  }, [pageId,token,dispatch]);

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

export default ToDoPageAddedIco
