import { Card } from "@/components/ui/card";
import DataTable from "react-data-table-component";
import { FormBank } from "../components/formBank";
import { columnsBank } from "../constants/columns";
import { useBank } from "../hook/useBank";

type TForm8Props = {
  corporateCode: string;
};
export function Form8({ corporateCode }: TForm8Props) {
  const { bank, handleSubmitBank } = useBank();
  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Bank Accounts Intended to Deposit and Withdraw Fiat Fund"
            columns={columnsBank}
            data={bank}
            clearSelectedRows
          />
        </Card>
        <FormBank onsubmit={handleSubmitBank} />
      </div>
    </>
  );
}
