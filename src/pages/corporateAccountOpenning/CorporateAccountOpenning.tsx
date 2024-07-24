import DataTable from "react-data-table-component";
import { useCorporateInfo } from "./hook/useCorporateInfo";
import { columnsCorporateInfo } from "./constants/columns";
// import { FormCorporateInfo } from "./component/formCorporateInfo";
import { Card } from "@/components/ui/card";
import { FormCorporateInfo } from "../corporate/components/formCorporateInfo";

export default function CorporateAccountOpenning() {
  const { corporates, handleSubmitCorporateInfo } = useCorporateInfo();

  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Corporate Infomations"
            columns={columnsCorporateInfo}
            data={corporates}
            clearSelectedRows
          />
        </Card>
        <FormCorporateInfo onsubmit={handleSubmitCorporateInfo} />
      </div>
      {/* <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Corporate Infomations"
            columns={columnsCorporateInfo}
            data={corporates}
            clearSelectedRows
          />
        </Card>
        <FormCorporateInfo onsubmit={handleSubmitCorporateInfo} />
      </div> */}
    </>
  );
}
