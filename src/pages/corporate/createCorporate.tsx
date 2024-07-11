import { Card } from "@/components/Card";
import { FormCorporateInfo } from "./components/formCorporateInfo";
import { initCorporateInfo } from "./constants/initailData";
import { TCorporateInfo } from "./constants/types";

export default function CreateCorporate() {
  const corpInfo = initCorporateInfo;
  const handleSubmit = (data: TCorporateInfo) => {
    console.log(data);
  };

  return (
    <>
      <Card>
        <FormCorporateInfo {...corpInfo} onsubmit={handleSubmit} />
      </Card>
    </>
  );
}
