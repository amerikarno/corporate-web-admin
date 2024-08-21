import { urlConfig } from "@/config/url";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "../unAuthorizePage/unAuthorize";

type blankPageProps = {
  name?: string;
};
export default function BlankPage({ name }: blankPageProps) {
  const url = urlConfig.find((parent) =>
    parent.children.find((child) => child.label === name?.toLocaleLowerCase())
  );
  const page = url?.children.find(
    (child) => child.label === name?.toLocaleLowerCase()
  );

  if (page?.pageId && !isAllowedPage(page?.pageId)) {
    return <UnAuthorize />;
  }

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
