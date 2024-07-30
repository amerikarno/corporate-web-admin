import { Card } from "@/components/ui/card";
import DataTable from "react-data-table-component";
import { FormIndividualsContactPerson } from "../components/formContactPerson";
import { columnsContactPerson } from "../constants/columns";
import { useContactPerson } from "../hook/useContactPerson";

type TForm5Props = {
  corporateCode: string;
};
export function Form5({ corporateCode }: TForm5Props) {
  const { contact, handleSubmitContactPerson } = useContactPerson();
  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Contact Person"
            columns={columnsContactPerson}
            data={contact}
            clearSelectedRows
          />
        </Card>
        <FormIndividualsContactPerson
          onsubmit={handleSubmitContactPerson}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
