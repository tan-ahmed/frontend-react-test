import { z } from "zod";

export interface IRegisterSchema {
    email: string;
    password: string;
    passwordConfirmation: string;
    firstName: string;
    lastName: string;
}

export type RegisterFormSchema = z.infer<typeof RegisterSchema>;

export const RegisterSchema = z
    .object({
        email: z.string().email({ message: "Must be a valid email address" }),
        password: z
            .string()
            .min(5, { message: "Must be at least 5 characters long" }),
        passwordConfirmation: z
            .string()
            .min(5, { message: "Must be at least 5 characters long" }),
        firstName: z
            .string({
                required_error: "First name is required",
            })
            .min(3, { message: "Must be at least 3 characters long" }),
        lastName: z
            .string({
                required_error: "Last name is required",
            })
            .min(3, { message: "Must be at least 3 characters long" }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    });
