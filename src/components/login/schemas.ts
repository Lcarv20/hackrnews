import { z } from "zod";
import { relaySingleInputSchema } from "../relay-input";

export const loginFormSchema = z.object({
  source: relaySingleInputSchema.nullable().optional(),
  rememberMe: z.boolean(),
});
