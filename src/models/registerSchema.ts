import { ZodType, z } from "zod";

const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Username Should Be At Least 3 Characters" })
      .max(20, { message: "Username Should Be At Most 20 Characters" }),
    email: z.string().trim().email({ message: "Enter A Valid Email Address" }),
    password: z
      .string()
      .min(8, { message: "Password Should Be At Least 8 Characters" })
      .max(20, { message: "Password Should Be At Most 20 Characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Should Match",
    path: ["confirmPassword"],
  });

export default registerSchema;
