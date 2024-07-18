import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { InputLabel } from "./InputLabel";

type TCollapsisProps = {
  children: React.ReactNode;
  label: string;
};
export function Collapsis(props: TCollapsisProps) {
  const { children, label } = props;
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <InputLabel
        label={label}
        className="font-bold hover:cursor-pointer hover:bg-secondary"
        onClick={() => setCollapsed(!collapsed)}
        icon={collapsed ? <ChevronUp /> : <ChevronDown />}
      >
        {collapsed ? children : null}
      </InputLabel>
    </>
  );
}
