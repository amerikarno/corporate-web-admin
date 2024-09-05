import thaiid from "./assets/thaiid.png"
import ndid from "./assets/ndid.png"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function IdentityVerification() {
  return (
    <div className="flex flex-col items-center p-8 pt-16 space-y-8 md:mx-16">
      <div className="flex flex-col items-center text-slate-800">
        <span className="font-bold text-2xl">ท่านสามารถเลือก "ยืนยันตัวตน" ดังนี้</span>
        <span className="text-lg">กรุณาเลือกช่องทางการยืนยันตัวตนที่ท่านสะดวกอย่างใดอย่างหนึ่ง</span>
        <span className="text-lg">หลังการยืนยันตัวตน ท่านจะได้รับ Username & Password ผ่านทางอีเมลล์</span>
      </div>
      <Card className="flex items-center p-4 pb-20 md:w-3/4 relative">
        <div className="m-8 w-28 flex-shrink-0 flex">
          <img src={ndid} alt="NDID"/>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-800 font-bold py-4 text-2xl ">1.NDID</span>
          <span>1. ยืนยันตัวตนและสมัคร NDID กับธนาคารที่ท่านใช้บริการเรียบร้อยแล้วเท่านั้น</span>
          <span>2. ทำรายการให้สำเร็จภายใน 1 ชม.</span>
          <span className="p-4 pl-0 md:pl-4"><span className="underline font-bold pr-4">หมายเหตุ</span>ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้</span>
          <div className="absolute bottom-4 left-[43%]">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="bg-slate-800 text-white hover:bg-slate-700 hover:text-white w-36 font-bold">ตกลง</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>คุณแน่ใจมั้ย?</AlertDialogTitle>
                    <AlertDialogDescription>
                    หมายเหตุ ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>ตกลง</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </div>
        </div>
      </Card>
      <Card className="flex items-center p-4 pb-20 md:w-3/4 relative">
      <div className="m-8 w-32 h-32 flex-shrink-0 flex">
          <img src={thaiid} alt="THAIID"/>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-800 font-bold py-4 text-2xl ">2.THAIID</span>
          <span>1. ยืนยันตัวตนผ่าน THAIID</span>
          <span>2. ทำรายการให้สำเร็จภายใน 1 วัน</span>
          <span className="p-4 pl-0 md:pl-4"><span className="underline font-bold pr-4">หมายเหตุ</span>ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้</span>
          <div className="absolute bottom-4 left-[43%]">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-slate-800 text-white hover:bg-slate-700 hover:text-white w-36 font-bold">ตกลง</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>คุณแน่ใจมั้ย?</AlertDialogTitle>
                  <AlertDialogDescription>
                  หมายเหตุ ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>ตกลง</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Card>
      <div className="flex flex-col md:text-lg font-bold">
        <div className="flex justify-center">
          <span className="font-normal">สอบถามข้อมูลเพิ่มเติม</span>
        </div>
        <div className="flex md:flex-row flex-col md:space-x-4 items-center">
          <span className="flex items-center"><FaPhoneAlt />020884666</span>
          <span className="flex items-center"><MdEmail />callcenter@finansiada.com</span>
        </div>  
      </div>
    </div>
  )
}