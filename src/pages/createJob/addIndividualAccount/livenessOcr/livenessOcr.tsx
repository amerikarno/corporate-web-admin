import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";

const BlinkDetection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [leftImg, setLeftImg] = useState<boolean>(false);
  const [rightImg, setRightImg] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const [circleColor, setCircleColor] = useState<string>("black");

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (stream) {
      const track = stream.getVideoTracks()[0];
      track.onended = () => {
        console.log("Video track ended");
        setStream(null);
      };
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

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
        setStream(stream);
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
          if (rightEAR > 0.65 && !rightImg) {
            console.log("Turned left");
            //   await captureImage("left");
          }
          if (leftEAR > 0.65 && !leftImg) {
            console.log("Turned right");
            //   await captureImage("right");
          }
          const mouth = result.landmarks.getMouth();
          const mouthDist = mouthDistance([
            mouth[13],
            mouth[14],
            mouth[15],
            mouth[17],
            mouth[18],
            mouth[19],
          ]);
          if (mouthDist > 35) {
            console.log("Mouth opened");
          } else {
            console.log("Mouth closed");
          }
          //   closeUp([
          //     result.landmarks.positions[0],
          //     result.landmarks.positions[16],
          //   ]);
          //   console.log("result", result);
          //   drawFaceLandmark(result);
          drawStaticEllipse(result);
        }
      }

      requestAnimationFrame(detectBlink);
    };

    detectBlink();
  };

  const closeUp = (face: faceapi.Point[]) => {
    if (face[0].x > 220 && face[1].x > 420) {
      console.log("far");
    }

    if (face[0].x < 170 && face[1].x < 370) {
      console.log("closed");
    }
  };

  const captureImage = async (name: string) => {
    if (name === "left" && !leftImg) {
      await capture("left");
      setLeftImg(true);
    } else if (name === "right" && !rightImg) {
      await capture("right");
      setRightImg(true);
    }
  };

  const capture = async (name: string) => {
    if (videoRef.current) {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      // Draw the current video frame on the canvas
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Convert canvas to Blob
        canvas.toBlob((blob) => {
          if (blob) {
            // Create a File from the Blob
            const file = new File([blob], `${name}-${Date.now()}.png`, {
              type: "image/png",
            });

            // Save the file locally (browser prompts user to save file)
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = file.name;
            link.click();

            // Optionally, send the file to the server
            // sendFileToServer(file);
          }
        }, "image/png");
      }
    }
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

  const mouthDistance = (mp: faceapi.Point[]) => {
    const p1_p4 = Math.sqrt(
      Math.pow(mp[0].x - mp[3].x, 2) + Math.pow(mp[0].y - mp[3].y, 2)
    );
    const p2_p5 = Math.sqrt(
      Math.pow(mp[1].x - mp[4].x, 2) + Math.pow(mp[1].y - mp[4].y, 2)
    );
    const p3_p6 = Math.sqrt(
      Math.pow(mp[2].x - mp[5].x, 2) + Math.pow(mp[2].y - mp[5].y, 2)
    );

    const mouthDistance = (p1_p4 + p2_p5 + p3_p6) / 3.0;
    return mouthDistance;
  };

  const sendFileToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("corporateCode", "800000001");
    formData.append("docType", "id");

    try {
      const response = await axios.post(
        "/api/v1/corporate/document/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getCookies()}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Image uploaded successfully");
      } else {
        console.error("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const drawFaceLandmark = (
    result: faceapi.WithFaceLandmarks<{
      detection: faceapi.FaceDetection;
    }>
  ) => {
    const ctx = canvasRef2.current?.getContext("2d");
    if (ctx && videoRef.current) {
      // Clear the previous drawings
      ctx.clearRect(
        0,
        0,
        canvasRef2.current!.width,
        canvasRef2.current!.height
      );

      // Resize canvas to match video dimensions
      faceapi.matchDimensions(canvasRef2.current!, {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      });

      const resizedResults = faceapi.resizeResults(result, {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      });

      const box = resizedResults.detection.box;
      console.log("Face Bounding Box:", box);

      // facelandmarks
      faceapi.draw.drawFaceLandmarks(canvasRef2.current!, resizedResults);
      // face box
      faceapi.draw.drawDetections(canvasRef2.current!, resizedResults);
    }
  };

  const drawStaticEllipse = (
    // color: string,
    detections: faceapi.WithFaceLandmarks<{
      detection: faceapi.FaceDetection;
    }>
  ) => {
    // Resize canvas to match video dimensions
    faceapi.matchDimensions(canvasRef.current!, {
      width: videoRef.current!.videoWidth,
      height: videoRef.current!.videoHeight,
    });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    // เคลียร์กรอบก่อนวาดใหม่
    ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
    // วาดพื้นหลังสีทึบ
    ctx!.fillStyle = "rgba(0, 0, 0, 0.7)";
    // ctx!.fillStyle = "rgba(255,255, 255, 1.0)";
    ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

    // วาดกรอบวงรีตรงกลางหน้าจอ
    const centerX = canvas!.width / 2;
    const centerY = canvas!.height / 2;
    const ellipseWidth = canvas!.width * 0.15;
    const ellipseHeight = canvas!.height * 0.3;

    const box = detections.detection.box;
    const faceCenterX = box.x + box.width / 2;
    const faceCenterY = box.y + box.height / 2;

    // console.log("face", box.x, box.width, box.y, box.height);
    // console.log("centerX", centerX, "centerY", centerY);
    // console.log("ellipse", ellipseWidth, ellipseHeight);
    // console.log("canvas", canvas!.width, canvas!.height);
    // console.log("faceCenter", faceCenterX, faceCenterY);

    let color = "green";

    if (
      Math.abs(faceCenterX - centerX) < 10 &&
      Math.abs(faceCenterY - 30 - centerY) < 10
    ) {
      //   console.log("face is in center");
      color = "green";
    } else {
      //   console.log("face is not in center");
      color = "black";
    }

    // const isInEllipse =
    //   Math.pow(faceCenterX - centerX, 2) / Math.pow(ellipseWidth, 2) +
    //     Math.pow(faceCenterY - centerY, 2) / Math.pow(ellipseHeight, 2) <=
    //   1;
    // console.log("is in ellipse", isInEllipse);

    // Set composite mode to 'destination-out' to cut out the ellipse area
    ctx!.globalCompositeOperation = "destination-out";
    ctx!.beginPath();
    ctx!.ellipse(
      centerX,
      centerY,
      ellipseWidth,
      ellipseHeight,
      0,
      0,
      2 * Math.PI
    );
    ctx!.fill();
    // Reset composite mode to default
    ctx!.globalCompositeOperation = "source-over";

    // draw ellipse
    ctx?.beginPath();
    ctx?.ellipse(
      centerX,
      centerY,
      ellipseWidth,
      ellipseHeight,
      0,
      0,
      2 * Math.PI
    );
    ctx!.lineWidth = 3;
    ctx!.strokeStyle = color;
    ctx!.stroke();
  };

  return (
    <>
      <div className="relative">
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

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "720px",
            height: "560px",
          }}
        />
        <canvas
          ref={canvasRef2}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "720px",
            height: "560px",
          }}
        />
      </div>
    </>
  );
};

export default BlinkDetection;
