import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";
import idCardOverlay from "@/assets/images/ID_Card_overlay.svg";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setIdCardImage } from "@/features/livenessOcr/livenessOcr";

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
  const livenessOcr = useSelector((state: RootState) => state.livenessOcr);
  const dispatch = useDispatch();

  useEffect(() => {
    if (livenessOcr.idCardImage && livenessOcr.idCardImage !== null) {
      setImageSrc(livenessOcr.idCardImage);
    }
  }, []);

  const handleCapture = () => {
    const srcImg = webcamRef.current?.getScreenshot();
    setImageSrc(srcImg);
    if (srcImg && srcImg !== null) {
      dispatch(setIdCardImage(srcImg));
    }
  };

  const handleSubmit = async () => {
    console.log("face image", livenessOcr.faceImage);
    console.log("id image", livenessOcr.idCardImage);
    console.log("sent image to server");
  };

  return (
    <div className="p-10 space-y-8 w-[514px]">
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
      <h2>
        วางด้านหน้าบัตรประชาชนให้อยู่ในกรอบที่กำหนด และหลีกเลี่ยงแสงสะท้อน
        เห็นข้อมูลบนบัตรชัดเจน
      </h2>
      <div className="flex justify-center">
        <Camera className="w-10 h-10" onClick={() => handleCapture()} />
      </div>
      {/* {imageSrc && imageSrc !== null && (
        <div className="space-y-4">
          <img src={imageSrc} alt="screenshot" />
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </div>
      )} */}
      {imageSrc && imageSrc !== null && (
        <div className="flex justify-center">
          <Button onClick={() => handleSubmit()}>Next</Button>
        </div>
      )}
    </div>
  );
}
