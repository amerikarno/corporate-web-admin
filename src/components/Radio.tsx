import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface TRadio {
  id: string;
  label: string;
  className?: string;
  type?: string;
}
type checkboxProps = TRadio & ComponentProps<"input">;

export function Radio({
  id,
  label,
  className,
  type = "radio",
  ...props
}: checkboxProps) {
  return (
    <div className="flex flex-row items-center space-x-2 py-1">
      <input id={id} {...props} type={type} />
      <label htmlFor={id} className={cn("", className)}>
        {label}
      </label>
    </div>
  );
}
