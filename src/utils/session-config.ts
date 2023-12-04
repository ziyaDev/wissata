import { SessionOptions } from "iron-session";
import { env } from "@/lib/env.mjs";
const maxAgeInMonths = 2;
const millisecondsInMonth = 30 * 24 * 60 * 60 * 1000; // 30 days, 24 hours, 60 minutes, 60 seconds, 1000 milliseconds
const maxAge = maxAgeInMonths * millisecondsInMonth;

export const sessionOptions: SessionOptions = {
  password: env.IRON_SESSION_KEY,
  cookieName: "QJDSE_H2",
  cookieOptions: {
    secure: false,
    httpOnly: false,
    sameSite: "strict",
    maxAge: maxAge, // Expires after 4 months
  },
};
