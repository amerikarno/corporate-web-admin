import { RootState } from "@/app/store";
import { Input } from "@/components/Input"
import { Card, CardContent } from "@/components/ui/card"
import { businessTypes, careerTypes, educationTypes, salaryRange, sourceOfIncome } from "@/constant/variables";
import { TIndividualData } from "@/pages/createJob/changeIndividualAccount/type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdLocationPin } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { useSelector } from "react-redux";
import ndid from "./ndid.png";
import thaid from "./thaiid.png";

const LandingPageIndividual = () => {

    const {
        register,
        reset,
        setValue,
      } = useForm<TIndividualData>({
      });

      const individualData = useSelector((state: RootState) => state.individualData.individualDatas);

      const registeredAddress = individualData?.address.find(
        (item) => item.types === 1
      );

      const currentAddress = individualData?.address.find(
        (item) => item.types === 2
      );

      const officeAddress = individualData?.address.find(
        (item) => item.types === 3
      );

      const bank1 = individualData?.bank.find((item) => item.types === 1);
      const bank2 = individualData?.bank.find((item) => item.types === 2);

        const [showBusinessType, setShowBusinessType] = useState(true);
        const [showWorkplace, setShowWorkplace] = useState(true);
        const [showWorkPosition, setShowWorkPosition] = useState(true);
        const selectedCareer = careerTypes.find(
            (career) => career.id === Number(individualData?.currentOccupation)
          );

      useEffect(() => {
        if (individualData) {
            reset(individualData);
            setValue("birthDate", individualData?.birthDate?.split("T")[0])
            if (selectedCareer) {
                setShowBusinessType(selectedCareer.businessFlag === "Y");
                setShowWorkplace(selectedCareer.workplaceFlag === "Y");
                setShowWorkPosition(selectedCareer.positionFlag === "Y");
              } else {
                setShowBusinessType(true);
                setShowWorkplace(true);
                setShowWorkPosition(true);
            }
        }
      },[])
  return (
    <div className="p-8 flex flex-col space-y-8">
      <Card>
        <CardContent className="flex flex-col space-y-4">
            <div className="space-y-4 pt-8 flex flex-col">
              <h1 className="text-lg font-bold underline-offset-1 underline pb-4">
                กรอกข้อมูลส่วนตัว
              </h1>
              <div className="flex flex-col">
                <div className="w-1/2 pr-2">
                  <select
                    {...register("thTitle")}
                    value={individualData?.thTitle}
                    disabled
                    data-testid="thTitle"
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
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("thSurname")}
                    label="ชื่อสกุล (ภาษาไทย)"
                    id="thSurname"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <select
                    {...register("engTitle")}
                    value={individualData?.engTitle}
                    disabled
                    data-testid="enTitle"
                    className="cursor-pointer hover:bg-slate-100 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-600 bg-transparent
                    rounded-lg border border-gray-600 dark:text-white dark:border-gray-500
                     dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600"
                  >
                    <option value="">คำนำหน้าชื่อ (ภาษาอังกฤษ)</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss.">Miss.</option>
                  </select>
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
                </div>

                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("engSurname")}
                    label="ชื่อสกุล (ภาษาอังกฤษ)"
                    id="engSurname"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-4 pt-8">
              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("email")}
                  label="อีเมลล์"
                  id="email"
                />
              </div>

              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("mobile")}
                  label="หมายเลขโทรศัพท์มือถือ"
                  id="mobile"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <Input
                  type="date"
                  data-testid="birthDate"
                  {...register("birthDate")}
                  label="วัน/เดือน/ปี เกิด"
                />
              </div>

              <div className="flex  flex-col w-1/2">
                <select
                  {...register("marriageStatus")}
                  data-testid ="marriageStatus"
                  className="cursor-pointer border p-3.5 border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full dark:bg-gray-700 dark:border-gray-600
                 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">สถานะ</option>
                  <option value="โสด">Single</option>
                  <option value="สมรส">Married</option>
                  <option value="อย่า">Divorce</option>
                </select>
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
              </div>

              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("laserCode")}
                  label="เลขหลังบัตรประชาชน (Laser Code)"
                  id="lasorCode"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="space-x-4">
                <input
                  type="checkbox"
                  id="agreement"
                  data-testid="agreement"
                  {...register("agreement")}
                  defaultChecked
                />
                <label htmlFor="agreement" className="text-gray-500">
                  ข้อพเจ้าได้อ่านและตกลงตามข้อกำหนดและเงื่อนไขและรับทราบนโยบายความเป็นส่วนตัว
                </label>
              </div>
              {/* <div>
                <span className="text-red-500 cursor-pointer">
                  อ่านรายละเอียดเพิ่มเติม
                </span>
              </div> */}
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="p-4 space-y-4">
            <div className="flex gap-2 items-center text-[25px]">
              <TiHome />
              ที่อยู่บัตรประชาชน
            </div>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className={`w-1/2`}>
                  <Input
                    type="text"
                    label="Address Number"
                    id="addressNoIDCard"
                    data-testid="addressNoIDCard"
                    value={registeredAddress?.homeNumber}
                    disabled
                    className={
                      "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-600 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    }
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Floor"
                    id="floorIDCard"
                    data-testid="floorIDCard"
                    value={registeredAddress?.villageNumber}
                    disabled
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Moo"
                    id="mooIDCard"
                    data-testid="mooIDCard"
                    value={registeredAddress?.villageName}
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Soi"
                    id="soiIDCard"
                    data-testid="soiIDCard"
                    value={registeredAddress?.subStreetName}
                    disabled
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Road"
                    id="roadIDCard"
                    data-testid="roadIDCard"
                    value={registeredAddress?.streetName}
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Tambon"
                    id="tambonIDCard"
                    data-testid="tambonIDCard"
                    list="tambonIDCardList"
                    value={registeredAddress?.subDistrictName}
                    disabled
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Amphoe"
                    id="amphoeIDCard"
                    data-testid="amphoeIDCard"
                    list="amphoeIDCardList"
                    value={registeredAddress?.subDistrictName}
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Province"
                    id="provinceIDCard"
                    data-testid="provinceIDCard"
                    list="provinceIDCardList"
                    value={registeredAddress?.provinceName}
                    disabled
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Postal Code"
                    id="postalCodeIDCard"
                    data-testid="postalCodeIDCard"
                    list="postalCodeIDCardList"
                    value={registeredAddress?.zipCode}
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Country"
                    id="countryIDCard"
                    data-testid="countryIDCard"
                    list="countriesIDCard"
                    value={registeredAddress?.countryName}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent>
          <div className="space-y-4 ">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center text-[25px]">
                <MdLocationPin />
                ที่อยู่ปัจจุบัน
              </div>
              <div className="flex space-x-6">
                <div className="space-x-2">
                  <input
                    id="radio-2"
                    name="radio"
                    type="radio"
                    defaultChecked={true}
                    readOnly
                  />
                  <label htmlFor="radio-2" className="radio-label">
                    ที่อยู่อื่น (โปรดระบุ)
                  </label>
                </div>
              </div>
            </div>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Address Number"
                      id="addressNoHome"
                      data-testid="addressNoHome"
                      value={currentAddress?.homeNumber}
                      disabled
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Floor"
                      id="floorHome"
                      data-testid="floorHome"
                      value={currentAddress?.villageNumber}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Moo"
                      id="mooHome"
                      data-testid="mooHome"
                      value={currentAddress?.villageName}
                      disabled
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Soi"
                      id="soiHome"
                      data-testid="soiHome"
                      value={currentAddress?.subStreetName}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Road"
                      id="roadHome"
                      data-testid="roadHome"
                      value={currentAddress?.streetName}
                      disabled
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Tambon"
                      id="tambonHome"
                      data-testid="tambonHome"
                      list="tambonHomeList"
                      value={currentAddress?.subDistrictName}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Amphoe"
                      id="amphoeHome"
                      data-testid="amphoeHome"
                      list="amphoeHomeList"
                      value={currentAddress?.districtName}
                      disabled
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Province"
                      id="provinceHome"
                      data-testid="provinceHome"
                      list="provinceHomeList"
                      value={currentAddress?.provinceName}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Postal Code"
                      id="postalCodeHome"
                      data-testid="postalCodeHome"
                      list="postalCodeHomeList"
                      value={currentAddress?.zipCode}
                      disabled
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Country"
                      id="countryHome"
                      data-testid="countryHome"
                      list="countriesHome"
                      value={currentAddress?.countryName}
                      disabled
                    />
                  </div>
                </div>
              </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex gap-2 items-center text-[25px]">
              <MdLocationPin />
              อาชีพปัจจุบันและแหล่งที่มาของเงินลงทุน
            </div>
            <div className="flex space-x-6 ">
              <div className="flex w-1/2">
                <select
                  data-testid="education"
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                 <option value="">{educationTypes.find((education) => education.id === Number(individualData?.education))?.name}</option>
                </select>
              </div>
              <div className="w-1/2">
                <select
                  data-testid="sourceOfIncome"
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">{sourceOfIncome.find((sourceOfIncome) => sourceOfIncome.id === Number(individualData?.sourceOfIncome))?.name}</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="w-1/2">
                <select
                  data-testid="currentOccupation"
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                    text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">{careerTypes.find((currentOccupation) => currentOccupation.id === Number(individualData?.currentOccupation))?.name}</option>
                </select>
              </div>
              {showWorkplace ? (
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="ชื่อสถานที่ทำงาน"
                    id="workPlace"
                    value={individualData?.officeName}
                    disabled
                  />
                </div>
              ) : showWorkPosition ? (
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="ตำแหน่งงาน"
                    id="่jobPosition"
                    value={individualData?.positionName}
                    disabled
                  />
                </div>
              ) : (
                <div className="w-1/2">
                  <select
                    className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                        text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                  >
                    <option value="">{salaryRange.find((salaryRange) => salaryRange.id === Number(individualData?.salaryRange))?.name}</option>
                  </select>
                </div>
              )}
            </div>
            <div className="flex space-x-6">
              {showBusinessType ? (
                <div className="w-1/2">
                  <select
                    data-testid="typeOfBusiness"
                    className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                        text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                  >
                    <option value="">{businessTypes.find((typeOfBusiness) => typeOfBusiness.id === Number(individualData?.typeOfBusiness))?.name}</option>
                  </select>
                </div>
              ) : !showBusinessType && !showWorkPosition && !showWorkplace ? (
                <div className="w-1/2"></div>
              ) : (
                <div className="w-1/2">
                  <select
                    className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                        text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                  >
                    <option value="">{salaryRange.find((salaryRange) => salaryRange.id === Number(individualData?.salaryRange))?.name}</option>
                  </select>
                </div>
              )}
              {showWorkPosition && showWorkplace ? (
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="ตำแหน่งงาน"
                    id="่jobPosition"
                    value={individualData?.positionName}
                    disabled
                  />
                </div>
              ) : (
                <div className="w-1/2"></div>
              )}
            </div>
            {showBusinessType && (
              <div className="flex space-x-6">
                <div className="w-1/2">
                  <select
                    data-testid="salaryRange"
                    className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                        text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                  >
                    <option value="">{salaryRange.find((salaryRange) => salaryRange.id === Number(individualData?.salaryRange))?.name}</option>
                  </select>
                </div>
                <div className="w-1/2"></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent>
          <div className="space-y-4 ">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center text-[25px]">
                <MdLocationPin />
                ที่ตั้งที่ทำงาน
              </div>
              <div className="flex space-x-6">
                <div className="space-x-2">
                  <input
                    id="radio-5"
                    name="radio-for-work"
                    type="radio"
                    defaultChecked={true}
                    readOnly
                  />
                  <label htmlFor="radio-5">ที่อยู่อื่น (โปรดระบุ)</label>
                </div>
              </div>
            </div>
              <div>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Address Number"
                        id="addressNoWork"
                        data-testid="addressNoWork"
                        value={officeAddress?.homeNumber}
                        disabled
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Floor"
                        id="floorWork"
                        data-testid="floorWork"
                        value={officeAddress?.villageNumber}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Moo"
                        id="mooWork"
                        data-testid="mooWork"
                        value={officeAddress?.villageName}
                        disabled
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Soi"
                        id="soiWork"
                        data-testid="soiWork"
                        value={officeAddress?.subStreetName}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Road"
                        id="roadWork"
                        data-testid="roadWork"
                        value={officeAddress?.streetName}
                        disabled
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Tambon"
                        id="tambonWork"
                        data-testid="tambonWork"
                        list="tambonWorkList"
                        value={officeAddress?.subDistrictName}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Amphoe"
                        id="amphoeWork"
                        data-testid="amphoeWork"
                        list="amphoeWorkList"
                        value={officeAddress?.districtName}
                        disabled
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Province"
                        id="provinceWork"
                        data-testid="provinceWork"
                        list="provinceWorkList"
                        value={officeAddress?.provinceName}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Postal Code"
                        id="postalCodeWork"
                        data-testid="postalCodeWork"
                        list="postalCodeWorkList"
                        value={officeAddress?.zipCode}
                        disabled
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Country"
                        id="countryWork"
                        data-testid="countryWork"
                        list="countriesWork"
                        value={officeAddress?.countryName}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="p-4 space-y-4">
            <div className="flex gap-2 items-center text-[25px]">
              วัตถุประสงค์การลงทุน
            </div>
            <div className="space-y-4 flex flex-col">
              <div className="space-x-4">
                <input
                  type="checkbox"
                  id="objectiveCheckbox-1"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500
                                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={individualData?.shortTermInvestment || false}
                  readOnly
                />
                <label htmlFor="objectiveCheckbox-1">
                  เพื่อการลงทุนระยะสั้น
                </label>
              </div>
              <div className="space-x-4">
                <input
                  type="checkbox"
                  id="objectiveCheckbox-2"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={individualData?.longTermInvestment || false}
                  readOnly
                />
                <label htmlFor="objectiveCheckbox-2">
                  เพื่อการลงทุนระยะยาว
                </label>
              </div>
              <div className="space-x-4">
                <input
                  type="checkbox"
                  id="objectiveCheckbox-3"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={individualData?.taxesInvestment || false}
                  readOnly
                />
                <label htmlFor="objectiveCheckbox-3">เพื่อเก็งกำไร</label>
              </div>
              <div className="space-x-4">
                <input
                  type="checkbox"
                  id="objectiveCheckbox-4"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={individualData?.retireInvestment || false}
                  readOnly
                />
                <label htmlFor="objectiveCheckbox-4">เพื่อการออม</label>
              </div>
            </div>
            {/* {errors.register && <div>This field is required</div>} */}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="p-4 space-y-4">
            <div>
              <div className="flex gap-2 items-center text-[25px]">
                บัญชีธนาคารของท่าน (เพื่อใช้ในการถอนเงิน)
              </div>
              <div className="flex items-center text-[15px] text-gray-400">
                <span className="text-red-500">*</span>
                กรุณาระบุชื่อธนาคารก่อนกรอกชื่อสาขา
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <select
                  data-testid="firstBankName"
                  value={bank1?.bankName}
                  disabled
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                            text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">{bank1?.bankName}</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <Input
                  type="text"
                  label="ชื่อสาขา"
                  data-testid="firstBankBranch"
                  id="bankBranch"
                  value={bank1?.bankBranchName}
                  disabled
                />
              </div>
              <div className="flex space-x-4">
                <Input
                  type="text"
                  label="กรุณาระบุเลขบัญชี"
                  data-testid="firstBankAccount"
                  id="bankAccount"
                  value={bank1?.bankAccountNumber}
                  disabled
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex gap-2 items-center text-[25px]">
                  เพิ่มบัญชีธนาคารที่ 2 (เพื่อใช้ในการถอนเงิน)
                </div>
                <div className="flex space-x-6">
                  <div className="space-x-2">
                    <input
                      id="radio-6"
                      name="radio-for-bank"
                      type="radio"
                      checked={bank2?.bankName !== undefined || false}
                      readOnly
                    />
                    <label htmlFor="radio-6">ใช้</label>
                  </div>
                  <div className="space-x-2">
                    <input
                      id="radio-7"
                      name="radio-for-bank"
                      type="radio"
                      checked={bank2?.bankName === undefined || false}
                      readOnly
                    />
                    <label htmlFor="radio-7">ไม่ใช้</label>
                  </div>
                </div>
              </div>
              {bank2?.bankName !== undefined && (
                <div className="flex items-center text-[15px] text-gray-400">
                  <span className="text-red-500">*</span>
                  กรุณาระบุชื่อธนาคารก่อนกรอกชื่อสาขา
                </div>
              )}
              {bank2?.bankName !== undefined && (
                <div className="space-y-4 pt-4">
                  <div className="flex space-x-4">
                    <select
                      data-testid="secondBankName"
                      value={bank2?.bankName}
                      disabled
                      className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                            text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                    >
                      <option value="">{bank2?.bankName}</option>
                    </select>
                  </div>
                  <div className="flex space-x-4">
                    <Input
                      type="text"
                      label="ชื่อสาขา"
                      data-testid="secondBankBranch"
                      id="bankBranchAdditional"
                      value={bank2?.bankBranchName}
                      disabled
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Input
                      type="text"
                      label="กรุณาระบุเลขบัญชี"
                      data-testid="secondBankAccount"
                      id="bankAccountAdditional"
                      value={bank2?.bankAccountNumber}
                      disabled
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="flex flex-col  space-y-4  p-4 overflow-hidden">
        <div className="flex justify-center text-xl font-bold text-slate-800">
            แบบประเมินความเหมาะสมในการลงทุน
          </div>
        <div className="md:relative flex md:flex-row flex-col w-full m-8">
            <div className="flex md:w-1/4 flex-col items-center space-y-4 max-w-80 pt-4">
              <div className="">
                <span className="font-bold">ผลคะแนนที่ทำได้</span>
              </div>
              <svg className="w-1/3 md:w-3/4 h-full" viewBox="0 0 100 100">
                <>
                  <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  <circle
                    className="text-slate-800 progress-ring__circle stroke-current transition-all duration-500"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={`calc(251.2 - (251.2 * ${individualData?.SuiteTestResult.suiteTestResult.totalScore}) / 40)`}
                  />
                  <text
                    x="50"
                    y="50"
                    fontFamily="Verdana"
                    fontSize="12"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {individualData?.SuiteTestResult.suiteTestResult.totalScore}/40
                  </text>
                </>
              </svg>
            </div>
            <div className="flex md:w-1/4 flex-col  space-y-4 border-y-4 md:border-y-0 md:border-x-4 p-4">
              <div className="flex justify-center">
                <span className="font-bold">การวิเคราะห์ผล</span>
              </div>
              <div className="flex flex-col items-center h-full justify-center">
                <span className="font-bold text-xl text-slate-800">
                  ท่านเป็นนักลงทุนประเภท
                </span>
                <span className="font-bold text-xl text-slate-800">
                  {individualData?.SuiteTestResult.suiteTestResult.investorTypeRisk}
                </span>
              </div>
            </div>
            <div className="flex flex-col md:w-1/2 items-center p-4 space-y-4-8 gap-4">
              <div className="flex pl-8">
                <span className="font-bold">ประเภทตราสารที่สามารถลงทุนได้</span>
              </div>
              <div className="flex justify-center gap-8">
                <div className="flex flex-col space-y-4 justify-center font-bold">
                  <span>ตราสารหนี้</span>
                  <span>ตราสารทุนบางส่วน</span>
                  <span>ตราสารอนุพันธ์เล็กน้อย</span>
                  <span>หน่วยลงทุนที่มีระดับความเสี่ยง 1-5</span>
                  <span>สินทรัพท์ดิจิทรัลสัดส่วน 0%</span>
                </div>
                <div className="">
                  <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">
                          ประเภทผู้ลงทุน
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          สัดส่วนการลงทุนในสินทรัพย์ดิจิทรัล
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-4 py-2 ">
                          เสี่ยงตํ่า
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          &lt;1%
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">
                          เสี่ยงปานกลางค่อนตํ่า
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          &lt;5%
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-4 py-2">
                          เสี่ยงปานกลางค่อนสูง
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          &lt;10%
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">
                          เสี่ยงสูง
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          &lt;15%
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-4 py-2">
                          เสี่ยงสูงมาก
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          &lt;20%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card>
        <CardContent>
          <div className="p-4 space-y-4 pr-8 pl-8 flex flex-col">
            <span className="text-xl font-bold mb-4">กรอกข้อมูล FATCA</span>
            <div className="space-y-4">
              <span>ข้าพเจ้ามีข้อใดข้อหนึ่งดังนี้:</span>
              <div className="flex flex-col pl-4">
                <span>
                  - มีสัญชาติอเมริกัน / เกิดที่อเมริกา /
                  มีที่อยู่ในอเมริกาสำหรับพักอาศัยและติดต่อ
                </span>
                <span>- โอนเงินเป็นประจำไปบัญชีที่อเมริกา</span>
              </div>
              <div className="flex space-x-6 pt-4">
                <div className="space-x-2">
                  <input
                    id="fatcaradio-1"
                    name="radio-for-fatca"
                    type="radio"
                    checked={individualData?.SuiteTestResult.fatcaInfo !== null}
                    readOnly
                  />
                  <label htmlFor="fatcaradio-1">ใช่</label>
                </div>
                <div className="space-x-2">
                  <input
                    id="fatcaradio-2"
                    name="radio-for-fatca"
                    type="radio"
                    checked={individualData?.SuiteTestResult.fatcaInfo === null}
                    readOnly
                  />
                  <label htmlFor="fatcaradio-2">ไม่ใช่</label>
                </div>
              </div>
              <div className="pl-4">
                {individualData?.SuiteTestResult.fatcaInfo !== null && (
                  <div className="space-y-4 flex flex-col">
                    {[
                      "เป็นพลเมืองอเมริกา",
                      "มีกรีนการ์ดหรือบัตรผู้มีที่อยู่ถาวรในอเมริกา",
                      "มีที่อยู่ในอเมริกาเพื่อวัตถุประสงค์ทางภาษี",
                      "เกิดในอเมริกาแต่สละสถานะพลเมืองแล้ว",
                      "มีที่อยู่ในอเมริกาสำหรับบัญชีที่เปิดกับบริษัท",
                      "มีเบอร์โทรอเมริกา (ตนเองหรือผู้เกี่ยวข้อง) เกี่ยวข้องกับบัญชีที่เปิดกับบริษัท",
                      "มีการโอนเงินอัตโนมัติจากบัญชีที่เปิดกับบริษัทไปบัญชีอเมริกา",
                      "ได้มอบอำนาจให้บุคคลที่อยู่ในอเมริกาทำธุรกรรมใดๆที่เกี่ยวข้องกับบัญชีบริษัท",
                    ].map((label, index) => (
                      <div key={index} className="space-x-4">
                        <input
                          type="checkbox"
                          id={`fatcaCheckbox-${index + 1}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={individualData?.SuiteTestResult.fatcaInfo[index]}
                          readOnly
                        />
                        <label htmlFor={`fatcaCheckbox-${index + 1}`}>
                          {label}
                        </label>
                      </div>
                    ))}
                    {/* <div className="">
                      <Button
                        className={
                          isButtonDisabled
                            ? "bg-green-500 text-white border-4 rounded-full transition-all duration-500 cursor-pointer"
                            : ""
                        }
                        // disabled={isButtonDisabled}
                        onClick={() => {
                          setIsButtonDisabled(true);
                          console.log("fatcaInfo : ", fatcaInfo);
                        }}
                      >
                        {isButtonDisabled ? (
                          <TiTick className="text-xl" />
                        ) : (
                          "ถัดไป"
                        )}
                      </Button>
                    </div> */}
                  </div>
                )}
              </div>
              <div className="pt-8">
                ข้าพเจ้าเข้าใจว่าเมื่อข้อมูลข้างต้นเปลี่ยนแปลง
                ข้าพเจ้าจะแจ้งบริษัทฯในทันที
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="p-4 pl-8">
            <div>
              <span className="text-xl">
                แบบทดสอบความรู้ Knowledge Test
              </span>
              <div className="flex space-x-6 pt-4">
                <div className="space-x-2">
                  <input
                    id="knowLedgeTest-1"
                    name="radio-for-knowLedgeTest"
                    type="radio"
                    checked={individualData?.SuiteTestResult.isKnowLedgeDone === true || false}
                    readOnly
                  />
                  <label htmlFor="knowLedgeTest-1">ทำแบบทดสอบแล้ว</label>
                </div>
                <div className="space-x-2">
                  <input
                    id="knowLedgeTest-2"
                    name="radio-for-knowLedgeTest"
                    type="radio"
                    checked={individualData?.SuiteTestResult.isKnowLedgeDone !== true || false}
                    readOnly
                  />
                  <label htmlFor="knowLedgeTest-2">ยังไม่ได้ทำแบบทดสอบ</label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      { individualData?.ndid ? 
      (<Card className="flex items-center md:w-3/4 relative">
        <div className="m-8 w-20 md:w-28 flex-shrink-0 flex">
          <img src={ndid} alt="ndid"/>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-800 font-bold py-4 pb-0 text-lg md:text-2xl ">ยืนยันตัวผ่าน NDID</span>
          <span className="text-sm md:text-base text-gray-400">ยืนยันตัวตนและสมัคร NDID กับธนาคารที่ท่านใช้บริการเรียบร้อยแล้วเท่านั้น</span>
          <span className="p-4 pl-0 text-sm md:text-base"><span className="underline font-bold pr-4 text-sm md:text-base">หมายเหตุ</span>ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้</span>
        </div>
      </Card>) : individualData?.thaid ?
      (<Card className="flex items-center md:w-3/4 relative">
        <div className="m-8 w-20 md:w-28 flex-shrink-0 flex">
            <img src={thaid} alt="thaiid"/>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-800 font-bold py-4 pb-0 text-lg md:text-2xl ">ยืนยันตัวผ่าน THAID</span>
            <span className="p-4 pl-0 text-sm md:text-base"><span className="underline font-bold pr-4 text-sm md:text-base">หมายเหตุ</span>ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้</span>
          </div>
        </Card>) :
        (
          <div className="flex items-center justify-center h-full">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <p className="text-lg font-semibold text-gray-700">
                No Identification Selected
              </p>
            </div>
          </div>
        )
        }
    </div>
  )
}

export default LandingPageIndividual
