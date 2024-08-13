import { Card } from "@/components/ui/card";
import DataTable from "react-data-table-component";
import { FormJuristicShareholders } from "../components/formJuristicShareholders";
import { columnsJuristicShareHolders } from "../constants/columns";
import { useJuristicShareholders } from "../hook/useJuristicShareholders";

type TPageJuristicShareholderProps = {
  corporateCode: string;
};

export function PageJuristicShareholder({
  corporateCode,
}: TPageJuristicShareholderProps) {
  const { juristics, handleSubmitJuristics } = useJuristicShareholders();
  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Juristics shareholders of juristic's owner"
            columns={columnsJuristicShareHolders}
            data={juristics}
            clearSelectedRows
          />
        </Card>
        <FormJuristicShareholders
          onsubmit={handleSubmitJuristics}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
