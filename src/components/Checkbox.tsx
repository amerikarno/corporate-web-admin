import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface TCheckbox {
  label: string;
  className?: string;
}
type checkboxProps = TCheckbox & ComponentProps<"input">;

export function CheckBox({ label, className, ...props }: checkboxProps) {
  return (
    <div className="flex flex-row items-center space-x-2 py-1">
      <input {...props} type="checkbox" />
      <p className={cn("", className)}>{label}</p>
    </div>
  );
}
