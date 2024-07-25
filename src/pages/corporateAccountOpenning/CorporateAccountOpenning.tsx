import DataTable from "react-data-table-component";
import { useCorporateInfo } from "./hook/useCorporateInfo";
import { columnsCorporateInfo } from "./constants/columns";
import { Card } from "@/components/ui/card";
import { FormCorporateInfo } from "../corporate/components/formCorporateInfo";
import { FormCorporateTypeAndIncome } from "./components/formCorporateInfo2";
// import { FormCorporateTypeAndIncome } from "@/pages/corporate/components/formCorporateInfo2";

export default function CorporateAccountOpenning() {
  const {
    corporatesInfo,
    handleSubmitCorporateInfo,
    handleSubmitJuristicType,
  } = useCorporateInfo();

  return (
    <>
      {/* <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Jusristic Infomations"
            columns={columnsCorporateInfo}
            data={corporatesInfo}
          />
        </Card>
        <FormCorporateInfo onsubmit={handleSubmitCorporateInfo} />
      </div> */}
      <div className="p-4 space-y-8">
        <Card>
          {/* <DataTable
            title="Jusristic Type"
            columns={columnsCorporateInfo}
            data={corporates}
            clearSelectedRows
          /> */}
          <h1 className="h-80">Jusristic Type infomations</h1>
        </Card>
        <FormCorporateTypeAndIncome onsubmit={handleSubmitJuristicType} />
      </div>
    </>
  );
}
