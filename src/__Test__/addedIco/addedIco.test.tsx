import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import { fireEvent,render,screen, waitFor} from "@testing-library/react";
// import { Provider } from "react-redux";
// import { MemoryRouter } from "react-router-dom";
// import AddIndividualAccount from "@/pages/createJob/addIndividualAccount/addIndividualAccount";
import "@testing-library/jest-dom";
import AddedIcoInfo from "@/pages/createJob/addedICO/AddedIcoInfo";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { act } from "react";
import AddedIcoDetail from "@/pages/createJob/addedICO/AddedIcoDetail";
import AddedIcoKeyInfo from "@/pages/createJob/addedICO/AddedIcoKeyInfo";
import userEvent from "@testing-library/user-event";
import AddedIssuance from "@/pages/createJob/addedICO/AddedIssuance";
import AddedIcoCompany from "@/pages/createJob/addedICO/AddedIcoCompany";
import { clearAssetData, setAssetData } from "@/features/addedIcoData/AddedIcoData";

// import BasicInfo from "@/pages/createJob/addIndividualAccount/basicInfo/basicInfo";
// import SuitTestFatca from "@/pages/createJob/addIndividualAccount/suitTestFatca/suitTestFatca";
// import IdentityVerification from "@/pages/createJob/addIndividualAccount/identityVerification/identityVerification";
// import userEvent from "@testing-library/user-event";
// import { clearIndividualData, setIndividualData } from "@/features/fetchIndividualData/fetchIndividualDataSlice";
// import axios from "@/api/axios";
// import MockAdapter from "axios-mock-adapter";


jest.mock("@/lib/utils", () => ({
    ...jest.requireActual("@/lib/utils"),
    isExpiredToken: jest.fn().mockReturnValue(false),
}));

jest.mock("@/lib/Cookies", () => ({
  getCookies: jest.fn().mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhYjEyMmRjLTc3YzctNDlmYy04ZTBkLTg2NWVjYTY1MmI4MCIsImVtYWlsIjoiYjcwODk4NTY5ZWRjYjk5MjdhMDZkZDUxMTBmMWI4ZmUxZDQ2ZTVmOTg1ZTBkOWYyMjI0ZDc3NDg1NzU3ZjFlYSIsImdyb3VwcyI6WzEwMDEsMTAwMiwxMDAzLDIwMDEsMjAwMiwyMDAzXSwicGVybWlzc2lvbnMiOlsxMDEsMTAyLDEwMywyMDEsMjAyLDIwM10sInJvbGVzIjpbMTEsMTIsMTMsMjEsMjIsMjNdLCJ1c2VySWQiOiIiLCJsb2dpblN0YXR1cyI6IiIsImV4cGlyZXNEYXRlIjoiMDAwMS0wMS0wMVQwMDowMDowMFoiLCJFcnJvciI6bnVsbCwiZXhwIjoxNzI3MTY3MzQyLCJpYXQiOjE3MjcwODA5NDJ9.PWG3vMMN3POr-SWDnO4etQ5D1ZV2mX7D1Fzwsb8sfBg"),
}));

