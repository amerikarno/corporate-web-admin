import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import BlinkDetection from "./livenessOcr/livenessOcr";

export default function AddIndividualAccount() {
  if (!isAllowedPage(2002)) {
    return <UnAuthorize />;
  }

  return <BlinkDetection />;
}
