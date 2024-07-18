import { Input } from "@/components/Input";
import { Card } from "@/components/ui/card";
import { sleep } from "@/lib/utils";
import { TBank } from "../constants/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bankSchema, TBankSchema } from "../constants/schemas";
import { Button } from "@/components/ui/button";

export function FormBank() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TBank>({
    resolver: zodResolver(bankSchema),
  });

  const onSubmit = async (data: TBankSchema) => {
    await sleep(500);
    console.log(data);
    reset();
  };

  return (
    <Card className="p-4 space-y-4">
      <h1 className="col-span-4 font-bold pb-4 text-xl">Bank Informations :</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("accountType")}
              label="Account Type"
              id="Account Type"
              disabled={isSubmitting}
              required
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
              required
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
              required
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
              required
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
              required
            />
            {errors.swiftCode && (
              <p className="text-red-500 text-sm px-2">
                {errors.swiftCode.message}
              </p>
            )}
          </div>
          <div className="w-1/2">
          </div>
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
