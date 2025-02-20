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
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { useDispatch, useSelector } from "react-redux";
import { clearIndividualData, setIndividualData } from "@/features/fetchIndividualData/fetchIndividualDataSlice";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import Alert from "@/components/alert/Alert";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";

export default function IdentityVerification() {
  const navigate = useNavigate();
  const token = getCookies();
  const dispatch = useDispatch();

  const fetchIndividualData = async (registerId: string) => {
    try {
      console.log(registerId);
      const res = await axios.post(
        "/api/v1/individual/list",
        { registerId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setIndividualData(res.data[0]));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const individualData = useSelector(
    (state: RootState) => state.individualData.individualDatas
  );
  useEffect(() => {
    const registerIdValue = localStorage.getItem("registerId");
    if (registerIdValue) {
      fetchIndividualData(registerIdValue || "");
    }else{
      console.log("registerId not found");
    }
  }, [token, dispatch]);


  const [alertVisible, setAlertVisible] = useState(false);
  const handleClose = () => {
    if(alertType === "success"){
      setAlertVisible(false);
      navigate("/create-job/added-individual-account/");
      dispatch(clearIndividualData());
      localStorage.clear();
    }
    setAlertVisible(false);
  };

  const [alertType,setAlertType] = useState("");
  // const [alertMessage,setAlertMessage] = useState("");
  
  const handleNdid = async () => {
    let body = {
      ndid:true,
      registerId:localStorage.getItem('registerId')
    }
    dispatch(setTestCorporateData(body));
    console.log("ndid choosed : ",body)
    try{
      if(individualData?.thaid || individualData?.ndid){
        const res = await axios.post("/api/v1/individual/update/ndidthaid",body,
          { headers: {
           Authorization: `Bearer ${token}`,
         }},)
         if(res.status === 200){
           console.log("update ndid success :",res)
           setAlertVisible(true);
           setAlertType("success")
          //  setAlertMessage("Thanks for your submission")
         }else{
          console.log("update ndid not success :",res)
          setAlertVisible(true);
          setAlertType("error")
          // setAlertMessage("please try again")
         }
      }else{
        const res = await axios.post("/api/v1/individual/ndidthaid",body,
          { headers: {
           Authorization: `Bearer ${token}`,
         }},)
         if(res.status === 200){
           console.log("save ndid success :",res)
           setAlertVisible(true);
           setAlertType("success")
          //  setAlertMessage("Thanks for your submission")
         }else{
          console.log("save ndid not success :",res)
          setAlertVisible(true);
          setAlertType("error")
          // setAlertMessage("please try again")
         }
      }
    }catch(error){
      console.log("save ndid not success :",error)
      setAlertVisible(true);
      setAlertType("error")
      // setAlertMessage("please try again")
    } 
  }
  const handlethaiid = async () => {
    let body = {
      thaid:true,
      registerId:localStorage.getItem('registerId')
    }
    dispatch(setTestCorporateData(body));
    console.log("thaid choosed : ",body)
    try{
      if(individualData?.thaid || individualData?.ndid){
        const res = await axios.post("/api/v1/individual/update/ndidthaid",body,
          { headers: {
           Authorization: `Bearer ${token}`,
         }},)
         if(res.status === 200){
           console.log("update thaid success :",res)
           setAlertVisible(true);
           setAlertType("success")
          //  setAlertMessage("Thanks for your submission")
         }else{
          console.log("update thaid not success :",res)
          setAlertVisible(true);
          setAlertType("error")
          // setAlertMessage("please try again")
         }
      }else{
        const res = await axios.post("/api/v1/individual/ndidthaid",body,
          { headers: {
           Authorization: `Bearer ${token}`,
         }},)
         if(res.status === 200){
           console.log("save thaid success :",res)
           setAlertVisible(true);
           setAlertType("success")
          //  setAlertMessage("Thanks for your submission")
         }else{
          console.log("save thaid not success :",res)
          setAlertVisible(true);
          setAlertType("error")
          // setAlertMessage("please try again")
         }
      }
    }catch(error){
      console.log("save ndid not success :",error)
      setAlertVisible(true);
      setAlertType("error")
      // setAlertMessage("please try again")
    } 
  }
  return (
    <div className="flex flex-col items-center p-8 pt-16 space-y-8 md:mx-16">
        {alertVisible && (
            <Alert
              type={alertType}
              onClose={handleClose}
              data-testid="alertResponse"
            />
          )}
      <div className="flex flex-col items-center text-slate-800">
        <span className="font-bold text-lg md:text-2xl">ท่านสามารถเลือก "ยืนยันตัวตน" ดังนี้</span>
        <span className="text-base md:text-lg">กรุณาเลือกช่องทางการยืนยันตัวตนที่ท่านสะดวกอย่างใดอย่างหนึ่ง</span>
        <span className="text-base md:text-lg">หลังการยืนยันตัวตน ท่านจะได้รับ Username & Password ผ่านทางอีเมลล์</span>
      </div>
      <Card className="flex items-center pb-14 md:w-3/4 relative">
        <div className="m-8 w-20 md:w-28 flex-shrink-0 flex">
          <img src={ndid} alt="ndid"/>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-800 font-bold py-4 text-lg md:text-2xl ">1.NDID</span>
          <span className="text-sm md:text-base">1. ยืนยันตัวตนและสมัคร NDID กับธนาคารที่ท่านใช้บริการเรียบร้อยแล้วเท่านั้น</span>
          <span className="text-sm md:text-base">2. ทำรายการให้สำเร็จภายใน 1 ชม.</span>
          <span className="p-4 pl-0 md:pl-4 text-sm md:text-base"><span className="underline font-bold pr-4 text-sm md:text-base">หมายเหตุ</span>ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้</span>
          <div className="absolute bottom-4 left-[43%]">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" data-testid="ndidButton" className="bg-slate-800 text-white hover:bg-slate-700 hover:text-white w-36 font-bold">ตกลง</Button>
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
                    <AlertDialogAction onClick={handleNdid} data-testid="comfirmButton">ตกลง</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </div>
        </div>
      </Card>
      <Card className="flex items-center pb-14 md:w-3/4 relative">
      <div className="m-8 w-20 md:w-28 flex-shrink-0 flex">
          <img src={thaiid} alt="thaiid"/>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-800 font-bold py-4 text-lg md:text-2xl ">2.THAID</span>
          <span className="text-sm md:text-base">1. ยืนยันตัวตนผ่าน THAID</span>
          <span className="text-sm md:text-base">2. ทำรายการให้สำเร็จภายใน 1 วัน</span>
          <span className="p-4 pl-0 md:pl-4 text-sm md:text-base"><span className="underline font-bold pr-4 text-sm md:text-base">หมายเหตุ</span>ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้</span>
          <div className="absolute bottom-4 left-[43%]">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" data-testid="thaidButton" className="bg-slate-800 text-white hover:bg-slate-700 hover:text-white w-36 font-bold">ตกลง</Button>
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
                  <AlertDialogAction onClick={handlethaiid} data-testid="thaidComfirmButton">ตกลง</AlertDialogAction>
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
          <span className="flex items-center"><MdEmail />callcenter@email.com</span>
        </div>  
      </div>
    </div>
  )
}