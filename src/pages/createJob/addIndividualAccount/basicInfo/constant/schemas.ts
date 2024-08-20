import { z } from "zod";

export const basicInfoSchema = z.object({
  
});

export type TBasicInfo = z.infer<typeof basicInfoSchema>;
