import { Card, CardContent } from "@/components/ui/card";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import { TiHome } from "react-icons/ti";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { MdLocationPin } from "react-icons/md";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    bank,
    businessTypes,
    careerTypes,
    educationTypes,
    investmentObjectTypes,
    sourceOfIncome,
    salaryRange,
    countries,
    geographyTypes
} from "@/constant/variables"
import { basicInfoSchema,TBasicInfo } from "./constant/schemas";
import { useForm } from "react-hook-form";

export default function BasicInfo() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<TBasicInfo>({
        resolver: zodResolver(basicInfoSchema),
      });


      const onSubmit = (data: TBasicInfo) => {
        console.log(data);
      };
    
    const uniqueGeographyTypes = [...new Set(geographyTypes.map((geography) => JSON.stringify({ 
        district_name: geography.district_name, 
        zipcode: geography.zipcode, 
      })))]
        .map((json) => JSON.parse(json));
    const uniqueProvince = [...new Set(geographyTypes.map((geography) => JSON.stringify({ 
        province_name:geography.province_name,
      })))]
        .map((json) => JSON.parse(json));

    if (!isAllowedPage(2002)) {
        return <UnAuthorize />;
      }
    const [radioAddressValue, setRadioAddressValue] = useState('radio-1');
    const [radioWorkValue, setRadioWorkValue] = useState('radio-3');
    const [addBankValue,setAddBankValue] = useState('radio-7')
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-4">
            <Card>
                <CardContent>
                    <div className="p-4 space-y-4">
                        <div className="flex gap-2 items-center text-[25px]"><TiHome />ที่อยู่บัตรประชาชน</div>
                        <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Address Number" id="addressNoIDCard" {...register("registeredAddress.homeNumber")}/>
                                        {errors.registeredAddress?.homeNumber && <span>{errors.registeredAddress?.homeNumber.message}</span>}
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Floor" id="floorIDCard" {...register("registeredAddress.villageNumber")}/>
                                        {errors.registeredAddress?.villageNumber && <span>{errors.registeredAddress?.villageNumber.message}</span>}
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Moo" id="mooIDCard" {...register("registeredAddress.villageName")}/>
                                        {errors.registeredAddress?.villageName && <span>{errors.registeredAddress?.villageName.message}</span>}
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Soi" id="soiIDCard"/>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Road" id="roadIDCard"/>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Tambon" id="tambonIDCard" list="tambonIDCardList"/>
                                        <datalist id="tambonIDCardList">
                                        {geographyTypes.map((geography,index) => (
                                            <option key={index} value={geography.sub_district_name} />
                                        ))}
                                        </datalist>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Amphoe" id="amphoeIDCard" list="amphoeIDCardList"/>
                                        <datalist id="amphoeIDCardList">
                                        {uniqueGeographyTypes.map((geography,index) => (
                                            <option key={index} value={geography.district_name} />
                                        ))}
                                        </datalist>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Province" id="provinceIDCard" list="provinceIDCardList"/>
                                        <datalist id="provinceIDCardList">
                                        {uniqueProvince.map((geography,index) => (
                                            <option key={index} value={geography.province_name} />
                                        ))}
                                        </datalist>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Postal Code" id="postalCodeIDCard" list="postalCodeIDCardList"/>
                                        <datalist id="postalCodeIDCardList">
                                        {uniqueGeographyTypes.map((geography,index) => (
                                            <option key={index} value={geography.zipcode} />
                                        ))}
                                        </datalist>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Country" id="countryIDCard" list="countriesIDCard"/>
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
                            <div className="flex gap-2 items-center text-[25px]"><MdLocationPin />ที่อยู่ปัจจุบัน</div>
                            <div className="flex space-x-6">
                                <div className="space-x-2">
                                    <input id="radio-1" 
                                    name="radio" 
                                    type="radio"
                                    checked={radioAddressValue === 'radio-1'}
                                    onChange={() => setRadioAddressValue('radio-1')}
                                    />
                                    <label htmlFor="radio-1" className="radio-label">ที่อยู่บัตรประชาชน</label>
                                </div>
                                <div className="space-x-2">
                                    <input id="radio-2" 
                                    name="radio" 
                                    type="radio"
                                    checked={radioAddressValue === 'radio-2'}
                                    onChange={() => setRadioAddressValue('radio-2')}
                                    />
                                    <label  htmlFor="radio-2" className="radio-label">ที่อยู่อื่น (โปรดระบุ)</label>
                                </div>
                                
                            </div>
                        </div>
                        {radioAddressValue === "radio-2" && 
                        
                            <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Address Number" id="addressNoHome"/>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Floor" id="floorHome"/>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Moo" id="mooHome"/>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Soi" id="soiHome"/>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Road" id="roadHome"/>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Tambon" id="tambonHome" list="tambonHomeList"/>
                                        <datalist id="tambonHomeList">
                                        {geographyTypes.map((geography,index) => (
                                            <option key={index} value={geography.sub_district_name} />
                                        ))}
                                        </datalist>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Amphoe" id="amphoeHome" list="amphoeHomeList"/>
                                        <datalist id="amphoeHomeList">
                                        {uniqueGeographyTypes.map((geography,index) => (
                                            <option key={index} value={geography.district_name} />
                                        ))}
                                        </datalist>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Province" id="provinceHome" list="provinceHomeList"/>
                                        <datalist id="provinceHomeList">
                                        {uniqueProvince.map((geography,index) => (
                                            <option key={index} value={geography.province_name} />
                                        ))}
                                        </datalist>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Postal Code" id="postalCodeHome" list="postalCodeHomeList"/>
                                        <datalist id="postalCodeHomeList">
                                        {uniqueGeographyTypes.map((geography,index) => (
                                            <option key={index} value={geography.zipcode} />
                                        ))}
                                        </datalist>
                                    </div>
                                    <div className="w-1/2">             
                                        <Input type="text" label="Country" id="countryHome" list="countriesHome"/>
                                        <datalist id="countriesHome">
                                        {countries.map((country) => (
                                            <option key={country.code} value={country.name} />
                                        ))}
                                        </datalist>
                                    </div>
                                </div>
                            </div>
                        }
                        
                    </div>
                </CardContent>
            </Card>
            <Card className="p-4">
                <CardContent>
                    <div className="flex flex-col space-y-4">
                        <div className="flex gap-2 items-center text-[25px]"><MdLocationPin />อาชีพปัจจุบันและแหล่งที่มาของเงินลงทุน</div>
                        <div className="flex space-x-6 ">
                            <div className="flex w-1/2">
                                <select  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700">
                                    <option value="">ระดับการศึกษาสูงสุด</option>
                                    {educationTypes.map((status) => (
                                    <option key={status.id} value={status.id}>
                                    {status.name}
                                    </option>))}
                                </select>
                            </div>
                            <div className="w-1/2">
                                <select  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700">
                                    <option value="">แหล่งที่มาของเงินลงทุน</option>
                                    {sourceOfIncome.map((status) => (
                                    <option key={status.id} value={status.id}>
                                    {status.name}
                                    </option>))}
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="w-1/2">
                                <select  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                    text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700">
                                        <option value="">อาชีพปัจจุบัน</option>
                                        {careerTypes.map((status) => (
                                        <option key={status.id} value={status.id}>
                                        {status.name}
                                        </option>))}
                                </select>
                            </div>
                            <div className="w-1/2">
                                <Input type="text" label="ชื่อสถานที่ทำงาน" id="workPlace"/>
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="w-1/2">
                                <select  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                        text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700">
                                            <option value="">ประเภทธุระกิจ</option>
                                            {businessTypes.map((status) => (
                                            <option key={status.id} value={status.id}>
                                            {status.name}
                                            </option>))}
                                </select>
                            </div>
                            <div className="w-1/2">
                                <Input type="text" label="ตำแหน่งงาน" id="่jobPosition"/>
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="w-1/2">
                                <select  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                        text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700">
                                            <option value="">รายได้ต่อเดือน</option>
                                            {salaryRange.map((status) => (
                                            <option key={status.id} value={status.id}>
                                            {status.name}
                                            </option>))}
                                </select>
                            </div>
                            <div className="w-1/2">
                                
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-4">
                <CardContent>
                    <div className="space-y-4 ">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center text-[25px]"><MdLocationPin />ที่ตั้งที่ทำงาน</div>
                            <div className="flex space-x-6">
                                <div className="space-x-2">
                                    <input id="radio-3" 
                                    name="radio-for-work" 
                                    type="radio"
                                    checked={radioWorkValue === 'radio-3'}
                                    onChange={() => setRadioWorkValue('radio-3')}
                                    />
                                    <label htmlFor="radio-3" >ที่อยู่บัตรประชาชน</label>
                                </div>
                                <div className="space-x-2">
                                    <input id="radio-4" 
                                    name="radio-for-work" 
                                    type="radio"
                                    checked={radioWorkValue === 'radio-4'}
                                    onChange={() => setRadioWorkValue('radio-4')}
                                    />
                                    <label  htmlFor="radio-4" >ที่อยู่ปัจจุบัน</label>
                                </div>
                                <div className="space-x-2">
                                    <input id="radio-5" 
                                    name="radio-for-work" 
                                    type="radio"
                                    checked={radioWorkValue === 'radio-5'}
                                    onChange={() => setRadioWorkValue('radio-5')}
                                    />
                                    <label  htmlFor="radio-5" >ที่อยู่อื่น (โปรดระบุ)</label>
                                </div>
                            </div>
                        </div>
                        {radioWorkValue === "radio-5" && 
                        <div>
                            <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Address Number" id="addressNoWork"/>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Floor" id="floorWork"/>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Moo" id="mooWork"/>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Soi" id="soiWork"/>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Road" id="roadWork"/>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Tambon" id="tambonWork" list="tambonWorkList"/>
                                        <datalist id="tambonWorkList">
                                        {geographyTypes.map((geography,index) => (
                                            <option key={index} value={geography.sub_district_name} />
                                        ))}
                                        </datalist>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Amphoe" id="amphoeWork" list="amphoeWorkList"/>
                                        <datalist id="amphoeWorkList">
                                        {uniqueGeographyTypes.map((geography,index) => (
                                            <option key={index} value={geography.district_name} />
                                        ))}
                                        </datalist>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Province" id="provinceWork" list="provinceWorkList"/>
                                        <datalist id="provinceWorkList">
                                        {uniqueProvince.map((geography,index) => (
                                            <option key={index} value={geography.province_name} />
                                        ))}
                                        </datalist>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Input type="text" label="Postal Code" id="postalCodeWork" list="postalCodeWorkList"/>
                                        <datalist id="postalCodeWorkList">
                                        {uniqueGeographyTypes.map((geography,index) => (
                                            <option key={index} value={geography.zipcode} />
                                        ))}
                                        </datalist>
                                    </div>
                                    <div className="w-1/2">
                                        <Input type="text" label="Country" id="countryWork" list="countriesWork"/>
                                        <datalist id="countriesWork">
                                        {countries.map((country) => (
                                            <option key={country.code} value={country.name} />
                                        ))}
                                        </datalist>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <div className="p-4 space-y-4">
                        <div className="flex gap-2 items-center text-[25px]">วัตถุประสงค์การลงทุน</div>
                        <div className="space-y-4 flex flex-col">
                            <div className="space-x-4">
                                <input 
                                    type="checkbox" 
                                    id="objectiveCheckbox-1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500
                                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    //{...register('register', { required: true })} 
                                />
                                <label htmlFor="objectiveCheckbox-1">เพื่อการลงทุนระยะสั้น</label>
                            </div>
                            <div className="space-x-4">
                                <input 
                                    type="checkbox"
                                    id="objectiveCheckbox-2" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    //{...register('register', { required: true })} 
                                />
                                <label htmlFor="objectiveCheckbox-2">เพื่อการลงทุนระยะยาว</label>
                            </div>
                            <div className="space-x-4">
                                <input 
                                    type="checkbox" 
                                    id="objectiveCheckbox-3" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    //{...register('register', { required: true })} 
                                />
                                <label htmlFor="objectiveCheckbox-3">เพื่อเก็งกำไร</label>
                            </div>
                            <div className="space-x-4">
                                <input 
                                    type="checkbox" 
                                    id="objectiveCheckbox-4" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    //{...register('register', { required: true })} 
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
                            <div className="flex gap-2 items-center text-[25px]">บัญชีธนาคารของท่าน (เพื่อใช้ในการถอนเงิน)</div>
                            <div className="flex items-center text-[15px] text-gray-400"><span className="text-red-500">*</span>กรุณาระบุชื่อธนาคารก่อนกรอกชื่อสาขา</div>
                        </div>
                        <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <select  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                            text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700">
                                                <option value="">กรุณาเลือกธนาคาร</option>
                                                {bank.map((status) => (
                                                <option key={status.code} value={status.code}>
                                                {status.name}
                                                </option>))}
                                    </select>
                                </div>
                                <div className="flex space-x-4">
                                    <Input type="text" label="ชื่อสาขา" id="bankBranch"/>    
                                </div>
                                <div className="flex space-x-4">
                                    <Input type="text" label="กรุณาระบุเลขบัญชี" id="bankAccount"/>
                                </div>
                            </div>
                        <div>
                            <div className="flex items-center justify-between pt-4">
                                <div className="flex gap-2 items-center text-[25px]">
                                    เพิ่มบัญชีธนาคารที่ 2 (เพื่อใช้ในการถอนเงิน)
                                </div>
                                <div className="flex space-x-6">
                                    <div className="space-x-2">
                                        <input id="radio-6" 
                                        name="radio-for-bank" 
                                        type="radio"
                                        checked={addBankValue === 'radio-6'}
                                        onChange={() => setAddBankValue('radio-6')}
                                        />
                                        <label htmlFor="radio-6" >ใช้</label>
                                    </div>
                                    <div className="space-x-2">
                                        <input id="radio-7" 
                                        name="radio-for-bank" 
                                        type="radio"
                                        checked={addBankValue === 'radio-7'}
                                        onChange={() => setAddBankValue('radio-7')}
                                        />
                                        <label  htmlFor="radio-7" >ไม่ใช้</label>
                                    </div>
                                </div>
                            </div>
                            {addBankValue === 'radio-6' && <div className="flex items-center text-[15px] text-gray-400"><span className="text-red-500">*</span>กรุณาระบุชื่อธนาคารก่อนกรอกชื่อสาขา</div>}
                            {addBankValue === 'radio-6' &&
                            <div className="space-y-4 pt-4">
                                <div className="flex space-x-4">
                                    <select  className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                            text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700">
                                                <option value="">กรุณาเลือกธนาคาร</option>
                                                {bank.map((status) => (
                                                <option key={status.code} value={status.code}>
                                                {status.name}
                                                </option>))}
                                    </select>
                                </div>
                                <div className="flex space-x-4">
                                    <Input type="text" label="ชื่อสาขา" id="bankBranchAdditional"/>    
                                </div>
                                <div className="flex space-x-4">
                                    <Input type="text" label="กรุณาระบุเลขบัญชี" id="bankAccountAdditional"/>
                                </div>
                            </div>   
                            }
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
        </form>
    )
}