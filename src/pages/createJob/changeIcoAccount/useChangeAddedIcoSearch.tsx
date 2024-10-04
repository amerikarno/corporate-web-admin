// import { useState } from "react";
// // import { TIndividualData } from "./type";
// import { getCookies } from "@/lib/Cookies";
// import axios from "@/api/axios";
// import { yyyyMMddToDate } from "@/lib/utils";
// import { z } from "zod";
// // import { useNavigate } from "react-router-dom";
// // import { TCorporateAccountOpening } from "../constant/type";

// export const searchIndividualSchema = z
//   .object({
//     AccountID: z.string(),
//     dateFrom: z.string().optional(),
//     dateTo: z.string().optional(),
//   })
//   .refine(
//     (data) => {
//       if (data.dateFrom && data.dateTo) {
//         const fromDate = new Date(data.dateFrom);
//         const toDate = new Date(data.dateTo);
//         return fromDate <= toDate;
//       }
//       return true;
//     },
//     {
//       message: "date from must be less than or equal to date to",
//       path: ["dateFrom"],
//     }
//   );

// type TBody = {
//   dateFrom: Date | null;
//   dateTo: Date | null;
//   AccountID: string;
// };
// export function useToDoIndividualAccount() {
//   const [searchResult, setSearchResult] = useState<TIndividualData>();

//   const handleSearch = async (data: TSearchIndividualSchema) => {
//     const { dateFrom, dateTo } = data;

//     // Set invalid dates to null
//     const body: TBody = {
//       ...data,
//       dateFrom: dateFrom ? yyyyMMddToDate(dateFrom) : null,
//       dateTo: dateTo ? yyyyMMddToDate(dateTo, true) : null,
//     };

//     console.log(body);
//     if (
//       body.AccountID === "" &&
//       body.dateFrom === null &&
//       body.dateTo === null
//     ) {
//       try {
//         const res = await axios.post(
//           "/api/v1/individual/list",
//           {},
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${getCookies()}`,
//             },
//           }
//         );
//         setSearchResult(res.data);
//         console.log(res);
//         return res.data;
//       } catch (error) {
//         console.log(error);
//         alert("No data found.");
//         return null;
//       }
//     } else {
//       try {
//         console.log(body);
//         let formatBody
//         if(body.AccountID){
//           formatBody = {
//             accountID: body.AccountID
//           }
//         }else{
//           formatBody = body
//         }
//         console.log("formatBody:",formatBody);
//         const res = await axios.post("/api/v1/individual/list", formatBody, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getCookies()}`,
//           },
//         });
//         setSearchResult(res.data);
//         console.log(res);
//         return res.data;
//       } catch (error) {
//         console.log(error);
//         if (data.dateFrom === data.dateTo) {
//         } else {
//           alert("No data found.");
//         }
//         return null;
//       }
//     }
//   };

//   return {
//     handleSearch,
//     searchResult,
//   };
// }
