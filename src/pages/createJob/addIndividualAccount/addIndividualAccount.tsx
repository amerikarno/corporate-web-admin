import { Card, CardContent } from "@/components/ui/card";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TIndividualAccount,
  individualAccountSchema,
} from "./constant/schemas";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";

export default function AddIndividualAccount() {
  if (!isAllowedPage(2002)) {
    return <UnAuthorize />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TIndividualAccount>({
    resolver: zodResolver(individualAccountSchema),
  });

  const onSubmit = (data: TIndividualAccount) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input type="text" {...register("thTitle")} label="thTitle" />
              {errors.thTitle && <span>{errors.thTitle.message}</span>}
            </div>

            <div>
              <Input type="text" {...register("thName")} label="thName" />
              {errors.thName && <span>{errors.thName.message}</span>}
            </div>

            <div>
              <Input type="text" {...register("thSurname")} label="thSurname" />
              {errors.thSurname && <span>{errors.thSurname.message}</span>}
            </div>

            <div>
              <Input type="text" {...register("engTitle")} label="engTitle" />
              {errors.engTitle && <span>{errors.engTitle.message}</span>}
            </div>

            <div>
              <Input type="text" {...register("engName")} label="engName" />
              {errors.engName && <span>{errors.engName.message}</span>}
            </div>

            <div>
              <Input
                type="text"
                {...register("engSurname")}
                label="engSurname"
              />
              {errors.engSurname && <span>{errors.engSurname.message}</span>}
            </div>

            <div>
              <Input type="email" {...register("email")} label="email" />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div>
              <Input type="text" {...register("mobile")} label="mobile" />
              {errors.mobile && <span>{errors.mobile.message}</span>}
            </div>

            <div>
              <Input type="date" {...register("birthDate")} label="birthDate" />
              {errors.birthDate && <span>{errors.birthDate.message}</span>}
            </div>

            <div>
              <Input
                type="text"
                {...register("mariageStatus")}
                label="mariageStatus"
              />
              {errors.mariageStatus && (
                <span>{errors.mariageStatus.message}</span>
              )}
            </div>

            <div>
              <Input type="text" {...register("citizenId")} label="citizenId" />
              {errors.citizenId && <span>{errors.citizenId.message}</span>}
            </div>

            <div>
              <Input type="text" {...register("lasorCode")} label="lasorCode" />
              {errors.lasorCode && <span>{errors.lasorCode.message}</span>}
            </div>

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
