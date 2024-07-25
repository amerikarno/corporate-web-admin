
import { Button } from "@/components/ui/button";
import { TCorporateInfo,TDirector,TAuthorizePerson } from "@/pages/corporate/constants/types";
import { TableColumn } from "react-data-table-component";

export const columnsCorporateInfo = [
  {
    name: "Juristic Name",
    selector: (row: TCorporateInfo) => row.Name,
    //sortable: true,
  },
  {
    name: "Commercial ID",
    selector: (row: TCorporateInfo) => row.RegistrationNo,
    //sortable: true,
  },
  {
    name: "Tax ID",
    selector: (row: TCorporateInfo) => row.TaxID,
    //sortable: true,
  },
  {
    name: "Date of Incorporation",
    selector: (row: TCorporateInfo) => row.dateofincorporation.toLocaleString(),
    //sortable: true,
  },
  {
    name: "Registered Country",
    selector: (row: TCorporateInfo) => row.Registered,
    //sortable: true,
  },
  {
    name: "Primary Country",
    selector: (row: TCorporateInfo) => row.Primary,
    //sortable: true,
  },
  // {
  //   name: "Registered Address",
  //   selector: (row: TCorporateInfo) => row.RegistredBusinessAddress,
  //   //sortable: true,
  // },
  // {
  //   name: "Incorporated Address",
  //   selector: (row: TCorporateInfo) => row.PlaceIncorporateAddress,
  //   //sortable: true,
  // },
  {
    name: "Registered Capital",
    selector: (row: TCorporateInfo) => row.financial?.RegisteredCapital ?? "",
    //sortable: true,
  },
  {
    name: "Revenue per year",
    selector: (row: TCorporateInfo) => row.financial?.RevenuePerYear ?? "",
    //sortable: true,
  },
  {
    name: "Net Profit (Loss)",
    selector: (row: TCorporateInfo) => row.financial?.NetProFitLoss ?? "",
    //sortable: true,
  },
  {
    name: "Shareholder's Equity",
    selector: (row: TCorporateInfo) => row.financial?.ShareholderEquity ?? "",
    //sortable: true,
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
    selector: (row: TDirector) => row.fullNames.title || '',
  },
  {
    name: "Firstname",
    selector: (row: TDirector) => row.fullNames.firstName || '',
  },
  {
    name: "Lastname",
    selector: (row: TDirector) => row.fullNames.lastName || '',
  },
  {
    name: "CitizenID",
    selector: (row: TDirector) => row.citizendId || '',
  },
  {
    name: "PassportID",
    selector: (row: TDirector) => row.passportID || '',
  },
  {
    name: "Expired Date",
    selector: (row: TDirector) => row.expiredDate || '',
  },
  {
    name: "Nationality",
    selector: (row: TDirector) => row.nationality || '',
  },
  {
    name: "Position",
    selector: (row: TDirector) => row.position || '',
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
    selector: (row: TAuthorizePerson) => row.fullNames.title || '',
  },
  {
    name: "Firstname",
    selector: (row: TAuthorizePerson) => row.fullNames.firstName || '',
  },
  {
    name: "Lastname",
    selector: (row: TAuthorizePerson) => row.fullNames.lastName || '',
  },
  {
    name: "CitizenID",
    selector: (row: TAuthorizePerson) => row.citizendId || '',
  },
  {
    name: "PassportID",
    selector: (row: TAuthorizePerson) => row.passportID || '',
  },
  {
    name: "Expired Date",
    selector: (row: TAuthorizePerson) => row.expiredDate || '',
  },
  {
    name: "Nationality",
    selector: (row: TAuthorizePerson) => row.nationality || '',
  },
  {
    name: "Position",
    selector: (row: TAuthorizePerson) => row.position || '',
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

