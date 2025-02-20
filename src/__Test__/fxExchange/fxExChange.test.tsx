import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import axios from "@/api/axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { act, fireEvent,render,screen, waitFor, } from "@testing-library/react";
import FxExchangeEdit from "@/pages/createJob/fxExchange/fxExchange";
import { setFxExchanges } from "@/features/fxExchange/fxExhangeSlice";

jest.mock("@/lib/utils", () => ({
    ...jest.requireActual("@/lib/utils"),
    isExpiredToken: jest.fn().mockReturnValue(false),
}));

const corporateListMock = [
    {
        "registerId": "80000001",
        "Info": {
            "id": "dedc36d2-5b9b-4199-93e1-5c0ddc3eb292",
            "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            "CreatedAt": "2024-09-20T03:37:01.802Z",
            "DeletedAt": null,
            "registerId": "80000001",
            "name": "name-80000001",
            "registrationNo": "312321",
            "taxId": "312312",
            "dateOfIncorporation": "2024-11-03T00:00:00Z"
        },
        "CorporateCountry": [
            {
                "id": "6df41df6-92d9-4c0a-9c13-9db236a83019",
                "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                "CreatedAt": "2024-09-20T03:37:05.993Z",
                "DeletedAt": null,
                "registerId": "80000001",
                "isThailand": true,
                "other": "",
                "types": 603
            },
            {
                "id": "9dce4461-2e23-4b8d-99c6-afce5d4bed7c",
                "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                "CreatedAt": "2024-09-20T03:37:01.853Z",
                "DeletedAt": null,
                "registerId": "80000001",
                "isThailand": true,
                "other": "",
                "types": 601
            },
            {
                "id": "e67e3068-24ff-4aa1-a90c-f5152896ad31",
                "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                "CreatedAt": "2024-09-20T03:37:01.853Z",
                "DeletedAt": null,
                "registerId": "80000001",
                "isThailand": true,
                "other": "",
                "types": 602
            }
        ],
        "CorporateAddress": [
            {
                "registerId": "",
                "address": [
                    {
                        "id": "08ca4a07-bc45-4370-9242-b6de82b89b35",
                        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                        "CreatedAt": "2024-09-20T03:37:01.942Z",
                        "DeletedAt": null,
                        "registerId": "80000001",
                        "addressNo": "1111",
                        "tambon": "aa",
                        "amphoe": "88",
                        "province": "w",
                        "postalCode": "2",
                        "country": "8",
                        "types": 701
                    }
                ],
                "emailAddress": "",
                "telephone": ""
            },
            {
                "registerId": "",
                "address": [
                    {
                        "id": "5fb14656-d562-4ef0-b33b-42470a85672e",
                        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                        "CreatedAt": "2024-09-20T03:37:02.021Z",
                        "DeletedAt": null,
                        "registerId": "80000001",
                        "addressNo": "054",
                        "tambon": "eeee",
                        "amphoe": "eee",
                        "province": "a",
                        "postalCode": "3",
                        "country": "s",
                        "types": 702
                    }
                ],
                "emailAddress": "",
                "telephone": ""
            }
        ],
        "CorporateFinancials": {
            "id": "ee3e65df-a5a5-42b7-9e17-320fcd13124f",
            "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            "CreatedAt": "2024-09-20T03:37:01.883Z",
            "DeletedAt": null,
            "registerId": "80000001",
            "registeredCapital": 0,
            "revenuePerYear": 0,
            "netProfitLoss": 0,
            "shareholderEquity": 0
        },
        "CorporateTypes": {
            "id": "1834b130-a449-4346-bc8e-40ec16a990b0",
            "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            "CreatedAt": "2024-09-20T03:37:05.898Z",
            "DeletedAt": null,
            "registerId": "80000001",
            "isJuristicThailand": true,
            "isTaxExempt": false,
            "isNonTaxExempt": true,
            "isJuristicForeign": false,
            "isOperatingInThailand": false,
            "isNonOperatingInThailand": false,
            "isOther": false,
            "isPartnership": false,
            "isGovernmentStateEnterprise": false,
            "isCoOperative": false,
            "isTaxExemptCompany": false
        },
        "BusinessTypes": {
            "id": "628848d1-54e9-41a9-8a11-8aa40bfb0681",
            "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            "CreatedAt": "2024-09-20T03:37:05.933Z",
            "DeletedAt": null,
            "registerId": "80000001",
            "isAntiqueTrading": false,
            "isHotelRestaurant": true,
            "isArmament": false,
            "isInsuranceAssurance": false,
            "isCasinoGambling": false,
            "isJewelryGoldTrading": false,
            "isFoundation": false,
            "isPropertyRealEstate": false,
            "isMoneyTransfer": false,
            "isEmploymentAgency": false,
            "isEntertainment": false,
            "isTravel": false,
            "isFinancial": false,
            "isEducationCenter": false,
            "isForeignCurrencyExchange": false,
            "isCryptoRelated": false,
            "isOtherBusiness": false,
            "otherBusinessType": ""
        },
        "SourceOfIncomes": {
            "id": "3aab3a12-18b5-4aa5-a1c0-c47d9feb946b",
            "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            "CreatedAt": "2024-09-20T03:37:05.966Z",
            "DeletedAt": null,
            "registerId": "80000001",
            "isRevenue": false,
            "isStock": true,
            "isDonation": false,
            "isLoan": true,
            "isRevenueSelling": false,
            "isOtherIncome": false,
            "otherIncome": ""
        },
        "CountrySourceIncomes": [
            {
                "CreatedAt": "0001-01-01T00:00:00Z",
                "DeletedAt": null,
                "registerId": 0,
                "corporateCountry": {
                    "id": "6df41df6-92d9-4c0a-9c13-9db236a83019",
                    "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    "CreatedAt": "2024-09-20T03:37:05.993Z",
                    "DeletedAt": null,
                    "registerId": "80000001",
                    "isThailand": true,
                    "other": "",
                    "types": 603
                },
                "otherCountry": "",
                "investmentObject": "",
                "isLiquidation": false,
                "isInvestment": true,
                "isCashManagement": false,
                "isOtherInvestment": false,
                "otherInvestment": ""
            }
        ],
        "Contact": null,
        "Directors": [
            {
                "id": "c462d20b-be5f-4c9f-b418-2d32681a0ffd",
                "createBy": "1",
                "CreatedAt": "2024-08-07T08:12:03.024Z",
                "DeletedAt": null,
                "personalId": "8628fe0d-2141-4b3a-ae22-6f75b9167c53",
                "registerId": "80000001",
                "fullNames": [
                    {
                        "id": "3070a944-796a-47fc-aa63-8b58d1c0baae",
                        "createBy": "1",
                        "CreatedAt": "2024-08-07T08:12:03.048Z",
                        "DeletedAt": null,
                        "ReferenceID": "8628fe0d-2141-4b3a-ae22-6f75b9167c53",
                        "firstName": "Johnfforreal",
                        "lastName": "Doefdd",
                        "types": 101
                    },
                    {
                        "id": "d5f43602-0873-4430-919b-7648179341a8",
                        "createBy": "1",
                        "CreatedAt": "2024-08-07T08:12:03.048Z",
                        "DeletedAt": null,
                        "ReferenceID": "8628fe0d-2141-4b3a-ae22-6f75b9167c53",
                        "firstName": "JohnMore",
                        "lastName": "Doefd",
                        "types": 101
                    }
                ],
                "passportId": "3993693",
                "expiryDate": "2025-01-01T07:00:00Z",
                "nationality": "Thai",
                "types": 101
            }
        ],
        "AuthorizedPersons": [
            {
                "id": "5615af0d-8242-4bce-974a-d28f282a4bba",
                "createBy": "1",
                "CreatedAt": "2024-08-07T08:11:32.325Z",
                "DeletedAt": null,
                "personalId": "17ac8021-d805-4d1c-b5b0-cf6c2d1b9d21",
                "registerId": "80000001",
                "fullNames": [
                    {
                        "id": "3da2e2fc-3d96-40c6-9850-9c3d98453388",
                        "createBy": "1",
                        "CreatedAt": "2024-08-07T08:11:32.355Z",
                        "DeletedAt": null,
                        "ReferenceID": "17ac8021-d805-4d1c-b5b0-cf6c2d1b9d21",
                        "firstName": "JohnMore",
                        "lastName": "Doefd",
                        "types": 201
                    },
                    {
                        "id": "a3f349ef-1ab9-4976-ace0-0b5fbf08cc6c",
                        "createBy": "1",
                        "CreatedAt": "2024-08-07T08:11:32.355Z",
                        "DeletedAt": null,
                        "ReferenceID": "17ac8021-d805-4d1c-b5b0-cf6c2d1b9d21",
                        "firstName": "Johnfforreal",
                        "lastName": "Doefdd",
                        "types": 201
                    }
                ],
                "citizenId": "12345676",
                "expiryDate": "2025-01-01T07:00:00Z",
                "nationality": "Thai",
                "types": 201
            },
            {
                "id": "b604dee9-bfb7-4904-b081-9392b42d06b4",
                "createBy": "1",
                "CreatedAt": "2024-08-07T08:11:13.253Z",
                "DeletedAt": null,
                "personalId": "abe201e1-4642-432c-bd76-260330e98d78",
                "registerId": "80000001",
                "fullNames": [
                    {
                        "id": "4dd52f2f-8da5-4d80-8355-860287a39de0",
                        "createBy": "1",
                        "CreatedAt": "2024-08-07T08:11:13.271Z",
                        "DeletedAt": null,
                        "ReferenceID": "abe201e1-4642-432c-bd76-260330e98d78",
                        "firstName": "JohnMore",
                        "lastName": "Doefd",
                        "types": 201
                    },
                    {
                        "id": "98782d8a-a258-4adc-8c99-49e8f712e8e2",
                        "createBy": "1",
                        "CreatedAt": "2024-08-07T08:11:13.271Z",
                        "DeletedAt": null,
                        "ReferenceID": "abe201e1-4642-432c-bd76-260330e98d78",
                        "firstName": "Johnfforreal",
                        "lastName": "Doefdd",
                        "types": 201
                    }
                ],
                "citizenId": "12345676",
                "expiryDate": "2025-01-01T07:00:00Z",
                "nationality": "Thai",
                "types": 201
            }
        ],
        "IndividualShareholders": [
            {
                "id": "15494107-6605-4a9b-a53e-01b5e20a4220",
                "createBy": "1",
                "CreatedAt": "2024-08-07T08:11:22.416Z",
                "DeletedAt": null,
                "personalId": "15c4feb9-6db1-4bb1-bd41-775ef39082c1",
                "registerId": "80000001",
                "fullNames": [
                    {
                        "id": "25bda293-c935-4577-ae39-31ac52e824bc",
                        "createBy": "1",
                        "CreatedAt": "2024-08-07T08:11:22.426Z",
                        "DeletedAt": null,
                        "ReferenceID": "15c4feb9-6db1-4bb1-bd41-775ef39082c1",
                        "firstName": "Money",
                        "lastName": "Cash",
                        "types": 301
                    },
                    {
                        "id": "b7e51778-db9f-43a3-9bff-36b77a81266a",
                        "createBy": "1",
                        "CreatedAt": "2024-08-07T08:11:22.426Z",
                        "DeletedAt": null,
                        "ReferenceID": "15c4feb9-6db1-4bb1-bd41-775ef39082c1",
                        "firstName": "Dollar",
                        "lastName": "Burger",
                        "types": 301
                    }
                ],
                "passportId": "1248068655",
                "expiryDate": "2025-01-01T07:00:00Z",
                "nationality": "Thai",
                "types": 301,
                "sharePercentage": 28
            }
        ],
        "Attorneys": null,
        "Juristics": [
            {
                "id": "02450e9b-f04f-45dd-8afd-c803254c1fe8",
                "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                "CreatedAt": "2024-09-13T07:29:35.483Z",
                "DeletedAt": null,
                "registerId": "80000001",
                "juristicName": "a",
                "registrationNo": "4",
                "registeredCountry": "a",
                "sharePercentage": 4
            },
            {
                "id": "8e60a6b4-50d1-4cdc-aca7-11892d315167",
                "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                "CreatedAt": "2024-09-12T02:25:26.668Z",
                "DeletedAt": null,
                "registerId": "80000001",
                "juristicName": "dD",
                "registrationNo": "312321",
                "registeredCountry": "aa",
                "sharePercentage": 55
            }
        ],
        "Banks": [
            {
                "id": "8ad7760a-4e5f-4dee-89ab-ddb77aecf7ba",
                "createBy": "3",
                "CreatedAt": "2024-08-14T09:31:04.558Z",
                "DeletedAt": null,
                "registerId": "80000001",
                "accountType": "fixed",
                "bankName": "Bank I",
                "accountNo": "9988776655",
                "accountLocation": "Khon Kaen",
                "swiftCode": "KHO12345"
            },
            {
                "id": "98880925-3815-4bdc-b0c2-fca6e04f30d8",
                "createBy": "3",
                "CreatedAt": "2024-08-14T09:31:04.558Z",
                "DeletedAt": null,
                "registerId": "80000001",
                "accountType": "investment",
                "bankName": "Bank H",
                "accountNo": "2233445566",
                "accountLocation": "Nakhon Ratchasima",
                "swiftCode": "NAK12345"
            },
            {
                "id": "a34f1348-794b-486b-a969-19172e26135c",
                "createBy": "3",
                "CreatedAt": "2024-08-14T09:31:04.558Z",
                "DeletedAt": null,
                "registerId": "80000001",
                "accountType": "savings",
                "bankName": "Bank G",
                "accountNo": "5566778899",
                "accountLocation": "Udon Thani",
                "swiftCode": "UDO12345"
            },
            {
                "id": "fdc252b2-3490-477a-9675-4551ff10d483",
                "createBy": "fab122dc-77c7-49fc-8e0d-865eca652b80",
                "CreatedAt": "2024-09-12T08:44:10.337Z",
                "DeletedAt": null,
                "registerId": "80000001",
                "accountType": "savings",
                "bankName": "Bank G",
                "accountNo": "5566778899",
                "accountLocation": "Udon Thani",
                "swiftCode": "UDO12345"
            }
        ],
        "Documents": [
            {
                "id": "d58f55f1-8f82-4518-9d07-419208b236f6",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-09-27T07:53:29.637Z",
                "DeletedAt": null,
                "docTypes": "authorize",
                "registerId": "80000001",
                "fileName": "download (4).jpg",
                "fileTypes": "image/jpeg",
                "FilePath": "uploads/80000001/authorize/download (4).jpg"
            }
        ],
        "SuitTestResult": {
            "CreatedAt": "0001-01-01T00:00:00Z",
            "DeletedAt": null,
            "registerId": "80000001",
            "accountID": "",
            "totalScore": 12,
            "level": 1,
            "investorTypeRisk": "Low",
            "suitTestResult": {
                "answer": [
                    {
                        "id": "cd7bc545-b28f-4fd8-b156-c1336fe3c2b0",
                        "ans": 1,
                        "type": 1,
                        "quiz": 0
                    },
                    {
                        "id": "7c807c2f-4bfa-438d-b44a-cfff8a81ac2b",
                        "ans": 1,
                        "type": 1,
                        "quiz": 1
                    },
                    {
                        "id": "b52326a2-8c77-4be9-8a17-5f901f04f767",
                        "ans": 1,
                        "type": 1,
                        "quiz": 2
                    },
                    {
                        "id": "d3d13ec1-ff5e-4177-88dc-341d24c49d68",
                        "ans": [
                            0,
                            2,
                            3,
                            0
                        ],
                        "type": 2,
                        "quiz": 3
                    },
                    {
                        "id": "695451aa-b95b-412b-8f6f-9ab322df4d52",
                        "ans": 1,
                        "type": 1,
                        "quiz": 4
                    },
                    {
                        "id": "ff6c0cb1-2952-40e1-a759-a624fa0495c4",
                        "ans": 1,
                        "type": 1,
                        "quiz": 5
                    },
                    {
                        "id": "cb59f6ca-4904-4c2a-9869-e9c4c0dc4afe",
                        "ans": 1,
                        "type": 1,
                        "quiz": 6
                    },
                    {
                        "id": "ee411a9b-8012-42be-903f-1a080f369daf",
                        "ans": 1,
                        "type": 1,
                        "quiz": 7
                    },
                    {
                        "id": "47710e6d-4341-40e3-b699-ba4d98cbb81c",
                        "ans": 1,
                        "type": 1,
                        "quiz": 8
                    },
                    {
                        "id": "59dbea36-94e7-4f67-b728-0a9de7f1cc22",
                        "ans": 1,
                        "type": 1,
                        "quiz": 9
                    }
                ],
                "additional": [
                    true,
                    true
                ]
            },
            "type": 0
        }
    }
]

