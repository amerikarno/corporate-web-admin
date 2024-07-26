import { Card } from "@/components/ui/card";
import { useListOfDirector } from "../hook/useListOfDirector";
import DataTable from "react-data-table-component";
import { FormIndividualsDirector } from "../components/formDirectorInfo";
import { columnsListOfDirectors } from "../constants/columns";

type TForm3Props = {
  corporateCode: string;
};
export function Form3({ corporateCode }: TForm3Props) {
  const { directors, handleSubmitDirectors } = useListOfDirector();
  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="List of Directors"
            columns={columnsListOfDirectors}
            data={directors}
            clearSelectedRows
          />
        </Card>
        Props
        <FormIndividualsDirector
          onsubmit={handleSubmitDirectors}
          corporateCode={corporateCode}
        />
      </div>
    </>
  );
}
