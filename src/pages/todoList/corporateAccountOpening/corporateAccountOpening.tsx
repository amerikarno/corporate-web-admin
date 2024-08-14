import { SideLabelInput } from "@/components/SideLabelInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAccountOpening } from "./hook/useAccountOpening";
import { TCorporateData } from "./constant/type";
import {
  corporateAccountOpeningSchema,
  TCorporateAccountOpening,
} from "./constant/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columnsCorporateInfo } from "./components/column";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";

export default function TodoCorporateAccountOpenning() {
  if (!isAllowedPage(3001)) {
    return <UnAuthorize />;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TCorporateAccountOpening>({
    resolver: zodResolver(corporateAccountOpeningSchema),
  });

  const { handleSearch, searchResult } = useAccountOpening();
  const [corporateData, setCorporateData] = useState<TCorporateData[]>([]);
  const [disableDate, setDisableDate] = useState<boolean>(false);
  const [disableCode, setDisableCode] = useState<boolean>(false);

  const handleDisableDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDisableDate(true);
    } else {
      setDisableDate(false);
    }
  };

  const handleDisableCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDisableCode(true);
    } else {
      setDisableCode(false);
    }
  };

  const onSubmit = async (data: TCorporateAccountOpening) => {
    console.log(data);
    await handleSearch(data);
    //reset();
  };

  useEffect(() => {
    if (searchResult) {
      setCorporateData(
        Array.isArray(searchResult) ? searchResult : [searchResult]
      );
    }
  }, [searchResult]);

  return (
    <div className="p-4 space-y-10">
      <Card>
        <CardContent>
          <form
            className="grid grid-cols-2 gap-4 pt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SideLabelInput title="Juristic ID">
              <Input
                type="number"
                {...register("corporateCode")}
                onChange={handleDisableDate}
                disabled={disableCode}
              />
              {errors && (
                <p className="text-red-500">{errors.corporateCode?.message}</p>
              )}
            </SideLabelInput>
            <div className="col-start-1">
              <SideLabelInput title="Date From">
                <Input
                  type="date"
                  {...register("dateFrom")}
                  onChange={handleDisableCode}
                  disabled={disableDate}
                />
                {errors && (
                  <p className="text-red-500">{errors.dateFrom?.message}</p>
                )}
              </SideLabelInput>
            </div>
            <SideLabelInput title="Date To">
              <Input
                type="date"
                {...register("dateTo")}
                onChange={handleDisableCode}
                disabled={disableDate}
              />
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
          <DataTable columns={columnsCorporateInfo} data={corporateData} />
        </CardContent>
      </Card>
    </div>
  );
}
