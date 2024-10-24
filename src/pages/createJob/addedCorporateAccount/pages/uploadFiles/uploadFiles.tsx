import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import { useUploadFile } from "./hook/useUploadFile";
import { documents } from "./constant/variables";
import { TCorporateData, TDocuments } from "@/pages/createJob/constant/type";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { getCookies } from "@/lib/Cookies";
import { useEffect } from "react";
import axios from "@/api/axios";
import { setFiles } from "@/features/uploadFile/uploadFileSlice";
import { mapToUploadFile } from "../../libs/utils";
import DocumentBox from "@/components/ui/BoxOfUploaded";
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";

type TUploadFilesProps = {
};
export default function UploadFiles({}: TUploadFilesProps) {
  const {
    file,
    documentType,
    handleDocumnetTypeChange,
    handleInputChange,
    handleUpload,
  } = useUploadFile();

  const registerId = localStorage.getItem("registerId") || "";
  const corporatesInfo: TCorporateData = useSelector<RootState>((state) => state.editCorporate) as TCorporateData;
  const uploadFile: TDocuments[] = useSelector<RootState>(
    (state) => state.uploadFile?.files || []
  ) as TDocuments[];

  console.log(uploadFile)
  const token = getCookies();
  const dispatch = useDispatch();
  const fetchedData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/corporate/query",
        { registerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const uploadFiles = res.data[0].Documents.map((uploadFile: any) => ({
          ...uploadFile,
          id: uploadFile.id,
        }))
          .map(mapToUploadFile)
          .filter((item: any) => item !== null);
        console.log(uploadFiles)
        dispatch(setFiles(uploadFiles));
        dispatch(setCorporateData(res.data[0]));
      }
    } catch (error) {
      console.error("Error fetching upload File data:", error);
    }
  };
  useEffect(() => {
    if(registerId)
      fetchedData();
    else{
      console.log("registerId not found")
    }
  }, [registerId,dispatch,token]);

  return (
    <div className="p-4">
      <Card>
      <Card className=" p-4 space-y-6">
          <h1 className="text-xl font-bold">Juristic Infomations</h1>
          <div className="flex">
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic ID</h1>
                <h1 className="">: {corporatesInfo?.registerId ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic Investor Name</h1>
                <h1 className="">: {corporatesInfo?.Info.name ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Commercial Number</h1>
                <h1 className="">: {corporatesInfo?.Info.registrationNo ?? ""}</h1>
              </div>
            </div>
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Tax ID</h1>
                <h1 className="">: {corporatesInfo?.Info.taxId ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Date Of Incorporation</h1>
                <h1 className="">: {corporatesInfo?.Info.dateOfIncorporation.split("T")[0]}</h1>
              </div>
            </div>
          </div>
        </Card>
        <CardHeader>Upload Documents</CardHeader>
        <div className="flex gap-2">
          {uploadFile && uploadFile.length > 0 ? (
          uploadFile.map((document, index) => (
            <DocumentBox 
              key={index} 
              fileName={document.fileName} 
              registerId={document.registerId} 
              id={document.id}
            />
          ))
        ) : (
          "No document available"
        )}
          </div>
        <CardContent className="space-y-6">
          <div className="flex flex-row space-x-6 items-center">
            <h1>Document Type</h1>
            <div className="w-1/3 ">
              <Dropdown
                items={documents}
                onDropdownSelect={handleDocumnetTypeChange}
              />
            </div>
          </div>
          {documentType !== null && (
            <div className="space-y-4">
              <Input 
                type="file" 
                onChange={handleInputChange} 
                data-testid="inputfile"
              />
              <Button onClick={() => handleUpload(file, registerId)}>
                Upload
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
