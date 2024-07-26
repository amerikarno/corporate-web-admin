import { getCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";

export function formatDateToIsoString(date: Date): string {
  const isoString = date.toISOString();
  const formattedDate = isoString.replace(/\.\d{3}Z$/, "+00:00");
  return formattedDate;
}

export const isExpiredToken = (): boolean => {
  const token = getCookies();
  let isExpired = true;
  if (token && token !== null) {
    try {
      const user = jwtDecode(token);

      if (user && user.exp) {
        const dateTime = new Date(user.exp * 1000);
        isExpired = new Date().getTime() < dateTime.getTime();
      } else {
        console.log("Invalid token: exp field is missing.");
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  return isExpired;
};
