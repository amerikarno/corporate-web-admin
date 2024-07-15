import { FormCorporateInfo } from "./components/formCorporateInfo";
import { FormCorporateTypeAndIncome } from "./components/formCorporateInfo2";
import { initCorporateInfo } from "./constants/initailData";
import { TCorporateInfo } from "./constants/types";

export default function CreateCorporate() {
  const corpInfo = initCorporateInfo;
  const handleSubmitCorporateInfo = (data: TCorporateInfo) => {
    console.log(data);
    console.log("submit successful");
  };

  return (
    <>
      <div className="w-[1024px] mx-auto py-5 px-10">
        {/* <FormCorporateInfo onsubmit={handleSubmitCorporateInfo} /> */}
        <FormCorporateTypeAndIncome />
      </div>
    </>
  );
}