const mockedAssetData = {
  "icoCode": "1",
  "asset": {
      "id": "5c5796d5-3e6f-4a4a-91dc-e369d5dffbb9",
      "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
      "CreatedAt": "2024-09-27T12:14:54+07:00",
      "DeletedAt": null,
      "icoCode": 1,
      "title": "Digital Asset",
      "logo": "getImages",
      "issueBy": "Issue By Digital Asset",
      "image": "image",
      "name": "THGG",
      "description": "Blockchain Innovations Global (B.I.G.)",
      "category": "",
      "return": "18%",
      "region": "Asia",
      "minimum": "250.00 USD"
  },
  "info": {
      "CreatedAt": "0001-01-01T00:00:00Z",
      "DeletedAt": null,
      "icoCode": "1",
      "totalIssuance": "1000.00 DA",
      "totalAmountRaised": "50000.00 USD",
      "contractInfomation": "0xC92Ff5e3A94...89e7e8a5b378b",
      "minimumInvestmentAmount": "1000.00 USD",
      "minimumInvestmentQuantity": "1.00 DA",
      "issueUnitPrice": "100.00 USD"
  },
  "details": [
      {
          "id": "1c10823f-eb96-4ff2-bb04-bfd7f514f217",
          "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
          "CreatedAt": "2024-09-27T12:07:20+07:00",
          "DeletedAt": null,
          "icoCode": 1,
          "header": "Business Model",
          "content": "Lorem laborum dolore laborum laboris enim officia labore est ex duis sunt occaecat excepteur dolore est officia qui mollit excepteur fugiat dolore esse anim enim eiusmod nulla enim duis Lorem dolor ullamco ut mollit est dolore voluptate ex mollit aliquip nisi pariatur nisi sunt sit aute voluptate sit nostrud eu ut est dolor minim ea quis sit in sit reprehenderit tempor qui laboris sunt exercitation enim ad ipsum ad anim culpa incididunt labore duis aliqua tempor pariatur consequat cillum Lorem ut fugiat in cupidatat est aliqua do laborum eiusmod duis eu occaecat fugiat incididunt veniam velit ut id voluptate reprehenderit fugiat excepteur et pariatur labore aliqua deserunt tempor cillum nulla reprehenderit voluptate ad sunt labore sunt officia elit deserunt enim eiusmod amet adipisicing ad est do dolor velit eu nostrud nulla Lorem et labore est tempor occaecat Lorem nostrud veniam occaecat in aliquip occaecat enim velit quis reprehenderit sunt officia"
      },
      {
          "id": "61675878-eda2-455a-9d5d-87527e020c25",
          "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
          "CreatedAt": "2024-09-27T12:07:20+07:00",
          "DeletedAt": null,
          "icoCode": 1,
          "header": "Fundraising Milestone",
          "content": "consequat elit deserunt dolore sint veniam nulla labore minim exercitation Lorem reprehenderit ut Lorem nisi quis exercitation exercitation incididunt eu sit irure sint fugiat cupidatat id voluptate aliqua aute sint nisi dolor nulla nisi aliqua pariatur ex in velit culpa irure esse adipisicing aliquip fugiat dolore nulla commodo tempor magna occaecat duis sint excepteur cupidatat sit irure ex occaecat do laboris Lorem veniam fugiat cillum cillum reprehenderit excepteur incididunt anim do eu fugiat dolor enim ipsum quis id mollit non et velit elit cillum deserunt nulla nulla adipisicing qui nulla quis irure do laborum duis consectetur nostrud eiusmod officia nostrud"
      },
      {
          "id": "83adbb30-267d-4cb8-ab23-23c46bbdbb48",
          "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
          "CreatedAt": "2024-09-27T12:07:20+07:00",
          "DeletedAt": null,
          "icoCode": 1,
          "header": "Use of Proceeds",
          "content": "aliqua nulla ullamco in mollit duis magna Lorem dolor dolor in laborum mollit enim et fugiat nostrud aliquip eiusmod ullamco laboris labore mollit aute excepteur laboris ullamco minim eiusmod Lorem pariatur non commodo magna elit ullamco labore ad ullamco dolor sit quis veniam ullamco duis laborum non dolor culpa qui Lorem enim ea officia sint aliquip in occaecat incididunt cupidatat incididunt officia enim deserunt Lorem cupidatat ut laboris ea eiusmod aute sunt aliquip excepteur incididunt fugiat fugiat sunt esse id eiusmod consequat esse nostrud deserunt incididunt sint consequat culpa officia consectetur dolore aute quis aliquip elit voluptate magna eu dolor occaecat quis magna ipsum pariatur occaecat ea consectetur esse reprehenderit adipisicing ea mollit labore non reprehenderit mollit occaecat nisi minim velit consequat ad ea culpa labore ea irure nostrud fugiat eu amet laborum veniam incididunt duis duis officia nostrud dolore commodo aliquip non fugiat eiusmod culpa in id sit ut"
      },
      {
          "id": "c9594b10-771d-47dd-958f-9af81abe078c",
          "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
          "CreatedAt": "2024-09-27T12:07:20+07:00",
          "DeletedAt": null,
          "icoCode": 1,
          "header": "Company Information",
          "content": "tempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur"
      }
  ],
  "documents": null,
  "images": null,
  "videos": null,
  "faq": [
      {
          "id": "3963e9b5-1863-4762-a62a-0c97591f8d2c",
          "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
          "CreatedAt": "2024-09-27T12:07:20+07:00",
          "DeletedAt": null,
          "icoCode": 1,
          "question": "How long is the investment period?",
          "answer": "The investment period is 5 years."
      },
      {
          "id": "718a03dc-6a1a-4eaf-bdd4-ca16ab321b87",
          "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
          "CreatedAt": "2024-09-27T12:07:20+07:00",
          "DeletedAt": null,
          "icoCode": 1,
          "question": "What is the minimum investment?",
          "answer": "The minimum investment is $1000."
      },
      {
          "id": "cfc96365-3084-4e9e-a330-bc33a85fa2a0",
          "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
          "CreatedAt": "2024-09-27T12:07:20+07:00",
          "DeletedAt": null,
          "icoCode": 1,
          "question": "What is the expected return?",
          "answer": "The expected return is 10% annually."
      }
  ],
  "keyInformation": {
      "CreatedAt": "0001-01-01T00:00:00Z",
      "DeletedAt": null,
      "icoCode": "1",
      "network": "BNB Smart Chain Mainnet",
      "precision": "5",
      "capitalStructure": "Independent Fund",
      "classiFication": "Retail Investor",
      "productType": "Others",
      "creationTime": "2023-01-01T00:00:00+07:00",
      "releaseTime": "2023-02-01T00:00:00+07:00",
      "compleationTime": "2023-03-01T00:00:00+07:00"
  },
  "issuanceTerms": {
      "CreatedAt": "0001-01-01T00:00:00Z",
      "DeletedAt": null,
      "icoCode": "1",
      "investmentPeriod": "120 Days",
      "dividendYield": "20.00 %",
      "grossmargin": "20.00",
      "equityMultiple": "5.00 %",
      "profit": "15.00 %",
      "leverage": "20.00 %",
      "investmentStructure": "/",
      "distributionFrequency": "Quarterly"
  },
  "companyMembers": [
      {
          "id": "4334c8cb-7d73-4f04-b2ed-f64b952a36aa",
          "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
          "CreatedAt": "2024-09-27T12:07:42+07:00",
          "DeletedAt": null,
          "icoCode": 1,
          "picture": "img.png",
          "firstName": "Emily",
          "midName": "C",
          "lastName": "Johnson",
          "position": "COO",
          "history": "Emily has a strong background in operations and management."
      },
      {
          "id": "c8850919-a0a6-4f5c-8f2a-12eeb460c06d",
          "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
          "CreatedAt": "2024-09-27T12:07:42+07:00",
          "DeletedAt": null,
          "icoCode": 1,
          "picture": "img.png",
          "firstName": "John",
          "midName": "A",
          "lastName": "Doe",
          "position": "CEO",
          "history": "John has over 20 years of experience in the industry."
      },
      {
          "id": "cc368a9b-cc15-46f2-bb66-132c28a39c53",
          "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
          "CreatedAt": "2024-09-27T12:07:42+07:00",
          "DeletedAt": null,
          "icoCode": 1,
          "picture": "img.png",
          "firstName": "Jane",
          "midName": "B",
          "lastName": "Smith",
          "position": "CFO",
          "history": "Jane is a financial expert with a background in investment banking."
      }
  ]
}

