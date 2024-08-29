import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

export function OtpEmailConfirm() {
  const userData = useSelector((state: RootState) => state.addIndividual);
  return (
    <div className="p-10">
      <Card>
        <CardContent>
          <div className="flex flex-row items-end space-x-6">
            <div className="flex flex-row items-center">
              <div className="w-20">pic</div>
              <div>
                <h1>
                  1. ยืนยันหมายเลขโทรศัพท์ของท่านผ่าน OTP{" "}
                  <span className="text-red-500">*</span>
                </h1>
                <Input />
              </div>
            </div>
            <div className="flex flex-row space-x-6">
              <Button>แก้ไข</Button>
              <Button>ยืนยัน</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
