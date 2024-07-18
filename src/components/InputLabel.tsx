import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputLabelProps = {
  children: React.ReactNode;
  label: string;
  className?: string;
  icon: React.ReactNode;
  name?: string;
};

type InputProps = InputLabelProps & ComponentProps<"div">;
export function InputLabel({
  children,
  label,
  className,
  icon,
  ...props
}: InputProps) {
  return (
    <>
      <div
        className={twMerge(
          "flex flex-row justify-start space-x-3 items-center",
          className
        )}
        onClick={props.onClick}
      >
        <label htmlFor={props.name}>{label}</label>
        {icon}
      </div>
      {children}
    </>
  );
}
