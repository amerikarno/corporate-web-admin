import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import phoneIcon from "@/assets/images/otp-phone.svg";
import mailIcon from "@/assets/images/otp-mail.svg";
import {
  setIndividualEmail,
  setIndividualMobile,
} from "@/features/addIndividual/addIndividualSlice";
import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { sleep } from "@/lib/utils";

export function OtpEmailConfirm() {
  const initialTime = 10;
  const userData = useSelector((state: RootState) => state.addIndividual);
  const dispatch = useDispatch();
  const [disableMobile, setDisableMobile] = useState(true);
  const [disableEmail, setDisableEmail] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const refCode = useRef<string>("");
  const otpRef = useRef<string>("");
  const [count, setCount] = useState<number>(initialTime);
  const [isCountDone, setIsCountDone] = useState<boolean>(false);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "mobile":
        dispatch(setIndividualMobile(value));
        break;

      case "email":
        dispatch(setIndividualEmail(value));
        break;

      case "otp":
        otpRef.current = value;
        break;

      default:
        break;
    }
  };

  const startTimmer = () => {
    setIsCountDone(false);
    setCount(initialTime);
    setIsDialogOpen(true);

    intervalId.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  };

  const handleConfirm = async (type: string) => {
    switch (type) {
      case "mobile":
        setDisableMobile(true);
        await sleep(1000);
        refCode.current = "123456";
        startTimmer();
        break;

      case "email":
        setDisableEmail(true);
        break;

      default:
        break;
    }
    console.log("click", type);
  };

  const hideOtpNumber = (number?: string) => {
    if (!number) {
      return "xxx-xxx-xxxx";
    }

    let result = "";
    for (let i = 0; i < number.length; i++) {
      if (i < 3 || i > 7) {
        result += number[i];
      } else {
        result += "x";
      }
    }
    return `${result.slice(0, 3)}-${result.slice(3, 6)}-${result.slice(6, 10)}`;
  };

  const convertTimeToString = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const resentOtp = async () => {
    startTimmer();
  };

  useEffect(() => {
    if (count <= 0) {
      clearInterval(intervalId.current!);
      setIsCountDone(true);
    }
  }, [count]);

  return (
    <div className="p-10">
      <Card>
        <CardHeader className="font-bold text-2xl">
          กรุณายืนยัน "หมายเลขโทรศัพท์" และ "อีเมล" ของท่าน
        </CardHeader>
        <CardContent className="space-y-10 py-6">
          <div className="grid grid-cols-12 items-end justify-start space-x-4">
            <div className="col-span-1 w-20">
              <img src={phoneIcon} />
            </div>
            <div className="col-span-11">
              <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                <h1 className="col-span-2">
                  1. ยืนยันหมายเลขโทรศัพท์ของท่านผ่าน OTP
                  <span className="text-red-500"> * </span>
                </h1>
                <div className="col-span-2">
                  <Input
                    name="mobile"
                    value={userData.mobile}
                    onChange={handleInput}
                    disabled={disableMobile}
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <Button
                    onClick={() => setDisableMobile(false)}
                    disabled={!disableMobile}
                  >
                    แก้ไข
                  </Button>
                  <Button onClick={() => handleConfirm("mobile")}>
                    ยืนยัน
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 items-end justify-start space-x-4">
            <div className="col-span-1 w-20">
              <img src={mailIcon} />
            </div>
            <div className="col-span-11">
              <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                <h1 className="col-span-2">
                  2. ยืนยันอีเมลของท่าน
                  <span className="text-red-500"> * </span>
                </h1>
                <div className="col-span-2">
                  <Input
                    name="email"
                    value={userData.email}
                    onChange={handleInput}
                    disabled={disableEmail}
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <Button
                    onClick={() => setDisableEmail(false)}
                    disabled={!disableEmail}
                  >
                    แก้ไข
                  </Button>
                  <Button onClick={() => handleConfirm("email")}>ยืนยัน</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            กรุณายืนยันรหัส OTP 6 หลัก ระบบได้ทำการส่งรหัส OTP ไปยังหมายเลข{" "}
            {hideOtpNumber(userData.mobile)} แล้ว
          </AlertDialogTitle>{" "}
          <AlertDialogTitle>ref code : {refCode.current}</AlertDialogTitle>
          <AlertDialogDescription>
            <div>
              <div className="pb-10">
                <p>
                  รหัส OTP 6 หลัก<span className="text-red-500"> * </span>
                </p>
                <Input name="otp" onChange={handleInput} />
              </div>
              <p>กรุณาตรวจสอบรหัส OTP บนโทรศัพย์มือถือของท่านภายใน 5 นาที</p>
              <p>
                หากท่านไม่ได้รับรหัส OTP{" "}
                {isCountDone ? (
                  <u className="hover:cursor-pointer" onClick={resentOtp}>
                    คลิก
                  </u>
                ) : (
                  <u>กรุณารอ {convertTimeToString(count)} นาที</u>
                )}
              </p>
            </div>
          </AlertDialogDescription>
          <AlertDialogAction
            onClick={() => {
              clearInterval(intervalId.current!);
              setIsDialogOpen(false);
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
