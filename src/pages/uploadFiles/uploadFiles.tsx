import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { TDropdownOption } from "./constant/type";
import { items } from "./constant/variables";

export default function UploadFiles() {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<TDropdownOption | null>(
    null
  );

  const handleDocumnetTypeChange = (option: TDropdownOption | null) => {
    option !== null ? setDocumentType(option) : setDocumentType(null);
    setFilePath(null);
    setFile(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFilePath(url);
      setFile(file);
      console.log(file);
      console.log(url);
    }
  };

  const handleUpload = async (file: File | null) => {
    if (file && file !== null) {
      const fileSizeInKB = file.size / 1024;
      const fileSizeInMB = file.size / (1024 * 1024);
      console.log("size in bytes", file.size);
      console.log("size in KB", fileSizeInKB);
      console.log("size in MB", fileSizeInMB);

      if (fileSizeInMB < 2.0 && documentType !== null) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);
        formData.append("fileType", file.type);
        formData.append("doucumentType", documentType.value);

        console.log(formData);
        console.log(formData);
        console.log(file);

        for (var pair of formData.entries()) {
          console.log(typeof pair[0], pair[0]);
          console.log(typeof pair[1], JSON.stringify(pair[1]));
        }

        try {
          const response = await axios.post("/api/v1/sftp/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getCookies()}`,
            },
          });
          if (response.status === 200) {
            console.log("File uploaded successfully", response.data);
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
      alert("No file selected");
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>Upload Files</CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-row space-x-6 items-center">
            <h1>Document Type</h1>
            <div className="w-1/3 ">
              <Dropdown
                items={items}
                onDropdownSelect={handleDocumnetTypeChange}
              />
            </div>
          </div>
          {documentType && (
            <div className="space-y-4">
              <Input type="file" onChange={handleInputChange} />
              <Button onClick={() => handleUpload(file)}>Upload</Button>
            </div>
          )}
        </CardContent>
      </Card>
      {documentType && filePath && file && (
        <>
          <div className="flex flex-row space-x-8">
            <p>lastModified</p>
            <p>{file.lastModified}</p>
          </div>
          <div className="flex flex-row space-x-8">
            <p>lastModified date</p>
            <p>{new Date(file.lastModified).toString()}</p>
          </div>
          <div className="flex flex-row space-x-8">
            <p>name</p>
            <p>{file.name}</p>
          </div>
          <div className="flex flex-row space-x-8">
            <p>sixe</p>
            <p>{file.size}</p>
          </div>
          <div className="flex flex-row space-x-8">
            <p>type</p>
            <p>{file.type}</p>
          </div>
        </>
      )}
    </div>
  );
}
