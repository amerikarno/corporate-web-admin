import { Button } from "@/components/ui/button";
import { TCorporateInfo } from "@/pages/corporate/constants/types";

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
