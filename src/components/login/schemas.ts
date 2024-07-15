import { z } from "zod";

export const loginFormSchema = z.object({
  source: z.string().refine((val) => val.length === 0 || val.length > 4, {
    message: "Invalid relay.",
  }),
  rememberMe: z.boolean(),
});
