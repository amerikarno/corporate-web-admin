import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import BlinkDetection from "./livenessOcr/livenessOcr";
import { Card, CardContent } from "@/components/ui/card";
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4 pt-8">
              <div className="flex space-x-4">
                <div className="flex w-1/2">
                  <select
                    {...register("thTitle")}
                    className="p-1  border-b-2 border-slate-700 
                    text-gray-900 text-sm block w-full hover:border-b-4 transition-all cursor-pointer"
                  >
                    <option value="">คำนำหน้าชื่อ (ภาษาไทย)</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                </div>
                <div className="w-1/2"></div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("thName")}
                    label="ชื่อ (ภาษาไทย)"
                    id="thName"
                  />
                  {errors.thName && <span>{errors.thName.message}</span>}
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("thSurname")}
                    label="ชื่อสกุล (ภาษาไทย)"
                    id="thSurname"
                  />
                  {errors.thSurname && <span>{errors.thSurname.message}</span>}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <select
                    {...register("engTitle")}
                    className="p-1  border-b-2 border-slate-700 
                    text-gray-900 text-sm block w-full hover:border-b-4 transition-all cursor-pointer"
                  >
                    <option value="">คำนำหน้าชื่อ (ภาษาอังกฤษ)</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Mrs.">Miss.</option>
                  </select>
                  {errors.engTitle && <span>{errors.engTitle.message}</span>}
                </div>
                <div className="w-1/2"></div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("engName")}
                    label="คำนำหน้าชื่อ (ภาษาอังกฤษ)"
                    id="engName"
                  />
                  {errors.engName && <span>{errors.engName.message}</span>}
                </div>

                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("engSurname")}
                    label="ชื่อสกุล (ภาษาอังกฤษ)"
                    id="engSurname"
                  />
                  {errors.engSurname && (
                    <span>{errors.engSurname.message}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-4 pt-8">
              <div className="w-1/2">
                <Input
                  type="email"
                  {...register("email")}
                  label="อีเมลล์"
                  id="email"
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>

              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("mobile")}
                  label="หมายเลขโทรศัพท์มือถือ"
                  id="mobile"
                />
                {errors.mobile && <span>{errors.mobile.message}</span>}
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <Input
                  type="date"
                  {...register("birthDate")}
                  label="วัน/เดือน/ปี เกิด"
                />
                {errors.birthDate && <span>{errors.birthDate.message}</span>}
              </div>

              <div className="w-1/2">
                <select
                  {...register("mariageStatus")}
                  className="cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">สถานะ</option>
                  <option value="โสด">Single</option>
                  <option value="สมรส">Married</option>
                  <option value="อย่า">Divorce</option>
                </select>
                {errors.mariageStatus && (
                  <span>{errors.mariageStatus.message}</span>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("citizenId")}
                  label="หมายเลขบัตรประชาชน"
                  id="citizenId"
                />
                {errors.citizenId && <span>{errors.citizenId.message}</span>}
              </div>

              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("lasorCode")}
                  label="เลขหลังบัตรประชาชน (Laser Code)"
                  id="lasorCode"
                />
                {errors.lasorCode && <span>{errors.lasorCode.message}</span>}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="space-x-4">
                <input
                  type="checkbox"
                  id="termOfAgreement"
                  {...register("termOfAgreement")}
                />
                <span className="text-gray-500">
                  ข้อพเจ้าได้อ่านและตกลงตามข้อกำหนดและเงื่อนไขและรับทราบนโยบายความเป็นส่วนตัวซึ่งระบุวิธีการที่บริษัท
                  ฟินันเซียดิจิทัล แอสแซท จำกัด("บริษัท")
                </span>
              </div>
              <div>
                <span className="text-red-500 cursor-pointer">
                  อ่านรายละเอียดเพิ่มเติม
                </span>
              </div>
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
