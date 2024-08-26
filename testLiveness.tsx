import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const LivenessDetection: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isFaceInFrame, setIsFaceInFrame] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  const detectLiveness = async () => {
    if (webcamRef.current && modelsLoaded) {
      const video = webcamRef.current.video!;
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );

      const canvas = canvasRef.current;
      const width = canvas!.width;
      const height = canvas!.height;

      // กำหนดค่าตำแหน่งและขนาดของวงรี
      const centerX = width / 2;
      const centerY = height / 2;
      const ellipseWidth = width * 0.4;
      const ellipseHeight = height * 0.6;

      if (detections.length > 0) {
        const box = detections[0].box;
        const faceCenterX = box.x + box.width / 2;
        const faceCenterY = box.y + box.height / 2;

        // ตรวจสอบว่าศูนย์กลางของใบหน้าอยู่ในวงรีหรือไม่
        const isInEllipse =
          Math.pow(faceCenterX - centerX, 2) / Math.pow(ellipseWidth, 2) +
            Math.pow(faceCenterY - centerY, 2) / Math.pow(ellipseHeight, 2) <=
          1;

        setIsFaceInFrame(isInEllipse);
      } else {
        setIsFaceInFrame(false);
      }
    }
  };

  const drawStaticEllipseWithMask = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) return;

    const width = canvas!.width;
    const height = canvas!.height;

    // เคลียร์ Canvas ก่อนวาดใหม่
    ctx.clearRect(0, 0, width, height);

    // วาดพื้นหลังสีทึบ
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, width, height);

    // กำหนดค่าตำแหน่งและขนาดของวงรี
    const centerX = width / 2;
    const centerY = height / 2;
    const ellipseWidth = width * 0.4;
    const ellipseHeight = height * 0.6;

    // วาดวงรีโปร่งใสโดยการตัดออกจากพื้นหลัง
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.ellipse(
      centerX,
      centerY,
      ellipseWidth,
      ellipseHeight,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // เปลี่ยนโหมดการวาดกลับเป็นปกติ
    ctx.globalCompositeOperation = "source-over";

    // วาดเส้นกรอบวงรี เปลี่ยนสีตามสถานะของใบหน้า
    ctx.beginPath();
    ctx.ellipse(
      centerX,
      centerY,
      ellipseWidth,
      ellipseHeight,
      0,
      0,
      2 * Math.PI
    );
    ctx.lineWidth = 4;
    ctx.strokeStyle = isFaceInFrame ? "green" : "black";
    ctx.stroke();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detectLiveness();
      drawStaticEllipseWithMask();
    }, 100);
    return () => clearInterval(interval);
  }, [modelsLoaded]);

  return (
    <div style={{ position: "relative", width: "640px", height: "480px" }}>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: "user",
        }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default LivenessDetection;
