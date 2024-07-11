import { Card } from "@/components/ui/card";
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
      <Card className="w-[1024px] mx-auto p-5">
        <FormCorporateInfo {...corpInfo} onsubmit={handleSubmit} />
      </Card>
    </>
  );
}
