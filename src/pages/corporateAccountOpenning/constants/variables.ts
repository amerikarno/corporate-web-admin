import { TJuristicType } from "@/pages/corporate/constants/types";

export const juristicTypeObject: TJuristicType[] = [
  {
    main: { id: "11", name: "Juristic (Thailand)", value: 0 },
    sub: [
      { id: "12", name: "Tax Exempt On Dividend And Capital Gain", value: 0 },
      { id: "13", name: "Non-Tax Exempt", value: 0 },
    ],
  },
  {
    main: { id: "21", name: "Juristic (Foreign)", value: 0 },
    sub: [
      { id: "22", name: "Operating In Thailand", value: 0 },
      { id: "23", name: "Non-Operating in Thailand", value: 0 },
    ],
  },
  {
    main: { id: "31", name: "Others", value: 0 },
    sub: [
      { id: "32", name: "Partnership (Thailand)", value: 0 },
      {
        id: "33",
        name: "Government Organization / State Enterprise",
        value: 0,
      },
      {
        id: "34",
        name: "Co-operative / Foundation / Association / Club / Temple / Mosque / Shrine",
        value: 0,
      },
      { id: "35", name: "Tax Exempt Company", value: 0 },
    ],
  },
];
