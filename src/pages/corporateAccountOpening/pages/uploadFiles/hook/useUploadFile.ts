import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { useState } from "react";
import { TDropdownOption } from "../constant/type";
import { acceptedFileTypes } from "../constant/variables";

export function useUploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<TDropdownOption | null>(
    null
  );

  const handleDocumnetTypeChange = (option: TDropdownOption | null) => {
    option !== null ? setDocumentType(option) : setDocumentType(null);
    setFile(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async (file: File | null, corporateCode: string) => {
    if (file && file !== null) {
      if (acceptedFileTypes.includes(file.type)) {
        const fileSizeInMB = file.size / (1024 * 1024);

        if (fileSizeInMB < 2.0 && documentType !== null) {
          const formData = new FormData();
          formData.append("file", file);
          // formData.append("flieName", file.name);
          // formData.append("fileTypes", file.type);
          formData.append("docType", documentType.value);
          formData.append("corporateCode", corporateCode);

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
              console.log("File uploaded successfully", response.data);
              setFile(null);
              setDocumentType(null);
            } else {
              console.log("Error uploading file", response.data);
            }
          } catch (error) {
            console.error("Error uploading file", error);
          }
        } else {
          alert("File size should be less than 2MB");
        }
      } else {
        alert("File type support only PDF, PNG, JPG, JPEG");
      }
    } else {
      alert("No file selected");
    }
  };

  return {
    file,
    documentType,
    handleDocumnetTypeChange,
    handleInputChange,
    handleUpload,
  };
}
