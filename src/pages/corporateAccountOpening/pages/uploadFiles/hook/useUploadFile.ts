import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { useState } from "react";
import { TDropdownOption } from "../constant/type";
import { acceptedFileTypes } from "../constant/variables";
import { AxiosError } from "axios";

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
          console.log(documentType.value);
          console.log(corporateCode);
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
          } catch (error: AxiosError | any) {
            // console.error("Catch Error uploading file", error);
            if (error.response) {
              // Server responded with a status other than 2xx
              console.error("Error response:", error.response);
              alert(
                `Error: ${error.response.status} - ${
                  error.response.data.message || "File upload failed"
                }`
              );
            } else if (error.request) {
              // Request was made but no response received
              console.error("Error request:", error.request);
              alert("No response from server. Please try again later.");
            } else {
              // Something else caused the error
              console.error("Error message:", error.message);
              alert("An unexpected error occurred. Please try again.");
            }
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
