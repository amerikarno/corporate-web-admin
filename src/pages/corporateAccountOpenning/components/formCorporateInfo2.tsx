import { Card } from "@/components/ui/card";
import {
  businessType,
  countrySourceOfIncome,
  investmentObjective,
  juristicForeign,
  juristicOthers,
  juristicThai,
  sourceOfIncome,
  juristicType,
} from "@/pages/corporate/constants/const_variables";
import { Button } from "@/components/ui/button";
import { CheckBox } from "@/components/Checkbox";
import { useFormCorporateInfo2 } from "@/pages/corporateAccountOpenning/hook/useFormCorporateInfo2";
import { Input } from "@/components/ui/input";
import { juristicTypeObject } from "../constants/variables";

type TCorporateTypeAndIncomeProps = {
  onsubmit: (data: any) => void;
};

export function FormCorporateTypeAndIncome({
  onsubmit,
}: TCorporateTypeAndIncomeProps) {
  const {
    corporateTypeAndIncome,
    isBusinessTypeOthers,
    isSourceOfIncomeOthers,
    isCountrySourceOfIncomeOthers,
    isInvestmentObjectiveOthers,
    errors,
    juristicAllType,
    juristicAllOtherType,
    handleCheck,
    // handleSubSelected,
    // handeleBusinessType,
    // handeleCountrySourceOfIncome,
    // handeleInvestmentObjective,
    // handeleSourceOfIncome,
    // handleInputOthers,
    getError,
    // disableBusinessType,
    // disableCountrySourceOfIncome,
    // disableInvestmentObjective,
    // isDiabledJuristicType,
    // isDisableSubSelected,
    // validateForm,
    juristicType,
  } = useFormCorporateInfo2();

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(juristicType);
    // if (validateForm()) {
    //   console.log(corporateTypeAndIncome);
    //   console.log(juristicAllType);
    //   console.log(juristicAllOtherType);
    //   onsubmit("submit success");
    // } else {
    //   console.log("submit failed");
    // }
  };

  return (
    <Card>
      <form onSubmit={(e) => onSubmit(e)} className="space-y-10">
        <div>
          <>
            <h1 className="font-bold p-4">Juristic Type</h1>
            {juristicTypeObject.map((item, i) => (
              <div
                key={i}
                className="px-4 flex flex-row border-t border-gray-100"
              >
                <div className="w-1/4">
                  <CheckBox
                    id={`juristic-${item.main.id}`}
                    name={`juristic-${item.main.id}`}
                    label={item.main.name}
                    onChange={(e) => handleCheck(item.main.id, e)}
                  />
                </div>
                <div className="w-3/4">
                  {item.sub.map((subItem, j) => (
                    <div key={j}>
                      <CheckBox
                        id={`juristic-${subItem.id}`}
                        name={`juristic-${subItem.id}`}
                        label={subItem.name}
                        onChange={(e) => handleCheck(subItem.id, e)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {errors && getError(["juristicType"], errors) && (
              <p className="text-red-500 p-4">
                {getError(["juristicType"], errors)?.message}
              </p>
            )}
          </>
        </div>

        {/* <div>
          <h1 className="font-bold p-4 border-t">Business Type</h1>
          <div className="px-4 border-t">
            <div className="grid grid-cols-2 ">
              {businessType.map((item, i) => (
                <CheckBox
                  id={`business-type-${i}`}
                  key={i}
                  label={item}
                  onChange={(e) => handeleBusinessType(e, i)}
                  name={item}
                  disabled={disableBusinessType(item)}
                />
              ))}
            </div>
            {isBusinessTypeOthers && (
              <div className="flex justify-start px-4 py-2">
                <Input
                  className="w-1/2"
                  placeholder="Please Specify"
                  onChange={(e) => handleInputOthers(e, "businessType")}
                />
              </div>
            )}
          </div>
          {errors && getError(["businessType"], errors) && (
            <p className="text-red-500 p-4">
              {getError(["businessType"], errors)?.message}
            </p>
          )}
        </div>

        <div>
          <h1 className="font-bold p-4 border-t">Source Of Income</h1>
          <div className="p-4 border-t">
            <div className="grid grid-cols-2 ">
              {sourceOfIncome.map((item, i) => (
                <CheckBox
                  id={`sourceofincome-${i}`}
                  key={i}
                  label={item}
                  onChange={(e) => handeleSourceOfIncome(e, i)}
                  name={item}
                />
              ))}
            </div>
            {isSourceOfIncomeOthers && (
              <div className="flex justify-end px-4 py-2">
                <Input
                  className="w-1/2"
                  placeholder="Please Specify"
                  onBlur={(e) => handleInputOthers(e, "sourceOfIncome")}
                />
              </div>
            )}
            {errors && getError(["sourceOfIncome"], errors) && (
              <p className="text-red-500 p-4">
                {getError(["sourceOfIncome"], errors)?.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <h1 className="font-bold p-4 border-t">
            Country's Source Of Income / Investment Fund
          </h1>
          <div className="p-4 border-t">
            <div className="grid grid-cols-2 ">
              {countrySourceOfIncome.map((item, i) => (
                <CheckBox
                  id={`countrysourceofincome-${i}`}
                  key={i}
                  label={item}
                  onChange={(e) => handeleCountrySourceOfIncome(e, i)}
                  name={item}
                  disabled={disableCountrySourceOfIncome(item)}
                />
              ))}
            </div>
            {isCountrySourceOfIncomeOthers && (
              <div className="flex justify-end px-4 py-2">
                <Input
                  className="w-1/2"
                  placeholder="Please Specify"
                  onChange={(e) =>
                    handleInputOthers(e, "countrySourceOfIncome")
                  }
                />
              </div>
            )}
            {errors && getError(["countrySourceOfIncome"], errors) && (
              <p className="text-red-500 px-4">
                {getError(["countrySourceOfIncome"], errors)?.message}
              </p>
            )}
          </div>
          <div className="p-4 border-t">
            <h1 className="">Investment Objective</h1>
          </div>
          <div className="pt-4 px-4 border-t">
            {investmentObjective.map((item, i) => (
              <CheckBox
                id={`investmentobjective-${i}`}
                key={i}
                label={item}
                onChange={(e) => handeleInvestmentObjective(e, i)}
                name={item}
                disabled={disableInvestmentObjective(item)}
              />
            ))}
          </div>
          {isInvestmentObjectiveOthers && (
            <div className="flex justify-start px-4 py-2">
              <Input
                className="w-1/2"
                placeholder="Please Specify"
                onChange={(e) => handleInputOthers(e, "investmentObjective")}
              />
            </div>
          )}
          {errors && getError(["investmentObjective"], errors) && (
            <p className="text-red-500 p-4">
              {getError(["investmentObjective"], errors)?.message}
            </p>
          )}
        </div> */}

        <div className="flex justify-end pb-4 pr-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Card>
  );
}
