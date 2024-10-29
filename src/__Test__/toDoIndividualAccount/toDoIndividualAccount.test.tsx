import { mockUser } from "@/__Test__/utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "@/api/axios";
import MockAdapter from "axios-mock-adapter";
import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import TodoIndividualAccount from "@/pages/todoList/addIndividualAccount/ToDoIndividualAccount";

jest.mock("@/lib/utils", () => ({
    ...jest.requireActual("@/lib/utils"),
    isExpiredToken: jest.fn().mockReturnValue(false),
  }));

  jest.mock("@/lib/Cookies", () => ({
    getCookies: jest.fn().mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhYjEyMmRjLTc3YzctNDlmYy04ZTBkLTg2NWVjYTY1MmI4MCIsImVtYWlsIjoiYjcwODk4NTY5ZWRjYjk5MjdhMDZkZDUxMTBmMWI4ZmUxZDQ2ZTVmOTg1ZTBkOWYyMjI0ZDc3NDg1NzU3ZjFlYSIsImdyb3VwcyI6WzEwMDEsMTAwMiwxMDAzLDIwMDEsMjAwMiwyMDAzXSwicGVybWlzc2lvbnMiOlsxMDEsMTAyLDEwMywyMDEsMjAyLDIwM10sInJvbGVzIjpbMTEsMTIsMTMsMjEsMjIsMjNdLCJ1c2VySWQiOiIiLCJsb2dpblN0YXR1cyI6IiIsImV4cGlyZXNEYXRlIjoiMDAwMS0wMS0wMVQwMDowMDowMFoiLCJFcnJvciI6bnVsbCwiZXhwIjoxNzI3MTY3MzQyLCJpYXQiOjE3MjcwODA5NDJ9.PWG3vMMN3POr-SWDnO4etQ5D1ZV2mX7D1Fzwsb8sfBg"),
  }));

  const mockAxios = new MockAdapter(axios);

  const mockIndividualData = 
  {
    "id": "6cb3c66c-7143-4ff6-96da-391811f8754f",
    "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
    "CreatedAt": "2024-10-16T10:46:31+07:00",
    "DeletedAt": null,
    "status": 0,
    "registerId": "90000002",
    "thTitle": "นาย",
    "thName": "เกตเต้อ-ชื่อ",
    "thSurname": "เกตเต้อ-นามสกุล",
    "engTitle": "Mr.",
    "engName": "getter-name",
    "engSurname": "getter-surname",
    "email": "test@gmail.com",
    "mobile": "0884744411",
    "agreement": true,
    "birthDate": "2024-08-20T07:00:00+07:00",
    "marriageStatus": "โสด",
    "citizenId": "1103703348990",
    "laserCode": "12123",
    "education": "2",
    "sourceOfIncome": "4",
    "currentOccupation": "5",
    "officeName": "ทิสโก้ทาวเวอร์",
    "typeOfBusiness": "6",
    "positionName": "ทิสโก้ทาวเวอร์",
    "salaryRange": "3",
    "shortTermInvestment": true,
    "taxesInvestment": true,
    "address": [
        {
            "id": "3270c9c7-f1c2-4f42-9949-1838fb91d7ed",
            "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
            "CreatedAt": "2024-10-16T10:46:38+07:00",
            "DeletedAt": null,
            "registerId": "90000002",
            "homeNumber": "homeAddress",
            "villageNumber": "homeAddress",
            "villageName": "homeAddress",
            "subStreetName": "homeAddress",
            "streetName": "homeAddress",
            "subDistrictName": "ตลาดยอด",
            "districtName": "เขตมีนบุรี",
            "provinceName": "ตราด",
            "zipCode": "10400",
            "countryName": "หมู่เกาะอะแลนด์",
            "types": 1
        },
        {
            "id": "88836d34-d200-4d9d-aef6-ea5771596984",
            "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
            "CreatedAt": "2024-10-16T10:46:38+07:00",
            "DeletedAt": null,
            "registerId": "90000002",
            "homeNumber": "currentAddress",
            "villageNumber": "currentAddress",
            "villageName": "currentAddress",
            "subStreetName": "currentAddress",
            "streetName": "currentAddress",
            "subDistrictName": "กระทุ่มราย",
            "districtName": "เขตตลิ่งชัน",
            "provinceName": "สุรินทร์",
            "zipCode": "10170",
            "countryName": "เบลเยียม",
            "types": 2
        },
        {
            "id": "be03335b-c8aa-4cb2-bb90-396f8ca804a2",
            "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
            "CreatedAt": "2024-10-16T10:46:38+07:00",
            "DeletedAt": null,
            "registerId": "90000002",
            "homeNumber": "officeAddress",
            "villageNumber": "officeAddress",
            "villageName": "officeAddress",
            "subStreetName": "officeAddress",
            "streetName": "officeAddress",
            "subDistrictName": "คลองสิบ",
            "districtName": "เขตภาษีเจริญ",
            "provinceName": "สุรินทร์",
            "zipCode": "10160",
            "countryName": "บูร์กินาฟาโซ",
            "types": 3
        }
    ],
    "bank": [
        {
            "id": "325b75b9-8f39-43f1-9291-4025ee336d4b",
            "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
            "CreatedAt": "2024-10-16T10:46:38+07:00",
            "DeletedAt": null,
            "registerId": "90000002",
            "bankName": "ธนาคารกรุงเทพ จำกัด (มหาชน)",
            "bankBranchName": "bank1",
            "bankAccountNumber": "bankaccountid1",
            "types": 1
        },
        {
            "id": "86df573d-9138-42fd-8b9f-13c0a60c6727",
            "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
            "CreatedAt": "2024-10-16T10:46:38+07:00",
            "DeletedAt": null,
            "registerId": "90000002",
            "bankName": "ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)",
            "bankBranchName": "bank2",
            "bankAccountNumber": "bankaccountid2",
            "types": 0
        }
    ],
    "SuiteTestResult": {
        "createBy": "",
        "deletedBy": "",
        "registerId": "90000002",
        "suiteTestResult": {
            "registerId": "fb496f22-146b-4062-8abc-b7a673a7bdee",
            "investorTypeRisk": "เสี่ยงปานกลางค่อนสูง",
            "level": 3,
            "totalScore": 24,
            "suiteTestResult": {
                "answer": {
                    "0": {
                        "ans": [
                            0,
                            1,
                            0,
                            0
                        ]
                    },
                    "1": {
                        "ans": [
                            0,
                            0,
                            1,
                            0
                        ]
                    },
                    "2": {
                        "ans": [
                            0,
                            1,
                            1,
                            0
                        ]
                    },
                    "3": {
                        "ans": [
                            0,
                            0,
                            1,
                            0
                        ]
                    },
                    "4": {
                        "ans": [
                            0,
                            0,
                            1,
                            0
                        ]
                    },
                    "5": {
                        "ans": [
                            0,
                            1,
                            0,
                            0
                        ]
                    },
                    "6": {
                        "ans": [
                            0,
                            0,
                            1,
                            0
                        ]
                    },
                    "7": {
                        "ans": [
                            0,
                            1,
                            0,
                            0
                        ]
                    },
                    "8": {
                        "ans": [
                            0,
                            0,
                            1,
                            0
                        ]
                    }
                }
            }
        },
        "isFatca": true,
        "fatcaInfo": [
            1,
            0,
            1,
            0,
            1,
            0,
            1,
            0
        ],
        "isKnowLedgeDone": true,
        "knowLedgeTestResult": 15
    },
    "ndid": true,
    "thaid": false
}

  describe("test rendering and approve/reject account", ()=>{
    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    });

    test("test table rendering", async () => {

      mockAxios.onPost("/api/v1/individual/total/pending").reply(200, {
        total:100
      })

      mockAxios.onPost("/api/v1/individual/list/pending").reply(200,
        [mockIndividualData]
      )

      render(
        <Provider store={store}>
          <MemoryRouter>
            <TodoIndividualAccount/>
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByText("Individual Account Opening")).toBeInTheDocument();

      await waitFor (() => {
        expect(screen.getByText("Register ID")).toBeInTheDocument();
        expect(screen.getByText("Individual Name")).toBeInTheDocument();
        expect(screen.getByText("Individual Email")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
      })

      await waitFor(() => {
        expect(screen.getByText("90000002")).toBeInTheDocument();
        expect(screen.getByText("เกตเต้อ-ชื่อ")).toBeInTheDocument();
        expect(screen.getByText("test@gmail.com")).toBeInTheDocument();
        expect(screen.getByText("Pending")).toBeInTheDocument();
      })

      await waitFor(() => {
        expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
      })

    })

    test("test click approve/reject", async () => {

      let capturedRequestBody: any = null;

      mockAxios.onPost("/api/v1/individual/total/pending").reply(200, {
        total:100
      })

      mockAxios.onPost("/api/v1/individual/list/pending").reply(200,
        [mockIndividualData]
      )

      mockAxios.onPost("/api/v1/user/individual/approve").reply((config) => {
        capturedRequestBody = JSON.parse(config.data);
        return [200, {}];
      });

      render(
        <Provider store={store}>
          <MemoryRouter>
            <TodoIndividualAccount/>
          </MemoryRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
      })
      fireEvent.click(screen.getByRole('button', { name: 'Reject' }));
      await waitFor(() => {
        expect(screen.getByText("Are you sure? Reject")).toBeInTheDocument();
      })
      fireEvent.click(screen.getByRole('button', { name: 'Reject' }));

      expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
      await waitFor(() => {
        expect(screen.getByText("Are you sure? Approve")).toBeInTheDocument();
      })
      fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
      await waitFor(() => {
        expect(capturedRequestBody).toEqual({
          registerId: "90000002",
          status: 1,
        });
      })
      
    })
    test("test change page", async () => {

      mockAxios.onPost("/api/v1/individual/total/pending").reply(200, {
        total:100
      })

      mockAxios.onPost("/api/v1/individual/list/pending").reply(200,
        [mockIndividualData]
      )

      mockAxios.onPost("/api/v1/user/individual/approve").reply(200, {
      })

      render(
        <Provider store={store}>
          <MemoryRouter>
            <TodoIndividualAccount/>
          </MemoryRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("nextBtn")).toBeInTheDocument();
      })

      fireEvent.click(screen.getByTestId("nextBtn"));

      await waitFor(() => {
        expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
      })

      await waitFor(() => {
        expect(screen.getByTestId("prevBtn")).toBeInTheDocument();
      })

      fireEvent.click(screen.getByTestId("prevBtn"));

      await waitFor(() => {
        expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
      })  
      
    })
  })
