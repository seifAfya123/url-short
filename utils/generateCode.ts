import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_KEY!;

export function generateHmac(value: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(value)
    .digest("hex").slice(0, 6);;
}

console.log(generateHmac("hello"));
