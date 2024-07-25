import { Card } from "@/components/ui/card";
import { useListOfDirector } from "./hook/useListOfDirector";
import DataTable from "react-data-table-component";
import {
  columnsCorporateInfo,
  columnsAuthorizePerson,
  columnsBank,
  columnsContactPerson,
  columnsJuristicShareHolders,
  columnsListOfDirectors,
  columnsShareHolders,
} from "./constants/columns";
import { FormCorporateInfo } from "./components/formCorporateInfo"
import { useCorporateInfo } from "./hook/useCorporateInfo";
import { FormIndividualsDirector } from "./components/formDirectorInfo";
import { useAuthorizePerson } from "./hook/useAuthorizePerson";
import { FormAuthorizedPerson } from "./components/formAuthorization";
import { useContactPerson } from "./hook/useContactPerson";
import { FormIndividualsContactPerson } from "./components/formContactPerson";
import { useShareholders } from "./hook/useShareholders";
import { FormIndividualsShareholders } from "./components/formIndividualsShareholders";
import { useJuristicShareholders } from "./hook/useJuristicShareholders";
import { FormJuristicShareholders } from "./components/formJuristicShareholders";
import { useBank } from "./hook/useBank";
import { FormBank } from "./components/formBank";
import { FormCorporateTypeAndIncome } from "./components/formCorporateInfo2";
import { useCorporateInfo } from "./hook/useCorporateInfo";

export default function CorporateAccountOpenning() {
  // const { corporatesInfo, handleSubmitCorporateInfo } = useCorporateInfo();
  // return (
  //   <>
  //     <div className="p-4 space-y-8">
  //       <Card>
  //         <DataTable
  //           title="Juristic Investor Information-For Account Opening"
  //           columns={columnsCorporateInfo}
  //           data={corporatesInfo}
  //         />
  //       </Card>
  //       <FormCorporateInfo onsubmit={handleSubmitCorporateInfo} />
  //     </div>
  //   </>
  // );
  // ------------------------------------------------------------------------------
  const { currentCorporatesInfo, corporateCode } = useCorporateInfo();
  const handleOnSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <div className="p-4 space-y-8">
        <Card>
          <h1 className="h-80">Corporate type and income infoamtions</h1>
        </Card>
        <FormCorporateTypeAndIncome
          onsubmit={handleOnSubmit}
          corporateInfo={currentCorporatesInfo}
        />
      </div>
    </>
  );
  // ------------------------------------------------------------------------------
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
  // const { juristics, handleSubmitJuristics } = useJuristicShareholders();
  // return (
  //   <>
  //     <div className="p-4 space-y-8">
  //       <Card>
  //         <DataTable
  //           title="Juristics who shareholders of juristic's owner"
  //           columns={columnsJuristicShareHolders}
  //           data={juristics}
  //           clearSelectedRows
  //         />
  //       </Card>
  //       <FormJuristicShareholders onsubmit={handleSubmitJuristics} />
  //     </div>
  //   </>
  // );
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
