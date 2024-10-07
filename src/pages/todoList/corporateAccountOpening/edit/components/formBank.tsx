import { useForm } from "react-hook-form";
import { TBank } from "../constants/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankSchema } from "../constants/schemas";
import { sleep } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";
import { useDispatch } from "react-redux";

type TBankWithID = {
  CorporateCode?:string;
  bank : TBank[];
  BankId?: string;
}

type TBankFormProps = {
  onsubmit: (data: TBankArray) => void;
  corporateCode: string;
  choosedEditData?: TBankWithID | null;
  clearChoosedEditData: () => void;
};

type TBankArray = {
  bank: TBank[];
  CorporateCode?: string;
  BankId?:string;
};
export function FormBank({ onsubmit, corporateCode ,  choosedEditData,
  clearChoosedEditData,}: TBankFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TBank>({
    resolver: zodResolver(bankSchema),
  });
  const dispatch = useDispatch();
  const onSubmit = async (data: TBank) => {
    let body: TBankArray = {
      bank: [data],
      CorporateCode: corporateCode,
      BankId: choosedEditData?.BankId,
    };
    dispatch(setTestCorporateData(body));
    await sleep(500);
    console.log(body);
    reset();
    clearChoosedEditData();
    onsubmit(body);
  };

  useEffect(() => {
    const bankData = choosedEditData?.bank[0] || {
        accountType: '',
        bankName: '',
        accountNo: '',
        accountLocation: '',
        swiftCode: '',
    }
    reset(bankData);
  }, [choosedEditData, reset]);

  return (
    <Card className="p-4 space-y-4">
      <h1 className="col-span-4 font-bold pb-4 text-xl">
        Bank Accounts Intended to Deposit and Withdraw Fiat Fund
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("accountType")}
              label="Account Type"
              id="Account Type"
              disabled={isSubmitting}
            />
            {errors.accountType && (
              <p className="text-red-500 text-sm px-2">
                {errors.accountType.message}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <Input
              {...register("bankName")}
              label="Bank Name"
              id="Bank NAme"
              disabled={isSubmitting}
            />
            {errors.bankName && (
              <p className="text-red-500 text-sm px-2">
                {errors.bankName.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("accountNo")}
              label="Account Number"
              id="Account Number"
              disabled={isSubmitting}
            />
            {errors.accountNo && (
              <p className="text-red-500 text-sm px-2">
                {errors.accountNo.message}
              </p>
            )}
          </div>

          <div className="w-1/2">
            <Input
              {...register("accountLocation")}
              label="Account Location"
              id="Account Location"
              disabled={isSubmitting}
            />
            {errors.accountLocation && (
              <p className="text-red-500 text-sm px-2">
                {errors.accountLocation.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("swiftCode")}
              label="SWIFT Code"
              id="SWIFT Code"
              disabled={isSubmitting}
            />
            {errors.swiftCode && (
              <p className="text-red-500 text-sm px-2">
                {errors.swiftCode.message}
              </p>
            )}
          </div>
          <div className="w-1/2"></div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
