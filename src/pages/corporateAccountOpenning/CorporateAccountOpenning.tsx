import DataTable from "react-data-table-component";
//import { MoveUp } from "lucide-react";
import { useCorporateInfo } from "./hook/useCorporateInfo";
import { columnsCorporateInfo } from "./constants/columns";
import { FormCorporateInfo } from "./component/formCorporateInfo";
import { FormCorporateTypeAndIncome } from "../corporate/components/formCorporateInfo2"
import { Card } from "@/components/ui/card";

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
    </>
  );

}
