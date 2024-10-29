import { z } from "zod";

export const bankOrderSchema = z.object({
    bankName: z.string().min(1,"Bank Name is required"),
    bankAccount: z.string().min(1,"Account ID is required"),
    orderValue: z.string().min(1,"Amount is required"),
    accountId: z.coerce.number().min(1,"Corporate Code is required"),
});