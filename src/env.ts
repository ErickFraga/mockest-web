import { z } from "zod";

const env_mode: "dev" | "prod" = "dev";

// Define your environment variables schema
const envSchema = z.object({
	VITE_API_URL: z.string().url(),
	VITE_API_KEY: z.string().default(""),
});

// Validate environment variables using the schema
const parsedEnv = envSchema.safeParse({
	...import.meta.env,
	VITE_API_URL:
		env_mode === "dev" ? "http://localhost:3000" : import.meta.env.VITE_API_URL,
});

// Handle validation result
if (!parsedEnv.success) {
	console.error("Invalid environment variables:", parsedEnv.error.format());
	throw new Error("Invalid environment variables");
}

// Export the validated environment variables
export const env = parsedEnv.data;
