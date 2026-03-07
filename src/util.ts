import chalk from "chalk";
import { Event } from "./api/types/Event";
import axios from "axios";
import sharp from "sharp";

const themeColors = {
  primary: "#DA003F",
  text: "#ff8e4d",
  variable: "#ff624d",
  error: "#f5426c",
};

type colorType = keyof typeof themeColors;

export const getThemeColor = (color: colorType) =>
  Number(`0x${themeColors[color].substring(1)}`);

export const color = (color: colorType, message: unknown) => {
  return chalk.hex(themeColors[color])(message);
};

export const getSessionEmoji = (shortname: string) => {
  if (shortname.startsWith("FP")) return ":vertical_traffic_light:";
  if (shortname.startsWith("PR")) return ":vertical_traffic_light:";
  if (shortname.startsWith("Q")) return ":timer:";
  if (shortname.startsWith("SPR")) return ":person_running:";
  if (shortname.startsWith("WUP")) return ":fire:";
  if (shortname.startsWith("RAC")) return ":checkered_flag:";

  return ":triangular_flag_on_post:";
};

export const getFlag = (iso: string) => {
  if (iso === "YU" || iso === "UNKNOWN") return ":pirate_flag:";

  return `:flag_${iso.toLowerCase()}:`;
};

export const getClockEmoji = (date: Date): string => {
  // prettier-ignore
  const correctHour = (h: number) => ((h + 24) % 12) || 12;

  const hour = correctHour(date.getHours());
  const minute = date.getMinutes();

  const hourEmoji = minute >= 45 ? correctHour(hour + 1) : hour;
  const minuteEmoji = minute > 15 && minute < 45 ? "30" : "";
  return `:clock${hourEmoji}${minuteEmoji}:`;
};

export const getNextEvent = (events: Event[]): Event | undefined => {
  const now = new Date();

  const next = events.find((e) => {
    return new Date(e.date_end) > now;
  });

  return next;
};

export const downloadAndConvertSvgToPng = async (
  url: string
): Promise<Buffer | null> => {
  try {
    // Fetch the SVG image from the URL
    const response = await axios({
      url: url,
      method: "GET",
      responseType: "arraybuffer",
    });

    const svgBuffer = response.data;

    const pngBuffer = await sharp(svgBuffer).resize(1024).png().toBuffer();

    return pngBuffer;
  } catch (error) {
    return null;
  }
};

export const emoji = {
  a: "🇦",
  b: "🇧",
  c: "🇨",
  d: "🇩",
  e: "🇪",
  f: "🇫",
  g: "🇬",
  h: "🇭",
  i: "🇮",
  j: "🇯",
  k: "🇰",
  l: "🇱",
  m: "🇲",
  n: "🇳",
  o: "🇴",
  p: "🇵",
  q: "🇶",
  r: "🇷",
  s: "🇸",
  t: "🇹",
  u: "🇺",
  v: "🇻",
  w: "🇼",
  x: "🇽",
  y: "🇾",
  z: "🇿",
  0: "0️⃣",
  1: "1️⃣",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
  7: "7️⃣",
  8: "8️⃣",
  9: "9️⃣",
  10: "🔟",
  "#": "#️⃣",
  "*": "*️⃣",
  "!": "❗",
  "?": "❓",
} as const;
