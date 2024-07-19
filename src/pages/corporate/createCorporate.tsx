import { FormAuthorizedPerson } from "./components/formAuthorization";
import { FormBank } from "./components/formBank";
import { FormCorporateInfo } from "./components/formCorporateInfo";
import { FormCorporateTypeAndIncome } from "./components/formCorporateInfo2";
import { FormIndividualsShareholders } from "./components/formIndividualsShareholders";
import { FormIndividualsContactPerson } from "./components/formContactPerson";
import { FormIndividualsDirector } from "./components/formDirectorInfo";
import { FormJuristicShareholders } from "./components/formJuristicShareholders";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCookies } from "@/lib/Cookies";

export default function CreateCorporate() {
  const token = useSelector((state: any) => state.authen.token);
  console.log("token", token);
  const cookie = token || getCookies();
  console.log("session", cookie);

  if (!cookie) {
    return (
      <div className="flex justify-center flex-col items-center">
        <h1 className="font-bold py-6">Unauthorized</h1>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="w-[1024px] mx-auto py-5 px-10 space-y-6">
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
