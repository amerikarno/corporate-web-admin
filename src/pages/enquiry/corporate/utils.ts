import { TAuthorizedPerson, TContact, TCorporateSubAddress, TIndividualShareholder, TJuristic } from "@/pages/createJob/changeCorporateAccount/constant/type";
import { TCorporateInfoSchema } from "@/pages/createJob/changeCorporateAccount/edit/constants/schemas";
import { TAttorney, TAuthorizePerson, TDirector, TJuristicsShareholders } from "@/pages/createJob/changeCorporateAccount/edit/constants/types";
import { findAddress } from "@/pages/createJob/changeCorporateAccount/edit/libs/utils";
import { TCorporateData } from "@/pages/todoList/corporateAccountOpening/constant/type";
import { TableColumn } from "react-data-table-component";
import { TAttorney as TAttorneyEdit } from "@/pages/createJob/constant/type";

export const mapDataToTCorporateInfo = (data: TCorporateData): TCorporateData => {
    let resRegisterCountry = findAddress(data, 701);
    let resPlaceofIncorporation = findAddress(data, 702);
    let resCorpRegisterCountry = data.CorporateCountry.find((item) => item.types === 601);
    let resCorpPrimaryCountry = data.CorporateCountry.find((item) => item.types === 602);
  
    const result: TCorporateData = {
      CorporateCode: data.CorporateCode,
      Info: {
        ...data.Info,
        dateOfIncorporation: data.Info.dateOfIncorporation.split("T")[0]
      },
      CorporateCountry: [
        {
          ...resCorpRegisterCountry,
          id: resCorpRegisterCountry?.id ?? '',
          createBy: resCorpRegisterCountry?.createBy || "",
          CreatedAt: resCorpRegisterCountry?.CreatedAt || "",
          DeletedAt: resCorpRegisterCountry?.DeletedAt || "",
          corporateCode: resCorpRegisterCountry?.corporateCode || 0,
          types: resCorpRegisterCountry?.types || 0,
          other: resCorpRegisterCountry?.other || ""
        },
        {
          ...resCorpPrimaryCountry,
          id: resCorpPrimaryCountry?.id ?? '',
          createBy: resCorpPrimaryCountry?.createBy || "",
          CreatedAt: resCorpPrimaryCountry?.CreatedAt || "",
          DeletedAt: resCorpPrimaryCountry?.DeletedAt || "",
          corporateCode: resCorpPrimaryCountry?.corporateCode || 0,
          types: resCorpPrimaryCountry?.types || 0,
          other: resCorpPrimaryCountry?.other || ""
        }
      ],
      CorporateAddress: [
        {
          address: [
            {
                ...resRegisterCountry?.address[0] as TCorporateSubAddress,
                id: resRegisterCountry?.address[0]?.id ?? '',
                addressNo: resRegisterCountry?.address[0]?.addressNo || "",
                tambon: resRegisterCountry?.address[0]?.tambon || "",
                amphoe: resRegisterCountry?.address[0]?.amphoe || "",
                province: resRegisterCountry?.address[0]?.province || "",
                postalCode: resRegisterCountry?.address[0]?.postalCode || "",
                country: resRegisterCountry?.address[0]?.country || "",
              }
          ],
          emailAddress: resRegisterCountry?.emailAddress || "",
          telephone: resRegisterCountry?.telephone || ""
        },
        {
            address: [
              {
                  ...resPlaceofIncorporation?.address[0] as TCorporateSubAddress,
                  id: resPlaceofIncorporation?.address[0]?.id ?? '',
                  addressNo: resPlaceofIncorporation?.address[0]?.addressNo || "",
                  tambon: resPlaceofIncorporation?.address[0]?.tambon || "",
                  amphoe: resPlaceofIncorporation?.address[0]?.amphoe || "",
                  province: resPlaceofIncorporation?.address[0]?.province || "",
                  postalCode: resPlaceofIncorporation?.address[0]?.postalCode || "",
                  country: resPlaceofIncorporation?.address[0]?.country || "",
                }
            ],
            emailAddress: resPlaceofIncorporation?.emailAddress || "",
            telephone: resPlaceofIncorporation?.telephone || ""
        }
      ],
      CorporateFinancials: data.CorporateFinancials,
      CorporateTypes: data.CorporateTypes,
      BusinessTypes: data.BusinessTypes,
      SourceOfIncomes: data.SourceOfIncomes,
      CountrySourceIncomes: data.CountrySourceIncomes,
      Contact: data.Contact,
      Directors: data.Directors,
      AuthorizedPersons: data.AuthorizedPersons,
      IndividualShareholders: data.IndividualShareholders,
      Juristics: data.Juristics,
      Banks: data.Banks,
      Documents: data.Documents,
      Attorneys: data.Attorneys,
      SuitTestResult: data.SuitTestResult
    };
    return result;
  };
  export const columnsListOfDirectors: TableColumn<TDirector>[] = [
    {
      name: "Title",
      selector: (row) => row.fullNames[0]?.title || "",
    },
    {
      name: "Firstname",
      selector: (row) => row.fullNames[0]?.firstName || "",
    },
    {
      name: "Lastname",
      selector: (row) => row.fullNames[0]?.lastName || "",
    },
    {
      name: "CitizenID",
      selector: (row) => row.citizenId || "",
    },
    {
      name: "PassportID",
      selector: (row) => row.passportId || "",
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality || "",
    }]
    import {TDirector as TFetchedDirector} from '@/pages/todoList/corporateAccountOpening/constant/type';
    export const transformDirectorsToExpectedType = (directors : TFetchedDirector[] | null): TDirector[] => {
        if (!directors) return [];
        
        return directors.map(director => {
          return {
            ...director,
            corporateCode: String(director.corporateCode),
          } 
        });
      };

      export const transformJuristicsToShareholders = (juristics: TJuristic[] | null): TJuristicsShareholders[] => {
        if (!juristics) return [];
        
        return juristics.map(juristic => {
          return {
            ...juristic,
            corporateCode: String(juristic.corporateCode), 
          } as TJuristicsShareholders; 
        });
      };

      export const transformAuthorizedPersons = (authorizedPersons: TAuthorizedPerson[] | null): TAuthorizePerson[] => {
        if (!authorizedPersons) return [];
        
        return authorizedPersons.map(person => {
          return {
            ...person,
            corporateCode: String(person.corporateCode), 
          } as TAuthorizePerson; 
        });
      };

      export const transformAttorneysToExpectedType = (attorneys:TAttorneyEdit [] | null): TAttorney[] => {
        if (!attorneys) return [];
        
        return attorneys.map(attorney => {
          return {
            ...attorney,
            corporateCode: String(attorney.corporateCode), 
          };
        });
      };

      export const columnsShareHolders: TableColumn<TIndividualShareholder>[] = [
        {
          name: "Title",
          selector: (row) => row.fullNames?.[0]?.title || "",
        },
        {
          name: "Firstname",
          selector: (row) => row.fullNames?.[0]?.firstName || "",
        },
        {
          name: "Lastname",
          selector: (row) => row.fullNames?.[0]?.lastName || "",
        },
        {
          name: "CitizenID",
          selector: (row) => row.citizenId || "",
        },
        {
          name: "PassportID",
          selector: (row) => row.passportId || "",
        },
        {
          name: "Nationality",
          selector: (row) => row.nationality || "",
        },
        {
          name: "Share Percentage",
          selector: (row) => row.sharePercentage?.toString() || "",
        }]
        export const columnsAuthorizePerson: TableColumn<TAuthorizePerson>[] = [
            {
              name: "Title",
              selector: (row: TAuthorizePerson) => row.fullNames[0].title || "",
            },
            {
              name: "Firstname",
              selector: (row: TAuthorizePerson) => row.fullNames[0].firstName || "",
            },
            {
              name: "Lastname",
              selector: (row: TAuthorizePerson) => row.fullNames[0].lastName || "",
            },
            {
              name: "CitizenID",
              selector: (row: TAuthorizePerson) => row.citizenId || "",
            },
            {
              name: "PassportID",
              selector: (row: TAuthorizePerson) => row.passportId || "",
            },
            {
              name: "Nationality",
              selector: (row: TAuthorizePerson) => row.nationality || "",
            }]
  export const columnsContactPerson: TableColumn<TContact>[] = [
    {
      name: "Title",
      selector: (row: TContact) => row.fullNames?.[0]?.title || "",
    },
    {
      name: "Firstname",
      selector: (row: TContact) => row.fullNames?.[0]?.firstName || "",
    },
    {
      name: "Lastname",
      selector: (row: TContact) => row.fullNames?.[0]?.lastName || "",
    },
    {
      name: "Position",
      selector: (row: TContact) => row.position || "",
    },
    {
      name: "Division",
      selector: (row: TContact) => row.division || "",
    },
    {
      name: "Email",
      selector: (row: TContact) => row.email || "",
    },
    {
      name: "Phone Number",
      selector: (row: TContact) => row.telephone || "",
    }
  ];

  export const columnsJuristicShareHolders: TableColumn<TJuristicsShareholders>[] = [
    {
      name: "Name",
      selector: (row) => row.juristicName || "",
    },
    {
      name: "RegistrationNo",
      selector: (row: TJuristicsShareholders) => row.registrationNo || "",
    },
    {
      name: "Registered Country",
      selector: (row: TJuristicsShareholders) => row.registeredCountry || "",
    },
    {
      name: "Share Percentage",
      selector: (row: TJuristicsShareholders) => row.sharePercentage || "",
    }]

    export const columnsAttorney: TableColumn<TAttorney>[] = [
        {
          name: "Title",
          selector: (row: TAttorney) => row.fullNames[0].title || "",
        },
        {
          name: "Firstname",
          selector: (row: TAttorney) => row.fullNames[0].firstName || "",
        },
        {
          name: "Lastname",
          selector: (row: TAttorney) => row.fullNames[0].lastName || "",
        },
        {
          name: "CitizenID",
          selector: (row: TAttorney) => row.citizenId || "",
        },
        {
          name: "PassportID",
          selector: (row: TAttorney) => row.passportId || "",
        },
        {
          name: "Nationality",
          selector: (row: TAttorney) => row.nationality || "",
        },
        {
          name: "Telephone",
          selector: (row: TAttorney) => row.telephone || "",
        },
        {
          name: "Email",
          selector: (row: TAttorney) => row.email || "",
        }]

