import { FormIndividualsShareholders } from "./components/formIndividualsShareholders";
import { TCorporateInfo, TCorporateTypeAndIncome } from "./constants/types";

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
      <div className="w-[1024px] mx-auto py-5 px-10">
        {/* <FormCorporateInfo onsubmit={handleSubmitCorporateInfo} /> */}
        {/* <FormCorporateTypeAndIncome onsubmit={handleSubmitCorporateInfo2} /> */}
        <FormIndividualsShareholders />
      </div>
    </>
  );
}
