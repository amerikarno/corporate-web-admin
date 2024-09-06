import { z } from "zod";
export const searchIndividualSchema = z
  .object({
    AccountID: z.string(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.dateFrom && data.dateTo) {
        const fromDate = new Date(data.dateFrom);
        const toDate = new Date(data.dateTo);
        return fromDate <= toDate;
      }
      return true;
    },
    {
      message: "date from must be less than or equal to date to",
      path: ["dateFrom"],
    }
  );

  export type TSearchIndividualSchema = z.infer<
  typeof searchIndividualSchema
>;