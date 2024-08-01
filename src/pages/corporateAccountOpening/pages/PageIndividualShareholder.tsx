import { Card } from "@/components/ui/card";
import DataTable from "react-data-table-component";
import { FormIndividualsShareholders } from "../components/formIndividualsShareholders";
import { columnsShareHolders } from "../constants/columns";
import { useShareholders } from "../hook/useShareholders";

type TPageIndividualShareholderProps = {
  corporateCode: string;
};

export function PageIndividualShareholder({
  corporateCode,
}: TPageIndividualShareholderProps) {
  const { shareholders, handleSubmitShareholders } = useShareholders();
  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="List of Shareholders holding from 25% of shares"
            columns={columnsShareHolders}
            data={shareholders}
            clearSelectedRows
          />
        </Card>
        <FormIndividualsShareholders
          onsubmit={handleSubmitShareholders}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
