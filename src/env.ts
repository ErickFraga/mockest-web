import { z } from "zod";

// Define your environment variables schema
const envSchema = z.object({
	API_URL: z.string().url().default("http://localhost:3301"),
});

// Validate environment variables using the schema
const parsedEnv = envSchema.safeParse(import.meta.env);

// Handle validation result
if (!parsedEnv.success) {
	console.error("Invalid environment variables:", parsedEnv.error.format());
	throw new Error("Invalid environment variables");
}

// Export the validated environment variables
export const env = parsedEnv.data;
