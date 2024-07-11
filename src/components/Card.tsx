import { twMerge } from "tailwind-merge";

type TCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function Card(props: TCardProps) {
  const { className, children } = props;
  return (
    <div id="card-container" className={twMerge("", className)}>
      {children}
    </div>
  );
}
