import { TCorporateInfo,TDirector } from "./types";
import { Button } from "@/components/ui/button";

export const columnsCorporateInfo = [
  {
    name: "Juristic Name",
    selector: (row: TCorporateInfo) => row.name,
    //sortable: true,
  },
  {
    name: "Commercial ID",
    selector: (row: TCorporateInfo) => row.commercialRegisteredNo,
    //sortable: true,
  },
  {
    name: "Tax ID",
    selector: (row: TCorporateInfo) => row.taxId,
    //sortable: true,
  },
  {
    name: "Date of Incorporation",
    selector: (row: TCorporateInfo) => row.dateIncorporation,
    //sortable: true,
  },
  {
    name: "Registered Country",
    selector: (row: TCorporateInfo) => row.registeredCountry,
    //sortable: true,
  },
  {
    name: "Primary Country",
    selector: (row: TCorporateInfo) => row.primaryCountryOfOperation,
    //sortable: true,
  },
  {
    name: "Registered Address",
    selector: (row: TCorporateInfo) => row.registeredAddress.addressNo,
    //sortable: true,
  },
  {
    name: "Incorporated Address",
    selector: (row: TCorporateInfo) => row.incorporatedAddress.addressNo,
    //sortable: true,
  },
  {
    name: "Registered Capital",
    selector: (row: TCorporateInfo) => row.financial?.registeredCapital ?? "",
    //sortable: true,
  },
  {
    name: "Revenue per year",
    selector: (row: TCorporateInfo) => row.financial?.revenuePerYear ?? "",
    //sortable: true,
  },
  {
    name: "Profit per year",
    selector: (row: TCorporateInfo) => row.financial?.netProfit ?? "",
    //sortable: true,
  },
  {
    name: "Shareholder's Equity",
    selector: (row: TCorporateInfo) => row.financial?.shareholderEquity ?? "",
    //sortable: true,
  },
  {
    name: "Actions",
    cell: (row: TCorporateInfo) => (
      <Button onClick={() => console.log(row)}>Action</Button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const columnsListOfDirectors = [
  {
    name: "Director Name",
    selector: (row: TCorporateInfo) => row.name,
    //sortable: true,
  },
  {
    name: "CitizendID",
    selector: (row: TCorporateInfo) => row.commercialRegisteredNo,
    //sortable: true,
  },
  {
    name: "PassportID",
    selector: (row: TCorporateInfo) => row.taxId,
    //sortable: true,
  },
  {
    name: "Expired Date",
    selector: (row: TCorporateInfo) => row.dateIncorporation,
    //sortable: true,
  },
  {
    name: "Nationality",
    selector: (row: TCorporateInfo) => row.registeredCountry,
    //sortable: true,
  },
  {
    name: "Position",
    selector: (row: TCorporateInfo) => row.primaryCountryOfOperation,
    //sortable: true,
  },
  {
    name: "Address",
    selector: (row: TCorporateInfo) => row.registeredAddress.addressNo,
    //sortable: true,
  },
  {
    name: "Actions",
    cell: (row: TDirector) => (
      <Button onClick={() => console.log(row)}>Action</Button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
