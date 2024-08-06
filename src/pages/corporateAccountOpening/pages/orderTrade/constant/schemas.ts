import { z } from "zod";

export const orderTradeSchema = z.object({
  corporateCode: z.string().min(1, "Corporate Code cannot be empty"),
  symbol: z.string().min(1, "This field cannot be empty"),
  tradeValue: z.string().min(1, "Value cannot be empty"),
  tradeAmount: z.string().min(1, "Amount cannot be empty"),
});