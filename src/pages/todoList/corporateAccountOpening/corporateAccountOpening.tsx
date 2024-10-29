import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { TCorporateData } from "./constant/type";
import { FaBackward, FaForward } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TableColumn } from "react-data-table-component";
import ForEverAlert from "@/components/alert/ForEverAlert";

export type TApproveResponse = {
  username:string;
  password:string;
  corporateCode:string;
  name:string;
}
type CustomPaginationProps = {
  rowsPerPage: number;
  rowCount: number;
  onChangePage: (page: number, totalRows: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

}

const mockData: TCorporateData[] = [
  {
    "registerId": "5ce7a417-fc23-4108-a8a6-76e4512161c5",
    "status":0,
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
  }]

const CustomLoader = () => (
  <div className="flex justify-center items-center p-4">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="ml-4 text-[#082c14]">Loading...</span>
  </div>
);

const customStyles = {
  rows: {
    style: {
      minHeight: '60px', 
    },
  },
}

export default function TodoCorporateAccountOpenning() {

  const [total,setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ fetchData , setFetchData] = useState<TCorporateData[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const handleClose = () => {
    setAlertVisible(false);
  };

  const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, currentPage, setCurrentPage }: CustomPaginationProps) => {
    const handleNextPage = () => {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onChangePage(nextPage, rowCount);
      setLoading(true);
      fetchQueryPending(nextPage).then(() => {
        setLoading(false);
      });
    };
  
    const handlePreviousPage = () => {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      onChangePage(prevPage, rowCount);
      setLoading(true);
      fetchQueryPending(prevPage).then(() => {
        setLoading(false);
      });
    };
  
    return (
      <div className="m-4 mt-8 flex justify-center items-center space-x-8">
        <Button onClick={handlePreviousPage} data-testid="prevBtn" disabled={currentPage === 1}>
        <FaBackward />
        </Button>
        <span>{`Page ${currentPage} of ${Math.ceil(rowCount / rowsPerPage)}`}</span>
        <Button onClick={handleNextPage} data-testid="nextBtn" disabled={currentPage === Math.ceil(rowCount / rowsPerPage)}>
        <FaForward />
        </Button>
      </div>
    );
  };

  const fetchQueryPending = async (page:number) => {
    fetchTotalRow();
    console.log({page:page})
    try{
      const res = await axios.post('/api/v1/corporate/query/pending',{page:page},{
        headers: {
          Authorization: `Bearer ${getCookies()}`
        }
      })
      if(res.status === 200){
        console.log("Query for Pending User success",res)
        setFetchData(res.data);
      }else{
        console.log("Query for Pending User fail ",res)
      }
    }catch(error){
      console.log("Query for Pending User failed", error)
    }
  }

  const fetchTotalRow = async () => {
    try {
      const res = await axios.post("/api/v1/corporate/total/pending",{}, {
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        },
      });
      if (res.status === 200) {
        console.log("fetch total row success", res);
        setTotal(res.data.total);
      } else {
        console.log("fetch total row not success", res);
      }
    } catch (error) {
      console.log("fetch total row error", error);
    }
  };

  const handleApproveClick = async (row: TCorporateData) => {
    let body = {
      registerId : row.registerId,
      status : 1
    }
    console.log(body);
    try {
      const res = await axios.post('/api/v1/user/corporate/approve',body,{
        headers: {
          Authorization: `Bearer ${getCookies()}`
        }
      })

      if(res.status === 200){
        console.log("Approve User success",res)
        fetchQueryPending(currentPage);
        setAlertVisible(true);

      }else{
        console.log("Approve User fail ",res)
      }
    }catch(error){
      console.log("Approve User failed", error)
    }
  }
  
  const handleRejectClick = async (row: TCorporateData) => {
    let body = {
      registerId : row.registerId,
      status : -1
    }
    console.log(body);
    try {
      const res = await axios.post('/api/v1/user/corporate/approve',body,{
        headers: {
          Authorization: `Bearer ${getCookies()}`
        }
      })

      if(res.status === 200){
        console.log("Reject User success",res)
        fetchQueryPending(currentPage);
      }else{
        console.log("Reject User fail ",res)
      }
    }catch(error){
      console.log("Reject User failed", error)
    }
  }

  const columnsCorporateInfo: TableColumn<TCorporateData>[] = [
    {
      name: "Register ID",
      selector: (row: TCorporateData) => row.registerId || "",
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      name: "Juristic Name",
      selector: (row: TCorporateData) => row.Info.name || "",
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      name: "TAX ID",
      selector: (row: TCorporateData) => row.Info.taxId || "",
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      name: "Status",
      selector: (row: TCorporateData) => {
        if (row.status === -1) {
          return "Rejected";
        } else if (row.status === 0) {
          return "Pending";
        } else if (row.status === 1) {
          return "Approved";
        }
        return "Unknown";
      },
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      cell: (row: TCorporateData) => (
        row.status === 0 ? (
          <div className="flex space-x-20">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-[#002f18] hover:bg-[#5cc95c] hover:font-bold max-w-[85px] transition-all text-white">Approve</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure? Approve</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span>{`Register ID : ${row.registerId}`}</span><br/>
                    <span>{`Juristic Name : ${row.Info.name}`}</span><br/>
                    <span>{`TAX ID : ${row.Info.taxId}`}</span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleApproveClick(row)}>Approve</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-[#002f18] hover:bg-[#ca4047] hover:font-bold hover:text-white w-[85px] transition-all text-white">Reject</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure? Reject</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span>{`Register ID : ${row.registerId}`}</span><br/>
                    <span>{`Juristic Name : ${row.Info.name}`}</span><br/>
                    <span>{`TAX ID : ${row.Info.taxId}`}</span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleRejectClick(row)}>Reject</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : null
      ),
      ignoreRowClick: true,
    },
  ];

  useEffect(() => {
    fetchTotalRow();
    setLoading(true);
    fetchQueryPending(currentPage).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4 space-y-10">
      {alertVisible && (
            <ForEverAlert
              type="inform"
              onClose={handleClose}
              data-testid="alertResponse"
              info={{
                name: "getter",
                corporateCode: "12345",
                username: "username",
                password: "password"
              }}
            />
          )}
      {/* <Card>
        <CardContent>
          <form
            className="grid grid-cols-2 gap-4 pt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SideLabelInput title="Juristic ID">
              <Input
                data-testid="juristicId"
                {...register("registerId")}
                onChange={handleDisableDate}
                disabled={disableCode}
                list="juristicId"
                autoComplete="off"
              />
              {errors && (
                <p className="text-red-500">{errors.registerId?.message}</p>
              )}
              <datalist id="juristicId">
                {mockedregisterIds.map((code, index) => (
                  <option key={index} value={code.registerId}>
                    {code.registerId}
                  </option>
                ))}
              </datalist>
            </SideLabelInput>
            <div className="col-start-1">
              <SideLabelInput title="Date From">
                <Input
                  data-testid="dateFrom"
                  type="date"
                  {...register("dateFrom")}
                  onChange={handleDisableCode}
                  disabled={disableDate}
                />
                {errors && (
                  <p className="w-full text-red-500 py-1">
                    {errors.dateFrom?.message}
                  </p>
                )}
              </SideLabelInput>
            </div>
            <SideLabelInput title="Date To">
              <Input
                data-testid="dateTo"
                type="date"
                {...register("dateTo")}
                onChange={handleDisableCode}
                disabled={disableDate}
              />
              {errors && (
                <p className="w-full py-1 text-red-500">
                  {errors.dateTo?.message}
                </p>
              )}
            </SideLabelInput>
            <div className="col-start-2 flex justify-end">
              <Button type="submit" data-testid="searchBtn">
                {isSubmitting ? "Search..." : "Search"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Corporates Account Opening</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <DataTable 
            columns={columnsCorporateInfo} 
            data={fetchData} 
            // data={mockData}
            paginationPerPage={20}
            progressComponent={<CustomLoader />}
            progressPending={loading}
            noDataComponent={
              <div className="">
                No Data Available
              </div>
            }
            customStyles={customStyles}
            pagination
            // paginationTotalRows={100}
            paginationTotalRows={total}
            paginationComponentOptions={{ noRowsPerPage: false }}
            paginationComponent={(props) => (
              <CustomPagination
                {...props}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
