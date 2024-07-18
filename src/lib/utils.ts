import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
