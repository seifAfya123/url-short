import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_KEY!;

function generateHmac(value: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(value)
    .digest("hex");
}

console.log(generateHmac("hello"));
