import { MessageConfig, MessagePriority, NtfyClient } from "./ntfy-package";
import env from "../env";
import { color } from "../util";

const ntfy = new NtfyClient(env.NTFY_URL);

export const notify = async (
  title: string,
  message: string,
  tags: string | string[],
  priority: MessagePriority = MessagePriority.DEFAULT,
  options?: MessageConfig
) => {
  console.log(
    color(
      "text",
      `📣 ${title}: ${color("variable", message)} ${
        tags ? `(${tags})` : ""
      } (priority: ${priority})`
    )
  );

  if (!env.NTFY_URL || !env.NTFY_TOKEN || !env.NTFY_TOPIC) return;

  await ntfy.publish({
    title,
    message,
    priority,
    tags,

    ...options,

    topic: env.NTFY_TOPIC,
    authorization: {
      username: "",
      password: env.NTFY_TOKEN,
    },
  } as MessageConfig);
};
