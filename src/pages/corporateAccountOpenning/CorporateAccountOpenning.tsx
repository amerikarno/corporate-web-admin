import { Table } from "./component/dataTable";
import { initCorporateInfo } from "./constant/initialData";

export default function CorporateAccountOpenning() {
  const columns = [
    {
      header: "Juristic Name",
      accessor: "juristicName",
    },
    {
      header: "Comercial ID",
      accessor: "comercialId",
    },
    {
      header: "Tax ID",
      accessor: "taxId",
    },
    {
      header: "Date Of Incorporation",
      accessor: "dateOfIncorporation",
    },
    {
      header: "Registered Country",
      accessor: "registeredCountry",
    },
    {
      header: "Registered Capital",
      accessor: "financial.registeredCapital",
    },
    {
      header: "Revenue per year",
      accessor: "financial.revenuePerYear",
    },
    {
      header: "Net Profit",
      accessor: "financial.netProfit",
    },
    {
      header: "Shareholder's Equity",
      accessor: "financial.shareholderEquity",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={[initCorporateInfo]}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
}
