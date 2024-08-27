import { z } from "zod";

export const individualAccountSchema = z.object({
  thTitle: z.string().min(1, "title cannot be empty"),
  thName: z.string().min(1, "firstname cannot be empty"),
  thSurname: z.string().min(1, "lastname cannot be empty"),
  engTitle: z.string().min(1, "title cannot be empty"),
  engName: z.string().min(1, "firstname cannot be empty"),
  engSurname: z.string().min(1, "lastname cannot be empty"),
  email: z
    .string()
    .email({ message: "Invalid email address. Please enter a valid email." }),
  mobile: z.string().min(1, "mobile cannot be empty"),
  //   agreement: z.boolean(),
  birthDate: z.string().min(1, "birthDate cannot be empty"),
  mariageStatus: z.string().min(1, "mariageStatus cannot be empty"),
  citizenId: z.string().min(1, "citizenId cannot be empty"),
  lasorCode: z.string().min(1, "lasorCode cannot be empty"),
  termOfAgreement: z.boolean(),
});

export type TIndividualAccount = z.infer<typeof individualAccountSchema>;
