import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
// import Liveness from "./livenessOcr/livenessOcr";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TIndividualAccount,
  individualAccountSchema,
} from "./constant/schemas";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { OtpEmailConfirm } from "./otpEmailConfirm/otpEmailConfirm";

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

  const onSubmit = async (data: TIndividualAccount) => {
    let body = { ...data, birthDate: new Date(data.birthDate), pageId: 100 };
    console.log(body);
    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/individual/precreate", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("cid", res.data.id);
        console.log("success", res, data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8">
            <div className="space-y-4 pt-8">
              <h1 className="text-lg font-bold underline-offset-1 underline pb-4">
                กรอกข้อมูลส่วนตัว
              </h1>
              <div className="flex flex-col">
                <div className="w-1/2 pr-2">
                  <select
                    {...register("thTitle")}
                    className="cursor-pointer hover:bg-slate-100 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-600 bg-transparent
                    rounded-lg border border-gray-600 dark:text-white dark:border-gray-500
                     dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600"
                  >
                    <option value="">คำนำหน้าชื่อ (ภาษาไทย)</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                </div>
                {errors.thTitle && (
                  <span className="text-red-500">{errors.thTitle.message}</span>
                )}
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
                  {errors.thName && (
                    <span className="text-red-500">
                      {errors.thName.message}
                    </span>
                  )}
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("thSurname")}
                    label="ชื่อสกุล (ภาษาไทย)"
                    id="thSurname"
                  />
                  {errors.thSurname && (
                    <span className="text-red-500">
                      {errors.thSurname.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <select
                    {...register("engTitle")}
                    className="cursor-pointer hover:bg-slate-100 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-600 bg-transparent
                    rounded-lg border border-gray-600 dark:text-white dark:border-gray-500
                     dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600"
                  >
                    <option value="">คำนำหน้าชื่อ (ภาษาอังกฤษ)</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Mrs.">Miss.</option>
                  </select>
                  {errors.engTitle && (
                    <span className="text-red-500">
                      {errors.engTitle.message}
                    </span>
                  )}
                </div>
                <div className="w-1/2"></div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("engName")}
                    label="ชื่อ (ภาษาอังกฤษ)"
                    id="engName"
                  />
                  {errors.engName && (
                    <span className="text-red-500">
                      {errors.engName.message}
                    </span>
                  )}
                </div>

                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("engSurname")}
                    label="ชื่อสกุล (ภาษาอังกฤษ)"
                    id="engSurname"
                  />
                  {errors.engSurname && (
                    <span className="text-red-500">
                      {errors.engSurname.message}
                    </span>
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
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("mobile")}
                  label="หมายเลขโทรศัพท์มือถือ"
                  id="mobile"
                />
                {errors.mobile && (
                  <span className="text-red-500">{errors.mobile.message}</span>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <Input
                  type="date"
                  {...register("birthDate")}
                  label="วัน/เดือน/ปี เกิด"
                />
                {errors.birthDate && (
                  <span className="text-red-500">
                    {errors.birthDate.message}
                  </span>
                )}
              </div>

              <div className="flex  flex-col w-1/2">
                <select
                  {...register("mariageStatus")}
                  className="cursor-pointer border p-3.5 border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full dark:bg-gray-700 dark:border-gray-600
                 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">สถานะ</option>
                  <option value="โสด">Single</option>
                  <option value="สมรส">Married</option>
                  <option value="อย่า">Divorce</option>
                </select>
                {errors.mariageStatus && (
                  <span className="text-red-500">
                    {errors.mariageStatus.message}
                  </span>
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
                {errors.citizenId && (
                  <span className="text-red-500">
                    {errors.citizenId.message}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("laserCode")}
                  label="เลขหลังบัตรประชาชน (Laser Code)"
                  id="lasorCode"
                />
                {errors.laserCode && (
                  <span className="text-red-500">
                    {errors.laserCode.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="space-x-4">
                <input
                  type="checkbox"
                  id="agreement"
                  {...register("agreement")}
                />
                <label htmlFor="agreement" className="text-gray-500">
                  ข้อพเจ้าได้อ่านและตกลงตามข้อกำหนดและเงื่อนไขและรับทราบนโยบายความเป็นส่วนตัวซึ่งระบุวิธีการที่บริษัท
                  ฟินันเซียดิจิทัล แอสแซท จำกัด("บริษัท")
                </label>
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
    // <Liveness />
    // <OtpEmailConfirm />
  );
}
