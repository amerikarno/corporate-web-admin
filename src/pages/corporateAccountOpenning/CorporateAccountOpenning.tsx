import DataTable from "react-data-table-component";
import { useCorporateInfo } from "./hook/useCorporateInfo";
import { useListOfDirector } from "./hook/useListOfDirector";
import {useAuthorizePerson} from "./hook/useAuthorizePerson";
import {useContactPerson} from "./hook/useContactPerson";
import {useShareholders} from "./hook/useShareholders";
import {useJuristicShareholders} from "./hook/useJuristicShareholders";
import {useBank} from "./hook/useBank";
import { columnsCorporateInfo,columnsListOfDirectors,columnsAuthorizePerson,
  columnsContactPerson , columnsShareHolders , columnsJuristicShareHolders , columnsBank
 } from "./constants/columns";
// import { FormCorporateInfo } from "./component/formCorporateInfo";
import { FormCorporateTypeAndIncome } from "../corporate/components/formCorporateInfo2"
import { FormIndividualsDirector } from "../corporate/components/formDirectorInfo";
import { FormAuthorizedPerson } from "../corporate/components/formAuthorization"
import { FormIndividualsContactPerson } from "../corporate/components/formContactPerson"
import { FormIndividualsShareholders } from "../corporate/components/formIndividualsShareholders";
import { FormJuristicShareholders } from "../corporate/components/formJuristicShareholders";
import { FormBank } from "../corporate/components/formBank";
import { Card } from "@/components/ui/card";
import { FormCorporateInfo } from "../corporate/components/formCorporateInfo";

export default function CorporateAccountOpenning() {
  // const { corporates, handleSubmitCorporateInfo } = useCorporateInfo();
  // return (
  //   <>

  //     <div className="p-4 space-y-8">
  //       <Card>
  //         <DataTable
  //           title="Juristic Investor Information-For Account Opening"
  //           columns={columnsCorporateInfo}
  //           data={corporates}
  //           clearSelectedRows
  //         />
  //       </Card>
  //       <FormCorporateInfo onsubmit={handleSubmitCorporateInfo} />
  //     </div> 
  //   </>
  // );
//------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------
  // const { authorize, handleSubmitAuthorize } = useAuthorizePerson();
  // return (
  //   <>
  //     <div className="p-4 space-y-8">
  //       <Card>
  //         <DataTable
  //           title="Authorized person of Juristic Investor for traction"
  //           columns={columnsAuthorizePerson}
  //           data={authorize}
  //           clearSelectedRows
  //         />
  //       </Card>
  //       <FormAuthorizedPerson onsubmit={handleSubmitAuthorize} />
  //     </div> 
  //   </>
  // );
//------------------------------------------------------------------------------
  // const { contact, handleSubmitContactPerson } = useContactPerson();
  // return (
  //   <>
  //     <div className="p-4 space-y-8">
  //       <Card>
  //         <DataTable
  //           title="Contact Person"
  //           columns={columnsContactPerson}
  //           data={contact}
  //           clearSelectedRows
  //         />
  //       </Card>
  //       <FormIndividualsContactPerson onsubmit={handleSubmitContactPerson} />
  //     </div> 
  //   </>
  // );
//------------------------------------------------------------------------------
  // const { shareholders, handleSubmitShareholders } = useShareholders();
  // return (
  //   <>
  //     <div className="p-4 space-y-8">
  //       <Card>
  //         <DataTable
  //           title="Individuals who shareholders of juristic's owner"
  //           columns={columnsShareHolders}
  //           data={shareholders}
  //           clearSelectedRows
  //         />
  //       </Card>
  //       <FormIndividualsShareholders onsubmit={handleSubmitShareholders} />
  //     </div> 
  //   </>
  // );
//------------------------------------------------------------------------------
  const { juristics, handleSubmitJuristics } = useJuristicShareholders();
  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <DataTable
            title="Juristics who shareholders of juristic's owner"
            columns={columnsJuristicShareHolders}
            data={juristics}
            clearSelectedRows
          />
        </Card>
        <FormJuristicShareholders onsubmit={handleSubmitJuristics} />
      </div> 
    </>
  );
//------------------------------------------------------------------------------
  // const { bank, handleSubmitBank } = useBank();
  // return (
  //   <>
  //     <div className="p-4 space-y-8">
  //       <Card>
  //         <DataTable
  //           title="Bank Accounts Intended to Deposit and Withdraw Fiat Fund"
  //           columns={columnsBank}
  //           data={bank}
  //           clearSelectedRows
  //         />
  //       </Card>
  //       <FormBank onsubmit={handleSubmitBank} />
  //     </div> 
  //   </>
  // );
}
