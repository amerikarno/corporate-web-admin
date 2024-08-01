import { SideLabelInput } from "@/components/SideLabelInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TodoCorporateAccountOpenning() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Corporate Account Opening</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <SideLabelInput title="Corporate ID">
            <Input type="text" />
          </SideLabelInput>
          <div className="flex flex-row">
            <SideLabelInput title="Date From">
              <Input type="date" />
            </SideLabelInput>
            <SideLabelInput title="Date To">
              <Input type="date" />
            </SideLabelInput>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
