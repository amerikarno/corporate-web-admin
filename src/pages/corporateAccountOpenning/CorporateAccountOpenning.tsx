import DataTable from "react-data-table-component";
import { useCorporateInfo } from "./hook/useCorporateInfo";
import { useListOfDirector } from "./hook/useListOfDirector";
import {useAuthorizePerson} from "./hook/useAuthorizePerson";
import { columnsCorporateInfo,columnsListOfDirectors,columnsAuthorizePerson } from "./constants/columns";
// import { FormCorporateInfo } from "./component/formCorporateInfo";
import { FormCorporateTypeAndIncome } from "../corporate/components/formCorporateInfo2"
import { FormIndividualsDirector } from "../corporate/components/formDirectorInfo";
import { FormAuthorizedPerson } from "../corporate/components/formAuthorization"
import { Card } from "@/components/ui/card";
import { FormCorporateInfo } from "../corporate/components/formCorporateInfo";

export default function CorporateAccountOpenning() {
  // const { directors, handleSubmitDirectors } = useListOfDirector();
  // return (
  //   <>

  //     <div className="p-4 space-y-8">
  //       <Card>
  //         <DataTable
  //           title="List of Directors"
  //           columns={columnsListOfDirectors}
  //           data={directors}
  //           clearSelectedRows
  //         />
  //       </Card>
  //       <FormIndividualsDirector onsubmit={handleSubmitDirectors} />
  //     </div> 
  //   </>
  // );

  const { authorize, handleSubmitAuthorize } = useAuthorizePerson();
  return (
    <>

      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="List of Directors"
            columns={columnsAuthorizePerson}
            data={authorize}
            clearSelectedRows
          />
        </Card>
        <FormAuthorizedPerson onsubmit={handleSubmitAuthorize} />
      </div> 
    </>
  );

}