const mockFxExhange = [
    {
        "id": "b3b1b1b0-a4d6-46c6-ab62-f4e4d1321f2c",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-18T05:22:17.91Z",
        "DeletedAt": null,
        "registerId": 80000005,
        "accountId": 0,
        "exchange": "THB/USD",
        "exchangeRate": 12312300,
        "exchangeSpread": 12312300,
        "operationSpread": 12312300,
        "buyCurrency": 12300000,
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "dcd09767-a276-42f7-9919-140a3844a44a",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-18T05:22:35.524Z",
        "DeletedAt": null,
        "registerId": 80000007,
        "accountId": 0,
        "exchange": "THB/USD",
        "exchangeRate": 1200000,
        "exchangeSpread": 12300000,
        "operationSpread": 12300000,
        "buyCurrency": 110000,
        "transactionStatus": 0,
        "checkerStatus": false
    }
]

const mockAxios = new MockAdapter(axios);

    describe("test fxExchange",()=>{
    let consoleSpy: jest.SpyInstance;
    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    })

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
      });
    
      afterEach(() => {
        consoleSpy.mockRestore();
      });
  
    test("test fxExchange create", async ()=>{

      let capturedRequestBody: any = null;

      mockAxios.onPost("/api/v1/transaction/exchange/create").reply((config) => {
        capturedRequestBody = JSON.parse(config.data);
        return [200, {}];
      });

      mockAxios.onPost("/api/v1/corporate/query/all").reply(200, {
          data: corporateListMock
      })

      mockAxios.onPost("/api/v1/transaction/exchange/get/corporate").reply(200, {
        data: mockFxExhange
    })

    await act(async () => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <FxExchangeEdit />
            </MemoryRouter>
          </Provider>
        );
      });


      await act(async () => {
        const pairDropdown = await screen.findByTestId('pairDropdown');
        userEvent.click(pairDropdown);
      })

      await act(async () => {
          const pairOption = await screen.findByTestId('pair-THB-USD');
          userEvent.click(pairOption);
      })
      await act(async () => {
        fireEvent.change(screen.getByTestId("registerIdInput"), {
          target: { value: 80000001 }
        });
        fireEvent.change(screen.getByTestId("exchangeRateInput"), {
          target: { value: "30.00" }
        });
        fireEvent.change(screen.getByTestId("exchangeSpreadInput"), {
          target: { value: "0.10" }
        });
        fireEvent.change(screen.getByTestId("operationSpreadInput"), {
          target: { value: "0.05" }
        });
        fireEvent.change(screen.getByTestId("buyCurrencyInput"), {
          target: { value: "1000" }
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId("registerIdInput")).toHaveValue(80000001);
        expect(screen.getByTestId("exchangeRateInput")).toHaveValue(30);
        expect(screen.getByTestId("exchangeSpreadInput")).toHaveValue(0.1);
        expect(screen.getByTestId("operationSpreadInput")).toHaveValue(0.05);
        expect(screen.getByTestId("buyCurrencyInput")).toHaveValue(1000);
      });   
    
      await act(async () => {
        fireEvent.submit(screen.getByText("Submit"));
      });

      const expectedFormData = {
            exchange: 'THB/USD',
            exchangeSpread: 10000,
            operationSpread: 5000,
            exchangeRate: 3000000,
            buyCurrency: 100000000,
            registerId: "80000001"
      }

      await waitFor(() => {
        expect(capturedRequestBody).toEqual(expectedFormData);
      })

    }, 40000)
    

    test("test fxExchange edit", async ()=>{

        let capturedRequestBody: any = null;

        mockAxios.onPost("/api/v1/transaction/exchange/edit").reply((config) => {
            capturedRequestBody = JSON.parse(config.data);
            return [200, {}];
          });
  
        mockAxios.onPost("/api/v1/corporate/query/all").reply(200, {
            data: corporateListMock
        })
  
        mockAxios.onGet("/api/v1/transaction/exchange/get/corporate").reply(200, {
          data: mockFxExhange
      })

      const orderTrades = mockFxExhange || [];

        const uniqueOrderTrades = orderTrades.filter(
          (order: any, index: any, self: any) =>
            index === self.findIndex((t: any) => t.id === order.id)
        );

        const adjustedOrderTrades = uniqueOrderTrades.map((trade: any) => ({
          ...trade,
          exchangeRate: trade.exchangeRate / 100000,
          exchangeSpread: trade.exchangeSpread / 100000,
          operationSpread: trade.operationSpread / 100000,
          buyCurrency: trade.buyCurrency / 100000,
        }));
  
        store.dispatch(setFxExchanges(adjustedOrderTrades));
  
          render(
            <Provider store={store}>
              <MemoryRouter>
                <FxExchangeEdit />
              </MemoryRouter>
            </Provider>
          );
  
        const editButton = screen.getByTestId("editButton-b3b1b1b0-a4d6-46c6-ab62-f4e4d1321f2c");
        expect(editButton).toBeInTheDocument();
        await act(async () => {
          fireEvent.click(editButton);
        })

        await act(async () => {
          fireEvent.submit(screen.getByText("Submit"));
        });

        const expectedFormData = {
                registerId: "80000005",
                exchangeRate: 12312300,
                exchangeSpread: 12312300,
                operationSpread: 12312300,
                id: 'b3b1b1b0-a4d6-46c6-ab62-f4e4d1321f2c',
                transactionStatus: 0,
                exchange: 'THB/USD',
                buyCurrency: 12300000
          }

          await waitFor(() => {
            expect(capturedRequestBody).toEqual(expectedFormData);
          })
    }, 40000)

})