import { z } from "zod";

export const individualAccountSchema = z.object({
  thTitle: z.string().min(1, "title cannot be empty"),
  thName: z.string().min(1, "firstname cannot be empty"),
  thSurname: z.string().min(1, "lastname cannot be empty"),
  engTitle: z.string().min(1, "title cannot be empty"),
  engName: z.string().min(1, "firstname cannot be empty"),
  engSurname: z.string().min(1, "lastname cannot be empty"),
  email: z.string().min(1, "email cannot be empty"),
  mobile: z.string().min(1, "mobile cannot be empty"),
  birthDate: z.string().min(1, "birthDate cannot be empty"),
  mariageStatus: z.string().min(1, "mariageStatus cannot be empty"),
  citizenId: z.string().min(1, "idCard cannot be empty"),
  laserCode: z.string().min(1, "laserCode cannot be empty"),
  agreement: z.boolean(),
});

export type TIndividualAccount = z.infer<typeof individualAccountSchema>;
