import { FormAuthorizedPerson } from "./components/formAuthorization";
import { FormBank } from "./components/formBank";
import { FormCorporateInfo } from "./components/formCorporateInfo";
import { FormCorporateTypeAndIncome } from "./components/formCorporateInfo2";
import { FormIndividualsShareholders } from "./components/formIndividualsShareholders";
import { FormIndividualsContactPerson } from "./components/formContactPerson";
import { TCorporateInfo, TCorporateTypeAndIncome } from "./constants/types";
import { FormIndividualsDirector } from "./components/formDirectorInfo";
import { FormJuristicShareholders } from "./components/formJuristicShareholders";

export default function CreateCorporate() {
  const handleSubmitCorporateInfo = (data: TCorporateInfo) => {
    console.log(data);
    console.log("submit successful");
  };

  const handleSubmitCorporateInfo2 = (data: TCorporateTypeAndIncome) => {
    console.log(data);
    console.log("submit successful");
  };

  const handleSubmitIndividualsShareholders = (
    data: TCorporateTypeAndIncome
  ) => {
    console.log(data);
    console.log("submit successful");
  };

  return (
    <>
      <div className="w-[1024px] mx-auto py-5 px-10 space-y-6">
        <FormCorporateInfo onsubmit={handleSubmitCorporateInfo} />
        <FormCorporateTypeAndIncome onsubmit={handleSubmitCorporateInfo2} />
        <FormIndividualsShareholders />
        <FormBank />
        <FormAuthorizedPerson />
        <FormIndividualsContactPerson />
        <FormIndividualsDirector />
        <FormJuristicShareholders />
      </div>
    </>
  );
}
