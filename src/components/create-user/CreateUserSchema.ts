import { z } from "zod";

export type CreateUserSchema = z.infer<typeof CreateUser>;

export const CreateUser = z.object({
    first_name: z.string({ required_error: "First name is required" }),
    last_name: z.string({ required_error: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
});