export const mockedCorporateData : TCorporateData[] = [{
    "CorporateCode": 80000009,
    "Info": {
        "id": "fbc3283c-ca57-4421-887d-ecfac813eb20",
        "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
        "CreatedAt": "2024-08-21T06:46:29.634Z",
        "DeletedAt": null,
        "corporateCode": 80000009,
        "name": "Test Company",
        "registrationNo": "11200000",
        "taxId": "1234567890",
        "dateOfIncorporation": "2023-11-10T17:00:00Z"
    },
    "CorporateCountry": [
        {
            "id": "255ad789-6d4b-4ae1-ab81-2e18f5396570",
            "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
            "CreatedAt": "2024-08-21T06:46:29.637Z",
            "DeletedAt": null,
            "corporateCode": 80000009,
            "isThailand": true,
            "other": "",
            "types": 601
        },
        {
            "id": "a912283b-60f6-42dc-b3c8-8d74030553d5",
            "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
            "CreatedAt": "2024-08-21T06:46:29.637Z",
            "DeletedAt": null,
            "corporateCode": 80000009,
            "isThailand": true,
            "other": "",
            "types": 602
        },
        {
            "id": "c8cc9f03-962e-4d4a-8524-189844678a04",
            "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
            "CreatedAt": "2024-08-21T06:49:06.23Z",
            "DeletedAt": null,
            "corporateCode": 80000009,
            "isThailand": true,
            "other": "",
            "types": 603
        }
    ],
    "CorporateAddress": [
        {
            "address": [
                {
                    "id": "d6f3a8fa-f7d9-42d5-9a85-85a48b5e297a",
                    "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
                    "CreatedAt": "2024-08-21T06:46:29.642Z",
                    "DeletedAt": null,
                    "corporateCode": 80000009,
                    "addressNo": "123",
                    "mooNo": "-",
                    "building": "Tisco Tower",
                    "floor": "16",
                    "soi": "4",
                    "road": "North Sathorn",
                    "tambon": "Silom",
                    "amphoe": "Bangrak",
                    "province": "Bangkok",
                    "postalCode": "10500",
                    "country": "Thailand",
                    "types": 701
                }
            ],
            "emailAddress": "sansanee_bae@hotmail.com",
            "telephone": "0896789092"
        },
        {
            "address": [
                {
                    "id": "f0d2f314-e3fb-4df0-b182-1bbf0e9bde06",
                    "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
                    "CreatedAt": "2024-08-21T06:46:29.644Z",
                    "DeletedAt": null,
                    "corporateCode": 80000009,
                    "addressNo": "1234",
                    "building": "Tisco Tower1",
                    "floor": "16+1",
                    "soi": "4+1",
                    "road": "North Sathorn1",
                    "tambon": "Silom1",
                    "amphoe": "Bangrak1",
                    "province": "Bangkok1",
                    "postalCode": "10501",
                    "country": "Thailand",
                    "mooNo": "mooNo", // Add this property
                    "types": 702
                  }
            ],
            "emailAddress": "sansanee_bae@hotmail.com",
            "telephone": "0896789092"
        }
    ],
    "CorporateFinancials": {
        "id": "e61cdd53-5325-4b0f-aa58-6fbc051a72c2",
        "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
        "CreatedAt": "2024-08-21T06:46:29.639Z",
        "DeletedAt": null,
        "corporateCode": 80000009,
        "registeredCapital": 10000000,
        "revenuePerYear": 3600000,
        "netProfitLoss": 1200000,
        "shareholderEquity": 11200000
    },
    "CorporateTypes": {
        "id": "68ff8715-67e4-47e6-abe0-2565b51bcf28",
        "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
        "CreatedAt": "2024-08-21T06:49:06.219Z",
        "DeletedAt": null,
        "corporateCode": 80000009,
        "isJuristicThailand": true,
        "isTaxExempt": true,
        "isNonTaxExempt": false,
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
        "id": "ca94d4eb-19a6-40dc-9ee9-5be5f5d8f23e",
        "CreatedAt": "2024-08-21T06:49:06.222Z",
        "DeletedAt": null,
        "corporateCode": 80000009,
        "isAntiqueTrading": false,
        "isHotelRestaurant": false,
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
        "isOtherBusiness": true,
        "otherBusinessType": "Retails Store"
    },
    "SourceOfIncomes": {
        "id": "221807c9-8d7b-4519-9cc1-2abd91cedb38",
        "CreatedAt": "2024-08-21T06:49:06.225Z",
        "DeletedAt": null,
        "corporateCode": 80000009,
        "isRevenue": true,
        "isStock": false,
        "isDonation": false,
        "isLoan": false,
        "isRevenueSelling": false,
        "isOtherIncome": true,
        "otherIncome": "Interest Rate"
    },
    "CountrySourceIncomes": [
        {
            "CreatedAt": "0001-01-01T00:00:00Z",
            "DeletedAt": null,
            "corporateCountry": {
                "id": "c8cc9f03-962e-4d4a-8524-189844678a04",
                "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
                "CreatedAt": "2024-08-21T06:49:06.23Z",
                "DeletedAt": null,
                "corporateCode": 80000009,
                "isThailand": true,
                "other": "",
                "types": 603
            },
            "otherCountry": "",
            "investmentObject": "",
            "isliquidation": false,
            "isLiquidation": true,
            "isInvestment": false,
            "isCashManagement": false,
            "isOtherInvestment": false,
            "otherInvestment": ""
        }
    ],
    "Contact": [
        {
            "id": "2ea613bb-337e-4138-81e0-f897ce69eb7e",
            "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
            "CreatedAt": "2024-08-21T06:50:57.157Z",
            "DeletedAt": null,
            "corporateCode": 80000009,
            "fullNames": [
                {
                    "id": "7146f867-0f17-4b1d-a5b4-f98be0666dc6",
                    "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
                    "CreatedAt": "2024-08-21T06:50:57.16Z",
                    "DeletedAt": null,
                    "contactID": "c4ab91bf-b2cc-4c14-887b-c90cfe907aad",
                    "title": "Mr.",
                    "firstName": "Test Contract",
                    "lastName": "Person",
                    "types": 401
                }
            ],
            "personalId": "c4ab91bf-b2cc-4c14-887b-c90cfe907aad",
            "position": "Committee",
            "division": "Management",
            "telephone": "081123456789",
            "email": "Nook_Nook@hotmail.com",
            "types": 401
        },
        {
            "id": "7feb13c2-fa15-41b2-a4ad-0263d7f145a1",
            "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
            "CreatedAt": "2024-08-21T06:52:19.636Z",
            "DeletedAt": null,
            "corporateCode": 80000009,
            "fullNames": [
                {
                    "id": "7c204aa3-e35a-4142-b106-5ec5bd725665",
                    "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
                    "CreatedAt": "2024-08-21T06:52:19.638Z",
                    "DeletedAt": null,
                    "contactID": "3e55c24d-921f-4698-ae66-15a2798551b0",
                    "title": "Miss",
                    "firstName": "Test Contact2",
                    "lastName": "Person2",
                    "types": 401
                }
            ],
            "personalId": "3e55c24d-921f-4698-ae66-15a2798551b0",
            "position": "Committee2",
            "division": "Management2",
            "telephone": "082123456789",
            "email": "Nook_2@hotmail.com",
            "types": 401
        }
    ],
    "Directors": [
{
  "id": "37398905-30ff-46a1-998d-58086abae550",
  "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
  "CreatedAt": "2024-08-21T07:52:23.503Z",
  "DeletedAt": null,
  "personalId": "c1547bed-8430-4ce6-b79d-a137a7d9a5ba",
  "corporateCode": 80000009,
  "fullNames": [
    {
      "id": "a90589a6-3b12-4998-9d0c-7eb9bde806f4",
      "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
      "CreatedAt": "2024-08-21T07:52:23.509Z",
      "DeletedAt": null,
      "ReferenceID": "c1547bed-8430-4ce6-b79d-a137a7d9a5ba",
      "title": "Mr.",
      "firstName": "Test Contact",
      "lastName": "Person",
      "types": 101
    }
  ],
  "addresses": [
    {
      "id": "c378789f-dd25-4687-9d9d-6ae1b953c7cc",
      "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
      "CreatedAt": "2024-08-21T07:52:23.506Z",
      "DeletedAt": null,
      "ReferenceID": "c1547bed-8430-4ce6-b79d-a137a7d9a5ba",
      "addressNo": "123",
      "mooNo": "-",
      "building": "Tisco Tower",
      "floor": "16",
      "soi": "4",
      "road": "North Sathorn",
      "tambon": "Siom",
      "amphoe": "Bangrak",
      "province": "Bangkok",
      "postalCode": "10500",
      "country": "Thailand",
      "types": 101
    }
  ],
  "citizenId": "3596428240378",
  "passportId": "123456789", 
  "expiryDate": "2025-12-19T17:00:00Z",
  "nationality": "Thai",
  "types": 101
},
        {
            "id": "e1721ec1-82bb-4aa9-bed6-0f834dcf77f8",
            "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
            "CreatedAt": "2024-08-21T08:03:57.539Z",
            "DeletedAt": null,
            "personalId": "585c3e4e-d1f5-494b-a0df-b60b3c331fa1",
            "corporateCode": 80000009,
            "fullNames": [
                {
                    "id": "e7eee781-84be-4f07-a448-dabd58f2d5cc",
                    "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
                    "CreatedAt": "2024-08-21T08:03:57.544Z",
                    "DeletedAt": null,
                    "ReferenceID": "585c3e4e-d1f5-494b-a0df-b60b3c331fa1",
                    "title": "Miss",
                    "firstName": "Test",
                    "lastName": "Director1",
                    "types": 101
                }
            ],
            "addresses": [
                {
                    "id": "90202453-4358-43fc-a3a8-e5065418c721",
                    "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
                    "CreatedAt": "2024-08-21T08:03:57.542Z",
                    "DeletedAt": null,
                    "ReferenceID": "585c3e4e-d1f5-494b-a0df-b60b3c331fa1",
                    "addressNo": "565",
                    "mooNo": "*",
                    "building": "Tisco Tower2",
                    "floor": "16+1",
                    "soi": "4+1",
                    "road": "Silom1",
                    "tambon": "Silom",
                    "amphoe": "Bangrak",
                    "province": "bangkok1",
                    "postalCode": "10501",
                    "country": "Thailand",
                    "types": 101
                }
            ],
            "citizenId": "1710892138523",
            "passportId": "123456789", 
            "expiryDate": "2025-11-10T17:00:00Z",
            "nationality": "Thai",
            "types": 101
        }
    ],
    "AuthorizedPersons": [
        {
            "id": "b8729929-d07d-49d3-b064-e35cbf813286",
            "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            "CreatedAt": "2024-08-26T09:15:29.436Z",
            "DeletedAt": null,
            "personalId": "6a71bb84-2b25-4a7c-a8e4-cb91bafe8183",
            "corporateCode": 80000014,
            "fullNames": [
                {
                    "id": "07f5a3d3-1937-4ca7-ac79-a3069d58b909",
                    "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    "CreatedAt": "2024-08-26T09:15:29.442Z",
                    "DeletedAt": null,
                    "ReferenceID": "6a71bb84-2b25-4a7c-a8e4-cb91bafe8183",
                    "title": "aa",
                    "firstName": "a",
                    "lastName": "s",
                    "types": 201
                }
            ],
            "addresses": [
                {
                    "id": "6eaa81a5-fd62-4f6e-b5fd-12bdcd8b782e",
                    "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    "CreatedAt": "2024-08-26T09:15:29.439Z",
                    "DeletedAt": null,
                    "ReferenceID": "6a71bb84-2b25-4a7c-a8e4-cb91bafe8183",
                    "addressNo": "2121",
                    "tambon": "3",
                    "amphoe": "44",
                    "province": "11",
                    "postalCode": "555",
                    "country": "45",
                    "types": 201
                }
            ],
            "citizenId": "1234567890121",
            "expiryDate": "2024-09-04T00:00:00Z",
            "nationality": "11",
            "types": 201
        }
    ],
    "IndividualShareholders": [
        {
            "id": "c18a2970-54e0-4bbf-bc33-bda2ca10d9b3",
            "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
            "CreatedAt": "2024-08-21T08:09:01.66Z",
            "DeletedAt": null,
            "personalId": "a5e62927-287b-42a0-93fb-b536f4f5b0a2",
            "corporateCode": 80000009,
            "fullNames": [
                {
                    "id": "c21ada9c-d7e6-47dc-a9c4-556f3db15d71",
                    "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
                    "CreatedAt": "2024-08-21T08:09:01.664Z",
                    "DeletedAt": null,
                    "ReferenceID": "a5e62927-287b-42a0-93fb-b536f4f5b0a2",
                    "title": "Mr.",
                    "firstName": "Test Shareholder",
                    "lastName": "Owner",
                    "types": 301
                }
            ],
            "citizenId": "4763769751236",
            "expiryDate": "2025-11-24T17:00:00Z",
            "nationality": "Thai",
            "types": 301,
            "sharePercentage": 99
        }
    ],
    "Attorneys": null,
    "Juristics": [
        {
            "id": "304404f1-dd0f-4666-9fbd-1e911d3cd073",
            "createBy": "10591b95-af75-41fe-97d2-bd716f8ae232",
            "CreatedAt": "2024-08-21T08:12:16.355Z",
            "DeletedAt": null,
            "corporateCode": 80000009,
            "juristicName": "Nook Company",
            "registrationNo": "1234567852145",
            "registeredCountry": "Thailand",
            "sharePercentage": 50
        }
    ],
    "Banks": [],
    "Documents": [],
    "SuitTestResult": null
}]