describe("test ico form1",()=>{

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  })

  test("test ico form1 create", async ()=>{
    render(
        <Provider store={store}>
          <MemoryRouter>
            <AddedIcoInfo/>
          </MemoryRouter>
        </Provider>
    );

    const issueBy = screen.getByPlaceholderText("Issue By*");
    expect(issueBy).toBeInTheDocument();
    expect(issueBy).toHaveValue("");
    fireEvent.change(issueBy, { target: { value: "issue by name" } })
    expect(issueBy).toHaveValue("issue by name");

    const companyName = screen.getByPlaceholderText("Company Name*");
    expect(companyName).toBeInTheDocument();
    expect(companyName).toHaveValue("");
    fireEvent.change(companyName, { target: { value: "Digital Asset" } })
    expect(companyName).toHaveValue("Digital Asset");

    const description = screen.getByPlaceholderText("Description*");
    expect(description).toBeInTheDocument();
    expect(description).toHaveValue("");
    fireEvent.change(description, { target: { value: "complement description" } })
    expect(description).toHaveValue("complement description");

    const productCategory = screen.getByPlaceholderText("Product Category*");
    expect(productCategory).toBeInTheDocument();
    expect(productCategory).toHaveValue("");
    fireEvent.change(productCategory, { target: { value: "catagory HoJ" } })
    expect(productCategory).toHaveValue("catagory HoJ");

    const expectReturn = screen.getByPlaceholderText("Expect Return*");
    expect(expectReturn).toBeInTheDocument();
    expect(expectReturn).toHaveValue("");
    fireEvent.change(expectReturn, { target: { value: "5000" } })
    expect(expectReturn).toHaveValue("5000");

    const region = screen.getByPlaceholderText("Region*");
    expect(region).toBeInTheDocument();
    expect(region).toHaveValue("");
    fireEvent.change(region, { target: { value: "asia" } })
    expect(region).toHaveValue("asia");

    const subscription = screen.getByPlaceholderText("Minimum Subscription Limit*");
    expect(subscription).toBeInTheDocument();
    expect(subscription).toHaveValue("");
    fireEvent.change(subscription, { target: { value: "3" } })
    expect(subscription).toHaveValue("3");

    const totleIssuance = screen.getByLabelText("Total Issuance");
    expect(totleIssuance).toBeInTheDocument();
    expect(totleIssuance).toHaveValue("");
    fireEvent.change(totleIssuance, { target: { value: "5" } })
    expect(totleIssuance).toHaveValue("5");

    const totalAmountRaised = screen.getByLabelText("Total Amount Raised");
    expect(totalAmountRaised).toBeInTheDocument();
    expect(totalAmountRaised).toHaveValue("");
    fireEvent.change(totalAmountRaised, { target: { value: "100000" } })
    expect(totalAmountRaised).toHaveValue("100000");

    const contactInfomation = screen.getByLabelText("Contract Infomation");
    expect(contactInfomation).toBeInTheDocument();
    expect(contactInfomation).toHaveValue("");
    fireEvent.change(contactInfomation, { target: { value: "contact info" } })
    expect(contactInfomation).toHaveValue("contact info");

    const minimumInvestmentAmount = screen.getByLabelText("Minimum Investment Amount");
    expect(minimumInvestmentAmount).toBeInTheDocument();
    expect(minimumInvestmentAmount).toHaveValue("");
    fireEvent.change(minimumInvestmentAmount, { target: { value: "1000" } })
    expect(minimumInvestmentAmount).toHaveValue("1000");

    const minimumInvestmentQuantity = screen.getByLabelText("Minimum Investment Quantity");
    expect(minimumInvestmentQuantity).toBeInTheDocument();
    expect(minimumInvestmentQuantity).toHaveValue("");
    fireEvent.change(minimumInvestmentQuantity, { target: { value: "5" } })
    expect(minimumInvestmentQuantity).toHaveValue("5");

    const issueUnitPrice = screen.getByLabelText("Issue Unit Price");
    expect(issueUnitPrice).toBeInTheDocument();
    expect(issueUnitPrice).toHaveValue("");
    fireEvent.change(issueUnitPrice, { target: { value: "100" } })
    expect(issueUnitPrice).toHaveValue("100");

    const uploadPicture = screen.getByTestId("uploadPicture");
    expect(uploadPicture).toBeInTheDocument();

    const file = new File(['file content'], 'example.txt', { type: 'text/plain' });
    fireEvent.change(uploadPicture, { target: { files: [file] } });

    await waitFor(() => {
      const uploadedFile = screen.queryByText('File uploaded successfully');
      expect(uploadedFile).toBeInTheDocument();
    });

    const nextFormBtn = screen.getByText("Next Form");
    expect(nextFormBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(nextFormBtn);
    })

    //  Expected form data
    const expectedFormData = {
        data: {
            asset: {
              issueBy: 'issue by name',
              name: 'Digital Asset',
              description: 'complement description',
              catagory: 'catagory HoJ',
              return: '5000',
              region: 'asia',
              minimum: '3',
              //the body is a unit8array format
              image:"ZmlsZSBjb250ZW50",
              logo: 'fixed image',
              title: 'Elite Consulting'
            },
            info: {
              totalIssuance: '5',
              totalAmountRaised: '100000',
              contractInfomation: 'contact info',
              minimumInvestmentAmount: '1000',
              minimumInvestmentQuantity: '5',
              issueUnitPrice: '100'
            }
          }
    };

    await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
    })

    test("test ico form1 edit", async ()=>{

      localStorage.setItem("icoCode", "1");
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));

      render(
          <Provider store={store}>
            <MemoryRouter>
              <AddedIcoInfo/>
            </MemoryRouter>
          </Provider>
      );
  
      const issueBy = screen.getByPlaceholderText("Issue By*");
      expect(issueBy).toBeInTheDocument();
      expect(issueBy).toHaveValue("");
      fireEvent.change(issueBy, { target: { value: "issue by name" } })
      expect(issueBy).toHaveValue("issue by name");
  
      const companyName = screen.getByPlaceholderText("Company Name*");
      expect(companyName).toBeInTheDocument();
      expect(companyName).toHaveValue("");
      fireEvent.change(companyName, { target: { value: "Digital Asset" } })
      expect(companyName).toHaveValue("Digital Asset");
  
      const description = screen.getByPlaceholderText("Description*");
      expect(description).toBeInTheDocument();
      expect(description).toHaveValue("");
      fireEvent.change(description, { target: { value: "complement description" } })
      expect(description).toHaveValue("complement description");
  
      const productCategory = screen.getByPlaceholderText("Product Category*");
      expect(productCategory).toBeInTheDocument();
      expect(productCategory).toHaveValue("");
      fireEvent.change(productCategory, { target: { value: "catagory HoJ" } })
      expect(productCategory).toHaveValue("catagory HoJ");
  
      const expectReturn = screen.getByPlaceholderText("Expect Return*");
      expect(expectReturn).toBeInTheDocument();
      expect(expectReturn).toHaveValue("");
      fireEvent.change(expectReturn, { target: { value: "5000" } })
      expect(expectReturn).toHaveValue("5000");
  
      const region = screen.getByPlaceholderText("Region*");
      expect(region).toBeInTheDocument();
      expect(region).toHaveValue("");
      fireEvent.change(region, { target: { value: "asia" } })
      expect(region).toHaveValue("asia");
  
      const subscription = screen.getByPlaceholderText("Minimum Subscription Limit*");
      expect(subscription).toBeInTheDocument();
      expect(subscription).toHaveValue("");
      fireEvent.change(subscription, { target: { value: "3" } })
      expect(subscription).toHaveValue("3");
  
      const totleIssuance = screen.getByLabelText("Total Issuance");
      expect(totleIssuance).toBeInTheDocument();
      expect(totleIssuance).toHaveValue("");
      fireEvent.change(totleIssuance, { target: { value: "5" } })
      expect(totleIssuance).toHaveValue("5");
  
      const totalAmountRaised = screen.getByLabelText("Total Amount Raised");
      expect(totalAmountRaised).toBeInTheDocument();
      expect(totalAmountRaised).toHaveValue("");
      fireEvent.change(totalAmountRaised, { target: { value: "100000" } })
      expect(totalAmountRaised).toHaveValue("100000");
  
      const contactInfomation = screen.getByLabelText("Contract Infomation");
      expect(contactInfomation).toBeInTheDocument();
      expect(contactInfomation).toHaveValue("");
      fireEvent.change(contactInfomation, { target: { value: "contact info" } })
      expect(contactInfomation).toHaveValue("contact info");
  
      const minimumInvestmentAmount = screen.getByLabelText("Minimum Investment Amount");
      expect(minimumInvestmentAmount).toBeInTheDocument();
      expect(minimumInvestmentAmount).toHaveValue("");
      fireEvent.change(minimumInvestmentAmount, { target: { value: "1000" } })
      expect(minimumInvestmentAmount).toHaveValue("1000");
  
      const minimumInvestmentQuantity = screen.getByLabelText("Minimum Investment Quantity");
      expect(minimumInvestmentQuantity).toBeInTheDocument();
      expect(minimumInvestmentQuantity).toHaveValue("");
      fireEvent.change(minimumInvestmentQuantity, { target: { value: "5" } })
      expect(minimumInvestmentQuantity).toHaveValue("5");
  
      const issueUnitPrice = screen.getByLabelText("Issue Unit Price");
      expect(issueUnitPrice).toBeInTheDocument();
      expect(issueUnitPrice).toHaveValue("");
      fireEvent.change(issueUnitPrice, { target: { value: "100" } })
      expect(issueUnitPrice).toHaveValue("100");
  
      const nextFormBtn = screen.getByText("Next Form");
      expect(nextFormBtn).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(nextFormBtn);
      })
  
      //  Expected form data
      const expectedFormData = {
        data: {
          asset: {
            issueBy: 'issue by name',
            name: 'Digital Asset',
            description: 'complement description',
            catagory: 'catagory HoJ',
            return: '5000',
            region: 'asia',
            minimum: '3',
            icoCode: '1',
            image: null,
            logo: 'fixed image',
            title: 'Elite Consulting'
          },
          info: {
            totalIssuance: '5',
            totalAmountRaised: '100000',
            contractInfomation: 'contact info',
            minimumInvestmentAmount: '1000',
            minimumInvestmentQuantity: '5',
            issueUnitPrice: '100',
            icoCode: '1'
          }
        }
      };
  
      await waitFor(() => {
          const state = store.getState();
          const corporateState = state.corporateTest;
          console.log("Corporate State After Submission:", corporateState);
          expect(corporateState).toMatchObject(expectedFormData);
      });

      localStorage.clear();
      
    })

      test("test ico form1 autofill", async ()=>{

        localStorage.setItem("icoCode", "1");
        jest.clearAllMocks();
        store.dispatch(setUser(mockUser));
        store.dispatch(setAssetData(mockedAssetData));
  
        render(
            <Provider store={store}>
              <MemoryRouter>
                <AddedIcoInfo/>
              </MemoryRouter>
            </Provider>
        );

        const nextFormBtn = screen.getByText("Next Form");
        expect(nextFormBtn).toBeInTheDocument();
        await act(async () => {
          fireEvent.click(nextFormBtn);
        })
    
        //  Expected form data
        const expectedFormData = {
          data: {
            asset: {
              issueBy: 'issue by name',
              name: 'Digital Asset',
              description: 'complement description',
              catagory: 'catagory HoJ',
              return: '5000',
              region: 'asia',
              minimum: '3',
              icoCode: '1',
              image: null,
              logo: 'fixed image',
              title: 'Elite Consulting'
            },
            info: {
              totalIssuance: '5',
              totalAmountRaised: '100000',
              contractInfomation: 'contact info',
              minimumInvestmentAmount: '1000',
              minimumInvestmentQuantity: '5',
              issueUnitPrice: '100',
              icoCode: '1'
            }
          }
        };
    
        await waitFor(() => {
            const state = store.getState();
            const corporateState = state.corporateTest;
            console.log("Corporate State After Submission:", corporateState);
            expect(corporateState).toMatchObject(expectedFormData);
        });

        localStorage.clear();
        store.dispatch(clearAssetData());
    })
})

