import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import AddIndividualAccount from "@/pages/createJob/changeIndividualAccount/addIndividualAccount";
import "@testing-library/jest-dom";
import BasicInfo from "@/pages/createJob/changeIndividualAccount/basicInfo/basicInfo";
import SuitTestFatca from "@/pages/createJob/changeIndividualAccount/suitTestFatca/suitTestFatca";
import IdentityVerification from "@/pages/createJob/changeIndividualAccount/identityVerification/identityVerification";
import userEvent from "@testing-library/user-event";
import { clearIndividualData, setIndividualData } from "@/features/fetchIndividualData/fetchIndividualDataSlice";
import axios from "@/api/axios";
import MockAdapter from "axios-mock-adapter";

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
      "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
      "CreatedAt": "2024-09-23T06:15:58.847Z",
      "DeletedAt": undefined,
      "id": 90000085,
      "thTitle": "นาย",
      "thName": "test-ndid-true",
      "thSurname": "ทดสอบ-ndid-true",
      "engTitle": "Mr.",
      "engName": "getter",
      "engSurname": "getter",
      "email": "test@example.us",
      "mobile": "0987654321",
      "agreement": true,
      "birthDate": "2024-09-18T00:00:00Z",
      "marriageStatus": "โสด",
      "citizenId": "123123",
      "laserCode": "123",
      "education": "1",
      "sourceOfIncome": "1",
      "currentOccupation": "13",
      "officeName": "ทิสโก้ทาวเวอร์",
      "typeOfBusiness": "2",
      "positionName": "ทิสโก้ทาวเวอร์",
      "salaryRange": "1",
      "shortTermInvestment": true,
      "longTermInvestment": true,
      "taxesInvestment": true,
      "retireInvestment": true,
      "address": [
          {
              "CreatedAt": "2024-09-23T06:16:04.213Z",
              "DeletedAt": null,
              "id": "90000085",
              "homeNumber": "70/178 ramintra65 yak 2-4",
              "villageNumber": "floor",
              "villageName": "moo",
              "subStreetName": "soi",
              "streetName": "road",
              "subDistrictName": "บ้านพานถม",
              "districtName": "เขตพระโขนง",
              "provinceName": "ระยอง",
              "zipCode": "10400",
              "countryName": "ออสเตรีย",
              "types": 1
          },
          {
              "CreatedAt": "2024-09-23T06:16:04.213Z",
              "DeletedAt": undefined,
              "id": "90000085",
              "homeNumber": "70/178 ramintra65 yak 2-4",
              "villageNumber": "floor",
              "villageName": "moo",
              "subStreetName": "soi",
              "streetName": "road",
              "subDistrictName": "บ้านพานถม",
              "districtName": "เขตพระโขนง",
              "provinceName": "ระยอง",
              "zipCode": "10400",
              "countryName": "ออสเตรีย",
              "types": 2
          },
          {
              "CreatedAt": "2024-09-23T06:16:04.213Z",
              "DeletedAt": undefined,
              "id": "90000085",
              "homeNumber": "70/178 ramintra65 yak 2-4",
              "villageNumber": "floor",
              "villageName": "moo",
              "subStreetName": "soi",
              "streetName": "road",
              "subDistrictName": "บ้านพานถม",
              "districtName": "เขตพระโขนง",
              "provinceName": "ระยอง",
              "zipCode": "10400",
              "countryName": "ออสเตรีย",
              "types": 3
          }
      ],
      "bank": [
          {
              "CreatedAt": "2024-09-23T06:16:04.216Z",
              "DeletedAt": undefined,
              "id": "90000085",
              "bankName": "ธนาคารยูโอบี จำกัด (มหาชน)",
              "bankBranchName": "bank2",
              "bankAccountNumber": "bankaccountid2",
              "types": 2
          },
          {
              "CreatedAt": "2024-09-23T06:16:04.216Z",
              "DeletedAt": undefined,
              "id": "90000085",
              "bankName": "ธนาคารกสิกรไทย จำกัด (มหาชน)",
              "bankBranchName": "bank1",
              "bankAccountNumber": "bankaccountid1",
              "types": 1
          }
      ],
      "SuiteTestResult": {
            "createBy": "",
            "deletedBy": "",
            "id": "90000085",
            "suiteTestResult": {
                "cid": "3dd079e5-5553-410d-83e9-be1b8cd412a4",
                "investorTypeRisk": "เสี่ยงตํ่า",
                "level": 1,
                "totalScore": 9,
                "suitTestResult": {
                    "answer": {
                        "0": {
                            "ans": [
                                1,
                                0,
                                0,
                                0
                            ]
                        },
                        "1": {
                            "ans": [
                                1,
                                0,
                                0,
                                0
                            ]
                        },
                        "2": {
                            "ans": [
                                1,
                                0,
                                0
                            ]
                        },
                        "3": {
                            "ans": [
                                1,
                                0,
                                0,
                                0
                            ]
                        },
                        "4": {
                            "ans": [
                                1,
                                0,
                                0,
                                0
                            ]
                        },
                        "5": {
                            "ans": [
                                1,
                                0,
                                0,
                                0
                            ]
                        },
                        "6": {
                            "ans": [
                                1,
                                0,
                                0,
                                0
                            ]
                        },
                        "7": {
                            "ans": [
                                1,
                                0,
                                0,
                                0
                            ]
                        },
                        "8": {
                            "ans": [
                                1,
                                0,
                                0,
                                0
                            ]
                        }
                    }
                }
            },
            "isFatca": false,
            "fatcaInfo": null,
            "isKnowLedgeDone": false,
            "knowLedgeTestResult": 0
        },
      "ndid": true,
      "thaid": false
  }


