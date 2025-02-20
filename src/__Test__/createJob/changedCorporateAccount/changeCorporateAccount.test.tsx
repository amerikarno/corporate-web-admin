// import TodoCorporateAccountOpenning from "@/pages/createJob/changeCorporateAccount/corporateAccountOpening";
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
  } from "@testing-library/react";
  import "@testing-library/jest-dom";
  import { Provider } from "react-redux";
  import { MemoryRouter } from "react-router-dom";
  import { store } from "@/app/store";
  import { setUser } from "@/features/user/userSlice";
  import { mockUser } from "@/__Test__/utils";
  // import { useAccountOpening } from "@/pages/createJob/changeCorporateAccount/hook/useAccountOpening";
  // import { TCorporateData } from "@/pages/createJob/changeCorporateAccount/constant/type";
  // import { act } from "react";
  // import CorporateAccountOpenning from "@/pages/createJob/changeCorporateAccount/edit/editCorporateAccount";
  import { FormCorporateTypeAndIncome } from "@/pages/createJob/changeCorporateAccount/components/formCorporateInfo2";
  import { FormIndividualsContactPerson } from "@/pages/createJob/changeCorporateAccount/components/formContactPerson";
  // import { FormIndividualsDirector } from "@/pages/createJob/changeCorporateAccount/edit/components/formDirectorInfo";
  import { FormIndividualsShareholders } from "@/pages/createJob/changeCorporateAccount/components/formIndividualsShareholders";
  import { FormJuristicShareholders } from "@/pages/createJob/changeCorporateAccount/components/formJuristicShareholders";
  // import { FormAuthorizedPerson } from "@/pages/createJob/changeCorporateAccount/edit/components/formAuthorization";
  // import { sleep } from "@/lib/utils";
  // import { FormAttorney } from "@/pages/createJob/changeCorporateAccount/edit/components/formAttorney";
  import { FormBank } from "@/pages/createJob/changeCorporateAccount/components/formBank";
  import UploadFiles from "@/pages/createJob/changeCorporateAccount/pages/uploadFiles/uploadFiles";
  import * as useUploadFileModule from "@/pages/createJob/changeCorporateAccount/pages/uploadFiles/hook/useUploadFile";
  import { PageJuristicType } from "@/pages/createJob/changeCorporateAccount/pages/PageJuristicType";
  import {TContact, TCorporateData, TDirector, TJuristic } from "@/pages/createJob/constant/type";
  import {
    clearCorporateData,
    setCorporateData,
  } from "@/features/editCorporateData/editCorporateData";
  import { clearTestCorporateData } from "@/features/corporateTest/corporateTestSlice";
  import { PageContactPerson } from "@/pages/createJob/changeCorporateAccount/pages/PageContactPerson";
  import { clearContactPersons, setContactPersons } from "@/features/contactPersonSlice";
  import { ListOfDirectors } from "@/pages/createJob/changeCorporateAccount/pages/ListOfDirectors";
  import { clearDirector, setDirectorEdit } from "@/features/ListOfDirectorSlice/listOfDirectorSlice";
  import { TIndividualShareholder } from "@/pages/createJob/constant/type";
  import axios from "@/api/axios";
  import MockAdapter from "axios-mock-adapter";
  import { PageIndividualShareholder } from "@/pages/createJob/changeCorporateAccount/pages/PageIndividualShareholder";
  import { clearIndividualShareholder, setIndividualShareholder } from "@/features/individualShareholder/individualShareholderSlice";
  import { PageJuristicShareholder } from "@/pages/createJob/changeCorporateAccount/pages/PageJuristicShareholder";
  import { clearJuristicShareholder, setJuristicShareholder } from "@/features/juristicShareholderSlice/juristicShareholderSlice";
  import { mapDataToTAttorney, mapDataToTAuthoirzedPerson, mapDataToTBank, mapDataToTJuristicShareholder } from "@/pages/createJob/changeCorporateAccount/libs/utils";
  import { TAuthorizePerson, TJuristicsShareholders } from "@/pages/createJob/addedCorporateAccount/constants2/types";
  import { PageAuthorizedPerson } from "@/pages/createJob/changeCorporateAccount/pages/PageAuthorizedPerson";
  import { TAuthorizedPerson as TAuthorizedPersonEdit } from "@/pages/createJob/constant/type";
  import { clearAuthorizedPerson, setAuthorizedPersons } from "@/features/authorizedPerson/authorizedPersonSlice";
  import { PageAttorney } from "@/pages/createJob/changeCorporateAccount/pages/PageAttorney";
  import { clearAttorney, setAttorney } from "@/features/attorney/attorney";
  import { PageBankAccount } from "@/pages/createJob/changeCorporateAccount/pages/PageBankAccount";
  import { clearBank, setBank } from "@/features/bankSlice/bankSlice";
  import { PageSuitTest } from "@/pages/createJob/changeCorporateAccount/pages/PageSuitTest";
  import { useSuitTest } from "@/pages/createJob/changeCorporateAccount/hook/useSuitTest";
  // import { PageCorporateInfo } from "@/pages/createJob/addedCorporateAccount/pages/PageCorporateInfo";
  // import userEvent from "@testing-library/user-event";
  
  jest.mock("@/lib/utils", () => ({
    ...jest.requireActual("@/lib/utils"),
    isExpiredToken: jest.fn().mockReturnValue(false),
  }));
  
  jest.mock("@/lib/Cookies", () => ({
    getCookies: jest
      .fn()
      .mockReturnValue(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhYjEyMmRjLTc3YzctNDlmYy04ZTBkLTg2NWVjYTY1MmI4MCIsImVtYWlsIjoiYjcwODk4NTY5ZWRjYjk5MjdhMDZkZDUxMTBmMWI4ZmUxZDQ2ZTVmOTg1ZTBkOWYyMjI0ZDc3NDg1NzU3ZjFlYSIsImdyb3VwcyI6WzEwMDEsMTAwMiwxMDAzLDIwMDEsMjAwMiwyMDAzXSwicGVybWlzc2lvbnMiOlsxMDEsMTAyLDEwMywyMDEsMjAyLDIwM10sInJvbGVzIjpbMTEsMTIsMTMsMjEsMjIsMjNdLCJ1c2VySWQiOiIiLCJsb2dpblN0YXR1cyI6IiIsImV4cGlyZXNEYXRlIjoiMDAwMS0wMS0wMVQwMDowMDowMFoiLCJFcnJvciI6bnVsbCwiZXhwIjoxNzI3MTY3MzQyLCJpYXQiOjE3MjcwODA5NDJ9.PWG3vMMN3POr-SWDnO4etQ5D1ZV2mX7D1Fzwsb8sfBg"
      ),
  }));
  
  jest.mock("@/pages/createJob/changeCorporateAccount/pages/uploadFiles/hook/useUploadFile");
  
  const mockAxios = new MockAdapter(axios);
  
  const mockCorporateData: TCorporateData = {
    "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
    "Info": {
        "id": "298c57e5-5ca8-45bb-81c3-9227c95c4d53",
        "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
        "CreatedAt": "2024-10-21T08:35:39.09+07:00",
        "DeletedAt": null,
        "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
        "name": "sssABC Co.ltd",
        "registrationNo": "1234567",
        "taxId": "1234567890",
        "dateOfIncorporation": "2013-03-06T08:55:42+07:00"
    },
    "CorporateCountry": [
        {
            "id": "18d40301-c290-4c51-a5bf-d332efb58709",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T08:37:41.229+07:00",
            "DeletedAt": null,
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "isThailand": true,
            "other": "",
            "types": 603
        },
        {
            "id": "939554a4-eab9-4692-a8d9-a2072a0f1425",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T08:35:39.138+07:00",
            "DeletedAt": null,
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "isThailand": true,
            "other": "dfdasgdgh",
            "types": 602
        },
        {
            "id": "bb40f1c9-8024-4efd-8eef-7dc295af253b",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T08:35:39.138+07:00",
            "DeletedAt": null,
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "isThailand": true,
            "other": "12314556",
            "types": 601
        }
    ],
    "CorporateAddress": [
        {
            "address": [
                {
                    "id": "74da55b0-2852-417b-ba4f-573338c715ef",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T08:35:39.27+07:00",
                    "DeletedAt": null,
                    "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
                    "addressNo": "123",
                    "mooNo": "4",
                    "building": "tisco",
                    "floor": "16",
                    "soi": "14",
                    "road": "sirom",
                    "tambon": "sirom",
                    "amphoe": "sirom",
                    "province": "bangkok",
                    "postalCode": "10100",
                    "country": "thailand",
                    "types": 702
                }
            ],
            "emailAddress": "aaaaaa@ooooo.com",
            "telephone": "0912341511"
        },
        {
            "address": [
                {
                    "id": "d9d8ce36-2766-4a24-9dff-eb70650509c8",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T08:35:39.218+07:00",
                    "DeletedAt": null,
                    "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
                    "addressNo": "123",
                    "mooNo": "4",
                    "building": "tisco",
                    "floor": "16",
                    "soi": "14",
                    "road": "sirom",
                    "tambon": "sirom",
                    "amphoe": "sirom",
                    "province": "bangkok",
                    "postalCode": "10100",
                    "country": "thailand",
                    "types": 701
                }
            ],
            "emailAddress": "aaaaaa@ooooo.com",
            "telephone": "0912341511"
        }
    ],
    "CorporateFinancials": {
        "id": "b33fa323-edf9-42c6-bc02-780abbd9b843",
        "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
        "CreatedAt": "2024-10-21T08:35:39.17+07:00",
        "DeletedAt": null,
        "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
        "registeredCapital": 12346,
        "revenuePerYear": 123456,
        "netProfitLoss": 123456,
        "shareholderEquity": 123456
    },
    "CorporateTypes": {
        "id": "80f48d6c-a3d0-49c5-a73e-f59f1158c803",
        "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
        "CreatedAt": "2024-10-21T08:37:41.144+07:00",
        "DeletedAt": null,
        "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
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
        "id": "d25389f8-9369-4c7c-9c7d-818057c0bb7c",
        "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
        "CreatedAt": "2024-10-21T08:37:41.172+07:00",
        "DeletedAt": null,
        "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
        "isAntiqueTrading": false,
        "isHotelRestaurant": false,
        "isArmament": false,
        "isInsuranceAssurance": false,
        "isCasinoGambling": true,
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
        "id": "4c49ba18-b729-4922-a5b0-cd9ff1c179f9",
        "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
        "CreatedAt": "2024-10-21T08:37:41.198+07:00",
        "DeletedAt": null,
        "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
        "isRevenue": true,
        "isStock": false,
        "isDonation": true,
        "isLoan": false,
        "isRevenueSelling": false,
        "isOtherIncome": false,
        "otherIncome": ""
    },
    "CountrySourceIncomes": [
        {
            "CreatedAt": "0001-01-01T00:00:00Z",
            "DeletedAt": null,
            "registerId": "",
            "corporateCountry": {
                "id": "18d40301-c290-4c51-a5bf-d332efb58709",
                "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                "CreatedAt": "2024-10-21T08:37:41.229+07:00",
                "DeletedAt": null,
                "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
                "isThailand": true,
                "other": "",
                "types": 603
            },
            "otherCountry": "",
            "investmentObject": "",
            "isLiquidation": true,
            "isInvestment": false,
            "isCashManagement": false,
            "isOtherInvestment": false,
            "otherInvestment": ""
        }
    ],
    "Contact": [
        {
            "id": "20f2d70b-47a9-40b1-9c8a-00f24c0bd435",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T09:25:10.695+07:00",
            "DeletedAt": null,
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "fullNames": [
                {
                    "id": "a233fa19-cafa-41ec-8312-69b95ed51cc3",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:25:10.703+07:00",
                    "DeletedAt": null,
                    "contactID": "c75a46fb-1126-4812-8934-303ad992f3c4",
                    "title": "Mr.",
                    "firstName": "Moss",
                    "lastName": "Ssoom",
                    "types": 401
                }
            ],
            "personalId": "c75a46fb-1126-4812-8934-303ad992f3c4",
            "position": "CEO",
            "division": "ABC",
            "telephone": "01234456778",
            "email": "MMM@123.gmail.con",
            "types": 401
        },
        {
            "id": "465d6410-3a2d-460a-8636-fc75c1e9b66c",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T09:37:44.067+07:00",
            "DeletedAt": null,
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "fullNames": [
                {
                    "id": "6f505f77-cc8d-4574-a46d-de246cd6ff7f",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:37:44.073+07:00",
                    "DeletedAt": null,
                    "contactID": "ce5adab8-6e82-4680-bd7b-37f2fc571fd3",
                    "title": "Mr.",
                    "firstName": "Moss",
                    "lastName": "Ssoom",
                    "types": 401
                }
            ],
            "personalId": "ce5adab8-6e82-4680-bd7b-37f2fc571fd3",
            "position": "CEO",
            "division": "ABC",
            "telephone": "01234456778",
            "email": "MMM@123.gmail.con",
            "types": 401
        },
        {
            "id": "febe4819-0e54-4592-9c63-9e38c375e7bf",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T08:37:13.935+07:00",
            "DeletedAt": null,
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "fullNames": [
                {
                    "id": "cda11517-cae6-474e-b05d-6ad72982e9cf",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T08:37:13.938+07:00",
                    "DeletedAt": null,
                    "contactID": "baa7c9c2-4a02-4a8e-bb9c-1ceaa3d3eadc",
                    "title": "Mr.",
                    "firstName": "Moss",
                    "lastName": "Ssoom",
                    "types": 401
                }
            ],
            "personalId": "baa7c9c2-4a02-4a8e-bb9c-1ceaa3d3eadc",
            "position": "CEO",
            "division": "ABC",
            "telephone": "01234456778",
            "email": "MMM@123.gmail.con",
            "types": 401
        }
    ],
    "Directors": [
        {
            "id": "3ef3a6be-a248-419d-a75f-ca9904f601ea",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T09:05:43.152+07:00",
            "DeletedAt": null,
            "personalId": "fa9dfbda-7f55-4a89-99a3-2374da455e00",
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "fullNames": [
                {
                    "id": "0e8153af-417e-4644-8180-726b6224e7ec",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:05:43.172+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "fa9dfbda-7f55-4a89-99a3-2374da455e00",
                    "title": "Mr",
                    "firstName": "Johnfforreal",
                    "lastName": "Doefdd",
                    "types": 101
                },
                {
                    "id": "d65b3d22-fa21-45b3-ae6a-832841a42fee",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:05:43.172+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "fa9dfbda-7f55-4a89-99a3-2374da455e00",
                    "title": "Mr",
                    "firstName": "JohnMore",
                    "lastName": "Doefd",
                    "types": 101
                }
            ],
            "addresses": [
                {
                    "id": "a9b30c64-3a86-40ec-b42b-f5b4148f1202",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:05:43.162+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "fa9dfbda-7f55-4a89-99a3-2374da455e00",
                    "addressNo": "123",
                    "mooNo": "1",
                    "soi": "Sukhumvit",
                    "road": "Somewhere",
                    "tambon": "Tam",
                    "amphoe": "Klong",
                    "province": "Bangkok",
                    "postalCode": "10120",
                    "country": "Thailand",
                    "types": 101
                },
                {
                    "id": "d730ac5e-4c00-460c-8f48-b2412c09c614",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:05:43.162+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "fa9dfbda-7f55-4a89-99a3-2374da455e00",
                    "addressNo": "2423",
                    "tambon": "Tam",
                    "amphoe": "Chan",
                    "province": "Bangkok",
                    "postalCode": "10520",
                    "country": "Thailand",
                    "types": 101
                }
            ],
            "passportId": "3993693",
            "expiryDate": "2025-01-01T07:00:00+07:00",
            "nationality": "Thai",
            "types": 101
        }
    ],
    "AuthorizedPersons": [
        {
            "id": "ca167b9d-1e25-46ae-9400-94ae243320b7",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T09:05:50.399+07:00",
            "DeletedAt": null,
            "personalId": "bde0db45-1b2a-46d8-85df-e2939e91ad93",
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "fullNames": [
                {
                    "id": "1cfec602-cdc7-41a0-9e08-8ca6774499fe",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:05:50.408+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "bde0db45-1b2a-46d8-85df-e2939e91ad93",
                    "title": "Mr",
                    "firstName": "Johnfforreal",
                    "lastName": "Doefdd",
                    "types": 201
                },
                {
                    "id": "ff391b74-6deb-40cb-8395-499f0923801a",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:05:50.408+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "bde0db45-1b2a-46d8-85df-e2939e91ad93",
                    "title": "Mr",
                    "firstName": "JohnMore",
                    "lastName": "Doefd",
                    "types": 201
                }
            ],
            "addresses": [
                {
                    "id": "087c1e69-ed11-47a0-88e1-d94585067303",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:05:50.403+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "bde0db45-1b2a-46d8-85df-e2939e91ad93",
                    "addressNo": "2423",
                    "tambon": "Tam",
                    "amphoe": "Chan",
                    "province": "Bangkok",
                    "postalCode": "10520",
                    "country": "Thailand",
                    "types": 201
                },
                {
                    "id": "aa2fd25a-cc6a-4d34-80db-eef57a25eaab",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:05:50.403+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "bde0db45-1b2a-46d8-85df-e2939e91ad93",
                    "addressNo": "123",
                    "mooNo": "1",
                    "soi": "Sukhumvit",
                    "road": "Somewhere",
                    "tambon": "Tam",
                    "amphoe": "Klong",
                    "province": "Bangkok",
                    "postalCode": "10120",
                    "country": "Thailand",
                    "types": 201
                }
            ],
            "citizenId": "12345676",
            "expiryDate": "2025-01-01T07:00:00+07:00",
            "nationality": "Thai",
            "types": 201
        }
    ],
    "IndividualShareholders": [
        {
            "id": "562bd51d-1575-4d13-a03a-1a253ea6fbba",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T09:05:57.657+07:00",
            "DeletedAt": null,
            "personalId": "9f11cf94-5bf6-4619-a210-56822a3945b7",
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "fullNames": [
                {
                    "id": "e102cbb9-2285-4ced-ac0b-cbf762083bf8",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:05:57.662+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "9f11cf94-5bf6-4619-a210-56822a3945b7",
                    "title": "Mr",
                    "firstName": "Money",
                    "lastName": "Cash",
                    "types": 301
                },
                {
                    "id": "eeebda0a-72ec-41c1-8af4-2f6767ed0b2d",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:05:57.662+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "9f11cf94-5bf6-4619-a210-56822a3945b7",
                    "title": "Mr",
                    "firstName": "Dollar",
                    "lastName": "Burger",
                    "types": 301
                }
            ],
            "passportId": "1248068655",
            "expiryDate": "2025-01-01T07:00:00+07:00",
            "nationality": "Thai",
            "types": 301,
            "sharePercentage": 28
        }
    ],
    "Attorneys": [
        {
            "id": "495cd875-abd4-4572-8c31-b933e221667f",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T09:06:07.054+07:00",
            "DeletedAt": null,
            "personalId": "815131c0-4685-489d-a941-f2c12bbbdc35",
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "fullNames": [
                {
                    "id": "6c2c3147-b1de-4f29-b739-802f1feeabd9",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:06:07.062+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "815131c0-4685-489d-a941-f2c12bbbdc35",
                    "title": "attorney-title",
                    "firstName": "attorney-name",
                    "lastName": "attorney-surname",
                    "types": 302
                }
            ],
            "addresses": [
                {
                    "id": "b1df6deb-5b9a-4eb1-90db-de2574377090",
                    "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
                    "CreatedAt": "2024-10-21T09:06:07.057+07:00",
                    "DeletedAt": null,
                    "ReferenceID": "815131c0-4685-489d-a941-f2c12bbbdc35",
                    "addressNo": "70/178 ramintra65 yak 2-4",
                    "mooNo": "address",
                    "building": "address",
                    "floor": "address",
                    "soi": "address",
                    "road": "address",
                    "tambon": "address",
                    "amphoe": "address",
                    "province": "Bangkok",
                    "postalCode": "10220",
                    "country": "Thailand",
                    "types": 302
                }
            ],
            "passportId": "12345",
            "expiryDate": "2024-09-26T07:00:00+07:00",
            "nationality": "attorney-nation",
            "telephone": "0884744411",
            "email": "test@example.us",
            "types": 302
        }
    ],
    "Juristics": [
        {
            "id": "95073f67-7c94-4232-bae4-8d719689c2c1",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T08:51:16.838+07:00",
            "DeletedAt": null,
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "juristicName": "Real Corporation",
            "registrationNo": "REG123456",
            "registeredCountry": "Thailand",
            "sharePercentage": 75
        }
    ],
    "Banks": [
        {
            "id": "0e29fbff-5a77-4b26-8ca5-0aee07e16ecd",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-21T09:10:32.367+07:00",
            "DeletedAt": null,
            "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
            "accountType": "savings",
            "bankName": "Bank G",
            "accountNo": "5566778899",
            "accountLocation": "Udon Thani",
            "swiftCode": "UDO12345"
        }
    ],
    "Documents": [],
    "SuitTestResult": {
        "CreatedAt": "0001-01-01T00:00:00Z",
        "DeletedAt": null,
        "registerId": "",
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
  
  
  describe("test create corporate form2", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.resetModules();
        store.dispatch(setUser(mockUser));
        store.dispatch(clearTestCorporateData());
    });
  
    beforeAll(() => {
      localStorage.setItem('registerId', '80000001');
    })
    afterAll(() => {
      localStorage.clear();
    })
  
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      jest.resetModules();
      store.dispatch(setUser(mockUser));
  });
  
    test("test Juristic Infomations (Page)", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageJuristicType
            />
          </MemoryRouter>
        </Provider>
      );
  
      const pageTitle = screen.getByText("Juristic Infomations");
      expect(pageTitle).toBeInTheDocument();
  
      const juristicId = screen.getByText("Juristic ID");
      expect(juristicId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 5ce7a417-fc23-4108-a8a6-76e4512161c5"));
      });
  
      const taxId = screen.getByText("Tax ID");
      expect(taxId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567890"));
      });
  
      const juristicName = screen.getByText("Juristic Investor Name");
      expect(juristicName).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": sssABC Co.ltd"));
      });
  
      const dateIncorporation = screen.getByText("Date Of Incorporation");
      expect(dateIncorporation).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 2013-03-06"));
      });
  
      const commercialNumber = screen.getByText("Commercial Number");
      expect(commercialNumber).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567"));
      });
  
      store.dispatch(clearCorporateData());
    }, 40000);
  
    test("test input data(multiple input type) Specify Other Input", async () => {
      // const onSubmit = jest.fn();
      store.dispatch(clearTestCorporateData());
      store.dispatch(clearCorporateData());
      const state = store.getState();
      console.log("State after clearCorporateData:", state);
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <FormCorporateTypeAndIncome />
          </MemoryRouter>
        </Provider>
      );
  
      //first box
      const juristicThailand = screen.getByLabelText("Juristic (Thailand)");
      expect(juristicThailand).toBeInTheDocument();
      expect(juristicThailand).not.toBeChecked();
      fireEvent.click(juristicThailand);
      expect(juristicThailand).toBeChecked();
  
      const TaxExempt = screen.getByLabelText(
        "Tax Exempt On Dividend And Capital Gain"
      );
      expect(TaxExempt).toBeInTheDocument();
      expect(TaxExempt).not.toBeChecked();
      fireEvent.click(TaxExempt);
      expect(TaxExempt).toBeChecked();
  
      //business type box
      const AntiqueTrading = screen.getByLabelText("Antique Trading");
      expect(AntiqueTrading).toBeInTheDocument();
      expect(AntiqueTrading).not.toBeChecked();
      fireEvent.click(AntiqueTrading);
      expect(AntiqueTrading).toBeChecked();
  
      //source of income box
      const revenueBusiness = screen.getByLabelText("Revenue From Business");
      expect(revenueBusiness).toBeInTheDocument();
      expect(revenueBusiness).not.toBeChecked();
      fireEvent.click(revenueBusiness);
      expect(revenueBusiness).toBeChecked();
  
      //country source of income box
      const thailand = screen.getByLabelText("Thailand");
      expect(thailand).toBeInTheDocument();
      expect(thailand).not.toBeChecked();
      fireEvent.click(thailand);
      expect(thailand).toBeChecked();
  
      //investment objective box
      const liquidityManagment = screen.getByLabelText("Liquidity Management");
      expect(liquidityManagment).toBeInTheDocument();
      expect(liquidityManagment).not.toBeChecked();
      fireEvent.click(liquidityManagment);
      expect(liquidityManagment).toBeChecked();
  
      const submitButton = screen.getByText("Next Form");
      expect(submitButton).toBeInTheDocument();
  
      await act(async () => {
        fireEvent.click(submitButton);
      });
  
      //Expected form data
      const expectedFormData = {
        data: {
          createBy: '',
          CreatedAt: '',
          DeletedAt: null,
          id: '',
          registerId: '',
          isAntiqueTrading: true,
          isHotelRestaurant: false,
          isArmament: false,
          isInsuranceAssurance: false,
          isCasinoGambling: false,
          isJewelryGoldTrading: false,
          isFoundation: false,
          isPropertyRealEstate: false,
          isMoneyTransfer: false,
          isEmploymentAgency: false,
          isEntertainment: false,
          isTravel: false,
          isFinancial: false,
          isEducationCenter: false,
          isForeignCurrencyExchange: false,
          isCryptoRelated: false,
          isOtherBusiness: false,
          otherBusinessType: '',
          isJuristicThailand: true,
          isTaxExempt: true,
          isNonTaxExempt: false,
          isJuristicForeign: false,
          isOperatingInThailand: false,
          isNonOperatingInThailand: false,
          isOther: false,
          isPartnership: false,
          isGovernmentStateEnterprise: false,
          isCoOperative: false,
          isTaxExemptCompany: false,
          isDonation: false,
          isLoan: false,
          isOtherIncome: false,
          isRevenue: true,
          isRevenueSelling: false,
          isStock: false,
          otherIncome: '',
          corporateCountry: { isThailand: true },
          isLiquidation: true
        }
      };
  
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
    }, 40000);
  
    test("test input data(multiple input type)", async () => {
      // const onSubmit = jest.fn();
      store.dispatch(clearTestCorporateData());
      render(
        <Provider store={store}>
          <MemoryRouter>
            <FormCorporateTypeAndIncome />
          </MemoryRouter>
        </Provider>
      );
  
      //first box
      const juristicThailand = screen.getByLabelText("Juristic (Thailand)");
      expect(juristicThailand).toBeInTheDocument();
      expect(juristicThailand).not.toBeChecked();
      fireEvent.click(juristicThailand);
      expect(juristicThailand).toBeChecked();
  
      const TaxExempt = screen.getByLabelText(
        "Tax Exempt On Dividend And Capital Gain"
      );
      expect(TaxExempt).toBeInTheDocument();
      expect(TaxExempt).not.toBeChecked();
      fireEvent.click(TaxExempt);
      expect(TaxExempt).toBeChecked();
  
      //business type box
      const AntiqueTrading = screen.getByLabelText("Antique Trading");
      expect(AntiqueTrading).toBeInTheDocument();
      expect(AntiqueTrading).not.toBeChecked();
      fireEvent.click(AntiqueTrading);
      expect(AntiqueTrading).toBeChecked();
  
      //source of income box
      const sourceOfIncomeOther = screen.getByTestId("sourceOfIncomeOther");
      expect(sourceOfIncomeOther).toBeInTheDocument();
      expect(sourceOfIncomeOther).not.toBeChecked();
      fireEvent.click(sourceOfIncomeOther);
      expect(sourceOfIncomeOther).toBeChecked();
  
      const sourceOfIncomeOtherInput = screen.getByPlaceholderText(
        "Others Please Specific"
      );
      expect(sourceOfIncomeOtherInput).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(sourceOfIncomeOtherInput, {
          target: { value: "Thailand" },
        });
      })
      expect(sourceOfIncomeOtherInput).toHaveValue("Thailand");
  
      //country source of income box
      const thailandOther = screen.getByLabelText(
        "Others Countries (Please Specify)"
      );
      expect(thailandOther).toBeInTheDocument();
      expect(thailandOther).not.toBeChecked();
      fireEvent.click(thailandOther);
      expect(thailandOther).toBeChecked();
  
      const thailandOtherInput = screen.getByPlaceholderText(
        "Others Please Specify"
      );
      expect(thailandOtherInput).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(thailandOtherInput, { target: { value: "Thailand" } });
      })
      expect(thailandOtherInput).toHaveValue("Thailand");
  
      //investment objective box
      const investmentObjectiveOther = screen.getByTestId(
        "investmentObjectiveOther"
      );
      expect(investmentObjectiveOther).toBeInTheDocument();
      expect(investmentObjectiveOther).not.toBeChecked();
      fireEvent.click(investmentObjectiveOther);
      expect(investmentObjectiveOther).toBeChecked();
  
      const investmentObjectiveOtherInput = screen.getByTestId(
        "investmentObjectiveOtherBox"
      );
      expect(investmentObjectiveOtherInput).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(investmentObjectiveOtherInput, {
          target: { value: "Thailand" },
        });
      })
      expect(investmentObjectiveOtherInput).toHaveValue("Thailand");
  
      const submitButton = screen.getByText("Next Form");
      expect(submitButton).toBeInTheDocument();
  
      await act(async () => {
        fireEvent.click(submitButton);
      });
  
      //Expected form data
      // const expectedFormData = {
      // };
  
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        // expect(corporateState).toMatchObject(expectedFormData);
      });
    }, 40000);
  
    test("test input form2 all radio input", async () => {
      // const onSubmit = jest.fn();
      store.dispatch(clearTestCorporateData());
      render(
        <Provider store={store}>
          <MemoryRouter>
            <FormCorporateTypeAndIncome />
          </MemoryRouter>
        </Provider>
      );
  
      //first box
  
      const juristicOthers = screen.getByLabelText("Others");
      expect(juristicOthers).toBeInTheDocument();
      expect(juristicOthers).not.toBeChecked();
      fireEvent.click(juristicOthers);
      expect(juristicOthers).toBeChecked();
  
      const partnerShip = screen.getByLabelText("Partnership (Thailand)");
      expect(partnerShip).toBeInTheDocument();
      expect(partnerShip).not.toBeChecked();
      fireEvent.click(partnerShip);
      expect(partnerShip).toBeChecked();
  
      const government = screen.getByLabelText(
        "Government Organization / State Enterprise"
      );
      expect(government).toBeInTheDocument();
      expect(government).not.toBeChecked();
      fireEvent.click(government);
      expect(government).toBeChecked();
  
      const taxExamptCompany = screen.getByLabelText("Tax Exempt Company");
      expect(taxExamptCompany).toBeInTheDocument();
      expect(taxExamptCompany).not.toBeChecked();
      fireEvent.click(taxExamptCompany);
      expect(taxExamptCompany).toBeChecked();
  
      const juristicForeign = screen.getByLabelText("Juristic (Foreign)");
      expect(juristicForeign).toBeInTheDocument();
      expect(juristicForeign).not.toBeChecked();
      fireEvent.click(juristicForeign);
      expect(juristicForeign).toBeChecked();
  
      const operatingThailand = screen.getByLabelText("Operating In Thailand");
      expect(operatingThailand).toBeInTheDocument();
      expect(operatingThailand).not.toBeChecked();
      fireEvent.click(operatingThailand);
      expect(operatingThailand).toBeChecked();
  
      const nonOperatingThailand = screen.getByLabelText(
        "Non Operating In Thailand"
      );
      expect(nonOperatingThailand).toBeInTheDocument();
      expect(nonOperatingThailand).not.toBeChecked();
      fireEvent.click(nonOperatingThailand);
      expect(nonOperatingThailand).toBeChecked();
  
      const juristicThailand = screen.getByLabelText("Juristic (Thailand)");
      expect(juristicThailand).toBeInTheDocument();
      expect(juristicThailand).not.toBeChecked();
      fireEvent.click(juristicThailand);
      expect(juristicThailand).toBeChecked();
  
      const TaxExempt = screen.getByLabelText(
        "Tax Exempt On Dividend And Capital Gain"
      );
      expect(TaxExempt).toBeInTheDocument();
      expect(TaxExempt).not.toBeChecked();
      fireEvent.click(TaxExempt);
      expect(TaxExempt).toBeChecked();
  
      //business type box
  
      const armamnet = screen.getByLabelText("Armamnet");
      expect(armamnet).toBeInTheDocument();
      expect(armamnet).not.toBeChecked();
      fireEvent.click(armamnet);
      expect(armamnet).toBeChecked();
  
      const casinoGambling = screen.getByLabelText("Casino / Gambling");
      expect(casinoGambling).toBeInTheDocument();
      expect(casinoGambling).not.toBeChecked();
      fireEvent.click(casinoGambling);
      expect(casinoGambling).toBeChecked();
  
      const entertainmentBusiness = screen.getByLabelText(
        "Entertainment Business"
      );
      expect(entertainmentBusiness).toBeInTheDocument();
      expect(entertainmentBusiness).not.toBeChecked();
      fireEvent.click(entertainmentBusiness);
      expect(entertainmentBusiness).toBeChecked();
  
      const financialService = screen.getByLabelText(
        "Financial Service / Banking"
      );
      expect(financialService).toBeInTheDocument();
      expect(financialService).not.toBeChecked();
      fireEvent.click(financialService);
      expect(financialService).toBeChecked();
  
      const foreignExhange = screen.getByLabelText("Foreign Currency Exchange");
      expect(foreignExhange).toBeInTheDocument();
      expect(foreignExhange).not.toBeChecked();
      fireEvent.click(foreignExhange);
      expect(foreignExhange).toBeChecked();
  
      const hotelResturant = screen.getByLabelText("Hotel / Restaurant");
      expect(hotelResturant).toBeInTheDocument();
      expect(hotelResturant).not.toBeChecked();
      fireEvent.click(hotelResturant);
      expect(hotelResturant).toBeChecked();
  
      const insuranceAssurance = screen.getByLabelText("Insurance / Assurance");
      expect(insuranceAssurance).toBeInTheDocument();
      expect(insuranceAssurance).not.toBeChecked();
      fireEvent.click(insuranceAssurance);
      expect(insuranceAssurance).toBeChecked();
  
      const jewelryGold = screen.getByLabelText("Jewelry / Gold Trading");
      expect(jewelryGold).toBeInTheDocument();
      expect(jewelryGold).not.toBeChecked();
      fireEvent.click(jewelryGold);
      expect(jewelryGold).toBeChecked();
  
      const AntiqueTrading = screen.getByLabelText("Antique Trading");
      expect(AntiqueTrading).toBeInTheDocument();
      expect(AntiqueTrading).not.toBeChecked();
      fireEvent.click(AntiqueTrading);
      expect(AntiqueTrading).toBeChecked();
  
      //source of income box
      const sourceOfIncomeOther = screen.getByTestId("sourceOfIncomeOther");
      expect(sourceOfIncomeOther).toBeInTheDocument();
      expect(sourceOfIncomeOther).not.toBeChecked();
      fireEvent.click(sourceOfIncomeOther);
      expect(sourceOfIncomeOther).toBeChecked();
  
      const sourceOfIncomeOtherInput = screen.getByPlaceholderText(
        "Others Please Specific"
      );
      expect(sourceOfIncomeOtherInput).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(sourceOfIncomeOtherInput, {
          target: { value: "Thailand" },
        });
      })
      expect(sourceOfIncomeOtherInput).toHaveValue("Thailand");
  
      //country source of income box
      const thailandOther = screen.getByLabelText(
        "Others Countries (Please Specify)"
      );
      expect(thailandOther).toBeInTheDocument();
      expect(thailandOther).not.toBeChecked();
      fireEvent.click(thailandOther);
      expect(thailandOther).toBeChecked();
  
      const thailandOtherInput = screen.getByPlaceholderText(
        "Others Please Specify"
      );
      expect(thailandOtherInput).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(thailandOtherInput, { target: { value: "Thailand" } });
      })
      expect(thailandOtherInput).toHaveValue("Thailand");
  
      //investment objective box
  
      const investment = screen.getByLabelText("Investment");
      expect(investment).toBeInTheDocument();
      expect(investment).not.toBeChecked();
      fireEvent.click(investment);
      expect(investment).toBeChecked();
  
      const cashManagement = screen.getByLabelText(
        "Cash Management For Investment"
      );
      expect(cashManagement).toBeInTheDocument();
      expect(cashManagement).not.toBeChecked();
      fireEvent.click(cashManagement);
      expect(cashManagement).toBeChecked();
  
      const investmentObjectiveOther = screen.getByTestId(
        "investmentObjectiveOther"
      );
      expect(investmentObjectiveOther).toBeInTheDocument();
      expect(investmentObjectiveOther).not.toBeChecked();
      fireEvent.click(investmentObjectiveOther);
      expect(investmentObjectiveOther).toBeChecked();
  
      const investmentObjectiveOtherInput = screen.getByTestId(
        "investmentObjectiveOtherBox"
      );
      expect(investmentObjectiveOtherInput).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(investmentObjectiveOtherInput, {
          target: { value: "Thailand" },
        });
      })
      expect(investmentObjectiveOtherInput).toHaveValue("Thailand");
  
      const submitButton = screen.getByText("Next Form");
      expect(submitButton).toBeInTheDocument();
  
      await act(async () => {
        fireEvent.click(submitButton);
      });
  
      //Expected form data
      const expectedFormData = {
        data: {
          createBy: '',
          CreatedAt: '',
          DeletedAt: null,
          id: '',
          registerId: '',
          isAntiqueTrading: true,
          isHotelRestaurant: false,
          isArmament: false,
          isInsuranceAssurance: false,
          isCasinoGambling: false,
          isJewelryGoldTrading: false,
          isFoundation: false,
          isPropertyRealEstate: false,
          isMoneyTransfer: false,
          isEmploymentAgency: false,
          isEntertainment: false,
          isTravel: false,
          isFinancial: false,
          isEducationCenter: false,
          isForeignCurrencyExchange: false,
          isCryptoRelated: false,
          isOtherBusiness: false,
          otherBusinessType: '',
          isJuristicThailand: true,
          isTaxExempt: true,
          isNonTaxExempt: false,
          isJuristicForeign: false,
          isOperatingInThailand: false,
          isNonOperatingInThailand: false,
          isOther: false,
          isPartnership: false,
          isGovernmentStateEnterprise: false,
          isCoOperative: false,
          isTaxExemptCompany: false,
          isDonation: false,
          isLoan: false,
          isOtherIncome: true,
          isRevenue: false,
          isRevenueSelling: false,
          isStock: false,
          otherIncome: 'Thailand',
          corporateCountry: { isThailand: false, other: 'Thailand' },
          isInvestment: true,
          isCashManagement: true,
          isOtherInvestment: true,
          otherInvestment: 'Thailand'
        }
      };
  
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
    }, 40000);
  
    test("update form2 (juristicType)", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <FormCorporateTypeAndIncome />
          </MemoryRouter>
        </Provider>
      );
  
      const submitButton = screen.getByText("Next Form");
      expect(submitButton).toBeInTheDocument();
  
      await act(async () => {
        fireEvent.click(submitButton);
      });
  
      //Expected form data
      const expectedFormData = {
        data: {
          id: '4c49ba18-b729-4922-a5b0-cd9ff1c179f9',
          createBy: 'ee082cb5-00ae-4c54-a184-4738f562bc92',
          CreatedAt: '0001-01-01T00:00:00Z',
          DeletedAt: null,
          registerId: '',
          isAntiqueTrading: false,
          isHotelRestaurant: false,
          isArmament: false,
          isInsuranceAssurance: false,
          isCasinoGambling: true,
          isJewelryGoldTrading: false,
          isFoundation: false,
          isPropertyRealEstate: false,
          isMoneyTransfer: false,
          isEmploymentAgency: false,
          isEntertainment: false,
          isTravel: false,
          isFinancial: false,
          isEducationCenter: false,
          isForeignCurrencyExchange: false,
          isCryptoRelated: false,
          isOtherBusiness: false,
          otherBusinessType: '',
          isJuristicThailand: true,
          isTaxExempt: false,
          isNonTaxExempt: true,
          isJuristicForeign: false,
          isOperatingInThailand: false,
          isNonOperatingInThailand: false,
          isOther: false,
          isPartnership: false,
          isGovernmentStateEnterprise: false,
          isCoOperative: false,
          isTaxExemptCompany: false,
          isRevenue: true,
          isStock: false,
          isDonation: true,
          isLoan: false,
          isRevenueSelling: false,
          isOtherIncome: false,
          otherIncome: '',
          corporateCountry: {
            id: '18d40301-c290-4c51-a5bf-d332efb58709',
            createBy: 'ee082cb5-00ae-4c54-a184-4738f562bc92',
            CreatedAt: '2024-10-21T08:37:41.229+07:00',
            DeletedAt: null,
            registerId: '5ce7a417-fc23-4108-a8a6-76e4512161c5',
            isThailand: true,
            other: '',
            types: 603
          },
          otherCountry: '',
          investmentObject: '',
          isLiquidation: true,
          isInvestment: false,
          isCashManagement: false,
          isOtherInvestment: false,
          otherInvestment: ''
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
  
  const mockContact: TContact = {
    id: "contact_12345",
    createBy: "user_001",
    CreatedAt: "2023-10-01T12:00:00Z",
    DeletedAt: null,
    registerId: "123",
    fullNames: [
      {
        id: "name_001",
        createBy: "user_001",
        CreatedAt: "2023-10-01T12:00:00Z",
        DeletedAt: null,
        contactID: "contact_12345",
        title: "Mr.",
        firstName: "John",
        lastName: "Doe",
        types: 1
      }
    ],
    telephone: "123-456-7890",
    email: "john.doe@example.com",
    types: 2,
    personalId: "A123456789",
    position: "Manager",
    division: "Sales"
  };
  
  describe("test create corporate form3 (contact person)", () => {
  
    beforeAll(() => {
      localStorage.setItem('registerId', '80000001');
    })
    afterAll(() => {
      localStorage.clear();
    })
  
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      jest.resetModules();
      store.dispatch(setUser(mockUser));
  });
  
    test("test form3 (PageContactPERSON) header information", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageContactPerson
            />
          </MemoryRouter>
        </Provider>
      );
  
      const pageTitle = screen.getByText("Juristic Infomations");
      expect(pageTitle).toBeInTheDocument();
  
      const juristicId = screen.getByText("Juristic ID");
      expect(juristicId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 5ce7a417-fc23-4108-a8a6-76e4512161c5"));
      });
  
      const taxId = screen.getByText("Tax ID");
      expect(taxId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567890"));
      });
  
      const juristicName = screen.getByText("Juristic Investor Name");
      expect(juristicName).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": sssABC Co.ltd"));
      });
  
      const dateIncorporation = screen.getByText("Date Of Incorporation");
      expect(dateIncorporation).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 2013-03-06"));
      });
  
      const commercialNumber = screen.getByText("Commercial Number");
      expect(commercialNumber).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567"));
      });
  
      store.dispatch(clearCorporateData());
    }, 40000);
  
    test("test form3 (PageContactPERSON) DELETE", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
      store.dispatch(setContactPersons([mockContact]));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageContactPerson
            />
          </MemoryRouter>
        </Provider>
      );
  
      const titleField = screen.getByLabelText("Title");
      expect(titleField).toBeInTheDocument();
      expect(titleField).toHaveValue("");
  
      const name = screen.getByLabelText("First Name");
      expect(name).toBeInTheDocument();
      expect(name).toHaveValue("");
  
      const surname = screen.getByLabelText("Surname");
      expect(surname).toBeInTheDocument();
      expect(surname).toHaveValue("");
  
      const position = screen.getByLabelText("Position");
      expect(position).toBeInTheDocument();
      expect(position).toHaveValue("");
  
      const division = screen.getByLabelText("Division");
      expect(division).toBeInTheDocument();
      expect(division).toHaveValue("");
  
      const telephone = screen.getByLabelText("Telephone");
      expect(telephone).toBeInTheDocument();
      expect(telephone).toHaveValue("");
  
      const email = screen.getByLabelText("Email");
      expect(email).toBeInTheDocument();
      expect(email).toHaveValue("");
  
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
  
      const editButton = screen.getByTestId("editButton-A123456789");
      expect(editButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(editButton);
      })
  
      await waitFor(() => {
        expect(titleField).not.toHaveValue("");
        expect(name).not.toHaveValue("");
        expect(surname).not.toHaveValue("");
        expect(position).not.toHaveValue("");
        expect(division).not.toHaveValue("");
        expect(telephone).not.toHaveValue("");
        expect(email).not.toHaveValue("");
      });
  
      const deleteButton = screen.getByTestId("deleteButton-A123456789");
      expect(deleteButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(deleteButton);
      })
  
      const confirmDelete = screen.getByTestId("confirmDelete-A123456789");
      expect(confirmDelete).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(confirmDelete);
      })
  
      await act(async () => {
        store.dispatch(clearContactPersons());
        store.dispatch(clearCorporateData());
      })
    }, 40000);
  
    test("test form3 (PageContactPERSON) EDIT", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
      store.dispatch(setContactPersons([mockContact]));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageContactPerson
            />
          </MemoryRouter>
        </Provider>
      );
  
      const titleField = screen.getByLabelText("Title");
      expect(titleField).toBeInTheDocument();
      expect(titleField).toHaveValue("");
  
      const name = screen.getByLabelText("First Name");
      expect(name).toBeInTheDocument();
      expect(name).toHaveValue("");
  
      const surname = screen.getByLabelText("Surname");
      expect(surname).toBeInTheDocument();
      expect(surname).toHaveValue("");
  
      const position = screen.getByLabelText("Position");
      expect(position).toBeInTheDocument();
      expect(position).toHaveValue("");
  
      const division = screen.getByLabelText("Division");
      expect(division).toBeInTheDocument();
      expect(division).toHaveValue("");
  
      const telephone = screen.getByLabelText("Telephone");
      expect(telephone).toBeInTheDocument();
      expect(telephone).toHaveValue("");
  
      const email = screen.getByLabelText("Email");
      expect(email).toBeInTheDocument();
      expect(email).toHaveValue("");
  
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
  
      const editButton = screen.getByTestId("editButton-A123456789");
      expect(editButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(editButton);
      })
  
      await waitFor(() => {
        expect(titleField).not.toHaveValue("");
        expect(name).not.toHaveValue("");
        expect(surname).not.toHaveValue("");
        expect(position).not.toHaveValue("");
        expect(division).not.toHaveValue("");
        expect(telephone).not.toHaveValue("");
        expect(email).not.toHaveValue("");
      });
  
      const submitButton = screen.getByText("Save");
      expect(submitButton).toBeInTheDocument();
  
      await act(async () => {
        fireEvent.click(submitButton);
      });
  
      //Expected form data
      const expectedFormData = {
        data: {
          contacts: [
            {
              fullNames: [ { title: 'Mr.', firstName: 'John', lastName: 'Doe' } ],
              position: 'Manager',
              division: 'Sales',
              telephone: '123-456-7890',
              email: 'john.doe@example.com',
              personalId: 'A123456789'
            }
          ],
          registerId: '80000001'
        }
      };
  
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
  
      await act(async () => {
        store.dispatch(clearContactPersons());
        store.dispatch(clearCorporateData());
      })
    }, 40000);
  
    test("test input data(multiple input type)", async () => {
  
      const mockOnSubmit = jest.fn();
      const mockClearChoosedEditData = jest.fn();
      const mockregisterId = "0";
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <FormIndividualsContactPerson
              onsubmit={mockOnSubmit}
              registerId={mockregisterId}
              clearChoosedEditData={mockClearChoosedEditData}
            />
          </MemoryRouter>
        </Provider>
      );
  
      await act(async () => {
        const title = screen.getByLabelText("Title");
        expect(title).toBeInTheDocument();
        fireEvent.change(title, { target: { value: "Mr" } });
        expect(title).toHaveValue("Mr");
  
        const firstName = screen.getByLabelText("First Name");
        expect(firstName).toBeInTheDocument();
        fireEvent.change(firstName, { target: { value: "John" } });
        expect(firstName).toHaveValue("John");
  
        const surname = screen.getByLabelText("Surname");
        expect(surname).toBeInTheDocument();
        fireEvent.change(surname, { target: { value: "Doe" } });
        expect(surname).toHaveValue("Doe");
  
        const position = screen.getByLabelText("Position");
        expect(position).toBeInTheDocument();
        fireEvent.change(position, { target: { value: "Position" } });
        expect(position).toHaveValue("Position");
  
        const division = screen.getByLabelText("Division");
        expect(division).toBeInTheDocument();
        fireEvent.change(division, { target: { value: "Division" } });
        expect(division).toHaveValue("Division");
  
        const telephone = screen.getByLabelText("Telephone");
        expect(telephone).toBeInTheDocument();
        fireEvent.change(telephone, { target: { value: "0123456789" } });
        expect(telephone).toHaveValue("0123456789");
  
        const email = screen.getByLabelText("Email");
        expect(email).toBeInTheDocument();
        fireEvent.change(email, { target: { value: "test@example.com" } });
        expect(email).toHaveValue("test@example.com");
        
        const submitButton = screen.getByText("Save");
        expect(submitButton).toBeInTheDocument();
      
      });
      await act(async () => {
        fireEvent.click(screen.getByText("Save"));
      });
  
      //Expected form data
      const expectedFormData = {
        data: {
          contacts: [
            {
              fullNames: [ { title: 'Mr', firstName: 'John', lastName: 'Doe' } ],
              position: 'Position',
              division: 'Division',
              telephone: '0123456789',
              email: 'test@example.com',
              personalId: undefined
            }
          ],
          registerId: '0'
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
  
  const mockDirector: TDirector = {
    id: "dir001",
    createBy: "admin",
    CreatedAt: "2023-01-01T00:00:00Z",
    DeletedAt: null,
    personalId: "9876543210987",
    registerId: "123456",
    fullNames: [
      {
        id: "name001",
        createBy: "admin",
        CreatedAt: "2023-01-01T00:00:00Z",
        DeletedAt: null,
        ReferenceID: "dir001",
        title: "Mr.",
        firstName: "directorName",
        lastName: "directorLastName",
        types: 1
      }
    ],
    addresses: [
      {
        id: "addr001",
        createBy: "admin",
        CreatedAt: "2023-01-01T00:00:00Z",
        DeletedAt: null,
        ReferenceID: "dir001",
        addressNo: "123",
        building: "ABC Building",
        floor: "10",
        mooNo: "2",
        soi: "Soi 3",
        road: "Sukhumvit",
        tambon: "Khlong Toei",
        amphoe: "Khlong Toei",
        province: "Bangkok",
        postalCode: "10110",
        country: "Thailand",
        types: 1
      }
    ],
    citizenId: "0240212359299",
    passportId: "P1234567",
    expiryDate: "2025-12-31",
    nationality: "American",
    types: 1
  };
  
  describe("test create corporate form4 (list of director)", () => {
  
    beforeAll(() => {
      localStorage.setItem('registerId', '80000001');
    })
    afterAll(() => {
      localStorage.clear();
    })

    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      jest.resetModules();
      store.dispatch(setUser(mockUser));
  });

    test("test form4 (PageListOfDirector) header information", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <ListOfDirectors
            />
          </MemoryRouter>
        </Provider>
      );
  
      const pageTitle = screen.getByText("Juristic Infomations");
      expect(pageTitle).toBeInTheDocument();
  
      const juristicId = screen.getByText("Juristic ID");
      expect(juristicId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 5ce7a417-fc23-4108-a8a6-76e4512161c5"));
      });
  
      const taxId = screen.getByText("Tax ID");
      expect(taxId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567890"));
      });
  
      const juristicName = screen.getByText("Juristic Investor Name");
      expect(juristicName).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": sssABC Co.ltd"));
      });
  
      const dateIncorporation = screen.getByText("Date Of Incorporation");
      expect(dateIncorporation).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 2013-03-06"));
      });
  
      const commercialNumber = screen.getByText("Commercial Number");
      expect(commercialNumber).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567"));
      });
  
      store.dispatch(clearCorporateData());
    }, 40000);
  
    test("test form4 (PageListOfDirector) DELETE", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
      store.dispatch(setDirectorEdit([{...mockDirector,registerId:mockDirector.registerId}]));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <ListOfDirectors
            />
          </MemoryRouter>
        </Provider>
      );
  
      const titleField = screen.getByLabelText("Title");
      expect(titleField).toBeInTheDocument();
      expect(titleField).toHaveValue("");
  
      const name = screen.getByLabelText("First Name");
      expect(name).toBeInTheDocument();
      expect(name).toHaveValue("");
  
      const surname = screen.getByLabelText("Surname");
      expect(surname).toBeInTheDocument();
      expect(surname).toHaveValue("");
  
      const idCard = screen.getByLabelText("Please fill ID");
      expect(idCard).toBeInTheDocument();
      expect(idCard).toHaveValue("");
  
      const nationality = screen.getByLabelText("Nationality");
      expect(nationality).toBeInTheDocument();
      expect(nationality).toHaveValue("");
  
      const addressNumber = screen.getByLabelText("Address Number");
      expect(addressNumber).toBeInTheDocument();
  
      const moo = screen.getByLabelText("Moo");
      expect(moo).toBeInTheDocument();
  
      const soi = screen.getByLabelText("Soi");
      expect(soi).toBeInTheDocument();
  
      const floor = screen.getByLabelText("Floor");
      expect(floor).toBeInTheDocument();
  
      const building = screen.getByLabelText("Building");
      expect(building).toBeInTheDocument();
  
      const road = screen.getByLabelText("Road");
      expect(road).toBeInTheDocument();
  
      const tambon = screen.getByLabelText("Tambon");
      expect(tambon).toBeInTheDocument();
      expect(tambon).toHaveValue("");
  
      const amphoe = screen.getByLabelText("Amphoe");
      expect(amphoe).toBeInTheDocument();
      expect(amphoe).toHaveValue("");
  
      const province = screen.getByLabelText("Province");
      expect(province).toBeInTheDocument();
      expect(province).toHaveValue("");
  
      const postalCode = screen.getByLabelText("PostalCode");
      expect(postalCode).toBeInTheDocument();
      expect(postalCode).toHaveValue("");
  
      const country = screen.getByLabelText("Country");
      expect(country).toBeInTheDocument();
      expect(country).toHaveValue("");
  
      const editButton = screen.getByTestId("editButton-9876543210987");
      expect(editButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(editButton);
      })
  
      await waitFor(() => {
        expect(titleField).not.toHaveValue("");
        expect(name).not.toHaveValue("");
        expect(surname).not.toHaveValue("");
        expect(idCard).not.toHaveValue("");
        expect(nationality).not.toHaveValue("");
        expect(addressNumber).not.toHaveValue("");
        expect(moo).not.toHaveValue("");
        expect(soi).not.toHaveValue("");
        expect(floor).not.toHaveValue("");
        expect(building).not.toHaveValue("");
        expect(road).not.toHaveValue("");
        expect(tambon).not.toHaveValue("");
        expect(amphoe).not.toHaveValue("");
        expect(province).not.toHaveValue("");
        expect(postalCode).not.toHaveValue("");
        expect(country).not.toHaveValue("");
      });
  
      const deleteButton = screen.getByTestId("deleteButton-9876543210987");
      expect(deleteButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(deleteButton);
      })
  
      const confirmDelete = screen.getByTestId("confirmDelete-9876543210987");
      expect(confirmDelete).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(confirmDelete);
      })
  
      await act(async () => {
        store.dispatch(clearDirector());
        store.dispatch(clearCorporateData());
      })
    }, 40000);
  
    test("test form4 (PageListOfDirector) EDIT", async () => {
      mockAxios.onPost("/api/v1/personals/update").reply(400, {
        message: "Session expired. Please login again",
      });
  
      window.alert = jest.fn();
  
      store.dispatch(setCorporateData(mockCorporateData));
      store.dispatch(setDirectorEdit([{...mockDirector,registerId:mockDirector.registerId}]));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <ListOfDirectors
            />
          </MemoryRouter>
        </Provider>
      );
  
      const titleField = screen.getByLabelText("Title");
      expect(titleField).toBeInTheDocument();
      expect(titleField).toHaveValue("");
  
      const name = screen.getByLabelText("First Name");
      expect(name).toBeInTheDocument();
      expect(name).toHaveValue("");
  
      const surname = screen.getByLabelText("Surname");
      expect(surname).toBeInTheDocument();
      expect(surname).toHaveValue("");
  
      const idCard = screen.getByLabelText("Please fill ID");
      expect(idCard).toBeInTheDocument();
      expect(idCard).toHaveValue("");
  
      const nationality = screen.getByLabelText("Nationality");
      expect(nationality).toBeInTheDocument();
      expect(nationality).toHaveValue("");
  
      const addressNumber = screen.getByLabelText("Address Number");
      expect(addressNumber).toBeInTheDocument();
  
      const moo = screen.getByLabelText("Moo");
      expect(moo).toBeInTheDocument();
  
      const soi = screen.getByLabelText("Soi");
      expect(soi).toBeInTheDocument();
  
      const floor = screen.getByLabelText("Floor");
      expect(floor).toBeInTheDocument();
  
      const building = screen.getByLabelText("Building");
      expect(building).toBeInTheDocument();
  
      const road = screen.getByLabelText("Road");
      expect(road).toBeInTheDocument();
  
      const tambon = screen.getByLabelText("Tambon");
      expect(tambon).toBeInTheDocument();
      expect(tambon).toHaveValue("");
  
      const amphoe = screen.getByLabelText("Amphoe");
      expect(amphoe).toBeInTheDocument();
      expect(amphoe).toHaveValue("");
  
      const province = screen.getByLabelText("Province");
      expect(province).toBeInTheDocument();
      expect(province).toHaveValue("");
  
      const postalCode = screen.getByLabelText("PostalCode");
      expect(postalCode).toBeInTheDocument();
      expect(postalCode).toHaveValue("");
  
      const country = screen.getByLabelText("Country");
      expect(country).toBeInTheDocument();
      expect(country).toHaveValue("");
  
      const editButton = screen.getByTestId("editButton-9876543210987");
      expect(editButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(editButton);
      })
  
      await waitFor(() => {
        expect(titleField).not.toHaveValue("");
        expect(name).not.toHaveValue("");
        expect(surname).not.toHaveValue("");
        expect(idCard).not.toHaveValue("");
        expect(nationality).not.toHaveValue("");
        expect(addressNumber).not.toHaveValue("");
        expect(moo).not.toHaveValue("");
        expect(soi).not.toHaveValue("");
        expect(floor).not.toHaveValue("");
        expect(building).not.toHaveValue("");
        expect(road).not.toHaveValue("");
        expect(tambon).not.toHaveValue("");
        expect(amphoe).not.toHaveValue("");
        expect(province).not.toHaveValue("");
        expect(postalCode).not.toHaveValue("");
        expect(country).not.toHaveValue("");
      });
  
      console.log((titleField as HTMLInputElement).value);
      console.log((name as HTMLInputElement).value);
      console.log((surname as HTMLInputElement).value);
      console.log((idCard as HTMLInputElement).value);
      console.log((nationality as HTMLInputElement).value);
      console.log((addressNumber as HTMLInputElement).value);
      console.log((moo as HTMLInputElement).value);
      console.log((soi as HTMLInputElement).value);
      console.log((floor as HTMLInputElement).value);
      console.log((building as HTMLInputElement).value);
      console.log((road as HTMLInputElement).value);
      console.log((tambon as HTMLInputElement).value);
      console.log((amphoe as HTMLInputElement).value);
      console.log((province as HTMLInputElement).value);
      console.log((postalCode as HTMLInputElement).value);
      console.log((country as HTMLInputElement).value);
  
      const submitButton = screen.getByText("Save");
      expect(submitButton).toBeInTheDocument();
  
      await act(async () => {
        fireEvent.click(submitButton);
      });
  
      //Expected form data
      const expectedFormData = {
        data: {
          fullNames: [ { title: 'Mr.', firstName: 'directorName', lastName: 'directorLastName' } ],
          citizenId: '0240212359299',
          passportId: '',
          expiryDate: '2025-12-31',
          nationality: 'American',
          addresses: [
            {
              addressNo: '123',
              mooNo: '2',
              soi: 'Soi 3',
              floor: '10',
              building: 'ABC Building',
              road: 'Sukhumvit',
              tambon: 'Khlong Toei',
              amphoe: 'Khlong Toei',
              province: 'Bangkok',
              postalCode: '10110',
              country: 'Thailand'
            }
          ],
          types: 101,
          registerId: '80000001',
          personalId: '9876543210987'
        }
      };
  
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
  
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("Session expired. Please login again");
      });
  
      await act(async () => {
        store.dispatch(clearDirector());
        store.dispatch(clearCorporateData());
      })
    }, 40000);
  
    // test("test input data(multiple input type)", async () => {
    //   const mockOnSubmit = jest.fn();
    //   const mockClearChoosedEditData = jest.fn();
    //   const mockregisterId = "0";
  
    //   render(
    //     <Provider store={store}>
    //       <MemoryRouter>
    //         <FormIndividualsDirector
    //           onsubmit={mockOnSubmit}
    //           registerId={mockregisterId}
    //           clearChoosedEditData={mockClearChoosedEditData}
    //         />
    //       </MemoryRouter>
    //     </Provider>
    //   );
  
    //   await act(async () => {
    //     const title = screen.getByLabelText("Title");
    //     expect(title).toBeInTheDocument();
    //     fireEvent.change(title, { target: { value: "Mr" } });
    //     expect(title).toHaveValue("Mr");
  
    //     const firstName = screen.getByLabelText("First Name");
    //     expect(firstName).toBeInTheDocument();
    //     fireEvent.change(firstName, { target: { value: "John" } });
    //     expect(firstName).toHaveValue("John");
  
    //     const surname = screen.getByLabelText("Surname");
    //     expect(surname).toBeInTheDocument();
    //     fireEvent.change(surname, { target: { value: "Doe" } });
    //     expect(surname).toHaveValue("Doe");
  
    //     const ID = screen.getByLabelText("Please fill ID");
    //     expect(ID).toBeInTheDocument();
    //     fireEvent.change(ID, { target: { value: "2571817668244" } });
    //     expect(ID).toHaveValue("2571817668244");
  
    //     const expiredDate = screen.getByTestId("expiredDate");
    //     expect(expiredDate).toBeInTheDocument();
    //     fireEvent.change(expiredDate, { target: { value: "2022-01-01" } });
    //     expect(expiredDate).toHaveValue("2022-01-01");
  
    //     const nationality = screen.getByLabelText("Nationality");
    //     expect(nationality).toBeInTheDocument();
    //     fireEvent.change(nationality, { target: { value: "Thai" } });
    //     expect(nationality).toHaveValue("Thai");
  
    //     const addressNumber = screen.getByLabelText("Address Number");
    //     expect(addressNumber).toBeInTheDocument();
    //     fireEvent.change(addressNumber, { target: { value: "address number" } });
    //     expect(addressNumber).toHaveValue("address number");
  
    //     const moo = screen.getByLabelText("Moo");
    //     expect(moo).toBeInTheDocument();
    //     fireEvent.change(moo, { target: { value: "moo" } });
    //     expect(moo).toHaveValue("moo");
  
    //     const soi = screen.getByLabelText("Soi");
    //     expect(soi).toBeInTheDocument();
    //     fireEvent.change(soi, { target: { value: "soi" } });
    //     expect(soi).toHaveValue("soi");
  
    //     const floor = screen.getByLabelText("Floor");
    //     expect(floor).toBeInTheDocument();
    //     fireEvent.change(floor, { target: { value: "floor" } });
    //     expect(floor).toHaveValue("floor");
  
    //     const building = screen.getByLabelText("Building");
    //     expect(building).toBeInTheDocument();
    //     fireEvent.change(building, { target: { value: "building" } });
    //     expect(building).toHaveValue("building");
  
    //     const road = screen.getByLabelText("Road");
    //     expect(road).toBeInTheDocument();
    //     fireEvent.change(road, { target: { value: "road" } });
    //     expect(road).toHaveValue("road");
  
    //     const tambon = screen.getByLabelText("Tambon");
    //     expect(tambon).toBeInTheDocument();
    //     expect(tambon).toHaveValue("");
    //     fireEvent.change(tambon, { target: { value: "tambon" } });
    //     expect(tambon).toHaveValue("tambon");
  
    //     const amphoe = screen.getByLabelText("Amphoe");
    //     expect(amphoe).toBeInTheDocument();
    //     expect(amphoe).toHaveValue("");
    //     fireEvent.change(amphoe, { target: { value: "amphoe" } });
    //     expect(amphoe).toHaveValue("amphoe");
  
    //     const province = screen.getByLabelText("Province");
    //     expect(province).toBeInTheDocument();
    //     expect(province).toHaveValue("");
    //     fireEvent.change(province, { target: { value: "province" } });
    //     expect(province).toHaveValue("province");
  
    //     const postalCode = screen.getByLabelText("PostalCode");
    //     expect(postalCode).toBeInTheDocument();
    //     expect(postalCode).toHaveValue("");
    //     fireEvent.change(postalCode, { target: { value: "postal code" } });
    //     expect(postalCode).toHaveValue("postal code");
  
    //     const country = screen.getByLabelText("Country");
    //     expect(country).toBeInTheDocument();
    //     expect(country).toHaveValue("");
    //     fireEvent.change(country, { target: { value: "country" } });
    //     expect(country).toHaveValue("country");
  
    //     const submitButton = screen.getByText("Save");
    //     expect(submitButton).toBeInTheDocument();
    //   })
  
    //   await act(async () => {
    //     fireEvent.click(screen.getByText("Save"));
    //   });
  
    //   //Expected form data
    //   const expectedFormData = {
    //     data: {
    //       fullNames: [{ title: "Mr", firstName: "John", lastName: "Doe" }],
    //       citizenId: "2571817668244",
    //       passportId: "",
    //       expiryDate: "2022-01-01",
    //       nationality: "Thai",
    //       addresses: [
    //         {
    //           addressNo: "address number",
    //           mooNo: "moo",
    //           soi: "soi",
    //           floor: "floor",
    //           building: "building",
    //           road: "road",
    //           tambon: "tambon",
    //           amphoe: "amphoe",
    //           province: "province",
    //           postalCode: "postal code",
    //           country: "country",
    //         },
    //       ],
    //       types: 101,
    //       registerId: "0",
    //       personalId: undefined,
    //     },
    //   };
  
    //   await waitFor(() => {
    //     const state = store.getState();
    //     const corporateState = state.corporateTest;
    //     console.log("Corporate State After Submission:", corporateState);
    //     expect(corporateState).toMatchObject(expectedFormData);
    //   });
    // }, 40000);
  });
  
  const individualShareholderMock: TIndividualShareholder = {
    id: "ISH001",
    createBy: "admin",
    CreatedAt: "2022-01-01T00:00:00.000Z",
    DeletedAt: null,
    personalId: "PID001",
    registerId: "12345",
    fullNames: [
      {
        id: "FN001",
        createBy: "admin",
        CreatedAt: "2022-01-01T00:00:00.000Z",
        DeletedAt: null,
        ReferenceID: "ISH001",
        title: "Mr.",
        firstName: "individualName",
        lastName: "individualLastName",
        types: 1,
      },
    ],
    citizenId: "0240212359299",
    passportId: "PASS001",
    expiryDate: "2025-01-01T00:00:00.000Z",
    nationality: "Thai",
    types: 1,
    sharePercentage: 30,
  };
  
  
  describe("test create corporate form5 (individual shareholder)", () => {
    beforeAll(() => {
      localStorage.setItem('registerId', '80000001');
    })
    afterAll(() => {
      localStorage.clear();
    })

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.resetModules();
        store.dispatch(setUser(mockUser));
    });
  
    test("test form5 (PageIndividualShareholder) header information", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageIndividualShareholder
            />
          </MemoryRouter>
        </Provider>
      );
  
      const pageTitle = screen.getByText("Juristic Infomations");
      expect(pageTitle).toBeInTheDocument();
  
      const juristicId = screen.getByText("Juristic ID");
      expect(juristicId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 5ce7a417-fc23-4108-a8a6-76e4512161c5"));
      });
  
      const taxId = screen.getByText("Tax ID");
      expect(taxId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567890"));
      });
  
      const juristicName = screen.getByText("Juristic Investor Name");
      expect(juristicName).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": sssABC Co.ltd"));
      });
  
      const dateIncorporation = screen.getByText("Date Of Incorporation");
      expect(dateIncorporation).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 2013-03-06"));
      });
  
      const commercialNumber = screen.getByText("Commercial Number");
      expect(commercialNumber).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567"));
      });
  
      store.dispatch(clearCorporateData());
    }, 40000);
  
    test("test form5 (PageIndividualShareholder) DELETE", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
      store.dispatch(setIndividualShareholder([{...individualShareholderMock, expiryDate: individualShareholderMock.expiryDate as string, registerId:individualShareholderMock.registerId.toString()}]));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageIndividualShareholder
            />
          </MemoryRouter>
        </Provider>
      );
  
      const titleField = screen.getByLabelText("Title");
      expect(titleField).toBeInTheDocument();
      expect(titleField).toHaveValue("");
  
      const name = screen.getByLabelText("First Name");
      expect(name).toBeInTheDocument();
      expect(name).toHaveValue("");
  
      const surname = screen.getByLabelText("Surname");
      expect(surname).toBeInTheDocument();
      expect(surname).toHaveValue("");
  
      const idCard = screen.getByLabelText("Please fill ID");
      expect(idCard).toBeInTheDocument();
      expect(idCard).toHaveValue("");
  
      const shares = screen.getByLabelText("Shares");
      expect(shares).toBeInTheDocument();
      expect(shares).toHaveValue(null);
  
      const nationality = screen.getByLabelText("Nationality");
      expect(nationality).toBeInTheDocument();
      expect(nationality).toHaveValue("");
  
      const editButton = screen.getByTestId("editButton-PID001");
      expect(editButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(editButton);
      })
  
      await waitFor(() => {
        expect(titleField).not.toHaveValue("");
        expect(name).not.toHaveValue("");
        expect(surname).not.toHaveValue("");
        expect(idCard).not.toHaveValue("");
        expect(nationality).not.toHaveValue("");
        expect(shares).not.toHaveValue(0);
      });
  
      const deleteButton = screen.getByTestId("deleteButton-PID001");
      expect(deleteButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(deleteButton);
      })
  
      const confirmDelete = screen.getByTestId("confirmDelete-PID001");
      expect(confirmDelete).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(confirmDelete);
      })
  
      await act(async () => {
        store.dispatch(clearDirector());
        store.dispatch(clearCorporateData());
      })
    }, 40000);
  
    test("test form5 (PageIndividualShareholder) EDIT", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
      store.dispatch(setIndividualShareholder([{...individualShareholderMock, expiryDate: individualShareholderMock.expiryDate as string, registerId:individualShareholderMock.registerId.toString()}]));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageIndividualShareholder
            />
          </MemoryRouter>
        </Provider>
      );
  
      const titleField = screen.getByLabelText("Title");
      expect(titleField).toBeInTheDocument();
      expect(titleField).toHaveValue("");
  
      const name = screen.getByLabelText("First Name");
      expect(name).toBeInTheDocument();
      expect(name).toHaveValue("");
  
      const surname = screen.getByLabelText("Surname");
      expect(surname).toBeInTheDocument();
      expect(surname).toHaveValue("");
  
      const idCard = screen.getByLabelText("Please fill ID");
      expect(idCard).toBeInTheDocument();
      expect(idCard).toHaveValue("");
  
      const shares = screen.getByLabelText("Shares");
      expect(shares).toBeInTheDocument();
      expect(shares).toHaveValue(null);
  
      const nationality = screen.getByLabelText("Nationality");
      expect(nationality).toBeInTheDocument();
      expect(nationality).toHaveValue("");
  
      const editButton = screen.getByTestId("editButton-PID001");
      expect(editButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(editButton);
      })
  
      await waitFor(() => {
        expect(titleField).not.toHaveValue("");
        expect(name).not.toHaveValue("");
        expect(surname).not.toHaveValue("");
        expect(idCard).not.toHaveValue("");
        expect(nationality).not.toHaveValue("");
        expect(shares).not.toHaveValue(0);
      });
  
      const submitButton = screen.getByText("Save");
      expect(submitButton).toBeInTheDocument();
  
      await act(async () => {
        fireEvent.click(submitButton);
      });
  
      //Expected form data
      const expectedFormData = {
        data: {
          fullNames: [ { title: 'Mr.', firstName: 'individualName', lastName: 'individualLastName' } ],
          citizenId: '0240212359299',
          passportId: '',
          expiryDate: '2025-01-01',
          nationality: 'Thai',
          sharePercentage: 3000000,
          registerId: '80000001',
          personalId: "PID001",
          types: 301,
        }
      };
  
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
  
  
      await act(async () => {
        store.dispatch(clearIndividualShareholder());
        store.dispatch(clearCorporateData());
      })
    }, 40000);
  
  
    test("test input data(multiple input type)", async () => {
      const mockOnSubmit = jest.fn();
      const mockClearChoosedEditData = jest.fn();
      const mockregisterId = "0";
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <FormIndividualsShareholders
              onsubmit={mockOnSubmit}
              registerId={mockregisterId}
              clearChoosedEditData={mockClearChoosedEditData}
            />
          </MemoryRouter>
        </Provider>
      );
  
      await act(async () => {
        const title = screen.getByLabelText("Title");
        expect(title).toBeInTheDocument();
        fireEvent.change(title, { target: { value: "Mr" } });
        expect(title).toHaveValue("Mr");
  
        const firstName = screen.getByLabelText("First Name");
        expect(firstName).toBeInTheDocument();
        fireEvent.change(firstName, { target: { value: "John" } });
        expect(firstName).toHaveValue("John");
  
        const surname = screen.getByLabelText("Surname");
        expect(surname).toBeInTheDocument();
        fireEvent.change(surname, { target: { value: "Doe" } });
        expect(surname).toHaveValue("Doe");
  
        const nationality = screen.getByLabelText("Nationality");
        expect(nationality).toBeInTheDocument();
        fireEvent.change(nationality, { target: { value: "Thai" } });
        expect(nationality).toHaveValue("Thai");
  
        const shares = screen.getByLabelText("Shares");
        expect(shares).toBeInTheDocument();
        expect(shares).toHaveValue(null);
        fireEvent.change(shares, { target: { value: "12.345" } });
        expect(shares).toHaveValue(12.345);
  
        const ID = screen.getByLabelText("Please fill ID");
        expect(ID).toBeInTheDocument();
        fireEvent.change(ID, { target: { value: "2571817668244" } });
        expect(ID).toHaveValue("2571817668244");
  
        const expiredDate = screen.getByTestId("expiredDate");
        expect(expiredDate).toBeInTheDocument();
        fireEvent.change(expiredDate, { target: { value: "2022-01-01" } });
        expect(expiredDate).toHaveValue("2022-01-01");
  
        const submitButton = screen.getByText("Save");
        expect(submitButton).toBeInTheDocument();
      })
  
      await act(async () => {
        fireEvent.click(screen.getByText("Save"));
      });
  
      //Expected form data
      const expectedFormData = {
        data: {
          fullNames: [{ title: "Mr", firstName: "John", lastName: "Doe" }],
          citizenId: "2571817668244",
          passportId: "",
          expiryDate: "2022-01-01",
          nationality: "Thai",
          sharePercentage: 1234500,
          types: 301,
          registerId: "0",
          personalId: "",
        },
      };
  
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
    }, 40000);
  });
  
  const juristicMock: TJuristic = {
    id: "juristicid22",
    createBy: "user123",
    CreatedAt: "2023-10-01T12:00:00Z",
    DeletedAt: null,
    registerId: "12345",
    juristicName: "Acme Juristic Individual Corporation",
    registrationNo: "REG123456",
    registeredCountry: "Thailand",
    sharePercentage: 40,
  };
  
  describe("test create corporate form6 (juristics shareholder)", () => {
    beforeAll(() => {
      localStorage.setItem('registerId', '80000001');
    })
    afterAll(() => {
      localStorage.clear();
    })

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.resetModules();
        store.dispatch(setUser(mockUser));
    });
  
    test("test form6 (PageJuristicShareholder) header information", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageJuristicShareholder
            />
          </MemoryRouter>
        </Provider>
      );
  
      const pageTitle = screen.getByText("Juristic Infomations");
      expect(pageTitle).toBeInTheDocument();
  
      const juristicId = screen.getByText("Juristic ID");
      expect(juristicId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 5ce7a417-fc23-4108-a8a6-76e4512161c5"));
      });
  
      const taxId = screen.getByText("Tax ID");
      expect(taxId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567890"));
      });
  
      const juristicName = screen.getByText("Juristic Investor Name");
      expect(juristicName).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": sssABC Co.ltd"));
      });
  
      const dateIncorporation = screen.getByText("Date Of Incorporation");
      expect(dateIncorporation).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 2013-03-06"));
      });
  
      const commercialNumber = screen.getByText("Commercial Number");
      expect(commercialNumber).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567"));
      });
  
      store.dispatch(clearCorporateData());
    }, 40000);
  
    test("test form6 (PageJuristicShareholder) DELETE", async () => {
      mockAxios.onPost("/api/v1/corporate/query").reply(200, {
        data: [{ Juristics: [juristicMock] }],
        message: "juristic data fetched successfully.",
      });
      store.dispatch(setCorporateData(mockCorporateData));
      const juristicShareholder = [juristicMock];
          const updateJuristic: TJuristicsShareholders[] = juristicShareholder
            .map((juristic: TJuristic) => ({
              ...juristic,
              juristicId: juristic.id,
              sharePercentage: (juristic.sharePercentage ?? 0)/100000,
            }))
            .map(mapDataToTJuristicShareholder)
            .filter((item: any) => item !== null) as TJuristicsShareholders[];
          store.dispatch(setJuristicShareholder(updateJuristic));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageJuristicShareholder
            />
          </MemoryRouter>
        </Provider>
      );
  
      const name = screen.getByLabelText("Juristic Name");
      expect(name).toBeInTheDocument();
      expect(name).toHaveValue("");
  
      const commercialRegis = screen.getByLabelText("Commercial Registration No.");
      expect(commercialRegis).toBeInTheDocument();
      expect(commercialRegis).toHaveValue("");
  
      const regisCountry = screen.getByLabelText("Registration Country");
      expect(regisCountry).toBeInTheDocument();
      expect(regisCountry).toHaveValue("");
  
      const shares = screen.getByLabelText("Shares");
      expect(shares).toBeInTheDocument();
      expect(shares).toHaveValue(null);
  
      const editButton = screen.getByTestId("editButton-juristicid22");
      expect(editButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(editButton);
      })
  
      await waitFor(() => {
        expect(name).not.toHaveValue("");
        expect(commercialRegis).not.toHaveValue("");
        expect(regisCountry).not.toHaveValue("");
        expect(shares).not.toHaveValue(0);
      });
  
      const deleteButton = screen.getByTestId("deleteButton-juristicid22");
      expect(deleteButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(deleteButton);
      })
  
      const confirmDelete = screen.getByTestId("confirmDelete-juristicid22");
      expect(confirmDelete).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(confirmDelete);
      })
  
      await act(async () => {
        store.dispatch(clearJuristicShareholder());
        store.dispatch(clearCorporateData());
      })
    }, 40000);
  
    test("test form6 (PageJuristicShareholder) EDIT", async () => {
      mockAxios.onPost("/api/v1/corporate/query").reply(200, {
        data: [{ Juristics: [juristicMock] }],
        message: "juristic data fetched successfully.",
      });
  
      mockAxios.onPost("/api/v1/juristic/update").reply(200, {
        message: "juristic edit data successfully.",
      });
  
      store.dispatch(setCorporateData(mockCorporateData));
      const juristicShareholder = [juristicMock];
          const updateJuristic: TJuristicsShareholders[] = juristicShareholder
            .map((juristic: TJuristic) => ({
              ...juristic,
              juristicId: juristic.id,
              sharePercentage: (juristic.sharePercentage ?? 0)/100000,
            }))
            .map(mapDataToTJuristicShareholder)
            .filter((item: any) => item !== null) as TJuristicsShareholders[];
          store.dispatch(setJuristicShareholder(updateJuristic));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageJuristicShareholder
            />
          </MemoryRouter>
        </Provider>
      );
      
      screen.debug();
      const name = screen.getByLabelText("Juristic Name");
      expect(name).toBeInTheDocument();
      expect(name).toHaveValue("");
  
      const commercialRegis = screen.getByLabelText("Commercial Registration No.");
      expect(commercialRegis).toBeInTheDocument();
      expect(commercialRegis).toHaveValue("");
  
      const regisCountry = screen.getByLabelText("Registration Country");
      expect(regisCountry).toBeInTheDocument();
      expect(regisCountry).toHaveValue("");
  
      const shares = screen.getByLabelText("Shares");
      expect(shares).toBeInTheDocument();
      expect(shares).toHaveValue(null);
  
      const editButton = screen.getByTestId("editButton-juristicid22");
      expect(editButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(editButton);
      })
  
      await waitFor(() => {
        expect(name).not.toHaveValue("");
        expect(commercialRegis).not.toHaveValue("");
        expect(regisCountry).not.toHaveValue("");
        expect(shares).not.toHaveValue("");
      });
  
      const submitButton = screen.getByText("Save");
      expect(submitButton).toBeInTheDocument();
  
      await act(async () => {
        fireEvent.click(submitButton);
      });
  
      //Expected form data
      const expectedFormData = {
        data: {
          registerId: '80000001',
          juristicName: 'Acme Juristic Individual Corporation',
          registrationNo: 'REG123456',
          registeredCountry: 'Thailand',
          sharePercentage: 40,
          juristicId: 'juristicid22'
        }
      };
  
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
  
      await act(async () => {
        store.dispatch(clearJuristicShareholder());
        store.dispatch(clearCorporateData());
      })
    }, 40000);
  
    test("test input data(multiple input type)", async () => {
      const mockOnSubmit = jest.fn();
      const mockClearChoosedEditData = jest.fn();
      const mockregisterId = "0";
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <FormJuristicShareholders
              onsubmit={mockOnSubmit}
              registerId={mockregisterId}
              clearChoosedEditData={mockClearChoosedEditData}
            />
          </MemoryRouter>
        </Provider>
      );
  
      await act(async () => {
        const juristicName = screen.getByLabelText("Juristic Name");
        expect(juristicName).toBeInTheDocument();
        fireEvent.change(juristicName, { target: { value: "John Doe" } });
        expect(juristicName).toHaveValue("John Doe");
  
        const RegistrationNo = screen.getByLabelText("Commercial Registration No.");
        expect(RegistrationNo).toBeInTheDocument();
        fireEvent.change(RegistrationNo, { target: { value: "2571817668244" } });
        expect(RegistrationNo).toHaveValue("2571817668244");
  
        const registrationCountry = screen.getByLabelText("Registration Country");
        expect(registrationCountry).toBeInTheDocument();
        fireEvent.change(registrationCountry, { target: { value: "Thailand" } });
        expect(registrationCountry).toHaveValue("Thailand");
  
        const shares = screen.getByLabelText("Shares");
        expect(shares).toBeInTheDocument();
        expect(shares).toHaveValue(null);
        fireEvent.change(shares, { target: { value: "12.345" } });
        expect(shares).toHaveValue(12.345);
  
        const submitButton = screen.getByText("Save");
        expect(submitButton).toBeInTheDocument();
      })
  
      await act(async () => {
        fireEvent.click(screen.getByText("Save"));
      });
  
      //Expected form data
      const expectedFormData = {
        data: {
          juristicName: "John Doe",
          registrationNo: "2571817668244",
          registeredCountry: "Thailand",
          sharePercentage: 1234500,
          registerId: "0",
          juristicId: undefined,
        },
      };
  
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
    }, 40000);
  });
  
  const authorizedMock = {
    "id": "2a53e608-c8f5-4cd5-ae97-1d8706cd8fe4",
                  "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                  "CreatedAt": "2024-08-13T05:15:29.523Z",
                  "DeletedAt": null,
                  "personalId": "3c2dfdb5-a140-4ef5-89d5-1326cbf632bc",
                  "registerId": "80000003",
                  "fullNames": [
                      {
                          "id": "b0d9459f-465d-4ea1-aaac-5d03ac4c2763",
                          "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                          "CreatedAt": "2024-08-13T05:15:29.533Z",
                          "DeletedAt": null,
                          "ReferenceID": "3c2dfdb5-a140-4ef5-89d5-1326cbf632bc",
                          "title": "apt1",
                          "firstName": "apfn1",
                          "lastName": "apsn1",
                          "types": 201
                      }
                  ],
                  "addresses": [
                      {
                          "id": "9eeb8525-f454-4a89-8526-31ae8de78ecf",
                          "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                          "CreatedAt": "2024-08-13T05:15:29.528Z",
                          "DeletedAt": null,
                          "ReferenceID": "3c2dfdb5-a140-4ef5-89d5-1326cbf632bc",
                          "addressNo": "apa1",
                          "tambon": "apt1",
                          "amphoe": "apa1",
                          "province": "app1",
                          "postalCode": "12323",
                          "country": "apc1",
                          "mooNo":"moo number",
                          "soi":"soi app",
                          "floor":"24floor",
                          "building":"building app",
                          "road":"raminta road",
                          "types": 201
                      }
                  ],
                  "citizenId":"2571817668244",
                  "passportId": "1111111111a",
                  "expiryDate": "2026-01-01T00:00:00Z",
                  "nationality": "apn1",
                  "types": 201
              }
  
  describe("test create corporate form7 (authorized person)", () => {
  
    beforeAll(() => {
      localStorage.setItem('registerId', '80000001');
    })
    afterAll(() => {
      localStorage.clear();
    })
  
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.resetModules();
        store.dispatch(setUser(mockUser));
    });
  
    test("test form6 (PageAuthorizedPerson) header information", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageAuthorizedPerson
            />
          </MemoryRouter>
        </Provider>
      );
  
      const pageTitle = screen.getByText("Juristic Infomations");
      expect(pageTitle).toBeInTheDocument();
  
      const juristicId = screen.getByText("Juristic ID");
      expect(juristicId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 5ce7a417-fc23-4108-a8a6-76e4512161c5"));
      });
  
      const taxId = screen.getByText("Tax ID");
      expect(taxId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567890"));
      });
  
      const juristicName = screen.getByText("Juristic Investor Name");
      expect(juristicName).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": sssABC Co.ltd"));
      });
  
      const dateIncorporation = screen.getByText("Date Of Incorporation");
      expect(dateIncorporation).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 2013-03-06"));
      });
  
      const commercialNumber = screen.getByText("Commercial Number");
      expect(commercialNumber).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567"));
      });
  
      store.dispatch(clearCorporateData());
    }, 40000);
  
    test("test form6 (PageAuthorizedPerson) DELETE", async () => {
      mockAxios.onPost('/api/v1/corporate/query').reply(200, [
        {
          AuthorizedPersons: [
            authorizedMock
          ],
        },
      ]);
      store.dispatch(setCorporateData(mockCorporateData));
      const authorizedPerson = [authorizedMock];
          console.log(authorizedPerson)
          const updateAuthorized: TAuthorizePerson[] = authorizedPerson.map((authorized: TAuthorizedPersonEdit) => ({
            ...authorized,
            personalId: authorized.personalId, 
          }))
          .map(mapDataToTAuthoirzedPerson)
          .filter((item:any) => item !== null) as TAuthorizePerson[];
          
          store.dispatch(setAuthorizedPersons(updateAuthorized));
          console.log(updateAuthorized)
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageAuthorizedPerson
            />
          </MemoryRouter>
        </Provider>
      );
  
      const title = screen.getByLabelText("Title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveValue("");
  
      const firstName = screen.getByLabelText("First Name");
      expect(firstName).toBeInTheDocument();;
      expect(firstName).toHaveValue("");
  
      const surName = screen.getByLabelText("Surname");
      expect(surName).toBeInTheDocument();
      expect(surName).toHaveValue("");
  
      const Id = screen.getByLabelText("Please fill ID");
      expect(Id).toBeInTheDocument();
      expect(Id).toHaveValue("");
  
      const expiredDate = screen.getByTestId("expiredDate");
      expect(expiredDate).toBeInTheDocument();
      expect(expiredDate).toHaveValue("");
  
      const nationality = screen.getByLabelText("Nationality");
      expect(nationality).toBeInTheDocument();
      expect(nationality).toHaveValue("");
  
      const addressNumber = screen.getByLabelText("Address Number");
      expect(addressNumber).toBeInTheDocument();
      expect(addressNumber).toHaveValue("");
  
      const moo = screen.getByLabelText("Moo");
      expect(moo).toBeInTheDocument();
      expect(moo).toHaveValue("");
  
      const soi = screen.getByLabelText("Soi");
      expect(soi).toBeInTheDocument();
      expect(soi).toHaveValue("");
  
      const floor = screen.getByLabelText("Floor");
      expect(floor).toBeInTheDocument();
      expect(floor).toHaveValue("");
  
      const building = screen.getByLabelText("Building");
      expect(building).toBeInTheDocument();
      expect(building).toHaveValue("");
  
      const road = screen.getByLabelText("Road");
      expect(road).toBeInTheDocument();
      expect(road).toHaveValue("");
  
      const tamBon = screen.getByLabelText("Tambon");
      expect(tamBon).toBeInTheDocument();
      expect(tamBon).toHaveValue("");
  
      const amPhoe = screen.getByLabelText("Amphoe");
      expect(amPhoe).toBeInTheDocument();
      expect(amPhoe).toHaveValue("");
  
      const proVince = screen.getByLabelText("Province");
      expect(proVince).toBeInTheDocument();
      expect(proVince).toHaveValue("");
  
      const postalCode = screen.getByLabelText("PostalCode");
      expect(postalCode).toBeInTheDocument();
      expect(postalCode).toHaveValue("");
  
      const country = screen.getByLabelText("Country");
      expect(country).toBeInTheDocument();
      expect(country).toHaveValue("");
  
      await waitFor(() => {
        const editButton = screen.getByTestId("editButton-3c2dfdb5-a140-4ef5-89d5-1326cbf632bc");
        expect(editButton).toBeInTheDocument();
      })
      await act(async () => {
        fireEvent.click(screen.getByTestId("editButton-3c2dfdb5-a140-4ef5-89d5-1326cbf632bc"));
      })
  
      await waitFor(() => {
        expect(title).not.toHaveValue("");
        expect(firstName).not.toHaveValue("");
        expect(surName).not.toHaveValue("");
        expect(Id).not.toHaveValue("");
        expect(expiredDate).not.toHaveValue("mm/dd/yyyy");
        expect(nationality).not.toHaveValue("");
        expect(addressNumber).not.toHaveValue("");
        expect(moo).not.toHaveValue("");
        expect(soi).not.toHaveValue("");
        expect(floor).not.toHaveValue("");
        expect(building).not.toHaveValue("");
        expect(road).not.toHaveValue("");
        expect(tamBon).not.toHaveValue("");
        expect(amPhoe).not.toHaveValue("");
        expect(proVince).not.toHaveValue("");
        expect(postalCode).not.toHaveValue("");
        expect(country).not.toHaveValue("");
      });
  
      const deleteButton = screen.getByTestId("deleteButton-3c2dfdb5-a140-4ef5-89d5-1326cbf632bc");
      expect(deleteButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(deleteButton);
      })
  
      const confirmDelete = screen.getByTestId("confirmDelete-3c2dfdb5-a140-4ef5-89d5-1326cbf632bc");
      expect(confirmDelete).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(confirmDelete);
      })
  
      await act(async () => {
        store.dispatch(clearAuthorizedPerson());
        store.dispatch(clearCorporateData());
      })
    }, 40000);
  
    
  
    // test("test input data(multiple input type)", async () => {
  
    //   const mockOnSubmit = jest.fn();
    //   const mockClearChoosedEditData = jest.fn();
    //   const mockregisterId = "0";
  
    //   render(
    //     <Provider store={store}>
    //       <MemoryRouter>
    //         <FormAuthorizedPerson
    //           onsubmit={mockOnSubmit}
    //           registerId={mockregisterId}
    //           clearChoosedEditData={mockClearChoosedEditData}
    //         />
    //       </MemoryRouter>
    //     </Provider>
    //   );
  
    //   await act(async () => {
    //     const title = screen.getByLabelText("Title");
    //     expect(title).toBeInTheDocument();
    //     fireEvent.change(title, { target: { value: "Mr" } });
    //     expect(title).toHaveValue("Mr");
  
    //     const firstName = screen.getByLabelText("First Name");
    //     expect(firstName).toBeInTheDocument();
    //     fireEvent.change(firstName, { target: { value: "Authorized Name" } });
    //     expect(firstName).toHaveValue("Authorized Name");
  
    //     const surname = screen.getByLabelText("Surname");
    //     expect(surname).toBeInTheDocument();
    //     fireEvent.change(surname, { target: { value: "Doe" } });
    //     expect(surname).toHaveValue("Doe");
  
    //     const ID = screen.getByLabelText("Please fill ID");
    //     expect(ID).toBeInTheDocument();
    //     fireEvent.change(ID, { target: { value: "2571817668244" } });
    //     expect(ID).toHaveValue("2571817668244");
  
    //     const expiredDate = screen.getByTestId("expiredDate");
    //     expect(expiredDate).toBeInTheDocument();
    //     fireEvent.change(expiredDate, { target: { value: "2022-01-01" } });
    //     expect(expiredDate).toHaveValue("2022-01-01");
  
    //     const nationality = screen.getByLabelText("Nationality");
    //     expect(nationality).toBeInTheDocument();
    //     fireEvent.change(nationality, { target: { value: "Thai" } });
    //     expect(nationality).toHaveValue("Thai");
  
    //     const addressNumber = screen.getByLabelText("Address Number");
    //     expect(addressNumber).toBeInTheDocument();
    //     fireEvent.change(addressNumber, { target: { value: "address number" } });
    //     expect(addressNumber).toHaveValue("address number");
  
    //     const moo = screen.getByLabelText("Moo");
    //     expect(moo).toBeInTheDocument();
    //     fireEvent.change(moo, { target: { value: "moo" } });
    //     expect(moo).toHaveValue("moo");
  
    //     const soi = screen.getByLabelText("Soi");
    //     expect(soi).toBeInTheDocument();
    //     fireEvent.change(soi, { target: { value: "soi" } });
    //     expect(soi).toHaveValue("soi");
  
    //     const floor = screen.getByLabelText("Floor");
    //     expect(floor).toBeInTheDocument();
    //     fireEvent.change(floor, { target: { value: "floor" } });
    //     expect(floor).toHaveValue("floor");
  
    //     const building = screen.getByLabelText("Building");
    //     expect(building).toBeInTheDocument();
    //     fireEvent.change(building, { target: { value: "building" } });
    //     expect(building).toHaveValue("building");
  
    //     const road = screen.getByLabelText("Road");
    //     expect(road).toBeInTheDocument();
    //     fireEvent.change(road, { target: { value: "road" } });
    //     expect(road).toHaveValue("road");
  
    //     const tambon = screen.getByLabelText("Tambon");
    //     expect(tambon).toBeInTheDocument();
    //     expect(tambon).toHaveValue("");
    //     fireEvent.change(tambon, { target: { value: "tambon" } });
    //     expect(tambon).toHaveValue("tambon");
  
    //     const amphoe = screen.getByLabelText("Amphoe");
    //     expect(amphoe).toBeInTheDocument();
    //     expect(amphoe).toHaveValue("");
    //     fireEvent.change(amphoe, { target: { value: "amphoe" } });
    //     expect(amphoe).toHaveValue("amphoe");
  
    //     const province = screen.getByLabelText("Province");
    //     expect(province).toBeInTheDocument();
    //     expect(province).toHaveValue("");
    //     fireEvent.change(province, { target: { value: "province" } });
    //     expect(province).toHaveValue("province");
  
    //     const postalCode = screen.getByLabelText("PostalCode");
    //     expect(postalCode).toBeInTheDocument();
    //     expect(postalCode).toHaveValue("");
    //     fireEvent.change(postalCode, { target: { value: "postal code" } });
    //     expect(postalCode).toHaveValue("postal code");
  
    //     const country = screen.getByLabelText("Country");
    //     expect(country).toBeInTheDocument();
    //     expect(country).toHaveValue("");
    //     fireEvent.change(country, { target: { value: "country" } });
    //     expect(country).toHaveValue("country");
  
    //     const submitButton = screen.getByText("Save");
    //     expect(submitButton).toBeInTheDocument();
    //   })
  
    //   await act(async () => {
    //     fireEvent.click(screen.getByText("Save"));
    //   });
  
    //   //Expected form data
    //   const expectedFormData = {
    //     data: {
    //       fullNames: [{ title: "Mr", firstName: "Authorized Name", lastName: "Doe" }],
    //       citizenId: "2571817668244",
    //       passportId: "",
    //       expiryDate: "2022-01-01",
    //       nationality: "Thai",
    //       addresses: [
    //         {
    //           addressNo: "address number",
    //           mooNo: "moo",
    //           soi: "soi",
    //           floor: "floor",
    //           building: "building",
    //           road: "road",
    //           tambon: "tambon",
    //           amphoe: "amphoe",
    //           province: "province",
    //           postalCode: "postal code",
    //           country: "country",
    //         },
    //       ],
    //       types: 201,
    //       registerId: "0",
    //       personalId: undefined,
    //     },
    //   };
  
    //   await waitFor(async () => {
    //     const state = store.getState();
    //     const corporateState = state.corporateTest;
    //     console.log("Corporate State After Submission:", corporateState);
  
    //     await sleep(500);
    //     expect(corporateState).toMatchObject(expectedFormData);
    //   });
    // }, 40000);
  });
  
  const attorneyMock = {  
                  "id": "140fd838-923d-44f0-bdee-0c6b8181fcb3",
                  "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                  "CreatedAt": "2024-09-12T04:00:13.134Z",
                  "DeletedAt": null,
                  "personalId": "394d06e0-3281-4bb3-b8c1-782749105236",
                  "registerId": 80000044,
                  "fullNames": [
                      {
                          "id": "5d1ecbef-9041-4e19-9df7-70aa1b340d42",
                          "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                          "CreatedAt": "2024-09-12T04:00:13.135Z",
                          "DeletedAt": null,
                          "ReferenceID": "394d06e0-3281-4bb3-b8c1-782749105236",
                          "title": "123123",
                          "firstName": "1",
                          "lastName": "1",
                          "types": 302
                      }
                  ],
                  "addresses": [
                      {
                          "id": "db732a63-13e7-446b-8714-aad416fb9949",
                          "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                          "CreatedAt": "2024-09-12T04:00:13.134Z",
                          "DeletedAt": null,
                          "ReferenceID": "394d06e0-3281-4bb3-b8c1-782749105236",
                          "addressNo": "70/178 ramintra65 yak 2-4",
                          "tambon": "1",
                          "amphoe": "1",
                          "province": "Bangkok",
                          "postalCode": "10220",
                          "country": "Thailand",
                          "mooNo":"moo number",
                          "soi":"soi app",
                          "floor":"24floor",
                          "building":"building app",
                          "road":"raminta road",
                          "types": 302
                      }
                  ],
                  "passportId": "123",
                  "expiryDate": "2024-09-24T00:00:00Z",
                  "nationality": "1",
                  "telephone": "0884744411",
                  "email": "1",
                  "types": 302
  }
  
  describe("test create corporate form8 (attorney)", () => {

    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      jest.resetModules();
      store.dispatch(setUser(mockUser));
  });
  
    beforeAll(() => {
      localStorage.setItem('registerId', '80000001');
    })
    afterAll(() => {
      localStorage.clear();
    })
  
    test("test form8 (PageAttorney) header information", async () => {
      store.dispatch(setCorporateData(mockCorporateData));
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageAttorney
            />
          </MemoryRouter>
        </Provider>
      );
  
      const pageTitle = screen.getByText("Juristic Infomations");
      expect(pageTitle).toBeInTheDocument();
  
      const juristicId = screen.getByText("Juristic ID");
      expect(juristicId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 5ce7a417-fc23-4108-a8a6-76e4512161c5"));
      });
  
      const taxId = screen.getByText("Tax ID");
      expect(taxId).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567890"));
      });
  
      const juristicName = screen.getByText("Juristic Investor Name");
      expect(juristicName).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": sssABC Co.ltd"));
      });
  
      const dateIncorporation = screen.getByText("Date Of Incorporation");
      expect(dateIncorporation).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 2013-03-06"));
      });
  
      const commercialNumber = screen.getByText("Commercial Number");
      expect(commercialNumber).toBeInTheDocument();
  
      await waitFor(() => {
        expect(screen.getByText(": 1234567"));
      });
  
      store.dispatch(clearCorporateData());
    }, 40000);
  
    test("test form8 (PageAttorney) DELETE", async () => {
      mockAxios.onPost('/api/v1/corporate/query').reply(200, [
        {
          Attorneys: [
            attorneyMock
          ],
        },
      ]);
      store.dispatch(setCorporateData(mockCorporateData));
      const attorney = [attorneyMock];
          const updateAttorney = attorney.map(
            (attorneyitems: any) => ({
              ...attorneyitems,
              personalId: attorneyitems.personalId,
            })
          )
            .map(mapDataToTAttorney)
            .filter((item: any) => item !== null);
  
          store.dispatch(setAttorney(updateAttorney));
          console.log(updateAttorney)
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageAttorney
            />
          </MemoryRouter>
        </Provider>
      );
  
      const title = screen.getByLabelText("Title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveValue("");
  
      const firstName = screen.getByLabelText("First Name");
      expect(firstName).toBeInTheDocument();;
      expect(firstName).toHaveValue("");
  
      const surName = screen.getByLabelText("Surname");
      expect(surName).toBeInTheDocument();
      expect(surName).toHaveValue("");
  
      const Id = screen.getByLabelText("Please fill ID");
      expect(Id).toBeInTheDocument();
      expect(Id).toHaveValue("");
  
      const expiredDate = screen.getByTestId("expiredDate");
      expect(expiredDate).toBeInTheDocument();
      expect(expiredDate).toHaveValue("");
  
      const nationality = screen.getByLabelText("Nationality");
      expect(nationality).toBeInTheDocument();
      expect(nationality).toHaveValue("");
  
      const addressNumber = screen.getByLabelText("Address Number");
      expect(addressNumber).toBeInTheDocument();
      expect(addressNumber).toHaveValue("");
  
      const moo = screen.getByLabelText("Moo");
      expect(moo).toBeInTheDocument();
      expect(moo).toHaveValue("");
  
      const soi = screen.getByLabelText("Soi");
      expect(soi).toBeInTheDocument();
      expect(soi).toHaveValue("");
  
      const floor = screen.getByLabelText("Floor");
      expect(floor).toBeInTheDocument();
      expect(floor).toHaveValue("");
  
      const building = screen.getByLabelText("Building");
      expect(building).toBeInTheDocument();
      expect(building).toHaveValue("");
  
      const road = screen.getByLabelText("Road");
      expect(road).toBeInTheDocument();
      expect(road).toHaveValue("");
  
      const tamBon = screen.getByLabelText("Tambon");
      expect(tamBon).toBeInTheDocument();
      expect(tamBon).toHaveValue("");
  
      const amPhoe = screen.getByLabelText("Amphoe");
      expect(amPhoe).toBeInTheDocument();
      expect(amPhoe).toHaveValue("");
  
      const proVince = screen.getByLabelText("Province");
      expect(proVince).toBeInTheDocument();
      expect(proVince).toHaveValue("");
  
      const postalCode = screen.getByLabelText("PostalCode");
      expect(postalCode).toBeInTheDocument();
      expect(postalCode).toHaveValue("");
  
      const country = screen.getByLabelText("Country");
      expect(country).toBeInTheDocument();
      expect(country).toHaveValue("");
  
      await waitFor(() => {
        const editButton = screen.getByTestId("editButton-394d06e0-3281-4bb3-b8c1-782749105236");
        expect(editButton).toBeInTheDocument();
      })
      await act(async () => {
        fireEvent.click(screen.getByTestId("editButton-394d06e0-3281-4bb3-b8c1-782749105236"));
      })
  
      await waitFor(() => {
        expect(title).not.toHaveValue("");
        expect(firstName).not.toHaveValue("");
        expect(surName).not.toHaveValue("");
        expect(Id).not.toHaveValue("");
        expect(expiredDate).not.toHaveValue("mm/dd/yyyy");
        expect(nationality).not.toHaveValue("");
        expect(addressNumber).not.toHaveValue("");
        expect(moo).not.toHaveValue("");
        expect(soi).not.toHaveValue("");
        expect(floor).not.toHaveValue("");
        expect(building).not.toHaveValue("");
        expect(road).not.toHaveValue("");
        expect(tamBon).not.toHaveValue("");
        expect(amPhoe).not.toHaveValue("");
        expect(proVince).not.toHaveValue("");
        expect(postalCode).not.toHaveValue("");
        expect(country).not.toHaveValue("");
      });
  
      const deleteButton = screen.getByTestId("deleteButton-394d06e0-3281-4bb3-b8c1-782749105236");
      expect(deleteButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(deleteButton);
      })
  
      const confirmDelete = screen.getByTestId("confirmDelete-394d06e0-3281-4bb3-b8c1-782749105236");
      expect(confirmDelete).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(confirmDelete);
      })
  
      await act(async () => {
        store.dispatch(clearAttorney());
        store.dispatch(clearCorporateData());
      })
    }, 40000);
  
    // test("test input data(multiple input type)", async () => {
    //   const mockOnSubmit = jest.fn();
    //   const mockClearChoosedEditData = jest.fn();
    //   const mockregisterId = "0";
  
    //   render(
    //     <Provider store={store}>
    //       <MemoryRouter>
    //         <FormAttorney
    //           onsubmit={mockOnSubmit}
    //           registerId={mockregisterId}
    //           clearChoosedEditData={mockClearChoosedEditData}
    //         />
    //       </MemoryRouter>
    //     </Provider>
    //   );
  
    //   await act(async () => {
    //     const title = screen.getByLabelText("Title");
    //     expect(title).toBeInTheDocument();
    //     fireEvent.change(title, { target: { value: "Mr" } });
    //     expect(title).toHaveValue("Mr");
  
    //     const firstName = screen.getByLabelText("First Name");
    //     expect(firstName).toBeInTheDocument();
    //     fireEvent.change(firstName, { target: { value: "John" } });
    //     expect(firstName).toHaveValue("John");
  
    //     const surname = screen.getByLabelText("Surname");
    //     expect(surname).toBeInTheDocument();
    //     fireEvent.change(surname, { target: { value: "Doe" } });
    //     expect(surname).toHaveValue("Doe");
  
    //     const ID = screen.getByLabelText("Please fill ID");
    //     expect(ID).toBeInTheDocument();
    //     fireEvent.change(ID, { target: { value: "2571817668244" } });
    //     expect(ID).toHaveValue("2571817668244");
  
    //     const expiredDate = screen.getByTestId("expiredDate");
    //     expect(expiredDate).toBeInTheDocument();
    //     fireEvent.change(expiredDate, { target: { value: "2022-01-01" } });
    //     expect(expiredDate).toHaveValue("2022-01-01");
  
    //     const nationality = screen.getByLabelText("Nationality");
    //     expect(nationality).toBeInTheDocument();
    //     fireEvent.change(nationality, { target: { value: "Thai" } });
    //     expect(nationality).toHaveValue("Thai");
  
    //     const addressNumber = screen.getByLabelText("Address Number");
    //     expect(addressNumber).toBeInTheDocument();
    //     fireEvent.change(addressNumber, { target: { value: "address number" } });
    //     expect(addressNumber).toHaveValue("address number");
  
    //     const moo = screen.getByLabelText("Moo");
    //     expect(moo).toBeInTheDocument();
    //     fireEvent.change(moo, { target: { value: "moo" } });
    //     expect(moo).toHaveValue("moo");
  
    //     const soi = screen.getByLabelText("Soi");
    //     expect(soi).toBeInTheDocument();
    //     fireEvent.change(soi, { target: { value: "soi" } });
    //     expect(soi).toHaveValue("soi");
  
    //     const floor = screen.getByLabelText("Floor");
    //     expect(floor).toBeInTheDocument();
    //     fireEvent.change(floor, { target: { value: "floor" } });
    //     expect(floor).toHaveValue("floor");
  
    //     const building = screen.getByLabelText("Building");
    //     expect(building).toBeInTheDocument();
    //     fireEvent.change(building, { target: { value: "building" } });
    //     expect(building).toHaveValue("building");
  
    //     const road = screen.getByLabelText("Road");
    //     expect(road).toBeInTheDocument();
    //     fireEvent.change(road, { target: { value: "road" } });
    //     expect(road).toHaveValue("road");
  
    //     const tambon = screen.getByLabelText("Tambon");
    //     expect(tambon).toBeInTheDocument();
    //     expect(tambon).toHaveValue("");
    //     fireEvent.change(tambon, { target: { value: "tambon" } });
    //     expect(tambon).toHaveValue("tambon");
  
    //     const amphoe = screen.getByLabelText("Amphoe");
    //     expect(amphoe).toBeInTheDocument();
    //     expect(amphoe).toHaveValue("");
    //     fireEvent.change(amphoe, { target: { value: "amphoe" } });
    //     expect(amphoe).toHaveValue("amphoe");
  
    //     const province = screen.getByLabelText("Province");
    //     expect(province).toBeInTheDocument();
    //     expect(province).toHaveValue("");
    //     fireEvent.change(province, { target: { value: "province" } });
    //     expect(province).toHaveValue("province");
  
    //     const postalCode = screen.getByLabelText("PostalCode");
    //     expect(postalCode).toBeInTheDocument();
    //     expect(postalCode).toHaveValue("");
    //     fireEvent.change(postalCode, { target: { value: "postal code" } });
    //     expect(postalCode).toHaveValue("postal code");
  
    //     const country = screen.getByLabelText("Country");
    //     expect(country).toBeInTheDocument();
    //     expect(country).toHaveValue("");
    //     fireEvent.change(country, { target: { value: "country" } });
    //     expect(country).toHaveValue("country");
  
    //     const submitButton = screen.getByText("Save");
    //     expect(submitButton).toBeInTheDocument();
    //   })
  
    //   await act(async () => {
    //     fireEvent.click(screen.getByText("Save"));
    //   });
  
    //   //Expected form data
    //   const expectedFormData = {
    //     data: {
    //       fullNames: [{ title: "Mr", firstName: "John", lastName: "Doe" }],
    //       citizenId: "2571817668244",
    //       passportId: "",
    //       expiryDate: "2022-01-01",
    //       nationality: "Thai",
    //       addresses: [
    //         {
    //           addressNo: "address number",
    //           mooNo: "moo",
    //           soi: "soi",
    //           floor: "floor",
    //           building: "building",
    //           road: "road",
    //           tambon: "tambon",
    //           amphoe: "amphoe",
    //           province: "province",
    //           postalCode: "postal code",
    //           country: "country",
    //         },
    //       ],
    //       types: 302,
    //       registerId: "0",
    //       personalId: undefined,
    //     },
    //   };
  
    //   await waitFor(async () => {
    //     const state = store.getState();
    //     const corporateState = state.corporateTest;
    //     console.log("Corporate State After Submission:", corporateState);
  
    //     await sleep(500);
    //     expect(corporateState).toMatchObject(expectedFormData);
    //   });
    // }, 40000);
  });
  
  const bankMock = {
    "id": "db71eec9-195f-4cd8-8ce6-d66505360cab",
    "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
    "CreatedAt": "2024-09-12T02:09:44.974Z",
    "DeletedAt": null,
    "registerId": 80000044,
    "accountType": "12",
    "bankName": "2",
    "accountNo": "2",
    "accountLocation": "2",
    "swiftCode": "2"
  }
  
  describe("test create corporate form9 (bank)", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.resetModules();
        store.dispatch(setUser(mockUser));
    });
  
    beforeAll(() => {
      localStorage.setItem('registerId', '80000001');
    })
    afterAll(() => {
      localStorage.clear();
    })
  
    // test("test form9 (PageBank) header information", async () => {
    //   store.dispatch(setCorporateData(mockCorporateData));
  
    //   render(
    //     <Provider store={store}>
    //       <MemoryRouter>
    //         <PageBankAccount
    //         />
    //       </MemoryRouter>
    //     </Provider>
    //   );
  
    //   const pageTitle = screen.getByText("Juristic Infomations");
    //   expect(pageTitle).toBeInTheDocument();
  
    //   const juristicId = screen.getByText("Juristic ID");
    //   expect(juristicId).toBeInTheDocument();
  
    //   await waitFor(() => {
    //     expect(screen.getByText(": 80000001"));
    //   });
  
    //   const taxId = screen.getByText("Tax ID");
    //   expect(taxId).toBeInTheDocument();
  
    //   await waitFor(() => {
    //     expect(screen.getByText(": TAXID789"));
    //   });
  
    //   const juristicName = screen.getByText("Juristic Investor Name");
    //   expect(juristicName).toBeInTheDocument();
  
    //   await waitFor(() => {
    //     expect(screen.getByText(": Test Corporate"));
    //   });
  
    //   const dateIncorporation = screen.getByText("Date Of Incorporation");
    //   expect(dateIncorporation).toBeInTheDocument();
  
    //   await waitFor(() => {
    //     expect(screen.getByText(": 2023-10-01"));
    //   });
  
    //   const commercialNumber = screen.getByText("Commercial Number");
    //   expect(commercialNumber).toBeInTheDocument();
  
    //   await waitFor(() => {
    //     expect(screen.getByText(": 1234567"));
    //   });
  
    //   store.dispatch(clearCorporateData());
    // }, 40000);
  
    test("test form9 (PageBank) DELETE", async () => {
      mockAxios.onPost('/api/v1/corporate/query').reply(200, [
        {
          Banks: [
            bankMock
          ],
        },
      ]);
      store.dispatch(setCorporateData(mockCorporateData));
      const banksMock = [bankMock];
      const banks =banksMock.map((bank: any) => ({
        ...bank,
        BankId: bank.id,
      }))
        .map(mapDataToTBank)
        .filter((item: any) => item !== null);
  
      store.dispatch(setBank(banks));
      console.log(banks)
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageBankAccount
            />
          </MemoryRouter>
        </Provider>
      );
  
      const accountType = screen.getByLabelText("Account Type");
      expect(accountType).toBeInTheDocument();
      expect(accountType).toHaveValue("");
  
      const bankName = screen.getByLabelText("Bank Name");
      expect(bankName).toBeInTheDocument();
      expect(bankName).toHaveValue("");
  
      const accountNumber = screen.getByLabelText("Account Number");
      expect(accountNumber).toBeInTheDocument();
      expect(accountNumber).toHaveValue("");
  
      const accountLocation = screen.getByLabelText("Account Location");
      expect(accountLocation).toBeInTheDocument();
      expect(accountLocation).toHaveValue("");
  
      const swiftCode = screen.getByLabelText("SWIFT Code");
      expect(swiftCode).toBeInTheDocument();
      expect(swiftCode).toHaveValue("");
  
      await waitFor(() => {
        const editButton = screen.getByTestId("editButton-db71eec9-195f-4cd8-8ce6-d66505360cab");
        expect(editButton).toBeInTheDocument();
      })
      await act(async () => {
        fireEvent.click(screen.getByTestId("editButton-db71eec9-195f-4cd8-8ce6-d66505360cab"));
      })
  
      await waitFor(() => {
        expect(accountType).not.toHaveValue("");
        expect(bankName).not.toHaveValue("");
        expect(accountNumber).not.toHaveValue("");
        expect(accountLocation).not.toHaveValue("");
        expect(swiftCode).not.toHaveValue("");
      });
  
      const deleteButton = screen.getByTestId("deleteButton-db71eec9-195f-4cd8-8ce6-d66505360cab");
      expect(deleteButton).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(deleteButton);
      })
  
      const confirmDelete = screen.getByTestId("confirmDelete-db71eec9-195f-4cd8-8ce6-d66505360cab");
      expect(confirmDelete).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(confirmDelete);
      })
  
      await act(async () => {
        store.dispatch(clearBank());
        store.dispatch(clearCorporateData());
      });
    }, 40000);
  
    test("test input data(multiple input type)", async () => {
      const mockOnSubmit = jest.fn();
      const mockClearChoosedEditData = jest.fn();
      const mockregisterId = "0";
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <FormBank
              onsubmit={mockOnSubmit}
              registerId={mockregisterId}
              clearChoosedEditData={mockClearChoosedEditData}
            />
          </MemoryRouter>
        </Provider>
      );
  
      await act(async () => {
        const accountType = screen.getByLabelText("Account Type");
        expect(accountType).toBeInTheDocument();
        fireEvent.change(accountType, { target: { value: "account type" } });
        expect(accountType).toHaveValue("account type");
  
        const bankName = screen.getByLabelText("Bank Name");
        expect(bankName).toBeInTheDocument();
        fireEvent.change(bankName, { target: { value: "bank name" } });
        expect(bankName).toHaveValue("bank name");
  
        const accountNumber = screen.getByLabelText("Account Number");
        expect(accountNumber).toBeInTheDocument();
        fireEvent.change(accountNumber, { target: { value: "123" } });
        expect(accountNumber).toHaveValue("123");
  
        const accountLocation = screen.getByLabelText("Account Location");
        expect(accountLocation).toBeInTheDocument();
        fireEvent.change(accountLocation, {
          target: { value: "account location" },
        });
        expect(accountLocation).toHaveValue("account location");
  
        const swiftCode = screen.getByLabelText("SWIFT Code");
        expect(swiftCode).toBeInTheDocument();
        fireEvent.change(swiftCode, { target: { value: "swift code" } });
        expect(swiftCode).toHaveValue("swift code");
  
        const submitButton = screen.getByText("Save");
        expect(submitButton).toBeInTheDocument();
      })
  
      await act(async () => {
        fireEvent.click(screen.getByText("Save"));
      });
  
      //Expected form data
      const expectedFormData = {
        data: {
          bank: [
            {
              bankName: "bank name",
              accountLocation: "account location",
              accountNo: "123",
              accountType: "account type",
              swiftCode: "swift code",
            },
          ],
          registerId: "0",
          BankId: undefined,
        },
      };
  
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      });
    }, 40000);
  });
  
  jest.mock(
    "@/pages/createJob/changeCorporateAccount/pages/UploadFiles/hook/useUploadFile",
  );
  
  describe("UploadFiles Component", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.resetModules();
        store.dispatch(setUser(mockUser));
    });
  
    beforeAll(() => {
      localStorage.setItem('registerId', '80000001');
    })
    afterAll(() => {
      localStorage.clear();
    })
  
    test("handles file upload", async () => {
      const handleUpload = jest.fn();
      const handleInputChange = jest.fn((event) => {
        handleUpload(event.target.files[0], "123");
      });
    
      // Mock the return value of useUploadFile
      (useUploadFileModule.useUploadFile as jest.Mock).mockReturnValue({
        file: new File(["file contents"], "test.doc", {
          type: "application/msword",
        }),
        documentType: { value: "Test Document" },
        handleDocumnetTypeChange: jest.fn(),
        handleInputChange,
        handleUpload,
      });
    
      render(
        <Provider store={store}>
          <MemoryRouter>
            <UploadFiles />
          </MemoryRouter>
        </Provider>
      );
    
      const dropdown = screen.getByText("Select");
      expect(dropdown).toBeInTheDocument();
      fireEvent.click(dropdown);
    
      const id = screen.getByText("id");
      expect(id).toBeInTheDocument();
      fireEvent.click(id);
    
      const fileInput = screen.getByTestId("inputfile");
      const uploadButton = screen.getByText("Upload");
    
      if (fileInput) {
        const testFile = new File(["file contents"], "test.doc", {
          type: "application/msword",
        });
        await act(async () => {
          fireEvent.change(fileInput, { target: { files: [testFile] } });
        });
        expect(handleInputChange).toHaveBeenCalledWith(expect.any(Object));
    
        fireEvent.click(uploadButton);
    
        expect(handleUpload).toHaveBeenCalledWith(testFile, "123");
        expect(handleUpload).toHaveBeenCalledTimes(2);
      } else {
        throw new Error("File input not found");
      }
    }, 40000);
  });
  
  const transformedData = [
    {
        "id": "a8bd6293-0d66-4b0a-8415-40b4de67b763",
        "questionNumber": 1,
        "question": "Your prior investment experience in securities. (Securities: Treasury bills, bond, Bill of Exchange, Stocks, Debenture,  Structure note, Mutual Fund Units)",
        "choices": [
            {
                "id": "5a54778e-47a9-48b6-b8e2-e1679b87ce04",
                "questionId": "a8bd6293-0d66-4b0a-8415-40b4de67b763",
                "answer": "Less than 1 year",
                "score": 1
            },
            {
                "id": "92f2c072-4d4f-458f-aa59-4b3e515bcda7",
                "questionId": "a8bd6293-0d66-4b0a-8415-40b4de67b763",
                "answer": "6-10 years",
                "score": 3
            },
            {
                "id": "ab11afb8-64a5-4d29-8812-8583c571317d",
                "questionId": "a8bd6293-0d66-4b0a-8415-40b4de67b763",
                "answer": "1-5 years",
                "score": 2
            },
            {
                "id": "d38dae98-2b36-4cf8-ac0a-6f97a3f52cba",
                "questionId": "a8bd6293-0d66-4b0a-8415-40b4de67b763",
                "answer": "More than 10 years",
                "score": 4
            }
        ],
        "types": "1"
    },
    {
        "id": "a3f322fa-b464-4110-8fd0-0a8e9e0acf74",
        "questionNumber": 2,
        "question": "What is the proportion of your expenses compare to your revenue?",
        "choices": [
            {
                "id": "4f40b046-712a-406f-afc8-fde53323494c",
                "questionId": "a3f322fa-b464-4110-8fd0-0a8e9e0acf74",
                "answer": "Between 50% and 75% of the revenue",
                "score": 2
            },
            {
                "id": "590a265b-2994-4569-aa52-f06430a30419",
                "questionId": "a3f322fa-b464-4110-8fd0-0a8e9e0acf74",
                "answer": "25% to less than 50% of the revenue",
                "score": 3
            },
            {
                "id": "895709ec-7865-4a5a-ad39-b303ea498bf2",
                "questionId": "a3f322fa-b464-4110-8fd0-0a8e9e0acf74",
                "answer": "Less than 25% of the revenue",
                "score": 4
            },
            {
                "id": "c14526c2-6427-4e63-9a9c-3643bcf24a07",
                "questionId": "a3f322fa-b464-4110-8fd0-0a8e9e0acf74",
                "answer": "More than75% of the revenue",
                "score": 1
            }
        ],
        "types": "1"
    },
    {
        "id": "4670ebd5-6335-491c-a4c3-0c990052a4d9",
        "questionNumber": 3,
        "question": "What is your current financial status?",
        "choices": [
            {
                "id": "11e7d574-6723-4a78-b5f5-51a623cb9100",
                "questionId": "4670ebd5-6335-491c-a4c3-0c990052a4d9",
                "answer": "Almost no liabilities or no liabilities",
                "score": 4
            },
            {
                "id": "3c29ed01-073d-4463-b789-bdd439f87a5d",
                "questionId": "4670ebd5-6335-491c-a4c3-0c990052a4d9",
                "answer": "Assets equal liabilities",
                "score": 2
            },
            {
                "id": "8a298265-064a-4bb5-9c00-b718a4405fda",
                "questionId": "4670ebd5-6335-491c-a4c3-0c990052a4d9",
                "answer": "More assets than liabilities",
                "score": 3
            },
            {
                "id": "e07a38b4-f568-4968-b3ef-7f125d6445f5",
                "questionId": "4670ebd5-6335-491c-a4c3-0c990052a4d9",
                "answer": "Less assets than liabilities",
                "score": 1
            }
        ],
        "types": "1"
    },
    {
        "id": "f6e87bd7-bd67-4906-86f2-05e78e8a84ba",
        "questionNumber": 4,
        "question": "Do you have any investment experience or knowledge in the following types of investment products? (You can choose more than 1 item)",
        "choices": [
            {
                "id": "3709624d-66e1-4916-aec6-ad42e29e805c",
                "questionId": "f6e87bd7-bd67-4906-86f2-05e78e8a84ba",
                "answer": "Debentures or Mutual Funds",
                "score": 3
            },
            {
                "id": "72920558-7eaa-4f9a-a116-c38d4df78853",
                "questionId": "f6e87bd7-bd67-4906-86f2-05e78e8a84ba",
                "answer": "Common Stocks or Mutual Funds or other high-risk assets",
                "score": 4
            },
            {
                "id": "97f49274-bf00-4d89-afde-baff69241dd2",
                "questionId": "f6e87bd7-bd67-4906-86f2-05e78e8a84ba",
                "answer": "Bank Deposits",
                "score": 1
            },
            {
                "id": "a859517e-8ddd-4ae7-844b-095b72a81ed0",
                "questionId": "f6e87bd7-bd67-4906-86f2-05e78e8a84ba",
                "answer": "Government Bond or Government Bond Funds",
                "score": 2
            }
        ],
        "types": "2"
    },
    {
        "id": "422e911e-6b2e-4d3b-9bb7-41b6ea98c838",
        "questionNumber": 5,
        "question": "What is your investment period target?",
        "choices": [
            {
                "id": "4df426ef-26fb-4580-81c1-22bb117eab2c",
                "questionId": "422e911e-6b2e-4d3b-9bb7-41b6ea98c838",
                "answer": "3 to 5 years",
                "score": 3
            },
            {
                "id": "54bcfdd8-19a7-421a-97f4-f0894cc43b52",
                "questionId": "422e911e-6b2e-4d3b-9bb7-41b6ea98c838",
                "answer": "1 to less than 3 years",
                "score": 2
            },
            {
                "id": "b9c750d5-ecf9-4f7c-b94c-62c2f1e8befa",
                "questionId": "422e911e-6b2e-4d3b-9bb7-41b6ea98c838",
                "answer": "More than 5 years",
                "score": 4
            },
            {
                "id": "fac88488-aeb4-40f2-919c-06e9342c200a",
                "questionId": "422e911e-6b2e-4d3b-9bb7-41b6ea98c838",
                "answer": "Less than 1 year",
                "score": 1
            }
        ],
        "types": "1"
    },
    {
        "id": "b3217c7f-3905-4205-9301-fa81684db06f",
        "questionNumber": 6,
        "question": "What is your risk tolerance?",
        "choices": [
            {
                "id": "26b06772-8cd8-482b-a101-32c83b713952",
                "questionId": "b3217c7f-3905-4205-9301-fa81684db06f",
                "answer": "Focus on opportunity in preserving original investment safely and receiving small consistent return",
                "score": 1
            },
            {
                "id": "7c4d5ee1-c34d-41a4-9cee-108d1ecc88af",
                "questionId": "b3217c7f-3905-4205-9301-fa81684db06f",
                "answer": "Focus on the highest long-term return but may take risk of losing most of the original investment",
                "score": 4
            },
            {
                "id": "c0f7758a-b036-4233-b579-4d46fc1e3d65",
                "questionId": "b3217c7f-3905-4205-9301-fa81684db06f",
                "answer": "Focus on opportunity in receiving consistent return but may take risk of losing some original investment ",
                "score": 2
            },
            {
                "id": "f2c844a6-f0fd-4d38-b56c-47f13771e5d7",
                "questionId": "b3217c7f-3905-4205-9301-fa81684db06f",
                "answer": "Focus on opportunity in receiving higher return but may take risk of losing more original investment",
                "score": 3
            }
        ],
        "types": "1"
    },
    {
        "id": "5e8a98fb-2f96-4433-8cfb-00be9068b26c",
        "questionNumber": 7,
        "question": "When considering sample picture below showing the potential returns of different investment portfolio, which investment portfolio are you most willing to invest in?",
        "choices": [
            {
                "id": "18ac6cd0-0fb7-4688-998d-4345a5ff55e1",
                "questionId": "5e8a98fb-2f96-4433-8cfb-00be9068b26c",
                "answer": "Investment portfolio 1 (has chance to receive 2.5% return without any loss)",
                "score": 1
            },
            {
                "id": "62ea66e3-d098-4f10-8ef2-b92d95a37cfc",
                "questionId": "5e8a98fb-2f96-4433-8cfb-00be9068b26c",
                "answer": "Investment portfolio 3 (has chance to receive 15% highest return but may lose up to 5%)",
                "score": 3
            },
            {
                "id": "673b9986-0531-4073-aed7-3d142325de7c",
                "questionId": "5e8a98fb-2f96-4433-8cfb-00be9068b26c",
                "answer": "Investment portfolio 2 (has chance to receive 7% highest return but may lose up to 1%)",
                "score": 2
            },
            {
                "id": "b767f232-1f66-4801-8e52-052203314d74",
                "questionId": "5e8a98fb-2f96-4433-8cfb-00be9068b26c",
                "answer": "Investment portfolio 4 (has chance to receive 25% highest return but may lose up to 15%)",
                "score": 4
            }
        ],
        "types": "1"
    },
    {
        "id": "15375a59-3660-44d7-bbba-50094e9b5fcb",
        "questionNumber": 8,
        "question": "If you invest in assets that have chances to receive high return but also have chances to receive high loss, how would you feel?",
        "choices": [
            {
                "id": "6fcefbbb-a68b-4571-b32d-075e17b48032",
                "questionId": "15375a59-3660-44d7-bbba-50094e9b5fcb",
                "answer": "Not concerned about the large potential loss and expect that the return may increase",
                "score": 4
            },
            {
                "id": "70ed3435-bbc5-4e4b-bf81-25e878fe9d1a",
                "questionId": "15375a59-3660-44d7-bbba-50094e9b5fcb",
                "answer": "Understand and accept the fluctuations",
                "score": 3
            },
            {
                "id": "75773edc-323d-45f7-976d-7d0e4831a066",
                "questionId": "15375a59-3660-44d7-bbba-50094e9b5fcb",
                "answer": "Worried and afraid of loss",
                "score": 1
            },
            {
                "id": "993389ed-6b23-436a-a4a5-910475eff2b6",
                "questionId": "15375a59-3660-44d7-bbba-50094e9b5fcb",
                "answer": "Uneasy but somehow understand",
                "score": 2
            }
        ],
        "types": "1"
    },
    {
        "id": "6eb3e155-c0ca-4b10-8a40-30d1234ac6be",
        "questionNumber": 9,
        "question": "In which proportion will you be anxious or unacceptable when the value of your investment has decreased?",
        "choices": [
            {
                "id": "16b72008-5fb9-4be1-9fca-1db05aa13d7d",
                "questionId": "6eb3e155-c0ca-4b10-8a40-30d1234ac6be",
                "answer": "More than 5%-10%",
                "score": 2
            },
            {
                "id": "7374a7b2-467c-493b-9ca0-199ecc07a2a3",
                "questionId": "6eb3e155-c0ca-4b10-8a40-30d1234ac6be",
                "answer": "5% or less",
                "score": 1
            },
            {
                "id": "8372a72d-eae0-41b2-bd1d-e28ac5b2455c",
                "questionId": "6eb3e155-c0ca-4b10-8a40-30d1234ac6be",
                "answer": "More than 10%-20%",
                "score": 3
            },
            {
                "id": "87ac4188-8343-4325-b415-0efd382b5438",
                "questionId": "6eb3e155-c0ca-4b10-8a40-30d1234ac6be",
                "answer": "More than 20%",
                "score": 4
            }
        ],
        "types": "1"
    },
    {
        "id": "90bc9754-4b99-4ed9-97e0-f55d886ecaa7",
        "questionNumber": 10,
        "question": "Last year, you invest 100,000 Baht. This year, the value of your investment decreased to 85,000 Baht. What will you do?",
        "choices": [
            {
                "id": "09dd5e55-e539-407c-8e99-4c0e20e5e4ad",
                "questionId": "90bc9754-4b99-4ed9-97e0-f55d886ecaa7",
                "answer": "Panic and want to sell the remaining investment",
                "score": 1
            },
            {
                "id": "0e07cf3a-d9fb-4cef-a3a0-495c241b2177",
                "questionId": "90bc9754-4b99-4ed9-97e0-f55d886ecaa7",
                "answer": "Worried and will change some investment into less risky assets",
                "score": 2
            },
            {
                "id": "34f2628e-7fc6-4fa0-827b-3be507cdcb04",
                "questionId": "90bc9754-4b99-4ed9-97e0-f55d886ecaa7",
                "answer": "Continue holding the investment and wait until the investment rebounds",
                "score": 3
            },
            {
                "id": "ef8d8624-7e15-4d45-b81d-1e4f54687091",
                "questionId": "90bc9754-4b99-4ed9-97e0-f55d886ecaa7",
                "answer": "Remain confident since it is long-term investment and will invest more to average cost",
                "score": 4
            }
        ],
        "types": "1"
    }
  ]
  
  jest.mock('../../../../src/pages/createJob/changeCorporateAccount/hook/useSuitTest.ts');
  
  describe('test create corporate form11 (suite test)', () => {
  
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.resetModules();
        store.dispatch(setUser(mockUser));
    });
  
    beforeAll(() => {
      localStorage.setItem('registerId', '80000001');
    });
  
    afterAll(() => {
      localStorage.clear();
    });
  
    test('renders the PageSuitTest component with mocked data', async () => {
      const mockUseSuitTest = {
        answerSuiteTest: [],
        quizSuiteTest: transformedData,
        handleChoice: jest.fn(),
        isLoading: false,
        handleSubmit: jest.fn(),
        errors: [],
        score: 0,
        opitionalQuiz: ['', ''],
        handelOptionalQuiz: jest.fn(),
        isSubmit: false,
        fetchSuitData: jest.fn(),
        additionalQuiz: { current: [] },
        corporatesInfo: {
          registerId: '12345',
          Info: {
            name: 'Test Corp',
            registrationNo: '67890',
            taxId: '11111',
            dateOfIncorporation: '2021-01-01T00:00:00Z',
          },
        },
      };
  
      // Use the mock implementation
      (useSuitTest as jest.Mock).mockReturnValue(mockUseSuitTest);
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <PageSuitTest />
          </MemoryRouter>
        </Provider>
      );
  
      await waitFor(() => {
        expect(screen.getByText('Suitabily Test :')).toBeInTheDocument();
        expect(screen.getByText('Selected Your Best Matched Answer')).toBeInTheDocument();
        expect(screen.getByText('1. Your prior investment experience in securities. (Securities: Treasury bills, bond, Bill of Exchange, Stocks, Debenture, Structure note, Mutual Fund Units)')).toBeInTheDocument();
        expect(screen.getByText('2. What is the proportion of your expenses compare to your revenue?')).toBeInTheDocument();
        expect(screen.getByText('3. What is your current financial status?')).toBeInTheDocument();
        expect(screen.getByText('4. Do you have any investment experience or knowledge in the following types of investment products? (You can choose more than 1 item)')).toBeInTheDocument();
        expect(screen.getByText('5. What is your investment period target?')).toBeInTheDocument();
        expect(screen.getByText('6. What is your risk tolerance?')).toBeInTheDocument();
        expect(screen.getByText('7. When considering sample picture below showing the potential returns of different investment portfolio, which investment portfolio are you most willing to invest in?')).toBeInTheDocument();
        expect(screen.getByText('8. If you invest in assets that have chances to receive high return but also have chances to receive high loss, how would you feel?')).toBeInTheDocument();
        expect(screen.getByText('9. In which proportion will you be anxious or unacceptable when the value of your investment has decreased?')).toBeInTheDocument();
        expect(screen.getByText('10. Last year, you invest 100,000 Baht. This year, the value of your investment decreased to 85,000 Baht. What will you do?')).toBeInTheDocument();
        expect(screen.getByText('Questions 11-12 are used as additional information for guidance (Scores will NOT be counted)')).toBeInTheDocument();
        expect(screen.getByText('11. Successful derivatives and structure notes investment has high return. On the other hand, investors can lose all of their investment and must increase more capital. Are you able to accept this?')).toBeInTheDocument();
        expect(screen.getByText('12. In addition to investment risk, are you able to accept foreign exchange rate risk?')).toBeInTheDocument();
      });
  
      await act(async () => {
        fireEvent.click(screen.getByTestId("checkbox-11-1"));
        fireEvent.click(screen.getByTestId("checkbox-12-1"));
        fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      });
  
      const question1 = screen.getByTestId('radio-1-1') as HTMLInputElement;
      const question2 = screen.getByTestId('radio-2-1') as HTMLInputElement;
      const question3 = screen.getByTestId('radio-3-1') as HTMLInputElement;
      const question4 = screen.getByTestId('checkbox-4-1') as HTMLInputElement;
      const question5 = screen.getByTestId('radio-5-1') as HTMLInputElement;
      const question6 = screen.getByTestId('radio-6-1') as HTMLInputElement;
      const question7 = screen.getByTestId('radio-7-1') as HTMLInputElement;
      const question8 = screen.getByTestId('radio-8-1') as HTMLInputElement;
      const question9 = screen.getByTestId('radio-9-1') as HTMLInputElement;
      const question10 = screen.getByTestId('radio-10-1') as HTMLInputElement;
  
      expect(question1.checked).toBe(false);
      expect(question2.checked).toBe(false);
      expect(question3.checked).toBe(false);
      expect(question4.checked).toBe(false);
      expect(question5.checked).toBe(false);
      expect(question6.checked).toBe(false);
      expect(question7.checked).toBe(false);
      expect(question8.checked).toBe(false);
      expect(question9.checked).toBe(false);
      expect(question10.checked).toBe(false);
  
      await act(async () => {
        fireEvent.click(question1);
        fireEvent.click(question2);
        fireEvent.click(question3);
        fireEvent.click(question4);
        fireEvent.click(question5);
        fireEvent.click(question6);
        fireEvent.click(question7);
        fireEvent.click(question8);
        fireEvent.click(question9);
        fireEvent.click(question10);
      });
  
      await waitFor(async () => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        // expect(corporateState).toMatchObject(expectedFormData);
      });
    }, 40000);
  });