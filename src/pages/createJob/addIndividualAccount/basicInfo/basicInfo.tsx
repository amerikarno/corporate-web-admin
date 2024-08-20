import { Card, CardContent } from "@/components/ui/card";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import { TiHome } from "react-icons/ti";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { MdLocationPin } from "react-icons/md";
import { useState } from "react";
export default function BasicInfo() {
    if (!isAllowedPage(2002)) {
        return <UnAuthorize />;
      }
    const [radioAddressValue, setRadioAddressValue] = useState('radio-1');
    const [radioWorkValue, setRadioWorkValue] = useState('radio-3');
    return(
        <div className="space-y-8 p-4">
            <Card>
                <CardContent>
                    <form className="p-4 space-y-4">
                        <div className="flex gap-2 items-center text-[25px]"><TiHome />ที่อยู่บัตรประชาชน</div>
                        <div className="space-y-4">
                            <div className="flex space-x-4">
                                <Input type="text" label="Address Number"/>
                                <Input type="text" label="Floor"/>
                                <Input type="text" label="Moo"/>
                                <Input type="text" label="Building"/>
                                <Input type="text" label="Soi"/>
                                <Input type="text" label="Road"/>
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex w-1/2 space-x-4">
                                    <Input type="text" label="Tambon"/>
                                    <Input type="text" label="Amphoe"/>
                                </div>
                                <div className="flex w-1/2 space-x-4">
                                    <Input type="text" label="Province"/>
                                    <Input type="text" label="Postal Code"/>
                                    <Input type="text" label="Country"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card className="p-4">
                <CardContent>
                    <form className="space-y-4 ">
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
                        <div>
                            <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <Input type="text" label="Address Number"/>
                                    <Input type="text" label="Floor"/>
                                    <Input type="text" label="Moo"/>
                                    <Input type="text" label="Building"/>
                                    <Input type="text" label="Soi"/>
                                    <Input type="text" label="Road"/>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex w-1/2 space-x-4">
                                        <Input type="text" label="Tambon"/>
                                        <Input type="text" label="Amphoe"/>
                                    </div>
                                    <div className="flex w-1/2 space-x-4">
                                        <Input type="text" label="Province"/>
                                        <Input type="text" label="Postal Code"/>
                                        <Input type="text" label="Country"/>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        
                    </form>
                </CardContent>
            </Card>
            <Card className="p-4">
                <CardContent>
                    <form className="flex flex-col space-y-4">
                        <div className="flex gap-2 items-center text-[25px]"><MdLocationPin />อาชีพปัจจุบันและแหล่งที่มาของเงินลงทุน</div>
                        <div className="flex space-x-6">
                            <div className="flex w-1/2">
                                <select  className="cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full dark:bg-gray-700 dark:border-gray-600
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700">
                                    <option value="">ระดับการศึกษาสูงสุด</option>
                                    <option value="มัธยมศึกษาหรือตํ่ากว่า">มัธยมศึกษาหรือตํ่ากว่า</option>
                                    <option value="อนุปริญญา">อนุปริญญา</option>
                                    <option value="ปริญญาตรี">ปริญญาตรี</option>
                                    <option value="ปริญญาโท">ปริญญาโท</option>
                                    <option value="ปริญญาเอกหรือสูงกว่า">ปริญญาเอกหรือสูงกว่า</option>
                                </select>
                            </div>
                            <div className="w-1/2">
                                <Input type="text" label="แหล่งที่มาของเงินลงทุน"/>
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="w-1/2">
                                <Input type="text" label="อาชีพปัจจุบัน"/>
                            </div>
                            <div className="w-1/2">
                                <Input type="text" label="ชื่อสถานที่ทำงาน"/>
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="w-1/2">
                                <Input type="text" label="ประเภทธุระกิจ"/>
                            </div>
                            <div className="w-1/2">
                                <Input type="text" label="ตำแหน่งงาน"/>
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="w-1/2">
                                <Input type="text" label="รายได้ต่อเดือน"/>
                            </div>
                            <div className="w-1/2">
                                
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card className="p-4">
                <CardContent>
                    <form className="space-y-4 ">
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
                                    <Input type="text" label="Address Number"/>
                                    <Input type="text" label="Floor"/>
                                    <Input type="text" label="Moo"/>
                                    <Input type="text" label="Building"/>
                                    <Input type="text" label="Soi"/>
                                    <Input type="text" label="Road"/>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex w-1/2 space-x-4">
                                        <Input type="text" label="Tambon"/>
                                        <Input type="text" label="Amphoe"/>
                                    </div>
                                    <div className="flex w-1/2 space-x-4">
                                        <Input type="text" label="Province"/>
                                        <Input type="text" label="Postal Code"/>
                                         <Input type="text" label="Country"/>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}