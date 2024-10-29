import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { TAssetData } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from '@/api/axios';
import { getCookies } from '@/lib/Cookies';
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
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/Input';

type CustomPaginationProps = {
  rowsPerPage: number;
  rowCount: number;
  onChangePage: (page: number, totalRows: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

}

const customStyles = {
  rows: {
      style: {
          minHeight: '60px', 
        },
  },
  headCells: {
      style: {
      },
  },
  cells: {
      style: {
      },
  },
};

// const mockData: TAssetData[] = [
//   {
//       "registerId": "5ef8861b-0c10-4c60-a073-645376aae700",
//       "status": 0,
//       "asset": {
//           "id": "35bb1a3e-c15e-4d85-b84a-ec805f9ba435",
//           "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
//           "CreatedAt": "2024-10-22T14:15:42+07:00",
//           "DeletedAt": null,
//           "registerId": "5ef8861b-0c10-4c60-a073-645376aae700",
//           "title": "Digital Asset",
//           "logo": "getImages",
//           "issueBy": "Issue By Digital Asset",
//           "image": "image",
//           "name": "THGG",
//           "description": "Blockchain Innovations Global (B.I.G.)",
//           "category": "Healthcare",
//           "return": "18%",
//           "region": "Asia",
//           "minimum": "250.00 USD",
//       },
//       "info": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "5ef8861b-0c10-4c60-a073-645376aae700",
//           "totalIssuance": "1000.12 DA",
//           "totalAmountRaised": "50000.00 USD",
//           "contractInfomation": "0xC92Ff5e3A94...89e7e8a5b378b",
//           "minimumInvestmentAmount": "1000.00 USD",
//           "minimumInvestmentQuantity": "100.00 DA",
//           "issueUnitPrice": "100.00 USD"
//       },
//       "details": [],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [],
//       "keyInformation": null,
//       "issuanceTerms": null,
//       "companyMembers": []
//   },
//   {
//       "registerId": "a582ff4b-9ac6-4b44-9e9d-6be538d953b7",
//       "status": 0,
//       "asset": {
//           "id": "f0dc9f1a-1ea4-48ca-a60e-45d10ef27165",
//           "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//           "CreatedAt": "2024-10-22T13:32:46+07:00",
//           "DeletedAt": null,
//           "registerId": "a582ff4b-9ac6-4b44-9e9d-6be538d953b7",
//           "title": "Elite Consulting",
//           "logo": "fixed image",
//           "issueBy": "1",
//           "image": "",
//           "name": "1",
//           "description": "1",
//           "category": "1",
//           "return": "1",
//           "region": "1",
//           "minimum": "1",
//       },
//       "info": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "a582ff4b-9ac6-4b44-9e9d-6be538d953b7",
//           "totalIssuance": "1.00 DA",
//           "totalAmountRaised": "1.00 Baht",
//           "contractInfomation": "1",
//           "minimumInvestmentAmount": "1.00 Baht",
//           "minimumInvestmentQuantity": "1.00 DA",
//           "issueUnitPrice": "1.00 Baht"
//       },
//       "details": [
//           {
//               "id": "2c51dba7-92ea-460c-87b3-6716f291f8f7",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:32:53+07:00",
//               "DeletedAt": null,
//               "registerId": "a582ff4b-9ac6-4b44-9e9d-6be538d953b7",
//               "header": "Use of Proceeds",
//               "content": "1"
//           },
//           {
//               "id": "59794965-6420-46c6-bb2c-a6e1ddbec990",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:32:53+07:00",
//               "DeletedAt": null,
//               "registerId": "a582ff4b-9ac6-4b44-9e9d-6be538d953b7",
//               "header": "Business Model",
//               "content": "1"
//           },
//           {
//               "id": "9949c481-05be-4859-8b46-eb9ecc205a4f",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:32:53+07:00",
//               "DeletedAt": null,
//               "registerId": "a582ff4b-9ac6-4b44-9e9d-6be538d953b7",
//               "header": "Company Information",
//               "content": "1"
//           },
//           {
//               "id": "d046d374-1c2a-416d-a7fe-a542e9534789",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:32:53+07:00",
//               "DeletedAt": null,
//               "registerId": "a582ff4b-9ac6-4b44-9e9d-6be538d953b7",
//               "header": "Fundraising Milestone",
//               "content": "1"
//           }
//       ],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [
//           {
//               "id": "5cba5f2b-d338-4d51-a655-2b40c82eedf5",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:32:53+07:00",
//               "DeletedAt": null,
//               "registerId": "a582ff4b-9ac6-4b44-9e9d-6be538d953b7",
//               "question": "2",
//               "answer": "2"
//           }
//       ],
//       "keyInformation": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "a582ff4b-9ac6-4b44-9e9d-6be538d953b7",
//           "network": "BNB Smart Chain Mainnet",
//           "precision": "1",
//           "capitalStructure": "1",
//           "classiFication": "1",
//           "productType": "1",
//           "creationTime": "2024-10-26T00:00:00+07:00",
//           "releaseTime": "2024-10-25T00:00:00+07:00",
//           "compleationTime": "2024-10-24T00:00:00+07:00"
//       },
//       "issuanceTerms": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "a582ff4b-9ac6-4b44-9e9d-6be538d953b7",
//           "investmentPeriod": "213 Days",
//           "dividendYield": "213.00 %",
//           "grossMargin": "11.00 %",
//           "equityMultiple": "111.00 %",
//           "profit": "111.00 21321321",
//           "leverage": "213213.00 fdvf",
//           "investmentStructure": "1",
//           "distributionFrequency": "1"
//       },
//       "companyMembers": []
//   },
//   {
//       "registerId": "2b90e76e-012d-476f-819e-0c8ab80400d0",
//       "status": 0,
//       "asset": {
//           "id": "e9b67ad8-f1ae-4e1e-bd81-ab276399e626",
//           "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//           "CreatedAt": "2024-10-22T13:24:22+07:00",
//           "DeletedAt": null,
//           "registerId": "2b90e76e-012d-476f-819e-0c8ab80400d0",
//           "title": "Elite Consulting",
//           "logo": "fixed image",
//           "issueBy": "1",
//           "image": "",
//           "name": "1",
//           "description": "1",
//           "category": "1",
//           "return": "1",
//           "region": "1",
//           "minimum": "1",
//       },
//       "info": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "2b90e76e-012d-476f-819e-0c8ab80400d0",
//           "totalIssuance": "1.00 DA",
//           "totalAmountRaised": "1.00 1",
//           "contractInfomation": "1",
//           "minimumInvestmentAmount": "1.00 Baht",
//           "minimumInvestmentQuantity": "1.00 DA",
//           "issueUnitPrice": "1.00 Baht"
//       },
//       "details": [
//           {
//               "id": "3f00aaff-76a9-48e1-acdb-ab0a00209d5e",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:24:28+07:00",
//               "DeletedAt": null,
//               "registerId": "2b90e76e-012d-476f-819e-0c8ab80400d0",
//               "header": "Use of Proceeds",
//               "content": "1"
//           },
//           {
//               "id": "5fc5d747-bd19-4778-8266-049c0ecff977",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:24:28+07:00",
//               "DeletedAt": null,
//               "registerId": "2b90e76e-012d-476f-819e-0c8ab80400d0",
//               "header": "Fundraising Milestone",
//               "content": "1"
//           },
//           {
//               "id": "a8262d71-0650-440f-ba31-4acc6077e836",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:24:28+07:00",
//               "DeletedAt": null,
//               "registerId": "2b90e76e-012d-476f-819e-0c8ab80400d0",
//               "header": "Company Information",
//               "content": "1"
//           },
//           {
//               "id": "f4fa2f72-f8d2-401c-b7b2-86ef203783ff",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:24:28+07:00",
//               "DeletedAt": null,
//               "registerId": "2b90e76e-012d-476f-819e-0c8ab80400d0",
//               "header": "Business Model",
//               "content": ""
//           }
//       ],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [
//           {
//               "id": "f0b34910-706e-47e0-b912-77eefe4ad840",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:24:28+07:00",
//               "DeletedAt": null,
//               "registerId": "2b90e76e-012d-476f-819e-0c8ab80400d0",
//               "question": "11",
//               "answer": "1"
//           }
//       ],
//       "keyInformation": null,
//       "issuanceTerms": null,
//       "companyMembers": []
//   },
//   {
//       "registerId": "eb375ea4-5edd-4838-a4a2-113969228bab",
//       "status": 0,
//       "asset": {
//           "id": "997d2839-20c4-4b4c-81ad-fac699b128a9",
//           "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//           "CreatedAt": "2024-10-22T13:22:02+07:00",
//           "DeletedAt": null,
//           "registerId": "eb375ea4-5edd-4838-a4a2-113969228bab",
//           "title": "Elite Consulting",
//           "logo": "fixed image",
//           "issueBy": "1",
//           "image": "",
//           "name": "1",
//           "description": "1",
//           "category": "1",
//           "return": "1",
//           "region": "1",
//           "minimum": "1",
//       },
//       "info": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "eb375ea4-5edd-4838-a4a2-113969228bab",
//           "totalIssuance": "1.00 DA",
//           "totalAmountRaised": "1.00 Baht",
//           "contractInfomation": "1",
//           "minimumInvestmentAmount": "1.00 Baht",
//           "minimumInvestmentQuantity": "1.00 DA",
//           "issueUnitPrice": "1.00 Baht"
//       },
//       "details": [
//           {
//               "id": "2e96879c-2b69-45e5-a8d9-70536e56710c",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:22:07+07:00",
//               "DeletedAt": null,
//               "registerId": "eb375ea4-5edd-4838-a4a2-113969228bab",
//               "header": "Company Information",
//               "content": "1"
//           },
//           {
//               "id": "69e856d1-ff6b-440e-940f-2d899ac5193d",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:22:07+07:00",
//               "DeletedAt": null,
//               "registerId": "eb375ea4-5edd-4838-a4a2-113969228bab",
//               "header": "Fundraising Milestone",
//               "content": "1"
//           },
//           {
//               "id": "744a65cc-9c02-49f8-8826-6988b6b39e75",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:22:07+07:00",
//               "DeletedAt": null,
//               "registerId": "eb375ea4-5edd-4838-a4a2-113969228bab",
//               "header": "Use of Proceeds",
//               "content": "1"
//           },
//           {
//               "id": "e3396c60-45ed-459c-8071-3507c723d86f",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:22:07+07:00",
//               "DeletedAt": null,
//               "registerId": "eb375ea4-5edd-4838-a4a2-113969228bab",
//               "header": "Business Model",
//               "content": "1"
//           }
//       ],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [
//           {
//               "id": "c628454f-e55f-4e6c-95cc-17640e5d80b7",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:22:07+07:00",
//               "DeletedAt": null,
//               "registerId": "eb375ea4-5edd-4838-a4a2-113969228bab",
//               "question": "1",
//               "answer": "1"
//           }
//       ],
//       "keyInformation": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "eb375ea4-5edd-4838-a4a2-113969228bab",
//           "network": "BNB Smart Chain Mainnet",
//           "precision": "1",
//           "capitalStructure": "1",
//           "classiFication": "1",
//           "productType": "1",
//           "creationTime": "2024-10-16T00:00:00+07:00",
//           "releaseTime": "2024-10-30T00:00:00+07:00",
//           "compleationTime": "2024-11-02T00:00:00+07:00"
//       },
//       "issuanceTerms": null,
//       "companyMembers": []
//   },
//   {
//       "registerId": "cbf461a3-a1dc-45f3-8233-c4e0e3c1a3a6",
//       "status": 0,
//       "asset": {
//           "id": "60e2a397-e290-400f-8c9d-06b2199b1a53",
//           "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//           "CreatedAt": "2024-10-22T13:06:19+07:00",
//           "DeletedAt": null,
//           "registerId": "cbf461a3-a1dc-45f3-8233-c4e0e3c1a3a6",
//           "title": "Elite Consulting",
//           "logo": "fixed image",
//           "issueBy": "1",
//           "image": "",
//           "name": "1",
//           "description": "1",
//           "category": "1",
//           "return": "1",
//           "region": "1",
//           "minimum": "1",
//       },
//       "info": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "cbf461a3-a1dc-45f3-8233-c4e0e3c1a3a6",
//           "totalIssuance": "1.00 DA",
//           "totalAmountRaised": "1.00 Baht",
//           "contractInfomation": "1",
//           "minimumInvestmentAmount": "1.00 1",
//           "minimumInvestmentQuantity": "1.00 DA",
//           "issueUnitPrice": "1.00 Baht"
//       },
//       "details": [
//           {
//               "id": "0612e07f-bd0a-4876-8c5b-289923570ebf",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:06:26+07:00",
//               "DeletedAt": null,
//               "registerId": "cbf461a3-a1dc-45f3-8233-c4e0e3c1a3a6",
//               "header": "Use of Proceeds",
//               "content": "1"
//           },
//           {
//               "id": "3aec5852-eed8-49e1-8e77-be180ab9ed04",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:06:26+07:00",
//               "DeletedAt": null,
//               "registerId": "cbf461a3-a1dc-45f3-8233-c4e0e3c1a3a6",
//               "header": "Business Model",
//               "content": "1"
//           },
//           {
//               "id": "42a0fa75-f392-42ba-8f42-8f1a651fc5e6",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:06:26+07:00",
//               "DeletedAt": null,
//               "registerId": "cbf461a3-a1dc-45f3-8233-c4e0e3c1a3a6",
//               "header": "Fundraising Milestone",
//               "content": "1"
//           },
//           {
//               "id": "82416399-82ac-49be-8f0d-fd6f9f568550",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:06:26+07:00",
//               "DeletedAt": null,
//               "registerId": "cbf461a3-a1dc-45f3-8233-c4e0e3c1a3a6",
//               "header": "Company Information",
//               "content": "1"
//           }
//       ],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [
//           {
//               "id": "00ba34cf-c4ba-40b7-a50a-ad1b6a2791ce",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T13:06:26+07:00",
//               "DeletedAt": null,
//               "registerId": "cbf461a3-a1dc-45f3-8233-c4e0e3c1a3a6",
//               "question": "1",
//               "answer": "1"
//           }
//       ],
//       "keyInformation": null,
//       "issuanceTerms": null,
//       "companyMembers": []
//   },
//   {
//       "registerId": "652803f3-1b6a-4328-a2de-e69a2d729345",
//       "status": 0,
//       "asset": {
//           "id": "22783fed-8c29-4bd1-abf8-8f778f1fd711",
//           "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//           "CreatedAt": "2024-10-22T12:03:55+07:00",
//           "DeletedAt": null,
//           "registerId": "652803f3-1b6a-4328-a2de-e69a2d729345",
//           "title": "Elite Consulting",
//           "logo": "fixed image",
//           "issueBy": "1",
//           "image": "",
//           "name": "1",
//           "description": "1",
//           "category": "1",
//           "return": "1",
//           "region": "1",
//           "minimum": "1",
//       },
//       "info": null,
//       "details": [
//           {
//               "id": "33bbca92-c7c6-48c6-9ab9-435143e54080",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T12:03:47+07:00",
//               "DeletedAt": null,
//               "registerId": "652803f3-1b6a-4328-a2de-e69a2d729345",
//               "header": "Company Information",
//               "content": "2"
//           },
//           {
//               "id": "45a95df5-f46a-41c9-8910-315db207b4bb",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T12:03:47+07:00",
//               "DeletedAt": null,
//               "registerId": "652803f3-1b6a-4328-a2de-e69a2d729345",
//               "header": "Use of Proceeds",
//               "content": "2"
//           },
//           {
//               "id": "5baa117e-1cb3-4cb5-bb92-8b453b83af6a",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T12:03:47+07:00",
//               "DeletedAt": null,
//               "registerId": "652803f3-1b6a-4328-a2de-e69a2d729345",
//               "header": "Business Model",
//               "content": "2"
//           },
//           {
//               "id": "b60b0d6a-277f-44d7-97d1-c2d79244f82c",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T12:03:47+07:00",
//               "DeletedAt": null,
//               "registerId": "652803f3-1b6a-4328-a2de-e69a2d729345",
//               "header": "Fundraising Milestone",
//               "content": "2"
//           }
//       ],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [
//           {
//               "id": "3ef56d47-8db1-420a-a87e-8d3b394204d0",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T12:03:58+07:00",
//               "DeletedAt": null,
//               "registerId": "652803f3-1b6a-4328-a2de-e69a2d729345",
//               "question": "1",
//               "answer": "1"
//           },
//           {
//               "id": "8157b10b-ef70-40f0-8e2a-da9d0c54d06e",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T12:03:58+07:00",
//               "DeletedAt": null,
//               "registerId": "652803f3-1b6a-4328-a2de-e69a2d729345",
//               "question": "3",
//               "answer": "3"
//           }
//       ],
//       "keyInformation": null,
//       "issuanceTerms": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "652803f3-1b6a-4328-a2de-e69a2d729345",
//           "investmentPeriod": "1 Days",
//           "dividendYield": "1.00 %",
//           "grossMargin": "1.00 %",
//           "equityMultiple": "1.00 %",
//           "profit": "1.00 %",
//           "leverage": "1.00 %",
//           "investmentStructure": "1",
//           "distributionFrequency": "1"
//       },
//       "companyMembers": [
//           {
//               "id": "a7b5a131-8f49-44a5-bbee-21f6d4aa7507",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-22T12:05:11+07:00",
//               "DeletedAt": null,
//               "registerId": "652803f3-1b6a-4328-a2de-e69a2d729345",
//               "picture": "",
//               "firstName": "3",
//               "midName": "3",
//               "lastName": "3",
//               "position": "3",
//               "history": "3"
//           }
//       ]
//   },
//   {
//       "registerId": "02d76023-750f-4624-a362-f7aa5b965de1",
//       "status": 0,
//       "asset": {
//           "id": "18096cbe-f2b8-4be4-9075-76cdb1617643",
//           "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
//           "CreatedAt": "2024-10-22T09:52:58+07:00",
//           "DeletedAt": null,
//           "registerId": "02d76023-750f-4624-a362-f7aa5b965de1",
//           "title": "Digital Asset",
//           "logo": "getImages",
//           "issueBy": "Issue By Digital Asset",
//           "image": "image",
//           "name": "THGG",
//           "description": "Blockchain Innovations Global (B.I.G.)",
//           "category": "Healthcare",
//           "return": "18%",
//           "region": "Asia",
//           "minimum": "250.00 USD",
//       },
//       "info": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "02d76023-750f-4624-a362-f7aa5b965de1",
//           "totalIssuance": "1000.12 DA",
//           "totalAmountRaised": "50000.00 USD",
//           "contractInfomation": "0xC92Ff5e3A94...89e7e8a5b378b",
//           "minimumInvestmentAmount": "1000.00 USD",
//           "minimumInvestmentQuantity": "100.00 DA",
//           "issueUnitPrice": "100.00 USD"
//       },
//       "details": [],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [],
//       "keyInformation": null,
//       "issuanceTerms": null,
//       "companyMembers": []
//   },
//   {
//       "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//       "status": 0,
//       "asset": {
//           "id": "fb9a0fcc-f390-4c27-864a-123bfa5d4397",
//           "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//           "CreatedAt": "2024-10-18T10:31:14+07:00",
//           "DeletedAt": null,
//           "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//           "title": "Digital Asset",
//           "logo": "getImages",
//           "issueBy": "Issue By Digital Asset",
//           "image": "image",
//           "name": "THGG",
//           "description": "Blockchain Innovations Global (B.I.G.)",
//           "category": "Healthcare",
//           "return": "18%",
//           "region": "Asia",
//           "minimum": "250.00 USD",
//       },
//       "info": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//           "totalIssuance": "1000.12 DA",
//           "totalAmountRaised": "50000.00 USD",
//           "contractInfomation": "0xC92Ff5e3A94...89e7e8a5b378b",
//           "minimumInvestmentAmount": "1000.00 USD",
//           "minimumInvestmentQuantity": "100.00 DA",
//           "issueUnitPrice": "100.00 USD"
//       },
//       "details": [
//           {
//               "id": "3ae18370-f024-4ec9-aad7-70413b91854c",
//               "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//               "CreatedAt": "2024-10-18T10:32:45+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "header": "Fundraising Milestone",
//               "content": "consequat elit deserunt dolore sint veniam nulla labore minim exercitation Lorem reprehenderit ut Lorem nisi quis exercitation exercitation incididunt eu sit irure sint fugiat cupidatat id voluptate aliqua aute sint nisi dolor nulla nisi aliqua pariatur ex in velit culpa irure esse adipisicing aliquip fugiat dolore nulla commodo tempor magna occaecat duis sint excepteur cupidatat sit irure ex occaecat do laboris Lorem veniam fugiat cillum cillum reprehenderit excepteur incididunt anim do eu fugiat dolor enim ipsum quis id mollit non et velit elit cillum deserunt nulla nulla adipisicing qui nulla quis irure do laborum duis consectetur nostrud eiusmod officia nostrud"
//           },
//           {
//               "id": "5078a4e9-9fcd-407e-90d6-fda739e152f9",
//               "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
//               "CreatedAt": "2024-10-22T09:53:08+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "header": "Fundraising Milestone",
//               "content": "consequat elit deserunt dolore sint veniam nulla labore minim exercitation Lorem reprehenderit ut Lorem nisi quis exercitation exercitation incididunt eu sit irure sint fugiat cupidatat id voluptate aliqua aute sint nisi dolor nulla nisi aliqua pariatur ex in velit culpa irure esse adipisicing aliquip fugiat dolore nulla commodo tempor magna occaecat duis sint excepteur cupidatat sit irure ex occaecat do laboris Lorem veniam fugiat cillum cillum reprehenderit excepteur incididunt anim do eu fugiat dolor enim ipsum quis id mollit non et velit elit cillum deserunt nulla nulla adipisicing qui nulla quis irure do laborum duis consectetur nostrud eiusmod officia nostrud"
//           },
//           {
//               "id": "8a8c61a6-85ae-479c-aada-4e7062815962",
//               "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
//               "CreatedAt": "2024-10-22T09:53:08+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "header": "Business Model",
//               "content": "Lorem laborum dolore laborum laboris enim officia labore est ex duis sunt occaecat excepteur dolore est officia qui mollit excepteur fugiat dolore esse anim enim eiusmod nulla enim duis Lorem dolor ullamco ut mollit est dolore voluptate ex mollit aliquip nisi pariatur nisi sunt sit aute voluptate sit nostrud eu ut est dolor minim ea quis sit in sit reprehenderit tempor qui laboris sunt exercitation enim ad ipsum ad anim culpa incididunt labore duis aliqua tempor pariatur consequat cillum Lorem ut fugiat in cupidatat est aliqua do laborum eiusmod duis eu occaecat fugiat incididunt veniam velit ut id voluptate reprehenderit fugiat excepteur et pariatur labore aliqua deserunt tempor cillum nulla reprehenderit voluptate ad sunt labore sunt officia elit deserunt enim eiusmod amet adipisicing ad est do dolor velit eu nostrud nulla Lorem et labore est tempor occaecat Lorem nostrud veniam occaecat in aliquip occaecat enim velit quis reprehenderit sunt officia"
//           },
//           {
//               "id": "9e9694f2-376e-4b3f-b20c-e0b00a85e11c",
//               "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
//               "CreatedAt": "2024-10-22T09:53:08+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "header": "Company Information",
//               "content": "tempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur"
//           },
//           {
//               "id": "a32225e5-8fc0-4814-a595-b1b7e2762ed8",
//               "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
//               "CreatedAt": "2024-10-22T09:53:08+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "header": "Use of Proceeds",
//               "content": "aliqua nulla ullamco in mollit duis magna Lorem dolor dolor in laborum mollit enim et fugiat nostrud aliquip eiusmod ullamco laboris labore mollit aute excepteur laboris ullamco minim eiusmod Lorem pariatur non commodo magna elit ullamco labore ad ullamco dolor sit quis veniam ullamco duis laborum non dolor culpa qui Lorem enim ea officia sint aliquip in occaecat incididunt cupidatat incididunt officia enim deserunt Lorem cupidatat ut laboris ea eiusmod aute sunt aliquip excepteur incididunt fugiat fugiat sunt esse id eiusmod consequat esse nostrud deserunt incididunt sint consequat culpa officia consectetur dolore aute quis aliquip elit voluptate magna eu dolor occaecat quis magna ipsum pariatur occaecat ea consectetur esse reprehenderit adipisicing ea mollit labore non reprehenderit mollit occaecat nisi minim velit consequat ad ea culpa labore ea irure nostrud fugiat eu amet laborum veniam incididunt duis duis officia nostrud dolore commodo aliquip non fugiat eiusmod culpa in id sit ut"
//           },
//           {
//               "id": "b2b61ff0-ab0b-4f58-bd5f-dcc453cb00e0",
//               "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//               "CreatedAt": "2024-10-18T10:32:45+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "header": "Use of Proceeds",
//               "content": "aliqua nulla ullamco in mollit duis magna Lorem dolor dolor in laborum mollit enim et fugiat nostrud aliquip eiusmod ullamco laboris labore mollit aute excepteur laboris ullamco minim eiusmod Lorem pariatur non commodo magna elit ullamco labore ad ullamco dolor sit quis veniam ullamco duis laborum non dolor culpa qui Lorem enim ea officia sint aliquip in occaecat incididunt cupidatat incididunt officia enim deserunt Lorem cupidatat ut laboris ea eiusmod aute sunt aliquip excepteur incididunt fugiat fugiat sunt esse id eiusmod consequat esse nostrud deserunt incididunt sint consequat culpa officia consectetur dolore aute quis aliquip elit voluptate magna eu dolor occaecat quis magna ipsum pariatur occaecat ea consectetur esse reprehenderit adipisicing ea mollit labore non reprehenderit mollit occaecat nisi minim velit consequat ad ea culpa labore ea irure nostrud fugiat eu amet laborum veniam incididunt duis duis officia nostrud dolore commodo aliquip non fugiat eiusmod culpa in id sit ut"
//           },
//           {
//               "id": "f3fa8ccf-9dab-4fb7-bd63-4421d3e5aaf0",
//               "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//               "CreatedAt": "2024-10-18T10:32:45+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "header": "Business Model",
//               "content": "Lorem laborum dolore laborum laboris enim officia labore est ex duis sunt occaecat excepteur dolore est officia qui mollit excepteur fugiat dolore esse anim enim eiusmod nulla enim duis Lorem dolor ullamco ut mollit est dolore voluptate ex mollit aliquip nisi pariatur nisi sunt sit aute voluptate sit nostrud eu ut est dolor minim ea quis sit in sit reprehenderit tempor qui laboris sunt exercitation enim ad ipsum ad anim culpa incididunt labore duis aliqua tempor pariatur consequat cillum Lorem ut fugiat in cupidatat est aliqua do laborum eiusmod duis eu occaecat fugiat incididunt veniam velit ut id voluptate reprehenderit fugiat excepteur et pariatur labore aliqua deserunt tempor cillum nulla reprehenderit voluptate ad sunt labore sunt officia elit deserunt enim eiusmod amet adipisicing ad est do dolor velit eu nostrud nulla Lorem et labore est tempor occaecat Lorem nostrud veniam occaecat in aliquip occaecat enim velit quis reprehenderit sunt officia"
//           },
//           {
//               "id": "f496a686-af11-4cf4-9ceb-c7b7a246ec78",
//               "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//               "CreatedAt": "2024-10-18T10:32:45+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "header": "Company Information",
//               "content": "tempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur"
//           }
//       ],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [
//           {
//               "id": "067e1dcb-8333-4005-96b4-d6d1d04621d3",
//               "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
//               "CreatedAt": "2024-10-22T09:53:08+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "question": "What is the minimum investment?",
//               "answer": "The minimum investment is $1000."
//           },
//           {
//               "id": "65166e11-b56d-4420-82ea-a57b823e2809",
//               "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//               "CreatedAt": "2024-10-18T10:32:45+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "question": "What is the minimum investment?",
//               "answer": "The minimum investment is $1000."
//           },
//           {
//               "id": "a18e5a03-d3bc-4632-a671-a3fb2a3ab86d",
//               "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
//               "CreatedAt": "2024-10-22T09:53:08+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "question": "How long is the investment period?",
//               "answer": "The investment period is 5 years."
//           },
//           {
//               "id": "bd77efe9-5e92-4eda-a58b-4f845748899e",
//               "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
//               "CreatedAt": "2024-10-22T09:53:08+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "question": "What is the expected return?",
//               "answer": "The expected return is 10% annually."
//           },
//           {
//               "id": "cbaebc56-2242-46e0-8fab-cf82a8ddbeb0",
//               "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//               "CreatedAt": "2024-10-18T10:32:45+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "question": "What is the expected return?",
//               "answer": "The expected return is 10% annually."
//           }
//       ],
//       "keyInformation": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//           "network": "BNB Smart Chain Mainnet",
//           "precision": "5",
//           "capitalStructure": "Independent Fund",
//           "classiFication": "Retail Investor",
//           "productType": "Others",
//           "creationTime": "2023-01-01T00:00:00+07:00",
//           "releaseTime": "2023-02-01T00:00:00+07:00",
//           "compleationTime": "2023-03-01T00:00:00+07:00"
//       },
//       "issuanceTerms": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//           "investmentPeriod": "120 Days",
//           "dividendYield": "5.00 %",
//           "grossMargin": "20.00 %",
//           "equityMultiple": "5.00 %",
//           "profit": "15.00 %",
//           "leverage": "20.00 %",
//           "investmentStructure": "/",
//           "distributionFrequency": "Quarterly"
//       },
//       "companyMembers": [
//           {
//               "id": "66fcc9ff-970b-41ac-993f-84e3a79e8cba",
//               "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//               "CreatedAt": "2024-10-18T10:46:59+07:00",
//               "DeletedAt": null,
//               "registerId": "c61f5f1b-d04d-4bf1-b7ca-9924c9261397",
//               "picture": "img.png",
//               "firstName": "John",
//               "midName": "A",
//               "lastName": "Doe",
//               "position": "CEO",
//               "history": "John has over 20 years of experience in the industry."
//           }
//       ]
//   },
//   {
//       "registerId": "124d1348-46c8-4ccd-84c4-6fa1f50e9d53",
//       "status": 0,
//       "asset": {
//           "id": "2bd82199-1748-4b16-8021-a546f7f49ccf",
//           "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//           "CreatedAt": "2024-10-18T10:29:26+07:00",
//           "DeletedAt": null,
//           "registerId": "124d1348-46c8-4ccd-84c4-6fa1f50e9d53",
//           "title": "Digital Asset",
//           "logo": "getImages",
//           "issueBy": "Issue By Digital Asset",
//           "image": "image",
//           "name": "THGG",
//           "description": "Blockchain Innovations Global (B.I.G.)",
//           "category": "Healthcare",
//           "return": "18%",
//           "region": "Asia",
//           "minimum": "250.00 USD",
//       },
//       "info": null,
//       "details": [],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [],
//       "keyInformation": null,
//       "issuanceTerms": null,
//       "companyMembers": []
//   },
//   {
//       "registerId": "42",
//       "status": 0,
//       "asset": {
//           "id": "228c0a50-aaa4-41f0-82da-ccb6ad61bb00",
//           "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//           "CreatedAt": "2024-10-09T16:13:40+07:00",
//           "DeletedAt": null,
//           "registerId": "42",
//           "title": "Elite Consulting",
//           "logo": "fixed image",
//           "issueBy": "Emma",
//           "image": "",
//           "name": "TestIncomming",
//           "description": "Blockchain Innovations Global (B.I.G.)",
//           "category": "Commodity",
//           "return": "10%",
//           "region": "Global",
//           "minimum": "100.00 USD",
//       },
//       "info": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "42",
//           "totalIssuance": "1.00 DA",
//           "totalAmountRaised": "100.00 Baht",
//           "contractInfomation": "0x00000000000000000000",
//           "minimumInvestmentAmount": "1000.00 Baht",
//           "minimumInvestmentQuantity": "400.00 DA",
//           "issueUnitPrice": "0.00 "
//       },
//       "details": [
//           {
//               "id": "03fefd11-cbd3-4376-8354-e634262c4d19",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T16:14:40+07:00",
//               "DeletedAt": null,
//               "registerId": "42",
//               "header": "Business Model",
//               "content": "Lorem laborum dolore laborum laboris enim officia labore est ex duis sunt occaecat excepteur dolore est officia qui mollit excepteur fugiat dolore esse anim enim eiusmod nulla enim duis Lorem dolor ullamco ut mollit est dolore voluptate ex mollit aliquip nisi pariatur nisi sunt sit aute voluptate sit nostrud eu ut est dolor minim ea quis sit in sit reprehenderit tempor qui laboris sunt exercitation enim ad ipsum ad anim culpa incididunt labore duis aliqua tempor pariatur consequat cillum Lorem ut fugiat in cupidatat est aliqua do laborum eiusmod duis eu occaecat fugiat incididunt veniam velit ut id voluptate reprehenderit fugiat excepteur et pariatur labore aliqua deserunt tempor cillum nulla reprehenderit voluptate ad sunt labore sunt officia elit deserunt enim eiusmod amet adipisicing ad est do dolor velit eu nostrud nulla Lorem et labore est tempor occaecat Lorem nostrud veniam occaecat in aliquip occaecat enim velit quis reprehenderit sunt officia"
//           },
//           {
//               "id": "11f4dae7-5d7f-4e72-b62b-82f5e57108e2",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T16:14:40+07:00",
//               "DeletedAt": null,
//               "registerId": "42",
//               "header": "Company Information",
//               "content": "tempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur"
//           },
//           {
//               "id": "9be72d55-7023-4c7b-ae7a-0b8ec9c43c81",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T16:14:40+07:00",
//               "DeletedAt": null,
//               "registerId": "42",
//               "header": "Use of Proceeds",
//               "content": "aliqua nulla ullamco in mollit duis magna Lorem dolor dolor in laborum mollit enim et fugiat nostrud aliquip eiusmod ullamco laboris labore mollit aute excepteur laboris ullamco minim eiusmod Lorem pariatur non commodo magna elit ullamco labore ad ullamco dolor sit quis veniam ullamco duis laborum non dolor culpa qui Lorem enim ea officia sint aliquip in occaecat incididunt cupidatat incididunt officia enim deserunt Lorem cupidatat ut laboris ea eiusmod aute sunt aliquip excepteur incididunt fugiat fugiat sunt esse id eiusmod consequat esse nostrud deserunt incididunt sint consequat culpa officia consectetur dolore aute quis aliquip elit voluptate magna eu dolor occaecat quis magna ipsum pariatur occaecat ea consectetur esse reprehenderit adipisicing ea mollit labore non reprehenderit mollit occaecat nisi minim velit consequat ad ea culpa labore ea irure nostrud fugiat eu amet laborum veniam incididunt duis duis officia nostrud dolore commodo aliquip non fugiat eiusmod culpa in id sit ut"
//           },
//           {
//               "id": "d8a44b9c-76c3-4ae8-aa75-c0bdfbbdf3a7",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T16:14:40+07:00",
//               "DeletedAt": null,
//               "registerId": "42",
//               "header": "Fundraising Milestone",
//               "content": "consequat elit deserunt dolore sint veniam nulla labore minim exercitation Lorem reprehenderit ut Lorem nisi quis exercitation exercitation incididunt eu sit irure sint fugiat cupidatat id voluptate aliqua aute sint nisi dolor nulla nisi aliqua pariatur ex in velit culpa irure esse adipisicing aliquip fugiat dolore nulla commodo tempor magna occaecat duis sint excepteur cupidatat sit irure ex occaecat do laboris Lorem veniam fugiat cillum cillum reprehenderit excepteur incididunt anim do eu fugiat dolor enim ipsum quis id mollit non et velit elit cillum deserunt nulla nulla adipisicing qui nulla quis irure do laborum duis consectetur nostrud eiusmod officia nostrud"
//           }
//       ],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [
//           {
//               "id": "ac8e41ef-8e3c-4f8d-bf5f-b4f00f92f791",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T16:14:40+07:00",
//               "DeletedAt": null,
//               "registerId": "42",
//               "question": "",
//               "answer": ""
//           },
//           {
//               "id": "eac9ab4e-a6d4-4ff0-b980-ebbc09a7cf2b",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T16:14:40+07:00",
//               "DeletedAt": null,
//               "registerId": "42",
//               "question": "What is the minimum investment?",
//               "answer": "The minimum investment is $1000."
//           }
//       ],
//       "keyInformation": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "42",
//           "network": "BNB Smart Chain Mainnet",
//           "precision": "5",
//           "capitalStructure": "Independent Fund",
//           "classiFication": "Retail Investor",
//           "productType": "Others",
//           "creationTime": "2024-10-07T00:00:00+07:00",
//           "releaseTime": "2024-10-10T00:00:00+07:00",
//           "compleationTime": "2024-10-25T00:00:00+07:00"
//       },
//       "issuanceTerms": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "42",
//           "investmentPeriod": "120 Days",
//           "dividendYield": "2.00 %",
//           "grossMargin": "3.00 %",
//           "equityMultiple": "1.00 %",
//           "profit": "4.00 %",
//           "leverage": "5.00 %",
//           "investmentStructure": "aaaaaaaaaa",
//           "distributionFrequency": "Quarterly"
//       },
//       "companyMembers": [
//           {
//               "id": "db0a495b-15ad-4e8d-ba2a-6ac692f1a05d",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-16T16:52:55+07:00",
//               "DeletedAt": null,
//               "registerId": "42",
//               "picture": "",
//               "firstName": "12",
//               "midName": "2",
//               "lastName": "2",
//               "position": "2",
//               "history": "2"
//           }
//       ]
//   },
//   {
//       "registerId": "41",
//       "status": 0,
//       "asset": {
//           "id": "e9b4fc16-0155-473c-a095-cea567953220",
//           "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//           "CreatedAt": "2024-10-09T15:51:03+07:00",
//           "DeletedAt": null,
//           "registerId": "41",
//           "title": "Elite Consulting",
//           "logo": "fixed image",
//           "issueBy": "Emma",
//           "image": "",
//           "name": "TestActive2",
//           "description": "Blockchain Innovations Global (B.I.G.)",
//           "category": "Commodity",
//           "return": "10%",
//           "region": "Global",
//           "minimum": "100.00 USD",
//       },
//       "info": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "41",
//           "totalIssuance": "1000.00 DA",
//           "totalAmountRaised": "50000.00 Baht",
//           "contractInfomation": "0x00000000000000000000",
//           "minimumInvestmentAmount": "1000.00 Baht",
//           "minimumInvestmentQuantity": "100.00 DA",
//           "issueUnitPrice": "5.00 Baht"
//       },
//       "details": [
//           {
//               "id": "8f3ea8f1-5566-4d38-b6c7-f55b252d102f",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:52:01+07:00",
//               "DeletedAt": null,
//               "registerId": "41",
//               "header": "Fundraising Milestone",
//               "content": "consequat elit deserunt dolore sint veniam nulla labore minim exercitation Lorem reprehenderit ut Lorem nisi quis exercitation exercitation incididunt eu sit irure sint fugiat cupidatat id voluptate aliqua aute sint nisi dolor nulla nisi aliqua pariatur ex in velit culpa irure esse adipisicing aliquip fugiat dolore nulla commodo tempor magna occaecat duis sint excepteur cupidatat sit irure ex occaecat do laboris Lorem veniam fugiat cillum cillum reprehenderit excepteur incididunt anim do eu fugiat dolor enim ipsum quis id mollit non et velit elit cillum deserunt nulla nulla adipisicing qui nulla quis irure do laborum duis consectetur nostrud eiusmod officia nostrud"
//           },
//           {
//               "id": "9ccd6333-21ea-42e7-b53d-7e5b78d8b900",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:52:01+07:00",
//               "DeletedAt": null,
//               "registerId": "41",
//               "header": "Business Model",
//               "content": "Lorem laborum dolore laborum laboris enim officia labore est ex duis sunt occaecat excepteur dolore est officia qui mollit excepteur fugiat dolore esse anim enim eiusmod nulla enim duis Lorem dolor ullamco ut mollit est dolore voluptate ex mollit aliquip nisi pariatur nisi sunt sit aute voluptate sit nostrud eu ut est dolor minim ea quis sit in sit reprehenderit tempor qui laboris sunt exercitation enim ad ipsum ad anim culpa incididunt labore duis aliqua tempor pariatur consequat cillum Lorem ut fugiat in cupidatat est aliqua do laborum eiusmod duis eu occaecat fugiat incididunt veniam velit ut id voluptate reprehenderit fugiat excepteur et pariatur labore aliqua deserunt tempor cillum nulla reprehenderit voluptate ad sunt labore sunt officia elit deserunt enim eiusmod amet adipisicing ad est do dolor velit eu nostrud nulla Lorem et labore est tempor occaecat Lorem nostrud veniam occaecat in aliquip occaecat enim velit quis reprehenderit sunt officia"
//           },
//           {
//               "id": "efb650a3-ad66-4d2e-91b8-7200b278e4a3",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:52:01+07:00",
//               "DeletedAt": null,
//               "registerId": "41",
//               "header": "Company Information",
//               "content": "tempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur"
//           },
//           {
//               "id": "f77d8c8b-eaf7-4586-b09f-56634b407ef7",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:52:01+07:00",
//               "DeletedAt": null,
//               "registerId": "41",
//               "header": "Use of Proceeds",
//               "content": "aliqua nulla ullamco in mollit duis magna Lorem dolor dolor in laborum mollit enim et fugiat nostrud aliquip eiusmod ullamco laboris labore mollit aute excepteur laboris ullamco minim eiusmod Lorem pariatur non commodo magna elit ullamco labore ad ullamco dolor sit quis veniam ullamco duis laborum non dolor culpa qui Lorem enim ea officia sint aliquip in occaecat incididunt cupidatat incididunt officia enim deserunt Lorem cupidatat ut laboris ea eiusmod aute sunt aliquip excepteur incididunt fugiat fugiat sunt esse id eiusmod consequat esse nostrud deserunt incididunt sint consequat culpa officia consectetur dolore aute quis aliquip elit voluptate magna eu dolor occaecat quis magna ipsum pariatur occaecat ea consectetur esse reprehenderit adipisicing ea mollit labore non reprehenderit mollit occaecat nisi minim velit consequat ad ea culpa labore ea irure nostrud fugiat eu amet laborum veniam incididunt duis duis officia nostrud dolore commodo aliquip non fugiat eiusmod culpa in id sit ut"
//           }
//       ],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [
//           {
//               "id": "b44b4b18-5f45-466a-b6b1-26c3cfb8dbb5",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:52:01+07:00",
//               "DeletedAt": null,
//               "registerId": "41",
//               "question": "How long is the investment period?",
//               "answer": "The investment period is 5 years."
//           },
//           {
//               "id": "e2756356-4cff-423e-b874-7e75825312cc",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:52:01+07:00",
//               "DeletedAt": null,
//               "registerId": "41",
//               "question": "What is the minimum investment?",
//               "answer": "The minimum investment is $1000."
//           }
//       ],
//       "keyInformation": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "41",
//           "network": "BNB Smart Chain Mainnet",
//           "precision": "5",
//           "capitalStructure": "Independent Fund",
//           "classiFication": "Retail Investor",
//           "productType": "Others",
//           "creationTime": "2024-10-01T00:00:00+07:00",
//           "releaseTime": "2024-10-08T00:00:00+07:00",
//           "compleationTime": "2024-10-10T00:00:00+07:00"
//       },
//       "issuanceTerms": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "41",
//           "investmentPeriod": "120 Days",
//           "dividendYield": "5.00 %",
//           "grossMargin": "20.00 %",
//           "equityMultiple": "5.00 %",
//           "profit": "15.00 %",
//           "leverage": "20.00 %",
//           "investmentStructure": "/",
//           "distributionFrequency": "Quarterly"
//       },
//       "companyMembers": [
//           {
//               "id": "74d7aa68-6695-4e4c-ac9c-ff869d737909",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:53:41+07:00",
//               "DeletedAt": null,
//               "registerId": "41",
//               "picture": "",
//               "firstName": "John A Doe",
//               "midName": "John A Doe",
//               "lastName": "John A Doe",
//               "position": "John A Doe",
//               "history": "John has over 20 years of experience in the industry."
//           }
//       ]
//   },
//   {
//       "registerId": "39",
//       "status": 0,
//       "asset": {
//           "id": "a4f35e21-b41d-45c5-9b4b-68b6af87e4a0",
//           "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//           "CreatedAt": "2024-10-09T15:29:25+07:00",
//           "DeletedAt": null,
//           "registerId": "39",
//           "title": "Elite Consulting",
//           "logo": "fixed image",
//           "issueBy": "1",
//           "image": "",
//           "name": "TestIncomming",
//           "description": "1",
//           "category": "1",
//           "return": "1",
//           "region": "1",
//           "minimum": "1",
//       },
//       "info": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "39",
//           "totalIssuance": "1.00 DA",
//           "totalAmountRaised": "1.00 Baht",
//           "contractInfomation": "1",
//           "minimumInvestmentAmount": "1.00 Baht",
//           "minimumInvestmentQuantity": "1.00 DA",
//           "issueUnitPrice": "1.00 Baht"
//       },
//       "details": [
//           {
//               "id": "2ffa251b-981c-47db-8e68-90466d17305f",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:29:32+07:00",
//               "DeletedAt": null,
//               "registerId": "39",
//               "header": "Business Model",
//               "content": "1"
//           },
//           {
//               "id": "37d42f83-06a8-45f7-9e30-25aadaf22ea6",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:29:32+07:00",
//               "DeletedAt": null,
//               "registerId": "39",
//               "header": "Company Information",
//               "content": "1"
//           },
//           {
//               "id": "80707c9f-e2ff-4af7-8553-9abf5231cdc0",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:29:32+07:00",
//               "DeletedAt": null,
//               "registerId": "39",
//               "header": "Fundraising Milestone",
//               "content": "1"
//           },
//           {
//               "id": "e5ff0649-0377-4d0b-8280-6410e8b019ad",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:29:32+07:00",
//               "DeletedAt": null,
//               "registerId": "39",
//               "header": "Use of Proceeds",
//               "content": "1"
//           }
//       ],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [
//           {
//               "id": "b8f552ef-62ac-4141-bf08-493e844792fd",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:29:32+07:00",
//               "DeletedAt": null,
//               "registerId": "39",
//               "question": "1",
//               "answer": "1"
//           }
//       ],
//       "keyInformation": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "39",
//           "network": "BNB Smart Chain Mainnet",
//           "precision": "1",
//           "capitalStructure": "1",
//           "classiFication": "1",
//           "productType": "1",
//           "creationTime": "2024-10-01T00:00:00+07:00",
//           "releaseTime": "2024-10-31T00:00:00+07:00",
//           "compleationTime": "2024-11-27T00:00:00+07:00"
//       },
//       "issuanceTerms": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "39",
//           "investmentPeriod": "1 day",
//           "dividendYield": "1.00 %",
//           "grossMargin": "1.00 %",
//           "equityMultiple": "1.00 %",
//           "profit": "1.00 %",
//           "leverage": "1.00 %",
//           "investmentStructure": "1",
//           "distributionFrequency": "1"
//       },
//       "companyMembers": []
//   },
//   {
//       "registerId": "38",
//       "status": 0,
//       "asset": {
//           "id": "f3d899dd-6f83-4bde-af24-f805b41919bf",
//           "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//           "CreatedAt": "2024-10-09T15:16:31+07:00",
//           "DeletedAt": null,
//           "registerId": "38",
//           "title": "Elite Consulting",
//           "logo": "fixed image",
//           "issueBy": "1",
//           "image": "",
//           "name": "TestActive ",
//           "description": "1",
//           "category": "1",
//           "return": "1",
//           "region": "1",
//           "minimum": "1",
//       },
//       "info": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "38",
//           "totalIssuance": "1.00 DA",
//           "totalAmountRaised": "1.00 Baht",
//           "contractInfomation": "1",
//           "minimumInvestmentAmount": "1.00 Baht",
//           "minimumInvestmentQuantity": "1.00 DA",
//           "issueUnitPrice": "1.00 Baht"
//       },
//       "details": [
//           {
//               "id": "3844ede8-fc93-4783-b6f8-b87603b28358",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:16:38+07:00",
//               "DeletedAt": null,
//               "registerId": "38",
//               "header": "Company Information",
//               "content": "1"
//           },
//           {
//               "id": "8f01c2c5-f701-4760-b123-6718acc48939",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:16:38+07:00",
//               "DeletedAt": null,
//               "registerId": "38",
//               "header": "Business Model",
//               "content": "1"
//           },
//           {
//               "id": "c81879d8-7ab7-40e5-9095-d54979053e19",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:16:38+07:00",
//               "DeletedAt": null,
//               "registerId": "38",
//               "header": "Fundraising Milestone",
//               "content": "1"
//           },
//           {
//               "id": "f2185c35-b1b7-4299-a9f2-d629ddf9e8af",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:16:38+07:00",
//               "DeletedAt": null,
//               "registerId": "38",
//               "header": "Use of Proceeds",
//               "content": "1"
//           }
//       ],
//       "documents": null,
//       "images": null,
//       "videos": null,
//       "faq": [
//           {
//               "id": "0dca1cb8-b333-4eb2-adf8-f55461a6e9f5",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:16:38+07:00",
//               "DeletedAt": null,
//               "registerId": "38",
//               "question": "1",
//               "answer": "1"
//           }
//       ],
//       "keyInformation": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "38",
//           "network": "BNB Smart Chain Mainnet",
//           "precision": "1",
//           "capitalStructure": "1",
//           "classiFication": "1",
//           "productType": "1",
//           "creationTime": "2024-10-01T00:00:00+07:00",
//           "releaseTime": "2024-10-01T00:00:00+07:00",
//           "compleationTime": "2024-11-07T00:00:00+07:00"
//       },
//       "issuanceTerms": {
//           "CreatedAt": "0001-01-01T00:00:00Z",
//           "DeletedAt": null,
//           "registerId": "38",
//           "investmentPeriod": "1 Days",
//           "dividendYield": "1.00 %",
//           "grossMargin": "1.00 %",
//           "equityMultiple": "1.00 %",
//           "profit": "1.00 %",
//           "leverage": "1.00 %",
//           "investmentStructure": "1",
//           "distributionFrequency": "1"
//       },
//       "companyMembers": [
//           {
//               "id": "62790bc4-10e7-412d-9d34-340562512d5d",
//               "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//               "CreatedAt": "2024-10-09T15:17:21+07:00",
//               "DeletedAt": null,
//               "registerId": "38",
//               "picture": "",
//               "firstName": "1",
//               "midName": "1",
//               "lastName": "1",
//               "position": "1",
//               "history": "1"
//           }
//       ]
//   }
// ]

const CustomLoader = () => (
  <div className="flex justify-center items-center p-4">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="ml-4 text-[#082c14]">Loading...</span>
  </div>
);

const ToDoAddedIcoSearch = () => {

  const [total,setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchData, setFetchData] = useState<TAssetData[]>([]);
  const [icoCode , setIcoCode] = useState("");

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

  const fetchTotalRow = async () => {
    try {
      const res = await axios.post("/api/v1/ico/total/pending",{}, {
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

const fetchQueryPending = async (page:number) => {
  fetchTotalRow();
  console.log({page:page})
  try{
    const res = await axios.post('/api/v1/ico/query/pending',{page:page},{
      headers: {
        Authorization: `Bearer ${getCookies()}`
      }
    })
    if(res.status === 200){
      console.log("Query for Pending User success",res)
      setFetchData(res.data);
      // const registerIds = res.data.map((item: TAssetData) => ({
      //   registerId: item.registerId,
      // }));
      // setRegisterIdList(registerIds);
    }else{
      console.log("Query for Pending User fail ",res)
    }
  }catch(error){
    console.log("Query for Pending User failed", error)
  }
}

const handleApproveClick = async (row: TAssetData) => {
  let body = {
    registerId : row.registerId,
    icoCode : icoCode,
    status : 1
  }
  console.log(body);
  try {
    const res = await axios.post('/api/v1/ico/approve',body,{
      headers: {
        Authorization: `Bearer ${getCookies()}`
      }
    })

    if(res.status === 200){
      console.log("Approve User success",res)
      fetchQueryPending(currentPage);

    }else{
      console.log("Approve User fail ",res)
    }
  }catch(error){
    console.log("Approve User failed", error)
  }
}

const handleRejectClick = async (row: TAssetData) => {
  let body = {
    registerId : row.registerId,
    status : -1
  }
  console.log(body);
  try {
    const res = await axios.post('/api/v1/ico/approve',body,{
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

  const ColumnsIcoSearch: TableColumn<TAssetData>[] = [
    {
      name: "Register ID",
      selector: (row: TAssetData) => row.registerId || "",
      width: "120px",
      style: { maxWidth: "120px" },
    },
    {
      name: "Symbol",
      selector: (row: TAssetData) => row.asset.name || "",
      width: "150px",
      style: { maxWidth: "150px" },
    },
    {
      name: "Company Name",
      selector: (row: TAssetData) => row.asset.description || "",
      width: "300px",
      style: { maxWidth: "300px" },
    },
    {
      name: "Issued By",
      selector: (row: TAssetData) => row.asset.issueBy || "",
    },
    {
      name: "Status",
      selector: (row: TAssetData) => {
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
      cell: (row: TAssetData) => (
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
                    <input className="w-full p-4 bg-gray-100 outline-none placeholder:justify-center" placeholder="Please specify the ICO code..." id="icoCode" onChange={(e) => setIcoCode(e.target.value)}/>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={()=>setIcoCode("")}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleApproveClick(row).then(() => setIcoCode(""))}>Approve</AlertDialogAction>
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
                    <span>{`ICO Name : ${row.asset.name}`}</span><br/>
                    <span>{`Description : ${row.asset.description}`}</span><br/>
                    <span>{`Issued By : ${row.asset.issueBy}`}</span>
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
    <div className="pt-4 px-4 space-y-4 h-screen">
      <Card>
        <CardHeader>
          <CardTitle>ICO Account Opening</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <DataTable
            columns={ColumnsIcoSearch}
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
};

export default ToDoAddedIcoSearch;