describe("test ico form2",()=>{

    beforeAll(() => {
        localStorage.setItem('icoCode', '1');
      })
      afterAll(() => {
        localStorage.clear();
      })

    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    })

    test("test ico form2 create", async ()=>{

        render(
            <Provider store={store}>
              <MemoryRouter>
                <AddedIcoDetail/>
              </MemoryRouter>
            </Provider>
        );

        const companyInformation = screen.getByPlaceholderText("Write your company information here...");
        expect(companyInformation).toBeInTheDocument();
        expect(companyInformation).toHaveValue("");
        fireEvent.change(companyInformation, { target: { value: "company information" } })
        expect(companyInformation).toHaveValue("company information");

        const businessModel = screen.getByPlaceholderText("Write your business model here...");
        expect(businessModel).toBeInTheDocument();
        expect(businessModel).toHaveValue("");
        fireEvent.change(businessModel, { target: { value: "business model" } })
        expect(businessModel).toHaveValue("business model");

        const useOfProceeds = screen.getByPlaceholderText("Write your use of proceeds here...");
        expect(useOfProceeds).toBeInTheDocument();
        expect(useOfProceeds).toHaveValue("");
        fireEvent.change(useOfProceeds, { target: { value: "use of proceeds" } })
        expect(useOfProceeds).toHaveValue("use of proceeds");

        const fundraisingMilestone = screen.getByPlaceholderText("Write your fundraising milestone here...");
        expect(fundraisingMilestone).toBeInTheDocument();
        expect(fundraisingMilestone).toHaveValue("");
        fireEvent.change(fundraisingMilestone, { target: { value: "fundraising milestone" } })
        expect(fundraisingMilestone).toHaveValue("fundraising milestone");

        const faqQuestion = screen.getByTestId("faq-question-1");
        expect(faqQuestion).toBeInTheDocument();
        expect(faqQuestion).toHaveValue("");
        fireEvent.change(faqQuestion, { target: { value: "faq question" } })
        expect(faqQuestion).toHaveValue("faq question");

        const faqAnswer = screen.getByTestId("faq-answer-1");
        expect(faqAnswer).toBeInTheDocument();
        expect(faqAnswer).toHaveValue("");
        fireEvent.change(faqAnswer, { target: { value: "faq answer" } })
        expect(faqAnswer).toHaveValue("faq answer");

        const addFaqBtn = screen.getByTestId("addFaqBtn");
        expect(addFaqBtn).toBeInTheDocument();
        await act(async () => {
          fireEvent.click(addFaqBtn);
        })

        await waitFor(() => {
            expect(screen.getByTestId("faq-question-2")).toBeInTheDocument();
            expect(screen.getByTestId("faq-answer-2")).toBeInTheDocument();
        })

        const nextFormBtn = screen.getByText("Next Form");
        expect(nextFormBtn).toBeInTheDocument();
        await act(async () => {
        fireEvent.click(nextFormBtn);
        })

    //  Expected form data
    const expectedFormData = {
        data: {
            faq: [
              { answer: 'faq answer', question: 'faq question', icoCode: '1' },
              { answer: '', question: '', icoCode: '1' }
            ],
            details: [
              {
                icoCode: '1',
                header: 'Company Information',
                content: 'company information'
              },
              {
                icoCode: '1',
                header: 'Business Model',
                content: 'business model'
              },
              {
                icoCode: '1',
                header: 'Use of Proceeds',
                content: 'use of proceeds'
              },
              {
                icoCode: '1',
                header: 'Fundraising Milestone',
                content: 'fundraising milestone'
              }
            ]
          }
    };

    await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
  })
  
  test("test ico form2 autofill and edit", async ()=>{

      localStorage.setItem("icoCode", "1");
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
      store.dispatch(setAssetData(mockedAssetData));

      render(
          <Provider store={store}>
            <MemoryRouter>
              <AddedIcoDetail/>
            </MemoryRouter>
          </Provider>
      );

      const nextFormBtn = screen.getByText("Next Form");
      expect(nextFormBtn).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(nextFormBtn);
      })
  
      //  Expected form data
      const expectedFormData = {
        data: {
          faq: [
            {
              id: '3963e9b5-1863-4762-a62a-0c97591f8d2c',
              createBy: '163e6a07-bd7d-453d-9f57-c7ca8d7e34ba',
              CreatedAt: '2024-09-27T12:07:20+07:00',
              DeletedAt: null,
              icoCode: '1',
              question: 'How long is the investment period?',
              answer: 'The investment period is 5 years.'
            },
            {
              id: '718a03dc-6a1a-4eaf-bdd4-ca16ab321b87',
              createBy: '163e6a07-bd7d-453d-9f57-c7ca8d7e34ba',
              CreatedAt: '2024-09-27T12:07:20+07:00',
              DeletedAt: null,
              icoCode: '1',
              question: 'What is the minimum investment?',
              answer: 'The minimum investment is $1000.'
            },
            {
              id: 'cfc96365-3084-4e9e-a330-bc33a85fa2a0',
              createBy: '163e6a07-bd7d-453d-9f57-c7ca8d7e34ba',
              CreatedAt: '2024-09-27T12:07:20+07:00',
              DeletedAt: null,
              icoCode: '1',
              question: 'What is the expected return?',
              answer: 'The expected return is 10% annually.'
            }
          ],
          details: [
            {
              icoCode: '1',
              header: 'Company Information',
              content: 
                'tempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur'
            },
            {
              icoCode: '1',
              header: 'Business Model',
              content: 
                'Lorem laborum dolore laborum laboris enim officia labore est ex duis sunt occaecat excepteur dolore est officia qui mollit excepteur fugiat dolore esse anim enim eiusmod nulla enim duis Lorem dolor ullamco ut mollit est dolore voluptate ex mollit aliquip nisi pariatur nisi sunt sit aute voluptate sit nostrud eu ut est dolor minim ea quis sit in sit reprehenderit tempor qui laboris sunt exercitation enim ad ipsum ad anim culpa incididunt labore duis aliqua tempor pariatur consequat cillum Lorem ut fugiat in cupidatat est aliqua do laborum eiusmod duis eu occaecat fugiat incididunt veniam velit ut id voluptate reprehenderit fugiat excepteur et pariatur labore aliqua deserunt tempor cillum nulla reprehenderit voluptate ad sunt labore sunt officia elit deserunt enim eiusmod amet adipisicing ad est do dolor velit eu nostrud nulla Lorem et labore est tempor occaecat Lorem nostrud veniam occaecat in aliquip occaecat enim velit quis reprehenderit sunt officia'
            },
            {
              icoCode: '1',
              header: 'Use of Proceeds',
              content: 
                'aliqua nulla ullamco in mollit duis magna Lorem dolor dolor in laborum mollit enim et fugiat nostrud aliquip eiusmod ullamco laboris labore mollit aute excepteur laboris ullamco minim eiusmod Lorem pariatur non commodo magna elit ullamco labore ad ullamco dolor sit quis veniam ullamco duis laborum non dolor culpa qui Lorem enim ea officia sint aliquip in occaecat incididunt cupidatat incididunt officia enim deserunt Lorem cupidatat ut laboris ea eiusmod aute sunt aliquip excepteur incididunt fugiat fugiat sunt esse id eiusmod consequat esse nostrud deserunt incididunt sint consequat culpa officia consectetur dolore aute quis aliquip elit voluptate magna eu dolor occaecat quis magna ipsum pariatur occaecat ea consectetur esse reprehenderit adipisicing ea mollit labore non reprehenderit mollit occaecat nisi minim velit consequat ad ea culpa labore ea irure nostrud fugiat eu amet laborum veniam incididunt duis duis officia nostrud dolore commodo aliquip non fugiat eiusmod culpa in id sit ut'
            },
            {
              icoCode: '1',
              header: 'Fundraising Milestone',
              content: 
                'consequat elit deserunt dolore sint veniam nulla labore minim exercitation Lorem reprehenderit ut Lorem nisi quis exercitation exercitation incididunt eu sit irure sint fugiat cupidatat id voluptate aliqua aute sint nisi dolor nulla nisi aliqua pariatur ex in velit culpa irure esse adipisicing aliquip fugiat dolore nulla commodo tempor magna occaecat duis sint excepteur cupidatat sit irure ex occaecat do laboris Lorem veniam fugiat cillum cillum reprehenderit excepteur incididunt anim do eu fugiat dolor enim ipsum quis id mollit non et velit elit cillum deserunt nulla nulla adipisicing qui nulla quis irure do laborum duis consectetur nostrud eiusmod officia nostrud'
            }
          ]
        }
      };
  
      await waitFor(() => {
          const state = store.getState();
          const corporateState = state.corporateTest;
          console.log("Corporate State After Submission:", corporateState);
          expect(corporateState).toMatchObject(expectedFormData);
      });

      localStorage.clear();
      store.dispatch(clearAssetData());
  })
})

