import { z } from "zod";

export const fxExchangeSchema = z.object({
  corporateCode: z.coerce.number().min(1,"Corporate Code is required"),
  exchangeRate: z.coerce.number().min(0.0001,"please fill this field first"),
  exchangeSpread: z.coerce.number().min(0.0001,"please fill this field first"),
  operationSpread: z.coerce.number().min(0.0001,"please fill this field first"),
  id: z.string().optional(),
  transactionStatus: z.coerce.number().optional(),
  exchange: z.string().optional(),
  buyCurrency: z.coerce.number().min(1,"please fill this field first"),
});

export type TFxExchange = {
  corporateCode: number | undefined;
  exchangeRate: number | undefined;
  exchangeSpread: number | undefined;
  operationSpread: number | undefined;
  id?: string;
  transactionStatus?: number | undefined;
  exchange?: string;
  buyCurrency?: number | undefined;
}

