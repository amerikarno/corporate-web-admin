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

describe("test ico form1",()=>{

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  })

  test("test ico form1 rendering and input value each field", async ()=>{

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

    test("test ico form1 rendering and input value each field", async ()=>{

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
})

// describe("test ico form2",()=>{

//     beforeAll(() => {
//         localStorage.setItem('icoCode', '1');
//       })
//       afterAll(() => {
//         localStorage.clear();
//       })

//     beforeEach(() => {
//       jest.clearAllMocks();
//       store.dispatch(setUser(mockUser));
//     })

//     test("test ico form1 rendering and input value each field", async ()=>{

//         render(
//             <Provider store={store}>
//               <MemoryRouter>
//                 <AddedIcoDetail/>
//               </MemoryRouter>
//             </Provider>
//         );

//         const companyInformation = screen.getByPlaceholderText("Write your company information here...");
//         expect(companyInformation).toBeInTheDocument();
//         expect(companyInformation).toHaveValue("");
//         fireEvent.change(companyInformation, { target: { value: "company information" } })
//         expect(companyInformation).toHaveValue("company information");

//         const businessModel = screen.getByPlaceholderText("Write your business model here...");
//         expect(businessModel).toBeInTheDocument();
//         expect(businessModel).toHaveValue("");
//         fireEvent.change(businessModel, { target: { value: "business model" } })
//         expect(businessModel).toHaveValue("business model");

//         const useOfProceeds = screen.getByPlaceholderText("Write your use of proceeds here...");
//         expect(useOfProceeds).toBeInTheDocument();
//         expect(useOfProceeds).toHaveValue("");
//         fireEvent.change(useOfProceeds, { target: { value: "use of proceeds" } })
//         expect(useOfProceeds).toHaveValue("use of proceeds");

//         const fundraisingMilestone = screen.getByPlaceholderText("Write your fundraising milestone here...");
//         expect(fundraisingMilestone).toBeInTheDocument();
//         expect(fundraisingMilestone).toHaveValue("");
//         fireEvent.change(fundraisingMilestone, { target: { value: "fundraising milestone" } })
//         expect(fundraisingMilestone).toHaveValue("fundraising milestone");

//         const faqQuestion = screen.getByTestId("faq-question-1");
//         expect(faqQuestion).toBeInTheDocument();
//         expect(faqQuestion).toHaveValue("");
//         fireEvent.change(faqQuestion, { target: { value: "faq question" } })
//         expect(faqQuestion).toHaveValue("faq question");

//         const faqAnswer = screen.getByTestId("faq-answer-1");
//         expect(faqAnswer).toBeInTheDocument();
//         expect(faqAnswer).toHaveValue("");
//         fireEvent.change(faqAnswer, { target: { value: "faq answer" } })
//         expect(faqAnswer).toHaveValue("faq answer");

//         const addFaqBtn = screen.getByTestId("addFaqBtn");
//         expect(addFaqBtn).toBeInTheDocument();
//         await act(async () => {
//           fireEvent.click(addFaqBtn);
//         })

//         await waitFor(() => {
//             expect(screen.getByTestId("faq-question-2")).toBeInTheDocument();
//             expect(screen.getByTestId("faq-answer-2")).toBeInTheDocument();
//         })

//     })

//     test("test ico form3 create", async ()=>{

//         render(
//             <Provider store={store}>
//               <MemoryRouter>
//                 <AddedIcoKeyInfo/>
//               </MemoryRouter>
//             </Provider>
//         );

//         const nextFormBtn = screen.getByText("Next Form");
//         expect(nextFormBtn).toBeInTheDocument();
//         await act(async () => {
//         fireEvent.click(nextFormBtn);
//         })

//     //  Expected form data
//     // const expectedFormData = {
//     // };

//     await waitFor(() => {
//         const state = store.getState();
//         const corporateState = state.corporateTest;
//         console.log("Corporate State After Submission:", corporateState);
//         // expect(corporateState).toMatchObject(expectedFormData);
//       });
//     })
// })
