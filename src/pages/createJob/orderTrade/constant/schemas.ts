import { z } from "zod";

export const orderTradeSchema = z.object({
  corporateCode: z.coerce.number().min(1,"Corporate Code is required"),
  cryptoAmount: z.coerce.number().min(1,"Crypto Amount is required"),
  fiatAmount: z.coerce.number().min(1,"Fiat Amount is required"),
  currency: z.string().min(1,"Currency is required"),
  cryptoPrice: z.coerce.number().min(1,"Crypto Price is required"),
  pair: z.string()
});