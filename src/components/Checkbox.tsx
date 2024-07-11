import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface propsType {
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  checkValue: boolean;
}

function Checkbox({ onClick, text, checkValue }: propsType) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <input type="checkbox" onChange={onClick} checked={checkValue} />
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}
export default Checkbox;

interface TCheckboxComponent {
  label: string;
  className?: string;
}
type checkboxProps = TCheckboxComponent & ComponentProps<"input">;

export function CheckBoxComponent({
  label,
  className,
  ...props
}: checkboxProps) {
  return (
    <div className="flex flex-row items-center space-x-2 py-2">
      <input {...props} type="checkbox" />
      <p className={cn("", className)}>{label}</p>
    </div>
  );
}
