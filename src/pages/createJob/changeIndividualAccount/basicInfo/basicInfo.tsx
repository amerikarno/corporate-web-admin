import { Card, CardContent } from "@/components/ui/card";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import { TiHome } from "react-icons/ti";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { MdLocationPin } from "react-icons/md";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bank,
  businessTypes,
  careerTypes,
  educationTypes,
  sourceOfIncome,
  salaryRange,
  countries,
  geographyTypes,
} from "@/constant/variables";
import { basicInfoSchema, TBasicInfo } from "./constant/schemas";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { useDispatch, useSelector } from "react-redux";
import { setIndividualData } from "@/features/fetchIndividualData/fetchIndividualDataSlice";
import { RootState } from "@/app/store";

export default function BasicInfo() {
  if (!isAllowedPage(2002)) {
    return <UnAuthorize />;
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookies();

  const [radioAddressValue, setRadioAddressValue] = useState("radio-2");
  const [radioWorkValue, setRadioWorkValue] = useState("radio-5");
  const [addBankValue, setAddBankValue] = useState("radio-6");
  const uniqueGeographyTypes = [
    //unique ตัวที่ชื่อซํ้าใน list
    ...new Set(
      geographyTypes.map((geography) =>
        JSON.stringify({
          district_name: geography.district_name,
          zipcode: geography.zipcode,
        })
      )
    ),
  ].map((json) => JSON.parse(json));
  const uniqueProvince = [
    ...new Set(
      geographyTypes.map((geography) =>
        JSON.stringify({
          province_name: geography.province_name,
        })
      )
    ),
  ].map((json) => JSON.parse(json));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TBasicInfo>({
    resolver: zodResolver(basicInfoSchema),
  });

  const fetchIndividualData = async (AccountID: string) =>{
    try {
      console.log(AccountID);
      const res = await axios.post("/api/v1/individual/list", {AccountID}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setIndividualData(res.data[0]));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  const individualData = useSelector((state: RootState) => state.individualData.individualDatas); 
  useEffect(() => {
    const cidValue = localStorage.getItem('cid');
    fetchIndividualData(cidValue || "");
  }, [token, dispatch]);
  
  useEffect(() => {
    if(individualData){
      console.log(individualData);
      let fillData: TBasicInfo = {
        registeredAddress: {
          homeNumber: "",
          villageNumber: "",
          villageName: "",
          subStreetName: "",
          streetName: "",
          subDistrictName: "",
          districtName: "",
          provinceName: "",
          zipCode: "",
          countryName: ""
        },
        currentAddress: {
          homeNumber: "",
          villageNumber: "",
          villageName: "",
          subStreetName: "",
          streetName: "",
          subDistrictName: "",
          districtName: "",
          provinceName: "",
          zipCode: "",
          countryName: ""
        },
        officeAddress: {
          homeNumber: "",
          villageNumber: "",
          villageName: "",
          subStreetName: "",
          streetName: "",
          subDistrictName: "",
          districtName: "",
          provinceName: "",
          zipCode: "",
          countryName: ""
        },
        occupation: {
          education: individualData?.education || "",
          sourceOfIncome: individualData?.sourceOfIncome || "",
          currentOccupation: individualData?.currentOccupation || "",
          officeName: individualData?.officeName || "",
          typeOfBusiness: individualData?.typeOfBusiness || "",
          positionName: individualData?.positionName || "",
          salaryRange: individualData?.salaryRange || "",
        },
        firstBankAccount: {
          bankName: "",
          bankBranchName: "",
          bankAccountNumber: ""
        },
        secondBankAccountBody: {
          bankName: "",
          bankBranchName: "",
          bankAccountNumber: ""
        },
        investment: {
          shortTermInvestment: individualData?.shortTermInvestment || false,
          longTermInvestment: individualData?.longTermInvestment || false,
          taxesInvestment: individualData?.taxesInvestment || false,
          retireInvestment: individualData?.retireInvestment || false
        }
      };
      reset(fillData);
    }
  }, [individualData, reset]);

  const currentOccupation = watch("occupation.currentOccupation");
  const [showBusinessType, setShowBusinessType] = useState(true);
  const [showWorkplace, setShowWorkplace] = useState(true);
  const [showWorkPosition, setShowWorkPosition] = useState(true);
  useEffect(() => {
    const selectedCareer = careerTypes.find(
      (career) => career.id === Number(currentOccupation)
    );

    if (selectedCareer) {
      setShowBusinessType(selectedCareer.businessFlag === "Y");
      setShowWorkplace(selectedCareer.workplaceFlag === "Y");
      setShowWorkPosition(selectedCareer.positionFlag === "Y");
    } else {
      setShowBusinessType(true);
      setShowWorkplace(true);
      setShowWorkPosition(true);
    }
  }, [currentOccupation]);

  // useEffect(()=>{
  //   setAddBankValue("radio-6")
  // },[])

  const onSubmit = async (data: TBasicInfo) => {
    let prebody = {
      ...data,
      registeredAddress: {
        ...data.registeredAddress,
        types: 1,
      },
      currentAddress: {
        ...(radioAddressValue === "radio-1"
          ? { ...data.registeredAddress, types: 2 }
          : { ...data.currentAddress, types: 2 }),
        types: 2,
      },
      officeAddress: {
        ...(radioWorkValue === "radio-3"
          ? { ...data.registeredAddress, types: 3 }
          : radioWorkValue === "radio-4"
          ? data.currentAddress.homeNumber
            ? { ...data.currentAddress, types: 3 }
            : { ...data.registeredAddress, types: 3 }
          : { ...data.officeAddress, types: 3 }),
      },
      firstBankAccount: {
        ...data.firstBankAccount,
        type: 1,
        is_default: true,
      },
      secondBankAccountBody: {
        ...data.secondBankAccountBody,
        type: 2,
        is_default: false,
      },
    };
    let body = {
      cid: localStorage.getItem("cid"),
      investment: prebody.investment,
      occupation: prebody.occupation,
      addresses: [
        prebody.registeredAddress,
        prebody.currentAddress,
        prebody.officeAddress,
      ],
      banks: [prebody.firstBankAccount, prebody.secondBankAccountBody],
      pageID: 300,
    };
    console.log(body);
    try{
      const token = getCookies();
      const res = await axios.post("/api/v1/individual/postcreate",body,{
        headers: { Authorization: `Bearer ${token}` },
      });
      if(res.status === 200){
        console.log("submit basic info success",res);
        navigate("/create-job/change-individual-account/edit/suittestfatca");
      }else{
        console.log("submit basic info unsuccess x",res);
      }
    }catch(error){
      console.log(error);
    }
  };

  const handleAddressRadioChange = (value: string) => {
    console.log(value);
    setRadioAddressValue(value);
  };
  const handleWorkRadioChange = (value: string) => {
    console.log(value);
    setRadioWorkValue(value);
  };

  const handleBankRadioChange = (value: string) => {
    console.log(value);
    setAddBankValue(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-4">
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
                    {...register("registeredAddress.homeNumber")}
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
                    {...register("registeredAddress.villageNumber")}
                  />
                  {errors.registeredAddress?.villageNumber && (
                    <span>
                      {errors.registeredAddress?.villageNumber.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Moo"
                    id="mooIDCard"
                    {...register("registeredAddress.villageName")}
                  />
                  {errors.registeredAddress?.villageName && (
                    <span>{errors.registeredAddress?.villageName.message}</span>
                  )}
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Soi"
                    id="soiIDCard"
                    {...register("registeredAddress.subStreetName")}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Road"
                    id="roadIDCard"
                    {...register("registeredAddress.streetName")}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Tambon"
                    id="tambonIDCard"
                    list="tambonIDCardList"
                    {...register("registeredAddress.subDistrictName")}
                  />
                  <datalist id="tambonIDCardList">
                    {geographyTypes.map((geography, index) => (
                      <option key={index} value={geography.sub_district_name} />
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Amphoe"
                    id="amphoeIDCard"
                    list="amphoeIDCardList"
                    {...register("registeredAddress.districtName")}
                  />
                  <datalist id="amphoeIDCardList">
                    {uniqueGeographyTypes.map((geography, index) => (
                      <option key={index} value={geography.district_name} />
                    ))}
                  </datalist>
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Province"
                    id="provinceIDCard"
                    list="provinceIDCardList"
                    {...register("registeredAddress.provinceName")}
                  />
                  <datalist id="provinceIDCardList">
                    {uniqueProvince.map((geography, index) => (
                      <option key={index} value={geography.province_name} />
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Postal Code"
                    id="postalCodeIDCard"
                    list="postalCodeIDCardList"
                    {...register("registeredAddress.zipCode")}
                  />
                  <datalist id="postalCodeIDCardList">
                    {uniqueGeographyTypes.map((geography, index) => (
                      <option key={index} value={geography.zipcode} />
                    ))}
                  </datalist>
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    label="Country"
                    id="countryIDCard"
                    list="countriesIDCard"
                    {...register("registeredAddress.countryName")}
                  />
                  <datalist id="countriesIDCard">
                    {countries.map((country) => (
                      <option key={country.code} value={country.name} />
                    ))}
                  </datalist>
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
                    id="radio-1"
                    name="radio"
                    type="radio"
                    checked={radioAddressValue === "radio-1"}
                    onChange={() => {
                      handleAddressRadioChange("radio-1");
                    }}
                  />
                  <label htmlFor="radio-1" className="radio-label">
                    ที่อยู่บัตรประชาชน
                  </label>
                </div>
                <div className="space-x-2">
                  <input
                    id="radio-2"
                    name="radio"
                    type="radio"
                    checked={radioAddressValue === "radio-2"}
                    onChange={() => handleAddressRadioChange("radio-2")}
                  />
                  <label htmlFor="radio-2" className="radio-label">
                    ที่อยู่อื่น (โปรดระบุ)
                  </label>
                </div>
              </div>
            </div>
            {radioAddressValue === "radio-2" && (
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Address Number"
                      id="addressNoHome"
                      {...register("currentAddress.homeNumber")}
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Floor"
                      id="floorHome"
                      {...register("currentAddress.villageNumber")}
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Moo"
                      id="mooHome"
                      {...register("currentAddress.villageName")}
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Soi"
                      id="soiHome"
                      {...register("currentAddress.subStreetName")}
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Road"
                      id="roadHome"
                      {...register("currentAddress.streetName")}
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Tambon"
                      id="tambonHome"
                      list="tambonHomeList"
                      {...register("currentAddress.subDistrictName")}
                    />
                    <datalist id="tambonHomeList">
                      {geographyTypes.map((geography, index) => (
                        <option
                          key={index}
                          value={geography.sub_district_name}
                        />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Amphoe"
                      id="amphoeHome"
                      list="amphoeHomeList"
                      {...register("currentAddress.districtName")}
                    />
                    <datalist id="amphoeHomeList">
                      {uniqueGeographyTypes.map((geography, index) => (
                        <option key={index} value={geography.district_name} />
                      ))}
                    </datalist>
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Province"
                      id="provinceHome"
                      list="provinceHomeList"
                      {...register("currentAddress.provinceName")}
                    />
                    <datalist id="provinceHomeList">
                      {uniqueProvince.map((geography, index) => (
                        <option key={index} value={geography.province_name} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Postal Code"
                      id="postalCodeHome"
                      list="postalCodeHomeList"
                      {...register("currentAddress.zipCode")}
                    />
                    <datalist id="postalCodeHomeList">
                      {uniqueGeographyTypes.map((geography, index) => (
                        <option key={index} value={geography.zipcode} />
                      ))}
                    </datalist>
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Country"
                      id="countryHome"
                      list="countriesHome"
                      {...register("currentAddress.countryName")}
                    />
                    <datalist id="countriesHome">
                      {countries.map((country) => (
                        <option key={country.code} value={country.name} />
                      ))}
                    </datalist>
                  </div>
                </div>
              </div>
            )}
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
                  {...register("occupation.education")}
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">ระดับการศึกษาสูงสุด</option>
                  {educationTypes.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <select
                  {...register("occupation.sourceOfIncome")}
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">แหล่งที่มาของเงินลงทุน</option>
                  {sourceOfIncome.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="w-1/2">
                <select
                  {...register("occupation.currentOccupation")}
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                    text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">อาชีพปัจจุบัน</option>
                  {careerTypes.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              {showWorkplace ? (<div className="w-1/2">
                <Input
                  type="text"
                  label="ชื่อสถานที่ทำงาน"
                  id="workPlace"
                  {...register("occupation.officeName")}
                />
              </div>) : showWorkPosition ?
              (<div className="w-1/2">
                <Input
                  type="text"
                  label="ตำแหน่งงาน"
                  id="่jobPosition"
                  {...register("occupation.positionName")}
                />
              </div>) :
              (<div className="w-1/2">
                <select
                  {...register("occupation.salaryRange")}
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                        text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">รายได้ต่อเดือน</option>
                  {salaryRange.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>)}
            </div>
            <div className="flex space-x-6">
              {showBusinessType ? (<div className="w-1/2">
                <select
                  {...register("occupation.typeOfBusiness")}
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                        text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">ประเภทธุระกิจ</option>
                  {businessTypes.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>) : (!showBusinessType && !showWorkPosition && !showWorkplace) ? (<div className="w-1/2"></div>) :(<div className="w-1/2">
                <select
                  {...register("occupation.salaryRange")}
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                        text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">รายได้ต่อเดือน</option>
                  {salaryRange.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>)}
              {showWorkPosition&&showWorkplace ? (<div className="w-1/2">
                <Input
                  type="text"
                  label="ตำแหน่งงาน"
                  id="่jobPosition"
                  {...register("occupation.positionName")}
                />
              </div>) : (<div className="w-1/2"></div>)}
            </div>
            {showBusinessType && <div className="flex space-x-6">
              <div className="w-1/2">
                <select
                  {...register("occupation.salaryRange")}
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                        text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">รายได้ต่อเดือน</option>
                  {salaryRange.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2"></div>
            </div>}
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
                    id="radio-3"
                    name="radio-for-work"
                    type="radio"
                    checked={radioWorkValue === "radio-3"}
                    onChange={() => handleWorkRadioChange("radio-3")}
                  />
                  <label htmlFor="radio-3">ที่อยู่บัตรประชาชน</label>
                </div>
                <div className="space-x-2">
                  <input
                    id="radio-4"
                    name="radio-for-work"
                    type="radio"
                    checked={radioWorkValue === "radio-4"}
                    onChange={() => handleWorkRadioChange("radio-4")}
                  />
                  <label htmlFor="radio-4">ที่อยู่ปัจจุบัน</label>
                </div>
                <div className="space-x-2">
                  <input
                    id="radio-5"
                    name="radio-for-work"
                    type="radio"
                    checked={radioWorkValue === "radio-5"}
                    onChange={() => handleWorkRadioChange("radio-5")}
                  />
                  <label htmlFor="radio-5">ที่อยู่อื่น (โปรดระบุ)</label>
                </div>
              </div>
            </div>
            {radioWorkValue === "radio-5" && (
              <div>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Address Number"
                        id="addressNoWork"
                        {...register("officeAddress.homeNumber")}
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Floor"
                        id="floorWork"
                        {...register("officeAddress.villageNumber")}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Moo"
                        id="mooWork"
                        {...register("officeAddress.villageName")}
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Soi"
                        id="soiWork"
                        {...register("officeAddress.subStreetName")}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Road"
                        id="roadWork"
                        {...register("officeAddress.streetName")}
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Tambon"
                        id="tambonWork"
                        list="tambonWorkList"
                        {...register("officeAddress.subDistrictName")}
                      />
                      <datalist id="tambonWorkList">
                        {geographyTypes.map((geography, index) => (
                          <option
                            key={index}
                            value={geography.sub_district_name}
                          />
                        ))}
                      </datalist>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Amphoe"
                        id="amphoeWork"
                        list="amphoeWorkList"
                        {...register("officeAddress.districtName")}
                      />
                      <datalist id="amphoeWorkList">
                        {uniqueGeographyTypes.map((geography, index) => (
                          <option key={index} value={geography.district_name} />
                        ))}
                      </datalist>
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Province"
                        id="provinceWork"
                        list="provinceWorkList"
                        {...register("officeAddress.provinceName")}
                      />
                      <datalist id="provinceWorkList">
                        {uniqueProvince.map((geography, index) => (
                          <option key={index} value={geography.province_name} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Postal Code"
                        id="postalCodeWork"
                        list="postalCodeWorkList"
                        {...register("officeAddress.zipCode")}
                      />
                      <datalist id="postalCodeWorkList">
                        {uniqueGeographyTypes.map((geography, index) => (
                          <option key={index} value={geography.zipcode} />
                        ))}
                      </datalist>
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="text"
                        label="Country"
                        id="countryWork"
                        list="countriesWork"
                        {...register("officeAddress.countryName")}
                      />
                      <datalist id="countriesWork">
                        {countries.map((country) => (
                          <option key={country.code} value={country.name} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                  {...register("investment.shortTermInvestment")}
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
                  {...register("investment.longTermInvestment")}
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
                  {...register("investment.taxesInvestment")}
                />
                <label htmlFor="objectiveCheckbox-3">เพื่อเก็งกำไร</label>
              </div>
              <div className="space-x-4">
                <input
                  type="checkbox"
                  id="objectiveCheckbox-4"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  {...register("investment.retireInvestment")}
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
                  {...register("firstBankAccount.bankName")}
                  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                            text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">กรุณาเลือกธนาคาร</option>
                  {bank.map((status) => (
                    <option key={status.code} value={status.name}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-4">
                <Input
                  type="text"
                  label="ชื่อสาขา"
                  id="bankBranch"
                  {...register("firstBankAccount.bankBranchName")}
                />
              </div>
              <div className="flex space-x-4">
                <Input
                  type="text"
                  label="กรุณาระบุเลขบัญชี"
                  id="bankAccount"
                  {...register("firstBankAccount.bankAccountNumber")}
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
                      checked={addBankValue === "radio-6"}
                      onChange={() => handleBankRadioChange("radio-6")}
                    />
                    <label htmlFor="radio-6">ใช้</label>
                  </div>
                  <div className="space-x-2">
                    <input
                      id="radio-7"
                      name="radio-for-bank"
                      type="radio"
                      checked={addBankValue === "radio-7"}
                      onChange={() => handleBankRadioChange("radio-7")}
                    />
                    <label htmlFor="radio-7">ไม่ใช้</label>
                  </div>
                </div>
              </div>
              {addBankValue === "radio-6" && (
                <div className="flex items-center text-[15px] text-gray-400">
                  <span className="text-red-500">*</span>
                  กรุณาระบุชื่อธนาคารก่อนกรอกชื่อสาขา
                </div>
              )}
              {addBankValue === "radio-6" && (
                <div className="space-y-4 pt-4">
                  <div className="flex space-x-4">
                    <select
                      {...register("secondBankAccountBody.bankName")}
                      className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                            text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                    >
                      <option value="">กรุณาเลือกธนาคาร</option>
                      {bank.map((status) => (
                        <option key={status.code} value={status.name}>
                          {status.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex space-x-4">
                    <Input
                      type="text"
                      label="ชื่อสาขา"
                      id="bankBranchAdditional"
                      {...register("secondBankAccountBody.bankBranchName")}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Input
                      type="text"
                      label="กรุณาระบุเลขบัญชี"
                      id="bankAccountAdditional"
                      {...register("secondBankAccountBody.bankAccountNumber")}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
