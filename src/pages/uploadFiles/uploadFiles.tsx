import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";

export default function UploadFiles() {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleFileTypeChange = (
    option: { key: string; value: string } | null
  ) => {
    option !== null ? setFileType(option.value) : setFileType(null);
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
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("date", new Date().toISOString());
      fileType !== null ? formData.append("fileType", fileType) : null;

      console.log(new Date().toISOString(), fileType);
      console.log(filePath, filePath?.endsWith(".pdf"));

      //   try {
      //     const response = await axios.post("/upload", formData, {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //         Authorization: `Bearer ${getCookies()}`,
      //       },
      //     });
      //     console.log("File uploaded successfully", response.data);
      //   } catch (error) {
      //     console.error("Error uploading file", error);
      //   }
    } else {
      console.log("No file selected");
    }
  };

  const items: { key: string; value: string }[] = [
    { key: "PDF", value: "PDF" },
    { key: "JPEG", value: "JPEG" },
    { key: "PNG", value: "PNG" },
  ];

  return (
    <div className="p-4">
      <Card>
        <CardHeader>Upload Files</CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-row space-x-6 items-center">
            <h1>File Type</h1>
            <div className="w-1/3 ">
              <Dropdown items={items} onDropdownSelect={handleFileTypeChange} />
            </div>
          </div>
          {fileType && (
            <div className="space-y-4">
              <Input type="file" onChange={handleInputChange} />
              <Button onClick={() => handleUpload(file)}>Upload</Button>
            </div>
            // <div className="flex flex-row space-x-8">
            //   <h1>Browse</h1>
            //   <Input type="file" onChange={handleInputChange} />
            // </div>
          )}
          {/* {fileType && imageUrl && (
            <div>
              {fileType === "PDF" && imageUrl.endsWith(".pdf") && (
                <div className="mt-4">
                  <embed
                    src={imageUrl}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                </div>
              )}
              {((fileType === "JPEG" && imageUrl.endsWith(".jpg")) ||
                (fileType === "PNG" && imageUrl.endsWith(".png"))) && (
                <div className="mt-4">
                  <img
                    src={imageUrl}
                    alt="Selected file"
                    className="max-w-full h-auto"
                  />
                </div>
              )}
            </div>
          )} */}
        </CardContent>
      </Card>
      {fileType && filePath && file && (
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
