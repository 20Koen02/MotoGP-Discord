import "dotenv/config";
import { z } from "zod";
import { color } from "./util";

const envVariables = z.object({
  TOKEN: z.string(),
  CLIENT_ID: z.string().regex(/^\d+$/),
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  NTFY_URL: z.string().url().optional(),
  NTFY_TOKEN: z.string().optional(),
  NTFY_TOPIC: z.string().optional(),
});

const env = envVariables.parse(process.env);

console.log(
  color(
    "text",
    `💾 Loaded ${color(
      "variable",
      Object.keys(env).length
    )} environment variable(s)`
  )
);

if (!env.NTFY_URL || !env.NTFY_TOKEN || !env.NTFY_TOPIC) {
  console.warn(
    color(
      "error",
      "🚫 NTFY_URL, NTFY_TOKEN or NTFY_TOPIC is not set, not sending notifications"
    )
  );
}

export default env;
