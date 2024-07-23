import { FormAuthorizedPerson } from "./components/formAuthorization";
import { FormBank } from "./components/formBank";
import { FormCorporateInfo } from "./components/formCorporateInfo";
import { FormCorporateTypeAndIncome } from "./components/formCorporateInfo2";
import { FormIndividualsShareholders } from "./components/formIndividualsShareholders";
import { FormIndividualsContactPerson } from "./components/formContactPerson";
import { FormIndividualsDirector } from "./components/formDirectorInfo";
import { FormJuristicShareholders } from "./components/formJuristicShareholders";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookies } from "@/lib/Cookies";

export default function CreateCorporate() {
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.authen.token);
  console.log("token", token);
  const cookie = token || getCookies();
  console.log("session", cookie);

  if (!cookie) {
    navigate("/login");
  }

  return (
    <>
      <div className="max-w-[1024px] mx-auto py-5 px-10 space-y-6">
        <FormCorporateInfo />
        {/* dropdown + freetext ** incorrect field name */}
        <FormCorporateTypeAndIncome />
        <FormIndividualsContactPerson />
        <FormIndividualsDirector />
        {/* dropdown passport / citizen id */}
        <FormIndividualsShareholders />
        <FormJuristicShareholders />
        <FormAuthorizedPerson />
        <FormBank />
        {/* self declare / crs / fatca */}
        {/* group risks */}
      </div>
    </>
  );
}
