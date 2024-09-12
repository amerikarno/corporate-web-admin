import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import { useUploadFile } from "./hook/useUploadFile";
import { documents } from "./constant/variables";
import { TCorporateData, TDocuments } from "../../../constant/type";
import DocumentBox from "@/components/ui/BoxOfUploaded";
import { useEffect } from "react";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { useDispatch, useSelector } from "react-redux";
import { mapToUploadFile } from "../../libs/utils";
import { setFiles } from "@/features/uploadFile/uploadFileSlice";
import { RootState } from "@/app/store";

type TUploadFilesProps = {
};
export default function UploadFiles({
}: TUploadFilesProps) {
  const {
    file,
    documentType,
    handleDocumnetTypeChange,
    handleInputChange,
    handleUpload,
  } = useUploadFile();

  const uploadFile: TDocuments[] = useSelector<RootState>(
    (state) => state.uploadFile?.files || []
  ) as TDocuments[];
  const corporateCode = localStorage.getItem("corporateCode") || "";
  const corporatesInfo: TCorporateData = useSelector<RootState>((state) => state.editCorporate) as TCorporateData;
  console.log(uploadFile);
  const token = getCookies();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const res = await axios.post(
          "/api/v1/corporate/query",
          { corporateCode },
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
          console.log(uploadFiles);
          dispatch(setFiles(uploadFiles));
        }
      } catch (error) {
        console.error("Error fetching upload File data:", error);
      }
    };

    fetchedData();
  }, [corporateCode, dispatch, token]);
  return (
    <div className="p-4">
      <Card className=" p-4 space-y-6">
        <h1 className="text-xl font-bold">Juristic Infomations</h1>
        <div className="flex">
          <div className="w-1/2 space-y-4">
            <div className="flex flex-row gap-4">
              <h1 className="font-bold">Juristic ID</h1>
              <h1 className="">: {corporatesInfo?.CorporateCode ?? ""}</h1>
            </div>
            <div className="flex flex-row gap-4">
              <h1 className="font-bold">Juristic Investor Name</h1>
              <h1 className="">: {corporatesInfo?.Info.name ?? ""}</h1>
            </div>
            <div className="flex flex-row gap-4">
              <h1 className="font-bold">Commercial Number</h1>
              <h1 className="">
                : {corporatesInfo?.Info.registrationNo ?? ""}
              </h1>
            </div>
          </div>
          <div className="w-1/2 space-y-4">
            <div className="flex flex-row gap-4">
              <h1 className="font-bold">Tax ID</h1>
              <h1 className="">: {corporatesInfo?.Info.taxId ?? ""}</h1>
            </div>
            <div className="flex flex-row gap-4">
              <h1 className="font-bold">Date Of Incorporation</h1>
              <h1 className="">
                : {corporatesInfo?.Info.dateOfIncorporation.split("T")[0]}
              </h1>
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div className="p-4 flex space-x-4">
          <div>Uploaded Documents:</div>
          <div className="flex gap-2">
            {uploadFile && uploadFile.length > 0
              ? uploadFile.map((document, index) => (
                  <DocumentBox
                    key={index}
                    fileName={document.fileName}
                    corporateCode={document.corporateCode}
                    id={document.id}
                  />
                ))
              : "No document available"}
          </div>
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
              <Input type="file" onChange={handleInputChange} />
              <Button onClick={() => handleUpload(file, corporateCode)}>
                Upload
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