describe("test ico form3",()=>{

    beforeAll(() => {
        localStorage.setItem('icoCode', '1');
      })
      afterAll(() => {
        localStorage.clear();
      })

    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    })

    test("test ico form3 create", async ()=>{

        render(
            <Provider store={store}>
              <MemoryRouter>
                <AddedIcoKeyInfo/>
              </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText("Key Information")).toBeInTheDocument();
        expect(screen.getByTestId("keyInformation-0")).toBeInTheDocument();

        const dropDownKeyInformationBtn = screen.getByTestId("dropDownKeyInformationBtn-0");
        expect(dropDownKeyInformationBtn).toBeInTheDocument();
        
        userEvent.selectOptions(
          screen.getByTestId('dropDownKeyInformationBtn-0'),
          screen.getByTestId('Network-0'),
        )
        expect(screen.getByTestId('Network-0')).toBeInTheDocument();
  
        await waitFor(() => {
          const inputTypeSelector = screen.getByTestId("inputTypeSelector-0") as HTMLInputElement;
          expect(inputTypeSelector).toBeInTheDocument();

          userEvent.selectOptions(
            screen.getByTestId('inputTypeSelector-0'),
            screen.getByTestId('BNB Smart Chain Mainnet-0'),
          )
          expect(screen.getByTestId('BNB Smart Chain Mainnet-0')).toBeInTheDocument();
        });

        await act(async ()=>{
          fireEvent.click(screen.getByTestId("addKeyInformationBtn-0"));
        })

        userEvent.selectOptions(
          screen.getByTestId('dropDownKeyInformationBtn-1'),
          screen.getByTestId('Precision-1'),
        )

        expect(screen.getByTestId('Precision-1')).toBeInTheDocument();

        await waitFor(() => {
          const inputTypeText = screen.getByTestId("inputTypeText-1") as HTMLInputElement;
          expect(inputTypeText).toBeInTheDocument();
          fireEvent.change(inputTypeText, { target: { value: "test" } });
        });

        await act(async ()=>{
          fireEvent.click(screen.getByTestId("addKeyInformationBtn-1"));
        })

        userEvent.selectOptions(
          screen.getByTestId('dropDownKeyInformationBtn-2'),
          screen.getByTestId('Capital Structure-2'),
        )
        expect(screen.getByTestId('Capital Structure-2')).toBeInTheDocument();

        await waitFor(() => {
          const inputTypeText = screen.getByTestId("inputTypeText-2") as HTMLInputElement;
          expect(inputTypeText).toBeInTheDocument();
          fireEvent.change(inputTypeText, { target: { value: "test" } });
        });

        await act(async ()=>{
          fireEvent.click(screen.getByTestId("addKeyInformationBtn-2"));
        })

        userEvent.selectOptions(
          screen.getByTestId('dropDownKeyInformationBtn-3'),
          screen.getByTestId('Classification-3'),
        )
        expect(screen.getByTestId('Classification-3')).toBeInTheDocument();

        await waitFor(() => {
          const inputTypeText = screen.getByTestId("inputTypeText-3") as HTMLInputElement;
          expect(inputTypeText).toBeInTheDocument();
          fireEvent.change(inputTypeText, { target: { value: "test" } });
        });

        await act(async ()=>{
          fireEvent.click(screen.getByTestId("addKeyInformationBtn-3"));
        })

        userEvent.selectOptions(
          screen.getByTestId('dropDownKeyInformationBtn-4'),
          screen.getByTestId('Product Type-4'),
        )
        expect(screen.getByTestId('Product Type-4')).toBeInTheDocument();

        await waitFor(() => {
          const inputTypeText = screen.getByTestId("inputTypeText-4") as HTMLInputElement;
          expect(inputTypeText).toBeInTheDocument();
          fireEvent.change(inputTypeText, { target: { value: "test" } });
        });

        await act(async ()=>{
          fireEvent.click(screen.getByTestId("addKeyInformationBtn-4"));
        })

        userEvent.selectOptions(
          screen.getByTestId('dropDownKeyInformationBtn-5'),
          screen.getByTestId('Creation Time-5'),
        )
        expect(screen.getByTestId('Creation Time-5')).toBeInTheDocument();

        await waitFor(() => {
          const inputTypeDate = screen.getByTestId("inputTypeDate-5") as HTMLInputElement;
          expect(inputTypeDate).toBeInTheDocument();
          fireEvent.change(inputTypeDate, { target: { value: "2022-01-01" } });
        });

        await act(async ()=>{
          fireEvent.click(screen.getByTestId("addKeyInformationBtn-5"));
        })

        userEvent.selectOptions(
          screen.getByTestId('dropDownKeyInformationBtn-6'),
          screen.getByTestId('Release Time-6'),
        )
        expect(screen.getByTestId('Release Time-6')).toBeInTheDocument();

        await waitFor(() => {
          const inputTypeDate = screen.getByTestId("inputTypeDate-6") as HTMLInputElement;
          expect(inputTypeDate).toBeInTheDocument();
          fireEvent.change(inputTypeDate, { target: { value: "2022-01-01" } });
        });

        await act(async ()=>{
          fireEvent.click(screen.getByTestId("addKeyInformationBtn-6"));
        })

        userEvent.selectOptions(
          screen.getByTestId('dropDownKeyInformationBtn-7'),
          screen.getByTestId('Completion Time-7'),
        )
        expect(screen.getByTestId('Completion Time-7')).toBeInTheDocument();

        await waitFor(() => {
          const inputTypeDate = screen.getByTestId("inputTypeDate-7") as HTMLInputElement;
          expect(inputTypeDate).toBeInTheDocument();
          fireEvent.change(inputTypeDate, { target: { value: "2022-01-01" } });
        });

        const nextFormBtn = screen.getByText("Next Form");
        expect(nextFormBtn).toBeInTheDocument();
        await act(async () => {
        fireEvent.click(nextFormBtn);
        })

    //  Expected form data
    const expectedFormData = {
      data: {
        keyInformation: {
          icoCode: '1',
          network: 'BNB Smart Chain Mainnet',
          precision: 'test',
          capitalStructure: 'test',
          classiFication: 'test',
          productType: 'test',
          creationTime: '2022-01-01T00:00:00.000Z',
          releaseTime: '2022-01-01T00:00:00.000Z',
          compleationTime: '2022-01-01T00:00:00.000Z'
        }
      }
    };

    await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
    })

    test("test ico form3 autofill and edit", async ()=>{

      localStorage.setItem("icoCode", "1");
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
      store.dispatch(setAssetData(mockedAssetData));

      render(
          <Provider store={store}>
            <MemoryRouter>
              <AddedIcoKeyInfo/>
            </MemoryRouter>
          </Provider>
      );

      const nextFormBtn = screen.getByText("Next Form");
      expect(nextFormBtn).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(nextFormBtn);
      })
  
      //  Expected form data
      const expectedFormData = {
        data: {
          keyInformation: {
            icoCode: '1',
            network: 'BNB Smart Chain Mainnet',
            precision: '5',
            capitalStructure: 'Independent Fund',
            classiFication: 'Retail Investor',
            productType: 'Others',
            creationTime: '2023-01-01T00:00:00.000Z',
            releaseTime: '2023-02-01T00:00:00.000Z',
            compleationTime: '2023-03-01T00:00:00.000Z'
          }
        }
      };
  
      await waitFor(() => {
          const state = store.getState();
          const corporateState = state.corporateTest;
          console.log("Corporate State After Submission:", corporateState);
          expect(corporateState).toMatchObject(expectedFormData);
      });

      localStorage.clear();
      store.dispatch(clearAssetData());
  })

})

