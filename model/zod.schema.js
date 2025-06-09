import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please enter a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please enter a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, "Password must be at least 6 characters"),
});

export const addNoteSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(5, { message: "Description must be at least 5 characters" }),
  tag: z
    .string()
    .trim()
    .min(2, { message: "Tag must be at least 2 characters" })
    .default("general"),
});
