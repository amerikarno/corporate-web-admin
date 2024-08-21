export type TUrlConfig = {
  header: string;
  icon: JSX.Element | string | React.ReactNode;
  children: TUrlConfigChild[];
  pages: number[];
};

export type TUrlConfigChild = {
  label: string;
  href: string;
  pageId: number;
};
