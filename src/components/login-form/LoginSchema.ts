import { z } from "zod";

export interface ILoginSchema {
    email: string;
    password: string;
}

export type LoginFormSchema = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
    email: z.string().email({ message: "Must be a valid email address" }),
    password: z
        .string()
        .min(5, { message: "Must be at least 5 characters long" }),
});