describe("test create individual form1 (preinfo)", () => {

  beforeAll(() => {
    localStorage.setItem('cid', '90000001');
  })
  afterAll(() => {
    localStorage.clear();
  })

    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    });
  
    test("test input data(multiple input type)", async () => {
      mockAxios.onPost("/api/v1/individual/list/all").reply(200, {
        data:mockIndividualData
      });
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AddIndividualAccount/>
          </MemoryRouter>
        </Provider>
      );

      userEvent.selectOptions(
        screen.getByTestId('thTitle'),
        screen.getByRole('option', { name: 'นาง' } ),
      )
      expect(screen.getByRole('option', { name: 'นาง' })).toBeInTheDocument();

      await waitFor(() => {
        const thTitleDropDown = screen.getByTestId("thTitle") as HTMLInputElement;
        console.log(thTitleDropDown.value);
        expect(thTitleDropDown.value).toBe("นาง");
      });

      userEvent.selectOptions(
        screen.getByTestId('thTitle'),
        screen.getByRole('option', { name: 'นางสาว' } ),
      )
      expect(screen.getByRole('option', { name: 'นางสาว' })).toBeInTheDocument();

      await waitFor(() => {
        const thTitleDropDown = screen.getByTestId("thTitle") as HTMLInputElement;
        console.log(thTitleDropDown.value);
        expect(thTitleDropDown.value).toBe("นางสาว");
      });

      userEvent.selectOptions(
        screen.getByTestId('thTitle'),
        screen.getByRole('option', { name: 'นาย' } ),
      )
      expect(screen.getByRole('option', { name: 'นาย' })).toBeInTheDocument();

      await waitFor(() => {
        const thTitleDropDown = screen.getByTestId("thTitle") as HTMLInputElement;
        console.log(thTitleDropDown.value);
        expect(thTitleDropDown.value).toBe("นาย");
      });

      const thFirstName = screen.getByLabelText("ชื่อ (ภาษาไทย)");
      expect(thFirstName).toBeInTheDocument();
      expect(thFirstName).toHaveValue("");
      fireEvent.change(thFirstName, { target: { value: "ชื่อจริง" } });
      expect(thFirstName).toHaveValue("ชื่อจริง");

      const thSurnameName = screen.getByLabelText("ชื่อสกุล (ภาษาไทย)");
      expect(thSurnameName).toBeInTheDocument();
      expect(thSurnameName).toHaveValue("");
      fireEvent.change(thSurnameName, { target: { value: "นามสกุล" } });
      expect(thSurnameName).toHaveValue("นามสกุล");

      userEvent.selectOptions(
        screen.getByTestId('enTitle'),
        screen.getByRole('option', { name: 'Mrs.' } ),
      )
      expect(screen.getByRole('option', { name: 'Mrs.' })).toBeInTheDocument();

      await waitFor(() => {
        const enTitleDropDown = screen.getByTestId("enTitle") as HTMLInputElement;
        console.log(enTitleDropDown.value);
        expect(enTitleDropDown.value).toBe("Mrs.");
      });

      userEvent.selectOptions(
        screen.getByTestId('enTitle'),
        screen.getByRole('option', { name: 'Miss.' } ),
      )
      expect(screen.getByRole('option', { name: 'Miss.' })).toBeInTheDocument();

      await waitFor(() => {
        const enTitleDropDown = screen.getByTestId("enTitle") as HTMLInputElement;
        console.log(enTitleDropDown.value);
        expect(enTitleDropDown.value).toBe("Miss.");
      });

      userEvent.selectOptions(
        screen.getByTestId('enTitle'),
        screen.getByRole('option', { name: 'Mr.' } ),
      )
      expect(screen.getByRole('option', { name: 'Mr.' })).toBeInTheDocument();

      await waitFor(() => {
        const enTitleDropDown = screen.getByTestId("enTitle") as HTMLInputElement;
        console.log(enTitleDropDown.value);
        expect(enTitleDropDown.value).toBe("Mr.");
      });

      const enFirstName = screen.getByLabelText("ชื่อ (ภาษาอังกฤษ)");
      expect(enFirstName).toBeInTheDocument();
      expect(enFirstName).toHaveValue("");
      fireEvent.change(enFirstName, { target: { value: "FirstName" } });
      expect(enFirstName).toHaveValue("FirstName");

      const enSurname = screen.getByLabelText("ชื่อสกุล (ภาษาอังกฤษ)");
      expect(enSurname).toBeInTheDocument();
      expect(enSurname).toHaveValue("");
      fireEvent.change(enSurname, { target: { value: "Surname" } });
      expect(enSurname).toHaveValue("Surname");

      const email = screen.getByLabelText("อีเมลล์");
      expect(email).toBeInTheDocument();
      expect(email).toHaveValue("");
      fireEvent.change(email, { target: { value: "test@example.com" } });
      expect(email).toHaveValue("test@example.com");

      const telephone = screen.getByLabelText("หมายเลขโทรศัพท์มือถือ");
      expect(telephone).toBeInTheDocument();
      expect(telephone).toHaveValue("");
      fireEvent.change(telephone, { target: { value: "0123456789" } });
      expect(telephone).toHaveValue("0123456789");

      const birthDay = screen.getByTestId("birthDate")
      expect(birthDay).toBeInTheDocument();
      expect(birthDay).toHaveValue("");
      fireEvent.change(birthDay, { target: { value: "2022-01-01" } });
      expect(birthDay).toHaveValue("2022-01-01");

      userEvent.selectOptions(
        screen.getByTestId('marriageStatus'),
        screen.getByRole('option', { name: 'Single' } ),
      )
      expect(screen.getByRole('option', { name: 'Single' })).toBeInTheDocument();

      await waitFor(() => {
        const marriageStatus = screen.getByTestId("marriageStatus") as HTMLInputElement;
        console.log(marriageStatus.value);
        expect(marriageStatus.value).toBe("โสด");
      });

      const idCard = screen.getByLabelText("หมายเลขบัตรประชาชน")
      expect(idCard).toBeInTheDocument();
      expect(idCard).toHaveValue("");
      fireEvent.change(idCard, { target: { value: "1234567890123" } });
      expect(idCard).toHaveValue("1234567890123");

      const laserCode = screen.getByLabelText("เลขหลังบัตรประชาชน (Laser Code)");
      expect(laserCode).toBeInTheDocument();
      expect(laserCode).toHaveValue("");
      fireEvent.change(laserCode, { target: { value: "1234567890123" } });
      expect(laserCode).toHaveValue("1234567890123");

      const agreementBox = screen.getByTestId("agreement");
      expect(agreementBox).toBeInTheDocument();
      expect(agreementBox).not.toBeChecked();
      fireEvent.click(agreementBox);
      expect(agreementBox).toBeChecked();

      console.log((screen.getByTestId("thTitle") as HTMLInputElement).value)
      console.log((thFirstName as HTMLInputElement).value)
      console.log((thSurnameName as HTMLInputElement).value)
      console.log((screen.getByTestId("enTitle") as HTMLInputElement).value)
      console.log((enFirstName as HTMLInputElement).value)
      console.log((enSurname as HTMLInputElement).value)
      console.log((email as HTMLInputElement).value)
      console.log((telephone as HTMLInputElement).value)
      console.log((birthDay as HTMLInputElement).value)
      console.log((screen.getByTestId("marriageStatus") as HTMLInputElement).value)
      console.log((idCard as HTMLInputElement).value)
      console.log((laserCode as HTMLInputElement).value)
      console.log((agreementBox as HTMLInputElement).value)

      const submitButton = screen.getByTestId("submitButton")
      expect(submitButton).toBeInTheDocument();
      
      await act(async ()=>{
        fireEvent.submit(submitButton);
      })
      
      //Expected form data
      const expectedFormData = {
        data: {
          thTitle: 'นาย',
          thName: 'ชื่อจริง',
          thSurname: 'นามสกุล',
          engTitle: 'Mr.',
          engName: 'FirstName',
          engSurname: 'Surname',
          email: 'test@example.com',
          mobile: '0123456789',
          birthDate: '2022-01-01T00:00:00.000Z',
          marriageStatus: 'โสด',
          citizenId: '1234567890123',
          laserCode: '1234567890123',
          agreement: true,
          pageId: 100,
          cid: "90000001"
        }
      };

      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      })
  
    }, 40000);

    test("update preinfo", async () => {
      mockAxios.onPost("/api/v1/individual/list/all").reply(200, {
        data:mockIndividualData
      });
      store.dispatch(setIndividualData(mockIndividualData));
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AddIndividualAccount/>
          </MemoryRouter>
        </Provider>
      );

      const submitButton = screen.getByTestId("submitButton")
      expect(submitButton).toBeInTheDocument();
      
      await act(async ()=>{
        fireEvent.submit(submitButton);
      })

      //Expected form data
        const expectedFormData = {
          data: {
            thTitle: 'นาย',
            thName: 'test-ndid-true',
            thSurname: 'ทดสอบ-ndid-true',
            engTitle: 'Mr.',
            engName: 'getter',
            engSurname: 'getter',
            email: 'test@example.us',
            mobile: '0987654321',
            birthDate: '2024-09-18T00:00:00.000Z',
            marriageStatus: 'โสด',
            citizenId: '123123',
            laserCode: '123',
            agreement: true,
            pageId: 100,
            cid: '90000001'
          }
        };
      
        await waitFor(() => {
          const state = store.getState();
          const corporateState = state.corporateTest;
          console.log("Corporate State After Submission:", corporateState);
          expect(corporateState).toMatchObject(expectedFormData);
        })

      store.dispatch(clearIndividualData());
    },20000);
  });


  describe("test create individual form2 (basicinfo)", () => {

    beforeAll(() => {
      localStorage.setItem('cid', '90000001');
    })
    afterAll(() => {
      localStorage.clear();
    })

    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    });
  
    test("test input data(multiple input type)", async () => {
      mockAxios.onPost("/api/v1/individual/list/all").reply(200, {
        data:mockIndividualData
      });
      render(
        <Provider store={store}>
          <MemoryRouter>
            <BasicInfo/>
          </MemoryRouter>
        </Provider>
      );

      //id card address
      const addressNoIDCard = screen.getByTestId("addressNoIDCard");
      expect(addressNoIDCard).toBeInTheDocument();
      expect(addressNoIDCard).toHaveValue("");
      fireEvent.change(addressNoIDCard, { target: { value: "address number" } });
      expect(addressNoIDCard).toHaveValue("address number");

      const floorIDCard = screen.getByTestId("floorIDCard");
      expect(floorIDCard).toBeInTheDocument();
      expect(floorIDCard).toHaveValue("");
      fireEvent.change(floorIDCard, { target: { value: "floor" } });
      expect(floorIDCard).toHaveValue("floor");

      const mooIDCard = screen.getByTestId("mooIDCard");
      expect(mooIDCard).toBeInTheDocument();
      expect(mooIDCard).toHaveValue("");
      fireEvent.change(mooIDCard, { target: { value: "moo" } });
      expect(mooIDCard).toHaveValue("moo");

      const soiIDCard = screen.getByTestId("soiIDCard");
      expect(soiIDCard).toBeInTheDocument();
      expect(soiIDCard).toHaveValue("");
      fireEvent.change(soiIDCard, { target: { value: "soi" } });
      expect(soiIDCard).toHaveValue("soi");

      const roadIDCard = screen.getByTestId("roadIDCard");
      expect(roadIDCard).toBeInTheDocument();
      expect(roadIDCard).toHaveValue("");
      fireEvent.change(roadIDCard, { target: { value: "road" } });
      expect(roadIDCard).toHaveValue("road");

      const tambonIDCard = screen.getByTestId("tambonIDCard");
      expect(tambonIDCard).toBeInTheDocument();
      expect(tambonIDCard).toHaveValue("");
      fireEvent.change(tambonIDCard, { target: { value: "tambon" } });
      expect(tambonIDCard).toHaveValue("tambon");

      const amphoeIDCard = screen.getByTestId("amphoeIDCard");
      expect(amphoeIDCard).toBeInTheDocument();
      expect(amphoeIDCard).toHaveValue("");
      fireEvent.change(amphoeIDCard, { target: { value: "amphoe" } });
      expect(amphoeIDCard).toHaveValue("amphoe");

      const provinceIDCard = screen.getByTestId("provinceIDCard");
      expect(provinceIDCard).toBeInTheDocument();
      expect(provinceIDCard).toHaveValue("");
      fireEvent.change(provinceIDCard, { target: { value: "province" } });
      expect(provinceIDCard).toHaveValue("province");

      const postalCodeIDCard = screen.getByTestId("postalCodeIDCard");
      expect(postalCodeIDCard).toBeInTheDocument();
      expect(postalCodeIDCard).toHaveValue("");
      fireEvent.change(postalCodeIDCard, { target: { value: "postalCode" } });
      expect(postalCodeIDCard).toHaveValue("postalCode");

      const countryIDCard = screen.getByTestId("countryIDCard");
      expect(countryIDCard).toBeInTheDocument();
      expect(countryIDCard).toHaveValue("");
      fireEvent.change(countryIDCard, { target: { value: "country" } });
      expect(countryIDCard).toHaveValue("country");

      //current address
      const addressNoHome = screen.getByTestId("addressNoHome");
      expect(addressNoHome).toBeInTheDocument();
      expect(addressNoHome).toHaveValue("");
      fireEvent.change(addressNoHome, { target: { value: "address home" } });
      expect(addressNoHome).toHaveValue("address home");

      const floorHome = screen.getByTestId("floorHome");
      expect(floorHome).toBeInTheDocument();
      expect(floorHome).toHaveValue("");
      fireEvent.change(floorHome, { target: { value: "floor home" } });
      expect(floorHome).toHaveValue("floor home");

      const mooHome = screen.getByTestId("mooHome");
      expect(mooHome).toBeInTheDocument();
      expect(mooHome).toHaveValue("");
      fireEvent.change(mooHome, { target: { value: "moo home" } });
      expect(mooHome).toHaveValue("moo home");

      const soiHome = screen.getByTestId("soiHome");
      expect(soiHome).toBeInTheDocument();
      expect(soiHome).toHaveValue("");
      fireEvent.change(soiHome, { target: { value: "soi home" } });
      expect(soiHome).toHaveValue("soi home");

      const roadHome = screen.getByTestId("roadHome");
      expect(roadHome).toBeInTheDocument();
      expect(roadHome).toHaveValue("");
      fireEvent.change(roadHome, { target: { value: "road home" } });
      expect(roadHome).toHaveValue("road home");

      const tambonHome = screen.getByTestId("tambonHome");
      expect(tambonHome).toBeInTheDocument();
      expect(tambonHome).toHaveValue("");
      fireEvent.change(tambonHome, { target: { value: "tambon home" } });
      expect(tambonHome).toHaveValue("tambon home");

      const amphoeHome = screen.getByTestId("amphoeHome");
      expect(amphoeHome).toBeInTheDocument();
      expect(amphoeHome).toHaveValue("");
      fireEvent.change(amphoeHome, { target: { value: "amphoe home" } });
      expect(amphoeHome).toHaveValue("amphoe home");

      const provinceHome = screen.getByTestId("provinceHome");
      expect(provinceHome).toBeInTheDocument();
      expect(provinceHome).toHaveValue("");
      fireEvent.change(provinceHome, { target: { value: "province home" } });
      expect(provinceHome).toHaveValue("province home");

      const postalCodeHome = screen.getByTestId("postalCodeHome");
      expect(postalCodeHome).toBeInTheDocument();
      expect(postalCodeHome).toHaveValue("");
      fireEvent.change(postalCodeHome, { target: { value: "postalCode home" } });
      expect(postalCodeHome).toHaveValue("postalCode home");

      const countryHome = screen.getByTestId("countryHome");
      expect(countryHome).toBeInTheDocument();
      expect(countryHome).toHaveValue("");
      fireEvent.change(countryHome, { target: { value: "country home" } });
      expect(countryHome).toHaveValue("country home");

      //occupation and source of income
      userEvent.selectOptions(
        screen.getByTestId('education'),
        screen.getByTestId('education-มัธยม'),
      )
      expect(screen.getByTestId('education-มัธยม')).toBeInTheDocument();

      await waitFor(() => {
        const education = screen.getByTestId("education") as HTMLInputElement;
        console.log(education.value);
        expect(education.value).toBe("2");
      });

      userEvent.selectOptions(
        screen.getByTestId('sourceOfIncome'),
        screen.getByTestId('sourceOfIncome-เงินเดือน'),
      )
      expect(screen.getByTestId('sourceOfIncome-เงินเดือน')).toBeInTheDocument();

      await waitFor(() => {
        const sourceOfIncome = screen.getByTestId("sourceOfIncome") as HTMLInputElement;
        console.log(sourceOfIncome.value);
        expect(sourceOfIncome.value).toBe("1");
      });

      userEvent.selectOptions(
        screen.getByTestId('currentOccupation'),
        screen.getByTestId('currentOccupation-เจ้าของธุรกิจ/ธุรกิจส่วนตัว'),
      )
      expect(screen.getByTestId('currentOccupation-เจ้าของธุรกิจ/ธุรกิจส่วนตัว')).toBeInTheDocument();

      await waitFor(() => {
        const currentOccupation = screen.getByTestId("currentOccupation") as HTMLInputElement;
        console.log(currentOccupation.value);
        expect(currentOccupation.value).toBe("13");
      });

      const officeName = screen.getByLabelText("ชื่อสถานที่ทำงาน");
      expect(officeName).toBeInTheDocument();
      expect(officeName).toHaveValue("");
      fireEvent.change(officeName, { target: { value: "office name" } });
      expect(officeName).toHaveValue("office name");

      userEvent.selectOptions(
        screen.getByTestId('typeOfBusiness'),
        screen.getByTestId('typeOfBusiness-โรงแรม / ภัตตาคาร'),
      )
      expect(screen.getByTestId('typeOfBusiness-โรงแรม / ภัตตาคาร')).toBeInTheDocument();

      await waitFor(() => {
        const typeOfBusiness = screen.getByTestId("typeOfBusiness") as HTMLInputElement;
        console.log(typeOfBusiness.value);
        expect(typeOfBusiness.value).toBe("2");
      });

      const jobPosition = screen.getByLabelText("ตำแหน่งงาน");
      expect(jobPosition).toBeInTheDocument();
      expect(jobPosition).toHaveValue("");
      fireEvent.change(jobPosition, { target: { value: "job position" } });
      expect(jobPosition).toHaveValue("job position");

      userEvent.selectOptions(
        screen.getByTestId('salaryRange'),
        screen.getByTestId('salaryRange-<15,000'),
      )
      expect(screen.getByTestId('salaryRange-<15,000')).toBeInTheDocument();

      await waitFor(() => {
        const salaryRange = screen.getByTestId("salaryRange") as HTMLInputElement;
        console.log(salaryRange.value);
        expect(salaryRange.value).toBe("1");
      });

      //work address
      const addressNoWork = screen.getByTestId("addressNoWork");
      expect(addressNoWork).toBeInTheDocument();
      expect(addressNoWork).toHaveValue("");
      fireEvent.change(addressNoWork, { target: { value: "address work" } });
      expect(addressNoWork).toHaveValue("address work");

      const floorWork = screen.getByTestId("floorWork");
      expect(floorWork).toBeInTheDocument();
      expect(floorWork).toHaveValue("");
      fireEvent.change(floorWork, { target: { value: "floor work" } });
      expect(floorWork).toHaveValue("floor work");

      const mooWork = screen.getByTestId("mooWork");
      expect(mooWork).toBeInTheDocument();
      expect(mooWork).toHaveValue("");
      fireEvent.change(mooWork, { target: { value: "moo work" } });
      expect(mooWork).toHaveValue("moo work");

      const soiWork = screen.getByTestId("soiWork");
      expect(soiWork).toBeInTheDocument();
      expect(soiWork).toHaveValue("");
      fireEvent.change(soiWork, { target: { value: "soi work" } });
      expect(soiWork).toHaveValue("soi work");

      const roadWork = screen.getByTestId("roadWork");
      expect(roadWork).toBeInTheDocument();
      expect(roadWork).toHaveValue("");
      fireEvent.change(roadWork, { target: { value: "road work" } });
      expect(roadWork).toHaveValue("road work");

      const tambonWork = screen.getByTestId("tambonWork");
      expect(tambonWork).toBeInTheDocument();
      expect(tambonWork).toHaveValue("");
      fireEvent.change(tambonWork, { target: { value: "tambon work" } });
      expect(tambonWork).toHaveValue("tambon work");

      const amphoeWork = screen.getByTestId("amphoeWork");
      expect(amphoeWork).toBeInTheDocument();
      expect(amphoeWork).toHaveValue("");
      fireEvent.change(amphoeWork, { target: { value: "amphoe work" } });
      expect(amphoeWork).toHaveValue("amphoe work");

      const provinceWork = screen.getByTestId("provinceWork");
      expect(provinceWork).toBeInTheDocument();
      expect(provinceWork).toHaveValue("");
      fireEvent.change(provinceWork, { target: { value: "province work" } });
      expect(provinceWork).toHaveValue("province work");

      const postalCodeWork = screen.getByTestId("postalCodeWork");
      expect(postalCodeWork).toBeInTheDocument();
      expect(postalCodeWork).toHaveValue("");
      fireEvent.change(postalCodeWork, { target: { value: "postalCode work" } });
      expect(postalCodeWork).toHaveValue("postalCode work");

      const countryWork = screen.getByTestId("countryWork");
      expect(countryWork).toBeInTheDocument();
      expect(countryWork).toHaveValue("");
      fireEvent.change(countryWork, { target: { value: "country work" } });
      expect(countryWork).toHaveValue("country work");

      //objective
      const shortTermInvesment = screen.getByLabelText("เพื่อการลงทุนระยะสั้น");
      expect(shortTermInvesment).toBeInTheDocument();
      expect(shortTermInvesment).not.toBeChecked();
      fireEvent.click(shortTermInvesment);
      expect(shortTermInvesment).toBeChecked();

      const longTermInvesment = screen.getByLabelText("เพื่อการลงทุนระยะยาว");
      expect(longTermInvesment).toBeInTheDocument();
      expect(longTermInvesment).not.toBeChecked();
      fireEvent.click(longTermInvesment);
      expect(longTermInvesment).toBeChecked();

      //bank account
      userEvent.selectOptions(
        screen.getByTestId('firstBankName'),
        screen.getByTestId('firstBankName-ธนาคารกรุงเทพ จำกัด (มหาชน)'),
      )
      expect(screen.getByTestId('firstBankName-ธนาคารกรุงเทพ จำกัด (มหาชน)')).toBeInTheDocument();

      await waitFor(() => {
        const firstBankName = screen.getByTestId("firstBankName") as HTMLInputElement;
        console.log(firstBankName.value);
        expect(firstBankName.value).toBe("ธนาคารกรุงเทพ จำกัด (มหาชน)");
      });

      const firstBankBranch = screen.getByTestId("firstBankBranch")
      expect(firstBankBranch).toBeInTheDocument();
      expect(firstBankBranch).toHaveValue("");
      fireEvent.change(firstBankBranch, { target: { value: "ชื่อสาขา" } });
      expect(firstBankBranch).toHaveValue("ชื่อสาขา");

      const firstBankAccount = screen.getByTestId("firstBankAccount")
      expect(firstBankAccount).toBeInTheDocument();
      expect(firstBankAccount).toHaveValue("");
      fireEvent.change(firstBankAccount, { target: { value: "เลขที่บัญชี" } });
      expect(firstBankAccount).toHaveValue("เลขที่บัญชี");

      userEvent.selectOptions(
        screen.getByTestId('secondBankName'),
        screen.getByTestId('secondBankName-ธนาคารกสิกรไทย จำกัด (มหาชน)'),
      )
      expect(screen.getByTestId('secondBankName-ธนาคารกสิกรไทย จำกัด (มหาชน)')).toBeInTheDocument();

      await waitFor(() => {
        const secondBankName = screen.getByTestId("secondBankName") as HTMLInputElement;
        console.log(secondBankName.value);
        expect(secondBankName.value).toBe("ธนาคารกสิกรไทย จำกัด (มหาชน)");
      });

      const secondBankBranch = screen.getByTestId("secondBankBranch")
      expect(secondBankBranch).toBeInTheDocument();
      expect(secondBankBranch).toHaveValue("");
      fireEvent.change(secondBankBranch, { target: { value: "ชื่อสาขา" } });
      expect(secondBankBranch).toHaveValue("ชื่อสาขา");

      const secondBankAccount = screen.getByTestId("secondBankAccount")
      expect(secondBankAccount).toBeInTheDocument();
      expect(secondBankAccount).toHaveValue("");
      fireEvent.change(secondBankAccount, { target: { value: "เลขที่บัญชี" } });
      expect(secondBankAccount).toHaveValue("เลขที่บัญชี");

      const submitButton = screen.getByTestId("submitButton")
      expect(submitButton).toBeInTheDocument();
      
      const formData = {
        addressNoIDCard: (addressNoIDCard as HTMLInputElement).value,
        floorIDCard: (floorIDCard as HTMLInputElement).value,
        mooIDCard: (mooIDCard as HTMLInputElement).value,
        soiIDCard: (soiIDCard as HTMLInputElement).value,
        roadIDCard: (roadIDCard as HTMLInputElement).value,
        tambonIDCard: (tambonIDCard as HTMLInputElement).value,
        amphoeIDCard: (amphoeIDCard as HTMLInputElement).value,
        provinceIDCard: (provinceIDCard as HTMLInputElement).value,
        postalCodeIDCard: (postalCodeIDCard as HTMLInputElement).value,
        countryIDCard: (countryIDCard as HTMLInputElement).value,
        addressNoHome: (addressNoHome as HTMLInputElement).value,
        floorHome: (floorHome as HTMLInputElement).value,
        mooHome: (mooHome as HTMLInputElement).value,
        soiHome: (soiHome as HTMLInputElement).value,
        roadHome: (roadHome as HTMLInputElement).value,
        tambonHome: (tambonHome as HTMLInputElement).value,
        amphoeHome: (amphoeHome as HTMLInputElement).value,
        provinceHome: (provinceHome as HTMLInputElement).value,
        postalCodeHome: (postalCodeHome as HTMLInputElement).value,
        countryHome: (countryHome as HTMLInputElement).value,
        education: (screen.getByTestId('education') as HTMLInputElement).value,
        sourceOfIncome: (screen.getByTestId("sourceOfIncome") as HTMLInputElement).value,
        occupation: (screen.getByTestId("currentOccupation") as HTMLInputElement).value,
        officeName: (officeName as HTMLInputElement).value,
        typeOfBusiness: (screen.getByTestId("typeOfBusiness") as HTMLInputElement).value,
        jobPosition: (jobPosition as HTMLInputElement).value,
        salaryRange: (screen.getByTestId('salaryRange') as HTMLInputElement).value,
        addressNoWork: (addressNoWork as HTMLInputElement).value,
        floorWork: (floorWork as HTMLInputElement).value,
        mooWork: (mooWork as HTMLInputElement).value,
        soiWork: (soiWork as HTMLInputElement).value,
        roadWork: (roadWork as HTMLInputElement).value,
        tambonWork: (tambonWork as HTMLInputElement).value,
        amphoeWork: (amphoeWork as HTMLInputElement).value,
        provinceWork: (provinceWork as HTMLInputElement).value,
        postalCodeWork: (postalCodeWork as HTMLInputElement).value,
        countryWork: (countryWork as HTMLInputElement).value,
        shortTermInvesment: (shortTermInvesment as HTMLInputElement).checked,
        longTermInvesment: (longTermInvesment as HTMLInputElement).checked,
        firstBankName: (screen.getByTestId("firstBankName") as HTMLInputElement).value,
        firstBankBranch: (firstBankBranch as HTMLInputElement).value,
        firstBankAccount: (firstBankAccount as HTMLInputElement).value,
        secondBankName: (screen.getByTestId('secondBankName') as HTMLInputElement).value,
        secondBankBranch: (secondBankBranch as HTMLInputElement).value,
        secondBankAccount: (secondBankAccount as HTMLInputElement).value,
      };
    
      console.log("All Input Values:", formData);
      console.log("Input Range: ",Object.keys(formData).length);
      await act(async ()=>{
        fireEvent.click(submitButton);
      })
      
      //Expected form data
      const expectedFormData = {
        data:  {
          cid: '90000001',
          investment: {
            shortTermInvestment: true,
            longTermInvestment: true,
            taxesInvestment: false,
            retireInvestment: false
          },
          occupation: {
            education: '2',
            sourceOfIncome: '1',
            currentOccupation: '13',
            officeName: 'office name',
            typeOfBusiness: '2',
            positionName: 'job position',
            salaryRange: '1'
          },
          addresses: [
            {
              homeNumber: 'address number',
              villageNumber: 'floor',
              villageName: 'moo',
              subStreetName: 'soi',
              streetName: 'road',
              subDistrictName: 'tambon',
              districtName: 'amphoe',
              provinceName: 'province',
              zipCode: 'postalCode',
              countryName: 'country',
              types: 1
            },
            {
              homeNumber: 'address home',
              villageNumber: 'floor home',
              villageName: 'moo home',
              subStreetName: 'soi home',
              streetName: 'road home',
              subDistrictName: 'tambon home',
              districtName: 'amphoe home',
              provinceName: 'province home',
              zipCode: 'postalCode home',
              countryName: 'country home',
              types: 2
            },
            {
              homeNumber: 'address work',
              villageNumber: 'floor work',
              villageName: 'moo work',
              subStreetName: 'soi work',
              streetName: 'road work',
              subDistrictName: 'tambon work',
              districtName: 'amphoe work',
              provinceName: 'province work',
              zipCode: 'postalCode work',
              countryName: 'country work',
              types: 3
            }
          ],
          banks: [
            {
              bankName: 'ธนาคารกรุงเทพ จำกัด (มหาชน)',
              bankBranchName: 'ชื่อสาขา',
              bankAccountNumber: 'เลขที่บัญชี',
              types: 1,
              is_default: true
            },
            {
              bankName: 'ธนาคารกสิกรไทย จำกัด (มหาชน)',
              bankBranchName: 'ชื่อสาขา',
              bankAccountNumber: 'เลขที่บัญชี',
              types: 2,
              is_default: false
            }
          ],
          pageID: 300
        }
      };

      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      })
  
    }, 40000);

    test("update basicinfo", async () => {
      mockAxios.onPost("/api/v1/individual/list/all").reply(200, {
        data:mockIndividualData
      });
      store.dispatch(setIndividualData(mockIndividualData));
      render(
        <Provider store={store}>
          <MemoryRouter>
            <BasicInfo/>
          </MemoryRouter>
        </Provider>
      );

      const submitButton = screen.getByTestId("submitButton")
      expect(submitButton).toBeInTheDocument();
      
      await act(async ()=>{
        fireEvent.submit(submitButton);
      })

      //Expected form data
        const expectedFormData = {
          data: {
            cid: '90000001',
            investment: {
              shortTermInvestment: true,
              longTermInvestment: true,
              taxesInvestment: true,
              retireInvestment: true
            },
            occupation: {
              education: '1',
              sourceOfIncome: '1',
              currentOccupation: '13',
              officeName: 'ทิสโก้ทาวเวอร์',
              typeOfBusiness: '2',
              positionName: 'ทิสโก้ทาวเวอร์',
              salaryRange: '1'
            },
            addresses: [
              {
                homeNumber: '70/178 ramintra65 yak 2-4',
                villageNumber: 'floor',
                villageName: 'moo',
                subStreetName: 'soi',
                streetName: 'road',
                subDistrictName: 'บ้านพานถม',
                districtName: 'เขตพระโขนง',
                provinceName: 'ระยอง',
                zipCode: '10400',
                countryName: 'ออสเตรีย',
                types: 1
              },
              {
                homeNumber: '70/178 ramintra65 yak 2-4',
                villageNumber: 'floor',
                villageName: 'moo',
                subStreetName: 'soi',
                streetName: 'road',
                subDistrictName: 'บ้านพานถม',
                districtName: 'เขตพระโขนง',
                provinceName: 'ระยอง',
                zipCode: '10400',
                countryName: 'ออสเตรีย',
                types: 2
              },
              {
                homeNumber: '70/178 ramintra65 yak 2-4',
                villageNumber: 'floor',
                villageName: 'moo',
                subStreetName: 'soi',
                streetName: 'road',
                subDistrictName: 'บ้านพานถม',
                districtName: 'เขตพระโขนง',
                provinceName: 'ระยอง',
                zipCode: '10400',
                countryName: 'ออสเตรีย',
                types: 3
              }
            ],
            banks: [
              {
                bankName: 'ธนาคารกสิกรไทย จำกัด (มหาชน)',
                bankBranchName: 'bank1',
                bankAccountNumber: 'bankaccountid1',
                types: 1,
                is_default: true
              },
              {
                bankName: 'ธนาคารยูโอบี จำกัด (มหาชน)',
                bankBranchName: 'bank2',
                bankAccountNumber: 'bankaccountid2',
                types: 2,
                is_default: false
              }
            ],
            pageID: 300
          }
        };
      
        await waitFor(() => {
          const state = store.getState();
          const corporateState = state.corporateTest;
          console.log("Corporate State After Submission:", corporateState);
          expect(corporateState).toMatchObject(expectedFormData);
        })

      store.dispatch(clearIndividualData());

    },20000);
  });

  describe("test create individual form3 (suite test)", () => {

    beforeAll(() => {
      localStorage.setItem('cid', '90000001');
    })
    afterAll(() => {
      localStorage.clear();
    })

    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    });
  
    test("test input data(multiple input type)", async () => {

      render(
        <Provider store={store}>
          <MemoryRouter>
            <SuitTestFatca/>
          </MemoryRouter>
        </Provider>
      );

      //suite test
      const question1 = screen.getByTestId("question-0-choice-0");
      expect(question1).toBeInTheDocument();
      expect(question1).not.toBeChecked();
      fireEvent.click(question1);
      expect(question1).toBeChecked();

      const question2 = screen.getByTestId("question-1-choice-0");
      expect(question2).toBeInTheDocument();
      expect(question2).not.toBeChecked();
      fireEvent.click(question2);
      expect(question2).toBeChecked();

      const question3 = screen.getByTestId("question-2-choice-0");
      expect(question3).toBeInTheDocument();
      expect(question3).not.toBeChecked();
      fireEvent.click(question3);
      expect(question3).toBeChecked();

      const question4 = screen.getByTestId("question-3-choice-0");
      expect(question4).toBeInTheDocument();
      expect(question4).not.toBeChecked();
      fireEvent.click(question4);
      expect(question4).toBeChecked();

      const question5 = screen.getByTestId("question-4-choice-0");
      expect(question5).toBeInTheDocument();
      expect(question5).not.toBeChecked();
      fireEvent.click(question5);
      expect(question5).toBeChecked();

      const question6 = screen.getByTestId("question-5-choice-0");
      expect(question6).toBeInTheDocument();
      expect(question6).not.toBeChecked();
      fireEvent.click(question6);
      expect(question6).toBeChecked();

      const question7 = screen.getByTestId("question-6-choice-0");
      expect(question7).toBeInTheDocument();
      expect(question7).not.toBeChecked();
      fireEvent.click(question7);
      expect(question7).toBeChecked();

      const question8 = screen.getByTestId("question-7-choice-0");
      expect(question8).toBeInTheDocument();
      expect(question8).not.toBeChecked();
      fireEvent.click(question8);
      expect(question8).toBeChecked();

      const question9 = screen.getByTestId("question-8-choice-0");
      expect(question9).toBeInTheDocument();
      expect(question9).not.toBeChecked();
      fireEvent.click(question9);
      expect(question9).toBeChecked();

      const DoneButton = screen.getByTestId("DoneButton")
      expect(DoneButton).toBeInTheDocument();
      
      await act(async ()=>{
        fireEvent.click(DoneButton);
      })

      const suiteTestResult = screen.getByText("ผลคะแนนที่ทำได้")
      expect(suiteTestResult).toBeInTheDocument();

      const submitButton = screen.getByText("Next Form");
      expect(submitButton).toBeInTheDocument();

      await act( async ()=>{
        fireEvent.click(submitButton);
      })
      
      //Expected form data
      const expectedFormData = {
        data: {
            id: "90000001",
            suiteTestResult: {
              cid: "90000001",
              investorTypeRisk: 'เสี่ยงตํ่า',
              level: 1,
              totalScore: 9,
              suitTestResult: {
                answer: {
                  0: { ans: [ 1, 0, 0, 0 ] },
                  1: { ans: [ 1, 0, 0, 0 ] },
                  2: { ans: [ 1 ] },
                  3: { ans: [ 1, 0, 0, 0 ] },
                  4: { ans: [ 1, 0, 0, 0 ] },
                  5: { ans: [ 1, 0, 0, 0 ] },
                  6: { ans: [ 1, 0, 0, 0 ] },
                  7: { ans: [ 1, 0, 0, 0 ] },
                  8: { ans: [ 1, 0, 0, 0 ] }
                }
              }
            },
            isFatca: false,
            fatcaInfo: [],
            isKnowLedgeDone: false,
            knowLedgeTestResult: 0,
            pageID: 400
          }
      };

      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      })
  
    }, 40000);

    test("test input data(multiple input type) (knowledge test done)", async () => {

      render(
        <Provider store={store}>
          <MemoryRouter>
            <SuitTestFatca/>
          </MemoryRouter>
        </Provider>
      );

      //suite test
      const question1 = screen.getByTestId("question-0-choice-0");
      expect(question1).toBeInTheDocument();
      expect(question1).not.toBeChecked();
      fireEvent.click(question1);
      expect(question1).toBeChecked();

      const question2 = screen.getByTestId("question-1-choice-0");
      expect(question2).toBeInTheDocument();
      expect(question2).not.toBeChecked();
      fireEvent.click(question2);
      expect(question2).toBeChecked();

      const question3 = screen.getByTestId("question-2-choice-0");
      expect(question3).toBeInTheDocument();
      expect(question3).not.toBeChecked();
      fireEvent.click(question3);
      expect(question3).toBeChecked();

      const question4 = screen.getByTestId("question-3-choice-0");
      expect(question4).toBeInTheDocument();
      expect(question4).not.toBeChecked();
      fireEvent.click(question4);
      expect(question4).toBeChecked();

      const question5 = screen.getByTestId("question-4-choice-0");
      expect(question5).toBeInTheDocument();
      expect(question5).not.toBeChecked();
      fireEvent.click(question5);
      expect(question5).toBeChecked();

      const question6 = screen.getByTestId("question-5-choice-0");
      expect(question6).toBeInTheDocument();
      expect(question6).not.toBeChecked();
      fireEvent.click(question6);
      expect(question6).toBeChecked();

      const question7 = screen.getByTestId("question-6-choice-0");
      expect(question7).toBeInTheDocument();
      expect(question7).not.toBeChecked();
      fireEvent.click(question7);
      expect(question7).toBeChecked();

      const question8 = screen.getByTestId("question-7-choice-0");
      expect(question8).toBeInTheDocument();
      expect(question8).not.toBeChecked();
      fireEvent.click(question8);
      expect(question8).toBeChecked();

      const question9 = screen.getByTestId("question-8-choice-0");
      expect(question9).toBeInTheDocument();
      expect(question9).not.toBeChecked();
      fireEvent.click(question9);
      expect(question9).toBeChecked();

      const DoneButton = screen.getByTestId("DoneButton")
      expect(DoneButton).toBeInTheDocument();
      
      await act(async ()=>{
        fireEvent.click(DoneButton);
      })

      const suiteTestResult = screen.getByText("ผลคะแนนที่ทำได้")
      expect(suiteTestResult).toBeInTheDocument();

      const knowLedgeTest = screen.getByLabelText("ทำตอนนี้")
      expect(knowLedgeTest).toBeInTheDocument();
      expect(knowLedgeTest).not.toBeChecked();
      await act(async ()=>{
        fireEvent.click(knowLedgeTest);
      })
      await waitFor(() => {
        expect(knowLedgeTest).toBeChecked();
      })

      const knowLedgeTestTitle = screen.getByTestId("knowLedgeTestTitle")
      expect(knowLedgeTestTitle).toBeInTheDocument();

      const firstPageChoice = screen.getByText("1.คริปโทเคอร์เรนซี ทำงานอยู่บนเทคโนโลยีที่ชื่อว่า บล็อกเชน(Blockchain)ทำให้มีความปลอดภัยต่ำ ต้นทุนการทำธุรกรรมสูง ไม่มีความเป็นส่วนตัว")
      expect(firstPageChoice).toBeInTheDocument();

      const knowLedgeTestNextPageButton = screen.getByRole("button", { name: "Next" });
      expect(knowLedgeTestNextPageButton).toBeInTheDocument();
      await act(async ()=>{
        fireEvent.click(knowLedgeTestNextPageButton)
      })
      expect(firstPageChoice).not.toBeInTheDocument();


      const submitButton = screen.getByText("Next Form");
      expect(submitButton).toBeInTheDocument();

      await act( async ()=>{
        fireEvent.click(submitButton);
      })
      
      //Expected form data
      // const expectedFormData = {
      // };

      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        // expect(corporateState).toMatchObject(expectedFormData);
      })
  
    }, 40000);

    test("update suite test", async () => {
      store.dispatch(setIndividualData(mockIndividualData));
      render(
        <Provider store={store}>
          <MemoryRouter>
          <SuitTestFatca/>
          </MemoryRouter>
        </Provider>
      );

      const isAmericanBtn = screen.getByLabelText("ใช่")
      expect(isAmericanBtn).toBeInTheDocument();
      expect(isAmericanBtn).not.toBeChecked();
      await act(async ()=>{
        fireEvent.click(isAmericanBtn);
      })
      await waitFor(() => {
        expect(isAmericanBtn).toBeChecked();
      })

      const submitButton = screen.getByText("Next Form");
      expect(submitButton).toBeInTheDocument();
      
      await act(async ()=>{
        fireEvent.submit(submitButton);
      })

      //Expected form data
        const expectedFormData = {
          data: {
            id: '90000001',
            suiteTestResult: {
              cid: '90000001',
              investorTypeRisk: 'เสี่ยงตํ่า',
              level: 1,
              totalScore: 9,
              suitTestResult: {
                answer: {
                  0: { ans: [ 1, 0, 0, 0 ] },
                  1: { ans: [ 1, 0, 0, 0 ] },
                  2: { ans: [ 1 ] },
                  3: { ans: [ 1, 0, 0, 0 ] },
                  4: { ans: [ 1, 0, 0, 0 ] },
                  5: { ans: [ 1, 0, 0, 0 ] },
                  6: { ans: [ 1, 0, 0, 0 ] },
                  7: { ans: [ 1, 0, 0, 0 ] },
                  8: { ans: [ 1, 0, 0, 0 ] }
                }
              }
            },
            isFatca: false,
            fatcaInfo: [],
            isKnowLedgeDone: false,
            knowLedgeTestResult: 0,
            pageID: 400
          }
        };
      
        await waitFor(() => {
          const state = store.getState();
          const corporateState = state.corporateTest;
          console.log("Corporate State After Submission:", corporateState);
          expect(corporateState).toMatchObject(expectedFormData);
        })

      store.dispatch(clearIndividualData());

    },20000);
  });
  
  describe("test create individual form4 (identity verification)", () => {

    beforeAll(() => {
      localStorage.setItem('cid', '90000001');
    })
    afterAll(() => {
      localStorage.clear();
    })

    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    });
  
    test("test input data(choose ndid)", async () => {
      mockAxios.onPost("/api/v1/individual/ndidthaid").reply(200, {
        message: "save ndid success"
      });
      render(
        <Provider store={store}>
          <MemoryRouter>
            <IdentityVerification/>
          </MemoryRouter>
        </Provider>
      );

      const ndidButton = screen.getByTestId("ndidButton")
      expect(ndidButton).toBeInTheDocument();
      fireEvent.click(ndidButton);

      const comfirmButton = screen.getByTestId("comfirmButton")
      expect(comfirmButton).toBeInTheDocument();

      await act(async ()=>{
        fireEvent.click(comfirmButton);
      })
      
      //Expected form data
      const expectedFormData = {
        data: { 
          ndid: true, 
          cid: "90000001"
         }
      };
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });

      const alertComponent = screen.getByText("Verification Selected");
      expect(alertComponent).toBeInTheDocument();
  
    }, 40000);

    test("test input data(choose thaid) success", async () => {
      mockAxios.onPost("/api/v1/individual/ndidthaid").reply(200, {
        message: "save ndid success"
      });
      render(
        <Provider store={store}>
          <MemoryRouter>
            <IdentityVerification/>
          </MemoryRouter>
        </Provider>
      );

      const ndidButton = screen.getByTestId("thaidButton")
      expect(ndidButton).toBeInTheDocument();
      fireEvent.click(ndidButton);

      const comfirmButton = screen.getByTestId("thaidComfirmButton")
      expect(comfirmButton).toBeInTheDocument();

      await act(async ()=>{
        fireEvent.click(comfirmButton);
      })
      
      //Expected form data
      const expectedFormData = {
        data: { 
          thaid: true, 
          cid: "90000001"
         }
      };
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      })

      const alertComponent = screen.getByText("Verification Selected");
      expect(alertComponent).toBeInTheDocument();
  
    }, 40000);


    test("test input data(choose thaid) error", async () => {
      mockAxios.onPost("/api/v1/individual/ndidthaid").reply(400, {
        message: "save thaid not success"
      });
      render(
        <Provider store={store}>
          <MemoryRouter>
            <IdentityVerification/>
          </MemoryRouter>
        </Provider>
      );

      const ndidButton = screen.getByTestId("thaidButton")
      expect(ndidButton).toBeInTheDocument();
      fireEvent.click(ndidButton);

      const comfirmButton = screen.getByTestId("thaidComfirmButton")
      expect(comfirmButton).toBeInTheDocument();

      await act(async ()=>{
        fireEvent.click(comfirmButton);
      })
      
      //Expected form data
      const expectedFormData = {
        data: { 
          thaid: true, 
          cid: "90000001"
         }
      };
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      })

      const alertComponent = screen.getByText("Something went wrong");
      expect(alertComponent).toBeInTheDocument();

      const closeAlert = screen.getByTestId("closeAlert");
      expect(closeAlert).toBeInTheDocument();
      fireEvent.click(closeAlert);
      await waitFor(() => {
        expect(closeAlert).not.toBeInTheDocument();
      })
  
    }, 40000);

    test("update identity verification ndid success", async () => {
      mockAxios.onPost("/api/v1/individual/ndidthaid").reply(200, {
        message: "update ndid success"
      });
      store.dispatch(setIndividualData(mockIndividualData));
      render(
        <Provider store={store}>
          <MemoryRouter>
            <IdentityVerification/>
          </MemoryRouter>
        </Provider>
      );

      const ndidButton = screen.getByTestId("ndidButton")
      expect(ndidButton).toBeInTheDocument();
      fireEvent.click(ndidButton);

      const comfirmButton = screen.getByTestId("comfirmButton")
      expect(comfirmButton).toBeInTheDocument();

      await act(async ()=>{
        fireEvent.click(comfirmButton);
      })

      //Expected form data
        const expectedFormData = {
          data: { ndid: true, cid: '90000001'}
        };
      
        await waitFor(() => {
          const state = store.getState();
          const corporateState = state.corporateTest;
          console.log("Corporate State After Submission:", corporateState);
          expect(corporateState).toMatchObject(expectedFormData);
        })

      const alertComponent = screen.getByText("Something went wrong");
      expect(alertComponent).toBeInTheDocument();
      store.dispatch(clearIndividualData());

    },20000);

    test("update identity verification ndid error", async () => {
      mockAxios.onPost("/api/v1/individual/ndidthaid").reply(400, {
        message: "update ndid not success"
      });
      store.dispatch(setIndividualData(mockIndividualData));
      render(
        <Provider store={store}>
          <MemoryRouter>
            <IdentityVerification/>
          </MemoryRouter>
        </Provider>
      );

      const ndidButton = screen.getByTestId("ndidButton")
      expect(ndidButton).toBeInTheDocument();
      fireEvent.click(ndidButton);

      const comfirmButton = screen.getByTestId("comfirmButton")
      expect(comfirmButton).toBeInTheDocument();

      await act(async ()=>{
        fireEvent.click(comfirmButton);
      })

      //Expected form data
        const expectedFormData = {
          data: { ndid: true, cid: '90000001'}
        };
      
        await waitFor(() => {
          const state = store.getState();
          const corporateState = state.corporateTest;
          console.log("Corporate State After Submission:", corporateState);
          expect(corporateState).toMatchObject(expectedFormData);
        })

      const alertComponent = screen.getByText("Something went wrong");
      expect(alertComponent).toBeInTheDocument();
      store.dispatch(clearIndividualData());

    },20000);

    test("test no cid in localstorage", async () => {

      localStorage.clear();
      render(
        <Provider store={store}>
          <MemoryRouter>
            <IdentityVerification/>
          </MemoryRouter>
        </Provider>
      );

      const thaidButton = screen.getByTestId("thaidButton")
      expect(thaidButton).toBeInTheDocument();
      fireEvent.click(thaidButton);

      await waitFor(() => {

        const cancleThaidButton = screen.getByText("Cancel")
        expect(cancleThaidButton).toBeInTheDocument();
      })
      fireEvent.click(screen.getByText("Cancel"));

      const ndidButton = screen.getByTestId("ndidButton")
      expect(ndidButton).toBeInTheDocument();
      fireEvent.click(ndidButton);

      const comfirmButton = screen.getByTestId("comfirmButton")
      expect(comfirmButton).toBeInTheDocument();

      await act(async ()=>{
        fireEvent.click(comfirmButton);
      })
      
      //Expected form data
      const expectedFormData = {
        data: { 
          ndid: true, 
          cid: null
         }
      };
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
  
    }, 40000);
  });