describe("test ico form4",()=>{

  beforeAll(() => {
      localStorage.setItem('icoCode', '1');
    })
    afterAll(() => {
      localStorage.clear();
    })

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  })

  test("test ico form4 create", async ()=>{

      render(
          <Provider store={store}>
            <MemoryRouter>
              <AddedIssuance/>
            </MemoryRouter>
          </Provider>
      );

      expect(screen.getByText("Issuance Terms")).toBeInTheDocument();
      expect(screen.getByTestId("issuanceTerms-0")).toBeInTheDocument();

      const dropDownIssuanceTermsBtn = screen.getByTestId("dropDownIssuanceTermsBtn-0");
      expect(dropDownIssuanceTermsBtn).toBeInTheDocument();
      
      userEvent.selectOptions(
        screen.getByTestId('dropDownIssuanceTermsBtn-0'),
        screen.getByTestId('Investment Period-0'),
      )

      expect(screen.getByTestId('Investment Period-0')).toBeInTheDocument();

      await waitFor(() => {
        const inputTypeText = screen.getByTestId("inputTypeText-0") as HTMLInputElement;
        expect(inputTypeText).toBeInTheDocument();
        fireEvent.change(inputTypeText, { target: { value: "test" } });
      });

      await act(async ()=>{
        fireEvent.click(screen.getByTestId("addIssuanceTermsBtn-0"));
      })
      
      userEvent.selectOptions(
        screen.getByTestId('dropDownIssuanceTermsBtn-1'),
        screen.getByTestId('Dividend Yield-1'),
      )

      expect(screen.getByTestId('Dividend Yield-1')).toBeInTheDocument();

      await waitFor(() => {
        const inputTypeText = screen.getByTestId("inputTypeText-1") as HTMLInputElement;
        expect(inputTypeText).toBeInTheDocument();
        fireEvent.change(inputTypeText, { target: { value: "test" } });
      });

      await act(async ()=>{
        fireEvent.click(screen.getByTestId("addIssuanceTermsBtn-1"));
      })

      userEvent.selectOptions(
        screen.getByTestId('dropDownIssuanceTermsBtn-2'),
        screen.getByTestId('Gross Margin-2'),
      )

      expect(screen.getByTestId('Gross Margin-2')).toBeInTheDocument();

      await waitFor(() => {
        const inputTypeText = screen.getByTestId("inputTypeText-2") as HTMLInputElement;
        expect(inputTypeText).toBeInTheDocument();
        fireEvent.change(inputTypeText, { target: { value: "test" } });
      });

      await act(async ()=>{
        fireEvent.click(screen.getByTestId("addIssuanceTermsBtn-2"));
      })

      userEvent.selectOptions(
        screen.getByTestId('dropDownIssuanceTermsBtn-3'),
        screen.getByTestId('Equity Multiple-3'),
      )

      expect(screen.getByTestId('Equity Multiple-3')).toBeInTheDocument();

      await waitFor(() => {
        const inputTypeText = screen.getByTestId("inputTypeText-3") as HTMLInputElement;
        expect(inputTypeText).toBeInTheDocument();
        fireEvent.change(inputTypeText, { target: { value: "test" } });
      });

      await act(async ()=>{
        fireEvent.click(screen.getByTestId("addIssuanceTermsBtn-3"));
      })

      userEvent.selectOptions(
        screen.getByTestId('dropDownIssuanceTermsBtn-4'),
        screen.getByTestId('Profit-4'),
      )

      expect(screen.getByTestId('Profit-4')).toBeInTheDocument();

      await waitFor(() => {
        const inputTypeText = screen.getByTestId("inputTypeText-4") as HTMLInputElement;
        expect(inputTypeText).toBeInTheDocument();
        fireEvent.change(inputTypeText, { target: { value: "test" } });
      });

      await act(async ()=>{
        fireEvent.click(screen.getByTestId("addIssuanceTermsBtn-4"));
      })

      userEvent.selectOptions(
        screen.getByTestId('dropDownIssuanceTermsBtn-5'),
        screen.getByTestId('Leverage-5'),
      )

      expect(screen.getByTestId('Leverage-5')).toBeInTheDocument();

      await waitFor(() => {
        const inputTypeText = screen.getByTestId("inputTypeText-5") as HTMLInputElement;
        expect(inputTypeText).toBeInTheDocument();
        fireEvent.change(inputTypeText, { target: { value: "test" } });
      });

      await act(async ()=>{
        fireEvent.click(screen.getByTestId("addIssuanceTermsBtn-5"));
      })

      userEvent.selectOptions(
        screen.getByTestId('dropDownIssuanceTermsBtn-6'),
        screen.getByTestId('Investment Structure-6'),
      )

      expect(screen.getByTestId('Investment Structure-6')).toBeInTheDocument();

      await waitFor(() => {
        const inputTypeText = screen.getByTestId("inputTypeText-6") as HTMLInputElement;
        expect(inputTypeText).toBeInTheDocument();
        fireEvent.change(inputTypeText, { target: { value: "test" } });
      });

      await act(async ()=>{
        fireEvent.click(screen.getByTestId("addIssuanceTermsBtn-6"));
      })

      userEvent.selectOptions(
        screen.getByTestId('dropDownIssuanceTermsBtn-7'),
        screen.getByTestId('Distribution Frequency-7'),
      )

      expect(screen.getByTestId('Distribution Frequency-7')).toBeInTheDocument();

      await waitFor(() => {
        const inputTypeText = screen.getByTestId("inputTypeText-7") as HTMLInputElement;
        expect(inputTypeText).toBeInTheDocument();
        fireEvent.change(inputTypeText, { target: { value: "test" } });
      });

      const nextFormBtn = screen.getByText("Next Form");
      expect(nextFormBtn).toBeInTheDocument();
      await act(async () => {
      fireEvent.click(nextFormBtn);
      })

  //  Expected form data
  const expectedFormData = {
    data: {
      issuanceTerms: {
        investmentPeriod: 'test',
        dividendYield: 'test',
        grossmargin: 'test',
        equityMultiple: 'test',
        profit: 'test',
        leverage: 'test',
        investmentStructure: 'test',
        distributionFrequency: 'test',
        icoCode: '1'
      }
    }
  };

  await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  })

  test("test ico form4 autofill and edit", async ()=>{

    localStorage.setItem("icoCode", "1");
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
    store.dispatch(setAssetData(mockedAssetData));

    render(
        <Provider store={store}>
          <MemoryRouter>
            <AddedIssuance/>
          </MemoryRouter>
        </Provider>
    );

    const nextFormBtn = screen.getByText("Next Form");
    expect(nextFormBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(nextFormBtn);
    })

    //  Expected form data
    const expectedFormData = {
      data: {
        issuanceTerms: {
          investmentPeriod: '120 Days',
          dividendYield: '20.00 %',
          grossmargin: '20.00',
          equityMultiple: '5.00 %',
          profit: '15.00 %',
          leverage: '20.00 %',
          investmentStructure: '/',
          distributionFrequency: 'Quarterly',
          icoCode: '1'
        }
      }
    };

    await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
    });

    localStorage.clear();
    store.dispatch(clearAssetData());
})
})

