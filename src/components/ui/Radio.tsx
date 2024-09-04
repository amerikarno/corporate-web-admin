import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import "./radio.css";

interface TCheckbox {
  id: string;
  label: string;
  className?: string;
  type?: string;
}
type checkboxProps = TCheckbox & ComponentProps<"input">;

export function RadioCheckBox({
  id,
  label,
  className,
  type = "checkbox",
  ...props
}: checkboxProps) {
  return (
    <div className={cn("", "radio")}>
      <input id={id} {...props} type={type} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
