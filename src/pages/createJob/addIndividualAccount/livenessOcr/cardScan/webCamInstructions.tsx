import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import idCardImage from "@/assets/images/id_card.svg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function CardWebcamInstructions() {
  const navigate = useNavigate();

  const CameraSetting = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>ที่นี่</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>วิธีการตั้งค่าเปิดกล้อง</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-6">
                <div>
                  <h1>ㆍสำหรับ IOS (IPhone/iPad)</h1>
                  <p>
                    &nbsp;&nbsp;โดยเข้าไปที่การตั้งค่า (Settings) เลือก Safari
                    &gt; การเข้าถึงกล้องและไมโครโฟน (Camera &amp; Microphone)
                    &gt; เลือก อนุญาต (Allow)
                  </p>
                </div>
                <div>
                  <h1>ㆍสำหรับ Android (Google Chrome)</h1>
                  <p>
                    &nbsp;&nbsp;ไปที่ Google Chrome คลิกที่ สัญลักษณ์ ...
                    มุมขวาบน/ล่าง &gt; เลือกการตั้งค่า (Settings) &gt;
                    การตั้งค่าเว็บไซต์ (Site Setting) &gt; กล้องถ่ายรูป (Camera)
                    &gt; เลือก อนุญาต (Allow)
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div className="p-10">
      <Card>
        <CardContent>
          <h1 className="py-2 font-bold">
            ถ่ายรูปบัตรประชาชนเพื่อประกอบการยืนยันตัวตน
          </h1>
          <div className="">
            <ol>
              <li>1.จัดบัตรประชาชนให้อยู่ในกรอบ</li>
              <li>2.อยู่ในพื้นที่ที่มีแสงสว่างเพียงพอ</li>
              <li>3.ระวังแสงสะท้อนบนบัตรประชาชนขณะถ่ายบัตร</li>
            </ol>
            <div className="py-6">
              <img src={idCardImage} alt="" />
            </div>
            <div className="py-4">
              <p className="font-bold">หมายเหตุ</p>
              <ol>
                <li>กรุณากด "ตกลง" เพื่อเปิดกล้อง</li>
                <li>
                  หากท่านไม่สามารถถ่ายรูปได้ กรุณาตรวจสอบการตั้งค่า
                  <span className="text-blue-500 px-1 hover:cursor-pointer">
                    <CameraSetting />
                  </span>
                </li>
              </ol>
            </div>
            <Button
              type="button"
              onClick={() =>
                navigate("create-job/added-individual-account/idCardCapture")
              }
            >
              ตกลง
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
