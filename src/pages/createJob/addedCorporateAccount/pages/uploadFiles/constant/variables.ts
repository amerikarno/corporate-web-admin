import { TDropdownOption, TRiskItem } from "./type";

export const documents: TDropdownOption[] = [
  {
    id: 1,
    // value: "Normal Documents (PDF)",
    value: "id",
  },
  {
    id: 2,
    // value: "Confidential Documents (PDF)",
    value: "bank",
  },
  {
    id: 3,
    value: "address",
    // value: "Corporate Documents (PDF)",
  },
  {
    id: 4,
    // value: "Images (JPEG, JPG, PNG)"
    value: "passport",
  },
  // {
  //   id: 5,
  //   value: "Others",
  // },
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
