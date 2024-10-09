import { createHmac } from "crypto";

export const encrypt = (salt: string, password: string): string => {
  return createHmac("sha256", salt).update(password).digest("hex");
};
