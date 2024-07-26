import DataTable from "react-data-table-component";
import { TCorporateInfo } from "../constants/types";
import { Card } from "@/components/ui/card";
import { columnsCorporateInfo } from "../constants/columns";
import { FormCorporateInfo } from "../components/formCorporateInfo";

type TForm1Props = {
  corporatesInfo: TCorporateInfo[];
  handleSubmitCorporateInfo: (data: TCorporateInfo) => Promise<void>;
};
export function Form1({
  corporatesInfo,
  handleSubmitCorporateInfo,
}: TForm1Props) {
  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Juristic Investor Information-For Account Opening"
            columns={columnsCorporateInfo}
            data={corporatesInfo}
          />
        </Card>
        <FormCorporateInfo onsubmit={handleSubmitCorporateInfo} />
      </div>
    </>
  );
}
