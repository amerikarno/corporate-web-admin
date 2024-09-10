import { z } from "zod";

export const fxExchangeSchema = z.object({
  corporateCode: z.coerce.number().min(1,"Corporate Code is required"),
  exchangeRate: z.coerce.number().min(1,"please fill this field first"),
  exchangeSpread: z.coerce.number().min(1,"please fill this field first"),
  operationSpread: z.coerce.number().min(1,"please fill this field first"),
  id: z.string().optional(),
  transactionStatus: z.coerce.number().optional(),
  exchange: z.string().optional(),
});

export type TFxExchange = z.infer<typeof fxExchangeSchema>;

