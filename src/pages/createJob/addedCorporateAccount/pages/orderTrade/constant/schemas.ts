import { z } from "zod";

export const orderTradeSchema = z.object({
  corporateCode: z.coerce.number(),
  cryptoAmount: z.coerce.number(),
  fiatAmount: z.coerce.number(),
  currency: z.string(),
  cryptoPrice: z.coerce.number(),
  pair: z.string()
});