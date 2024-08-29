import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import SubSuitTest from "./subSuitTest";

export default function SuitTestFatca() {
  const [fatcaradio, setFatcaRadio] = useState("fatcaradio-2");
  const [knowLedgeTest, setKnowLedgeTest] = useState("knowLedgeTest-2");
  return (
    <div className="space-y-8 p-4">
      <Card>
        <CardContent>
          <div className="p-8 space-x-4 flex items-center">
            <select
              className="cursor-pointer p-1.5 block px-0 w-1/2 text-base text-black bg-transparent border-0 border-b-2
               border-gray-500 dark:text-gray-400
               dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            >
              <option value="">ระดับความเสี่ยงในการลงทุนของท่าน</option>
              <option value="choice1">choice1</option>
              <option value="นาง">choice2</option>
              <option value="นางสาว">choice3</option>
            </select>
            <div className="w-1/4 flex justify-center">
              <span className="cursor-pointer text-orange-500 underline  underline-offset-2 mt-4">
                ศึกษาหรือแก้ไขรายละเอียดแบบประเมิน
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <SubSuitTest/>
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
                    checked={fatcaradio === "fatcaradio-1"}
                    onChange={() => setFatcaRadio("fatcaradio-1")}
                  />
                  <label htmlFor="fatcaradio-1">ใช่</label>
                </div>
                <div className="space-x-2">
                  <input
                    id="fatcaradio-2"
                    name="radio-for-fatca"
                    type="radio"
                    checked={fatcaradio === "fatcaradio-2"}
                    onChange={() => setFatcaRadio("fatcaradio-2")}
                  />
                  <label htmlFor="fatcaradio-2">ไม่ใช่</label>
                </div>
              </div>
              <div className="pl-4">
                {fatcaradio === "fatcaradio-1" && (
                  <div className="space-y-4 flex flex-col">
                    <div className="space-x-4">
                      <input
                        type="checkbox"
                        id="fatcaCheckbox-1"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        //{...register('register', { required: true })}
                      />
                      <label htmlFor="fatcaCheckbox-1">
                        เป็นพลเมืองอเมริกา
                      </label>
                    </div>
                    <div className="space-x-4">
                      <input
                        type="checkbox"
                        id="fatcaCheckbox-2"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        //{...register('register', { required: true })}
                      />
                      <label htmlFor="fatcaCheckbox-2">
                        มีกรีนการ์ดหรือบัตรผู้มีที่อยู่ถาวรในอเมริกา
                      </label>
                    </div>
                    <div className="space-x-4">
                      <input
                        type="checkbox"
                        id="fatcaCheckbox-3"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        //{...register('register', { required: true })}
                      />
                      <label htmlFor="fatcaCheckbox-3">
                        มีที่อยู่ในอเมริกาเพื่อวัตถุประสงค์ทางภาษี
                      </label>
                    </div>
                    <div className="space-x-4">
                      <input
                        type="checkbox"
                        id="fatcaCheckbox-4"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        //{...register('register', { required: true })}
                      />
                      <label htmlFor="fatcaCheckbox-4">
                        เกิดในอเมริกาแต่สละสถานะพลเมืองแล้ว
                      </label>
                    </div>
                    <div className="space-x-4">
                      <input
                        type="checkbox"
                        id="fatcaCheckbox-5"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        //{...register('register', { required: true })}
                      />
                      <label htmlFor="fatcaCheckbox-5">
                        มีที่อยู่ในอเมริกาสำหรับบัญชีที่เปิดกับบริษัท ฟินันเซีย
                        ดิจิทัล แอสเซท จำกัด
                      </label>
                    </div>
                    <div className="space-x-4">
                      <input
                        type="checkbox"
                        id="fatcaCheckbox-6"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        //{...register('register', { required: true })}
                      />
                      <label htmlFor="fatcaCheckbox-6">
                        มีเบอร์โทรอเมริกา (ตนเองหรือผู้เกี่ยวข้อง)
                        เกี่ยวข้องกับบัญชีที่เปิดกับบริษัท ฟินันเซีย ดิจิทัล
                        แอสเซท จำกัด
                      </label>
                    </div>
                    <div className="space-x-4">
                      <input
                        type="checkbox"
                        id="fatcaCheckbox-7"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        //{...register('register', { required: true })}
                      />
                      <label htmlFor="fatcaCheckbox-7">
                        มีการโอนเงินอัตโนมัติจากบัญชีที่เปิดกับบริษัท ฟินันเซีย
                        ดิจิทัล แอสเซท จำกัด ไปบัญชีอเมริกา
                      </label>
                    </div>
                    <div className="space-x-4">
                      <input
                        type="checkbox"
                        id="fatcaCheckbox-8"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        //{...register('register', { required: true })}
                      />
                      <label htmlFor="fatcaCheckbox-8">
                        ได้มอบอำนาจให้บุคคลที่อยู่ในอเมริกาทำธุรกรรมใดๆที่เกี่ยวข้องกับบัญชี
                        บริษัท ฟินันเซีย ดิจิทัล เเอสเซท จำกัด
                      </label>
                    </div>
                    <div className="">
                      <Button>ถัดไป</Button>
                    </div>
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
                ท่านต้องการทำแบบทดสอบความรู้ Knowledge Test
              </span>
              <div className="flex space-x-6 pt-4">
                <div className="space-x-2">
                  <input
                    id="knowLedgeTest-1"
                    name="radio-for-knowLedgeTest"
                    type="radio"
                    checked={knowLedgeTest === "knowLedgeTest-1"}
                    onChange={() => setKnowLedgeTest("knowLedgeTest-1")}
                  />
                  <label htmlFor="knowLedgeTest-1">ทำตอนนี้</label>
                </div>
                <div className="space-x-2">
                  <input
                    id="knowLedgeTest-2"
                    name="radio-for-knowLedgeTest"
                    type="radio"
                    checked={knowLedgeTest === "knowLedgeTest-2"}
                    onChange={() => setKnowLedgeTest("knowLedgeTest-2")}
                  />
                  <label htmlFor="knowLedgeTest-2">ทำภายหลัง</label>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4">
                <div className="rounded-full h-3 w-full bg-neutral-200 dark:bg-neutral-600">
                  <div
                    className="rounded-full h-3 bg-primary transition-all"
                    style={{ width: "35%", transitionDuration: "300ms" }}
                  ></div>
                </div>
                <div className="border rounded-full p-5 bg-primary text-neutral-200 font-bold text-lg">
                  0/6
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
