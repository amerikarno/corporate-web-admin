// npm install face-api.js

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const BlinkDetection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // เปลี่ยนเป็นที่เก็บโมเดลของคุณ
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      startVideo();
    }
  }, [modelsLoaded]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {},
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam: ", error);
    }
  };

  const handleVideoPlay = () => {
    const detectBlink = async () => {
      if (videoRef.current) {
        const options = new faceapi.TinyFaceDetectorOptions();
        const result = await faceapi
          .detectSingleFace(videoRef.current, options)
          .withFaceLandmarks();

        if (result) {
          const leftEye = result.landmarks.getLeftEye();
          const rightEye = result.landmarks.getRightEye();

          const leftEAR = calculateEAR(leftEye);
          const rightEAR = calculateEAR(rightEye);

          const EAR = (leftEAR + rightEAR) / 2.0;

          // Threshold สำหรับการตรวจจับการกระพริบตา
          if (EAR < 0.2) {
            console.log("Blink detected!");
          }
        }
      }

      requestAnimationFrame(detectBlink);
    };

    detectBlink();
  };

  const calculateEAR = (eye: faceapi.Point[]) => {
    const p2_p6 = Math.sqrt(
      Math.pow(eye[1].x - eye[5].x, 2) + Math.pow(eye[1].y - eye[5].y, 2)
    );
    const p3_p5 = Math.sqrt(
      Math.pow(eye[2].x - eye[4].x, 2) + Math.pow(eye[2].y - eye[4].y, 2)
    );
    const p1_p4 = Math.sqrt(
      Math.pow(eye[0].x - eye[3].x, 2) + Math.pow(eye[0].y - eye[3].y, 2)
    );
    const EAR = (p2_p6 + p3_p5) / (2.0 * p1_p4);
    return EAR;
  };

  return (
    <div>
      <video
        ref={videoRef}
        onPlay={handleVideoPlay}
        style={{ display: modelsLoaded ? "block" : "none" }}
        width="720"
        height="560"
        autoPlay
        muted
      />
      {!modelsLoaded && <p>Loading models...</p>}
    </div>
  );
};

export default BlinkDetection;

/*
อธิบายโค้ด
โหลดโมเดล: ใน loadModels เราโหลดโมเดลต่างๆ ที่จำเป็นสำหรับการตรวจจับใบหน้าและลักษณะใบหน้า (facial landmarks) โดยใช้ face-api.js

เริ่มต้นวิดีโอ: เมื่อโมเดลโหลดเสร็จแล้ว เราเริ่มต้นกล้องโดยใช้ getUserMedia และแสดงผลวิดีโอในองค์ประกอบ <video>

ตรวจจับการกระพริบตา: เมื่อวิดีโอเริ่มทำงาน ฟังก์ชัน handleVideoPlay จะถูกเรียกใช้เพื่อเริ่มตรวจจับใบหน้าและคำนวณค่า EAR (Eye Aspect Ratio) จากตำแหน่งของดวงตาที่ตรวจพบ ถ้าค่า EAR ต่ำกว่า 0.2 ก็ถือว่าเกิดการกระพริบตา

การคำนวณ EAR: ฟังก์ชัน calculateEAR ใช้ตำแหน่งของดวงตาที่ได้จาก facial landmarks เพื่อตรวจสอบว่าตาเปิดหรือปิด โดยคำนวณความแตกต่างระหว่างจุดบนตา

การตั้งค่าโมเดล
ไฟล์โมเดลที่ใช้ใน face-api.js สามารถดาวน์โหลดได้จาก GitHub repository ของ face-api.js และควรเก็บไว้ในไดเรกทอรี /public/models ในโปรเจกต์ React ของคุณ เพื่อให้เข้าถึงได้ผ่าน /models URL

สรุป
ด้วยการใช้ face-api.js ใน React TypeScript คุณสามารถตรวจจับการกระพริบตาได้บน Frontend โดยไม่จำเป็นต้องเรียกใช้ API จาก Backend โค้ดนี้แสดงถึงการใช้งานง่ายๆ ของ WebRTC และ face-api.js เพื่อสร้างโซลูชันการตรวจสอบ "liveness" ที่สามารถทำงานได้แบบเรียลไทม์

หากคุณต้องการความช่วยเหลือเพิ่มเติมหรือพบปัญหาในการใช้งาน โปรดแจ้งให้ทราบครับ!
*/
