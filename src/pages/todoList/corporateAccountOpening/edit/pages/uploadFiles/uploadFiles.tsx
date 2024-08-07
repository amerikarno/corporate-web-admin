import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import { useUploadFile } from "./hook/useUploadFile";
import { items } from "./constant/variables";

type TUploadFilesProps = {
  corporateCode: string;
};
export default function UploadFiles({ corporateCode }: TUploadFilesProps) {
  const {
    file,
    documentType,
    handleDocumnetTypeChange,
    handleInputChange,
    handleUpload,
  } = useUploadFile();

  return (
    <div className="p-4">
      <Card>
        <CardHeader>Upload Documents</CardHeader>
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
      {/* <p>corporate code : {corporateCode}</p> */}
    </div>
  );
}
