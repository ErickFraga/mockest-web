import { z } from "zod";

// Define your environment variables schema
const envSchema = z.object({
	VITE_API_URL: z.string().url(),
	VITE_API_KEY: z.string().default(""),
});

// Validate environment variables using the schema
const parsedEnv = envSchema.safeParse(import.meta.env);

// Handle validation resul
if (!parsedEnv.success) {
	console.error("Invalid environment variables:", parsedEnv.error.format());
	throw new Error("Invalid environment variables");
}

// Export the validated environment variables
export const env = parsedEnv.data;
