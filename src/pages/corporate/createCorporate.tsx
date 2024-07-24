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
import { jwtDecode } from "jwt-decode";

export default function CreateCorporate() {
  const token = useSelector((state: any) => state.authen.token);
  console.log("token", token);
  const cookie = token || getCookies();
  const navigate = useNavigate();
  let userData = null;

  if (!cookie || cookie == null) {
    navigate("/login");
  } else {
    userData = jwtDecode(cookie);
    console.log("session", userData);
  }

  return (
    <>
      <div className="max-w-[1024px] mx-auto py-5 px-10 space-y-6">
        <FormCorporateInfo />
        <FormCorporateTypeAndIncome />
        <FormIndividualsContactPerson />
        <FormIndividualsDirector />
        <FormIndividualsShareholders />
        <FormJuristicShareholders />
        <FormAuthorizedPerson />
        <FormBank />
      </div>
    </>
  );
}
