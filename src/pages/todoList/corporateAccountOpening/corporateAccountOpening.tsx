import { SideLabelInput } from "@/components/SideLabelInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAccountOpening } from "./hook/useAccountOpening";
import {
  corporateAccountOpeningSchema,
  TCorporateAccountOpening,
} from "./constant/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import { columnsCorporateInfo } from "./components/column";
import { TCorporateAccountOpeningInfo } from "./constant/type";
import { mockData } from "./constant/mock/mockData";

export default function TodoCorporateAccountOpenning() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TCorporateAccountOpening>({
    resolver: zodResolver(corporateAccountOpeningSchema),
  });
  const { handleSearch } = useAccountOpening(reset);

  return (
    <div className="p-4 space-y-10">
      <Card>
        {/* <CardHeader>
          <CardTitle>Corporate Account Opening</CardTitle>
        </CardHeader> */}
        <CardContent>
          <form
            className="grid grid-cols-2 gap-4 pt-4"
            onSubmit={handleSubmit(handleSearch)}
          >
            <SideLabelInput title="Juristic ID">
              <Input type="number" {...register("corporateCode")} />
              {errors && (
                <p className="text-red-500">{errors.corporateCode?.message}</p>
              )}
            </SideLabelInput>
            <SideLabelInput title="Juristic Name">
              <Input type="text" {...register("corporateName")} />
              {errors && (
                <p className="text-red-500">{errors.corporateName?.message}</p>
              )}
            </SideLabelInput>
            <SideLabelInput title="Tax ID">
              <Input type="number" {...register("taxId")} />
              {errors && (
                <p className="text-red-500">{errors.taxId?.message}</p>
              )}
            </SideLabelInput>
            <div className="col-start-1">
              <SideLabelInput title="Date From">
                <Input type="date" {...register("dateFrom")} />
                {errors && (
                  <p className="text-red-500">{errors.dateFrom?.message}</p>
                )}
              </SideLabelInput>
            </div>
            <SideLabelInput title="Date To">
              <Input type="date" {...register("dateTo")} />
              {errors && (
                <p className="text-red-500">{errors.dateTo?.message}</p>
              )}
            </SideLabelInput>
            <div className="col-start-2 flex justify-end">
              <Button type="submit">
                {isSubmitting ? "Search..." : "Search"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Corporates Infomations</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto h-[360px]">
          <DataTable columns={columnsCorporateInfo} data={mockData} />
        </CardContent>
      </Card>
    </div>
  );
}
