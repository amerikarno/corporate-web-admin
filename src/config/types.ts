export type TUrlConfig = {
    header: string;
    icon: JSX.Element | string | React.ReactNode;
    children: TUrlConfigChild[];
  };
  
  export type TUrlConfigChild = {
    label: string;
    href: string;
  };