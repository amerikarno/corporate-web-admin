import { TDropdownOption, TRiskItem } from "./type";

export const items: TDropdownOption[] = [
  {
    id: 1,
    value: "Normal Documents (PDF)",
  },
  {
    id: 2,
    value: "Confidential Documents (PDF)",
  },
  {
    id: 3,
    value: "Corporate Documents (PDF)",
  },
  { id: 4, value: "Images (JPEG, JPG, PNG)" },
  {
    id: 5,
    value: "Others",
  },
];

export const acceptedFileTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
];

export const riskItems: TRiskItem[] = [
  {
    id: 1,
    value: "Low",
  },
  {
    id: 2,
    value: "Medium",
  },
  {
    id: 3,
    value: "High",
  },
];
