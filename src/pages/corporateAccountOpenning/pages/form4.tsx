import { Card } from "@/components/ui/card";
import { useAuthorizePerson } from "../hook/useAuthorizePerson";
import DataTable from "react-data-table-component";
import { FormAuthorizedPerson } from "../components/formAuthorization";
import { columnsAuthorizePerson } from "../constants/columns";

type TForm4Props = {
  corporateCode: string;
};

export function Form4({ corporateCode }: TForm4Props) {
  const { authorize, handleSubmitAuthorize } = useAuthorizePerson();
  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Authorized person of Juristic Investor for traction"
            columns={columnsAuthorizePerson}
            data={authorize}
          />
        </Card>
        <FormAuthorizedPerson onsubmit={handleSubmitAuthorize}
        corporateCode = {corporateCode}
        />
      </div>
    </>
  );
}