describe("test ico form5",()=>{
  beforeAll(() => {
    localStorage.setItem('icoCode', '1');
  })
  afterAll(() => {
    localStorage.clear();
  })

beforeEach(() => {
  jest.clearAllMocks();
  store.dispatch(setUser(mockUser));
})

test("test ico form5 create", async ()=>{

    render(
        <Provider store={store}>
          <MemoryRouter>
            <AddedIcoCompany/>
          </MemoryRouter>
        </Provider>
    );

    const firstName = screen.getByPlaceholderText("First Name*");
    expect(firstName).toBeInTheDocument();
    fireEvent.change(firstName, { target: { value: "test firstname" } });
    expect(firstName).toHaveValue("test firstname");

    const middleName = screen.getByPlaceholderText("Middle Name*");
    expect(middleName).toBeInTheDocument();
    fireEvent.change(middleName, { target: { value: "test midddle name" } });
    expect(middleName).toHaveValue("test midddle name");

    const lastName = screen.getByPlaceholderText("Last Name*");
    expect(lastName).toBeInTheDocument();
    fireEvent.change(lastName, { target: { value: "test last name" } });
    expect(lastName).toHaveValue("test last name");

    const position = screen.getByPlaceholderText("Position*");
    expect(position).toBeInTheDocument();
    fireEvent.change(position, { target: { value: "test position" } });
    expect(position).toHaveValue("test position");

    const history = screen.getByPlaceholderText("History*");
    expect(history).toBeInTheDocument();
    fireEvent.change(history, { target: { value: "test history" } });
    expect(history).toHaveValue("test history");

    const uploadPicture = screen.getByTestId("uploadPicture");
    expect(uploadPicture).toBeInTheDocument();

    const file = new File(['file content'], 'example.txt', { type: 'text/plain' });
    fireEvent.change(uploadPicture, { target: { files: [file] } });

    await waitFor(() => {
      const uploadedFile = screen.queryByText('File uploaded successfully');
      expect(uploadedFile).toBeInTheDocument();
    });

    const nextFormBtn = screen.getByText("Save");
    expect(nextFormBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(nextFormBtn);
    })

        //  Expected form data
        const expectedFormData = {
          data: {
            companyMembers: {
              icoCode: '1',
              firstName: 'test firstname',
              midName: 'test midddle name',
              lastName: 'test last name',
              position: 'test position',
              history: 'test history',
              //the body is a unit8array format
              picture: "ZmlsZSBjb250ZW50",
            }
          }
        };

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      expect(corporateState).toMatchObject(expectedFormData);
  })
    
  })

  test("test ico form4 autofill and edit", async ()=>{

    localStorage.setItem("icoCode", "1");
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
    store.dispatch(setAssetData(mockedAssetData));

    render(
        <Provider store={store}>
          <MemoryRouter>
            <AddedIcoCompany/>
          </MemoryRouter>
        </Provider>
    );

    const nextFormBtn = screen.getByText("Save");
    expect(nextFormBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(nextFormBtn);
    })

    //  Expected form data
    const expectedFormData = {
      data: {
        companyMembers: {
          icoCode: '1',
          firstName: '',
          midName: '',
          lastName: '',
          position: '',
          history: '',
          picture: null
        }
      }
    };

    await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
    });

    localStorage.clear();
    store.dispatch(clearAssetData());
})
})
