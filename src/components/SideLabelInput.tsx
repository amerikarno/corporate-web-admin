import { twMerge } from "tailwind-merge";

export type TSideLabelInputProps = {
  title: string;
  children: React.ReactNode;
  labelClassName?: string;
  childrenClassName?: string;
};
export function SideLabelInput({
  title,
  children,
  labelClassName,
  childrenClassName,
}: TSideLabelInputProps) {
  return (
    <div className="flex flex-row">
      <h1 className={twMerge("w-1/4 flex items-center", labelClassName)}>
        {title}
      </h1>
      <div
        className={twMerge(
          "w-3/4 flex items-center flex-col",
          childrenClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
