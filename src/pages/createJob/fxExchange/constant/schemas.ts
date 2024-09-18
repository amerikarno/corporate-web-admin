import { z } from "zod";

export const fxExchangeSchema = z.object({
  corporateCode: z.coerce.number().min(1,"Corporate Code is required"),
  exchangeRate: z.string().min(1,"please fill this field first"),
  exchangeSpread: z.string().min(1,"please fill this field first"),
  operationSpread: z.string().min(1,"please fill this field first"),
  id: z.string().optional(),
  transactionStatus: z.coerce.number().optional(),
  exchange: z.string().optional(),
  buyCurrency: z.string().min(1,"please fill this field first"),
});

export type TFxExchange = {
  corporateCode: number | undefined;
  exchangeRate: string | number;
  exchangeSpread: string | number;
  operationSpread: string | number;
  id?: string;
  transactionStatus?: number | undefined;
  exchange?: string;
  buyCurrency?: string | number;
}

