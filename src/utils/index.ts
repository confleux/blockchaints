import * as crypto from "crypto";

const genHash = (data: string): string => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

export { genHash };