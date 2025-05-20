import { z } from "zod";

export const LoginUser = z.object({
    email: z.string().email(),
    password: z.string()
});

export const SignUpUser = z.object({
    name: z.string().min(3, { message: "Name is required and must be at least 3 characters long" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
});