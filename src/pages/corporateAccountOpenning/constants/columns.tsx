import { Button } from "@/components/ui/button";
import { TableColumn } from "react-data-table-component";
import {
  TAuthorizePerson,
  TBank,
  TBodyFormIndividualsShareholders,
  // TBodyFormIndividualsShareholders,
  TContactPerson,
  TCorporateInfo,
  TDirector,
  TJuristicsShareholders,
} from "./types";

export const columnsCorporateInfo = [
  {
    name: "Juristic Name",
    selector: (row: TCorporateInfo) => row.name,
  },
  {
    name: "Commercial ID",
    selector: (row: TCorporateInfo) => row.registrationNo,
  },
  {
    name: "Tax ID",
    selector: (row: TCorporateInfo) => row.taxId,
  },
  {
    name: "Date of Incorporation",
    selector: (row: TCorporateInfo) => row.dateofincorporation.toLocaleString(),
  },
  {
    name: "Registered Country",
    selector: (row: TCorporateInfo) => row.registered,
  },
  {
    name: "Primary Country",
    selector: (row: TCorporateInfo) => row.primary,
  },
  {
    name: "Registered Capital",
    selector: (row: TCorporateInfo) => row.registeredCapital ?? "",
  },
  {
    name: "Revenue per year",
    selector: (row: TCorporateInfo) => row.revenuePerYear ?? "",
  },
  {
    name: "Net Profit (Loss)",
    selector: (row: TCorporateInfo) => row.netProFitLoss ?? "",
  },
  {
    name: "Shareholder's Equity",
    selector: (row: TCorporateInfo) => row.shareholderEquity ?? "",
  },
  {
    name: "Actions",
    cell: (row: TCorporateInfo) => (
      <Button onClick={() => console.log(row)}>Action</Button>
    ),
    ignoreRowClick: true,
  },
];

export const columnsListOfDirectors: TableColumn<TDirector>[] = [
  {
    name: "Title",
    selector: (row: TDirector) => row.fullNames[0].title || "",
  },
  {
    name: "Firstname",
    selector: (row: TDirector) => row.fullNames[0].firstName || "",
  },
  {
    name: "Lastname",
    selector: (row: TDirector) => row.fullNames[0].lastName || "",
  },
  {
    name: "CitizenID",
    selector: (row: TDirector) => row.citizenId || "",
  },
  {
    name: "PassportID",
    selector: (row: TDirector) => row.passportId || "",
  },
  {
    name: "Expired Date",
    selector: (row: TDirector) =>
      row.expiryDate ? row.expiryDate.toLocaleDateString() : "",
  },
  {
    name: "Nationality",
    selector: (row: TDirector) => row.nationality || "",
  },
  {
    name: "Position",
    selector: (row: TDirector) => row.position || "",
  },
  // {
  //   name: "Address",
  //   selector: (row: TDirector) => row.addresses || '',
  // },
  {
    name: "Actions",
    cell: (row: TDirector) => (
      <Button onClick={() => console.log(row)}>Action</Button>
    ),
    ignoreRowClick: true,
  },
];

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
    selector: (row: TAuthorizePerson) => row.citizendId || "",
  },
  {
    name: "PassportID",
    selector: (row: TAuthorizePerson) => row.passportID || "",
  },
  {
    name: "Expired Date",
    selector: (row: TAuthorizePerson) =>
      row.expiryDate ? row.expiryDate.toLocaleDateString() : "",
  },
  {
    name: "Nationality",
    selector: (row: TAuthorizePerson) => row.nationality || "",
  },
  {
    name: "Position",
    selector: (row: TAuthorizePerson) => row.position || "",
  },
  // {
  //   name: "Address",
  //   selector: (row: TDirector) => row.addresses || '',
  // },
  {
    name: "Actions",
    cell: (row: TAuthorizePerson) => (
      <Button onClick={() => console.log(row)}>Action</Button>
    ),
    ignoreRowClick: true,
  },
];

export const columnsContactPerson: TableColumn<TContactPerson>[] = [
  {
    name: "Title",
    selector: (row: TContactPerson) => row.fullNames[0].title || "",
  },
  {
    name: "Firstname",
    selector: (row: TContactPerson) => row.fullNames[0].firstName || "",
  },
  {
    name: "Lastname",
    selector: (row: TContactPerson) => row.fullNames[0].lastName || "",
  },
  {
    name: "CitizenID",
    selector: (row: TContactPerson) => row.position || "",
  },
  {
    name: "PassportID",
    selector: (row: TContactPerson) => row.division || "",
  },
  {
    name: "Email",
    selector: (row: TContactPerson) => row.email || "",
  },
  {
    name: "Phone Number",
    selector: (row: TContactPerson) => row.telephone || "",
  },
  // {
  //   name: "Address",
  //   selector: (row: TDirector) => row.addresses || '',
  // },
  {
    name: "Actions",
    cell: (row: TContactPerson) => (
      <Button onClick={() => console.log(row)}>Action</Button>
    ),
    ignoreRowClick: true,
  },
];

export const columnsShareHolders: TableColumn<TBodyFormIndividualsShareholders>[] =
  [
    {
      name: "Title",
      selector: (row: TBodyFormIndividualsShareholders) =>
        row.fullNames[0].title || "",
    },
    {
      name: "Firstname",
      selector: (row: TBodyFormIndividualsShareholders) =>
        row.fullNames[0].firstName || "",
    },
    {
      name: "Lastname",
      selector: (row: TBodyFormIndividualsShareholders) =>
        row.fullNames[0].lastName || "",
    },
    {
      name: "CitizenID",
      selector: (row: TBodyFormIndividualsShareholders) => row.citizenId || "",
    },
    {
      name: "PassportID",
      selector: (row: TBodyFormIndividualsShareholders) => row.passportId || "",
    },
    {
      name: "Expired Date",
      selector: (row: TBodyFormIndividualsShareholders) =>
        row.expiryDate.split("T")[0] || "",
    },
    {
      name: "Nationality",
      selector: (row: TBodyFormIndividualsShareholders) =>
        row.nationality || "",
    },
    {
      name: "Share Percentage",
      selector: (row: TBodyFormIndividualsShareholders) =>
        row.sharePercentage || "",
    },
    {
      name: "Actions",
      cell: (row: TBodyFormIndividualsShareholders) => (
        <Button onClick={() => console.log(row)}>Action</Button>
      ),
      ignoreRowClick: true,
    },
  ];

export const columnsJuristicShareHolders: TableColumn<TJuristicsShareholders>[] =
  [
    {
      name: "Name",
      selector: (row: TJuristicsShareholders) => row.juristicName || "",
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
    },
    {
      name: "Actions",
      cell: (row: TJuristicsShareholders) => (
        <Button onClick={() => console.log(row)}>Action</Button>
      ),
      ignoreRowClick: true,
    },
  ];

export const columnsBank: TableColumn<TBank>[] = [
  {
    name: "AccountType",
    selector: (row: TBank) => row.accountType || "",
  },
  {
    name: "BankName",
    selector: (row: TBank) => row.bankName || "",
  },
  {
    name: "AccountNo",
    selector: (row: TBank) => row.accountNo || "",
  },
  {
    name: "AccountLocation",
    selector: (row: TBank) => row.accountLocation || "",
  },
  {
    name: "SwiftCode",
    selector: (row: TBank) => row.swiftCode || "",
  },
  // {
  //   name: "Address",
  //   selector: (row: TDirector) => row.addresses || '',
  // },
  {
    cell: (row: TBank) => (
      <Button onClick={() => console.log(row)}>Delete</Button>
    ),
    ignoreRowClick: true,
  },
];
