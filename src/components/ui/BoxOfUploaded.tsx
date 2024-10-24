import axios from "@/api/axios";
import { deleteFile } from "@/features/uploadFile/uploadFileSlice";
import { getCookies } from "@/lib/Cookies";
import { useDispatch } from "react-redux";


const DocumentBox = ({registerId , fileName,id}:any) => {
    const dispatch = useDispatch();
    const handleDeleteFile = async () => {
        console.log("body : ", {id : id})
        try{
            const response = await axios.post(
                "/api/v1/corporate/document/delete",
                {id : id},
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getCookies()}`,
                  },
                }
              );
            if (response.status === 200) {
                console.log("Delete Successful!",response)
                dispatch(deleteFile(id))
            }else{
                console.log("Delete File error ,",response)
            }
        }catch(error){
            console.log("Delete File error ,",error)
        }
    }
  return (
    <div className="text-[10px] rounded-md flex flex-col bg-slate-300 p-2 border-4 cursor-pointer relative">
      <div className="font-bold flex items-center justify-center border-black absolute -top-1.5 -right-1.5 
      focus:outline-none text-white bg-slate-800 hover:bg-red-500 
      focus:ring-4 focus:ring-red-300 rounded-full dark:bg-red-600
    dark:hover:bg-red-700 dark:focus:ring-red-900 text-s px-1.5" onClick={handleDeleteFile}>x</div>
      <div></div><span><span className="font-bold">Corporate Code : </span>{registerId}</span>
      <span><span className="font-bold">File Name : </span>{fileName}</span>
    </div>
  );
};


export default DocumentBox;