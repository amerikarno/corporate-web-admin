import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";
import idCardOverlay from "@/assets/images/ID_Card_overlay.svg";
import { Button } from "@/components/ui/button";

const layoutWidth = 514;
const layoutHeight = 326;

const videoConstraints = {
  width: layoutWidth,
  height: layoutHeight,
  facingMode: "user",
};

export default function IDCardCapture() {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null | undefined>();

  const handleCapture = () => {
    const srcImg = webcamRef.current?.getScreenshot();
    setImageSrc(srcImg);
    console.log(srcImg);
  };

  const handleSubmit = async () => {
    console.log("sent image to server");
  };

  return (
    <div className="p-10 space-y-8">
      <h1>โปรดอยู่ในที่แสงสว่างเพียงพอ หรือไม่มีแสงสะท้อน</h1>
      <div className="relative">
        <Webcam
          audio={false}
          width={layoutWidth}
          height={layoutHeight}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
        />
        <div className="absolute top-0">
          <img
            src={idCardOverlay}
            alt="ID Card Overlay"
            width={layoutWidth}
            height={layoutHeight}
          />
        </div>
      </div>
      <div className="">
        <h3>
          วางด้านหน้าบัตรประชาชนให้อยู่ในกรอบที่กำหนด
          <br />
          และหลีกเลี่ยงแสงสะท้อน เห็นข้อมูลบนบัตรชัดเจน
        </h3>
      </div>
      <Camera onClick={() => handleCapture()} />
      {imageSrc && imageSrc !== null && (
        <div className="space-y-4">
          <img src={imageSrc} alt="screenshot" />
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </div>
      )}
    </div>
  );
}
