import { Card } from "@/components/ui/card";
import {
  businessType,
  countrySourceOfIncome,
  investmentObjective,
  juristicOthers,
  juristicThaiForeign,
  juristicType,
  sourceOfIncome,
} from "../constants/const_variables";
import { Button } from "@/components/ui/button";
import { CheckBox } from "@/components/Checkbox";
import { Input } from "@/components/ui/input";
import { useFormCorporateInfo2 } from "../hook/useFormCorporateInfo2";
import { TCorporateTypeAndIncome } from "../constants/types";

type FormCorporateTypeAndIncomeProps = {
  onsubmit: (data: TCorporateTypeAndIncome) => void;
};

export function FormCorporateTypeAndIncome({
  onsubmit,
}: FormCorporateTypeAndIncomeProps) {
  const {
    corporateTypeAndIncome,
    isBusinessTypeOthers,
    isSourceOfIncomeOthers,
    isCountrySourceOfIncomeOthers,
    isInvestmentObjectiveOthers,
    errors,
    handleCheck,
    handleSubSelected,
    handeleBusinessType,
    handeleCountrySourceOfIncome,
    handeleInvestmentObjective,
    handeleSourceOfIncome,
    handleInputOthers,
    getError,
    disableBusinessType,
    disableCountrySourceOfIncome,
    disableInvestmentObjective,
    isDiabledJuristicType,
    isDisableSubSelected,
    validateForm,
  } = useFormCorporateInfo2();

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      onsubmit(corporateTypeAndIncome);
    } else {
      console.log("submit failed");
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="space-y-10">
      <Card>
        <>
          <h1 className="font-bold p-4">Juristic Type</h1>
          {juristicType.map((type, i) => (
            <div
              key={i}
              className="px-4 flex flex-row border-t border-gray-100"
            >
              <div className="w-1/4">
                <CheckBox
                  label={type}
                  onChange={handleCheck}
                  name={type}
                  disabled={isDiabledJuristicType(type)}
                />
              </div>
              <div className="w-3/4">
                {i != 2
                  ? juristicThaiForeign.map((item, j) => (
                      <CheckBox
                        key={`${i}_${j}`}
                        label={item}
                        onChange={handleSubSelected}
                        name={`${type}_${item}`}
                        disabled={isDisableSubSelected(type)}
                      />
                    ))
                  : juristicOthers.map((item, j) => (
                      <CheckBox
                        key={`${i}_${j}`}
                        label={item}
                        onChange={handeleBusinessType}
                        name={`${type}_${item}`}
                        disabled={isDisableSubSelected(type)}
                      />
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
      </Card>

      <Card>
        <h1 className="font-bold p-4">Business Type</h1>
        <div className="px-4 border-t">
          <div className="grid grid-cols-2 ">
            {businessType.map((item, i) => (
              <CheckBox
                key={i}
                label={item}
                onChange={handeleBusinessType}
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
      </Card>

      <Card>
        <h1 className="font-bold p-4">Source Of Income</h1>
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 ">
            {sourceOfIncome.map((item, i) => (
              <CheckBox
                key={i}
                label={item}
                onChange={handeleSourceOfIncome}
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
      </Card>

      <Card>
        <h1 className="font-bold p-4">
          Country's Source Of Income / Investment Fund
        </h1>
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 ">
            {countrySourceOfIncome.map((item, i) => (
              <CheckBox
                key={i}
                label={item}
                onChange={handeleCountrySourceOfIncome}
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
                onChange={(e) => handleInputOthers(e, "countrySourceOfIncome")}
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
              key={i}
              label={item}
              onChange={handeleInvestmentObjective}
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
      </Card>

      <div className="flex justify-end py-4">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
