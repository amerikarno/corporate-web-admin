import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookies } from "./Cookies";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copy<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    const arrCopy = [] as unknown as T;
    (obj as unknown as any[]).forEach((_, i) => {
      (arrCopy as unknown as any[])[i] = copy((obj as unknown as any[])[i]);
    });
    return arrCopy;
  }

  const objCopy = {} as T;
  Object.keys(obj).forEach((key) => {
    (objCopy as any)[key] = copy((obj as any)[key]);
  });

  return objCopy;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function arraysAreEqual<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

export function objectsAreEqual<T>(obj1: T, obj2: T): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const isNumber = (value: string) => {
  return /^\d+$/.test(value);
};

export function lastDigitCheck(id: string) {
  let i = 0;
  let sum = 0;
  for (i; i < 12; i++) {
    sum += parseFloat(id.charAt(i)) * (13 - i);
  }
  const last = (11 - (sum % 11)) % 10;
  // console.log(`last = ${last}`);
  return last.toString();
}

export function checkFormatIDCard(id: string) {
  const lastDigitId = lastDigitCheck(id);
  const idValid = isNumber(id) && lastDigitId == id.charAt(12);
  return idValid;
}

export const isExpiredToken = (): boolean => {
  const token = getCookies();
  let isExpired = true;
  if (token && token !== null) {
    try {
      const user = jwtDecode(token);

      if (user && user.exp) {
        const dateTime = new Date(user.exp * 1000);
        isExpired = new Date().getTime() > dateTime.getTime();
      } else {
        console.log("Invalid token: exp field is missing.");
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  return isExpired;
};

export const isAllowedPage = (pageId: number): boolean => {
  const user = useSelector((state: RootState) => state.user.user);
  if (user && user !== null && user.groups) {
    return user.groups.includes(pageId);
  } else {
    return false;
  }
};

export const isAllowedPageByRange = (pageId: number[]): boolean => {
  const user = useSelector((state: RootState) => state.user.user);
  // console.log(user?.groups);

  const range = pageId[1] - pageId[0];
  const listPages = Array(range)
    .fill(0)
    .map((_, i) => pageId[0] + i);
  // console.log(listPages);

  if (user && user.groups) {
    const hasAlowedPage = listPages.some((value) =>
      user.groups!.includes(value)
    );

    // console.log("hasCommonValue", hasAlowedPage);
    return hasAlowedPage;
  } else {
    return false;
  }
};

export const dateToyyyyMMdd = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const yyyyMMddToDate = (
  dateString: string,
  timeShift?: boolean
): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (timeShift) {
    date.setHours(date.getHours() + 23);
    date.setMinutes(date.getMinutes() + 59);
  }
  return date;
};

export const getImageSrcFromFile = (
  file: File | null | undefined
): Promise<string | undefined> => {
  if (file && file !== null) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } else {
    return new Promise((resolve) => {
      resolve(undefined);
    });
  }
};

export const base64ToFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export function isEmptyObject(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}
