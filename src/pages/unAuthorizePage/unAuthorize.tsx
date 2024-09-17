import { RootState } from "@/app/store";
import { urlConfig } from "@/config/url";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UnAuthorize() {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  // const getNavigateLinkByRoles = () => {
  //   let link = null;
  //   let allPages: number[] = [];
  //   urlConfig.map((item) =>
  //     item.children.map((child) => {
  //       allPages.push(child.pageId);
  //     })
  //   );

  //   if (user && user.groups) {
  //     let link = null;
  //     for (let i = 0; i < allPages.length; i++) {
  //       const page = allPages[i];
  //       if (user.groups.includes(page)) {
  //         for (let j = 0; j < urlConfig.length; j++) {
  //           const url = urlConfig[j];
  //           for (let k = 0; k < url.children.length; k++) {
  //             const child = url.children[k];
  //             if (child.pageId === page) {
  //               link = child.href;
  //               return link;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return link;
  // };

  const getNavigateLinkByRoles = (): string | null => {
    if (!user || !user.groups) return null;

    for (const url of urlConfig) {
      const foundChild = url.children.find((child) =>
        user.groups!.includes(child.pageId)
      );
      if (foundChild) {
        return foundChild.href;
      }
    }

    return null;
  };

  useEffect(() => {
    const link = getNavigateLinkByRoles();
    if (link) {
      navigate(link);
    }
  }, []);

  return (
    <div>
      <h1>You're UnAuthorize.</h1>
    </div>
  );
}
