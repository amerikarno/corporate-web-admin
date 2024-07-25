import DataTable from "react-data-table-component";
import { useCorporateInfo } from "./hook/useCorporateInfo";
import { useListOfDirector } from "./hook/useListOfDirector";
import { columnsCorporateInfo } from "./constants/columns";
// import { FormCorporateInfo } from "./component/formCorporateInfo";
import { FormCorporateTypeAndIncome } from "../corporate/components/formCorporateInfo2"
import { FormIndividualsDirector } from "../corporate/components/formDirectorInfo";
import { Card } from "@/components/ui/card";
import { FormCorporateInfo } from "../corporate/components/formCorporateInfo";

export default function CorporateAccountOpenning() {
  const { directors, handleSubmitDirectors } = useListOfDirector();
  return (
    <>

      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="List of Directors"
            columns={columnsCorporateInfo}
            data={directors}
            clearSelectedRows
          />
        </Card>
        <FormIndividualsDirector onsubmit={handleSubmitDirectors} />
      </div> 
    </>
  );

}
