import { z } from "zod";

export const corporateAccountOpeningSchema = z.object({
  corporateCode: z.coerce.number(),
  corporateName: z.string(),
  taxId: z.coerce.number(),
  dateFrom: z.string(),
  dateTo: z.string(),
});

export type TCorporateAccountOpening = z.infer<
  typeof corporateAccountOpeningSchema
>;
