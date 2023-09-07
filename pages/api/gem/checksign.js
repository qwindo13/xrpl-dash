const jwt = require("jsonwebtoken");
const rippleKP = require("ripple-keypairs");
const crypto = require("crypto");

const encrypt = (text, password) => {
  if (process.versions.openssl <= "1.0.1f") {
    throw new Error("OpenSSL Version too old, vulnerability to Heartbleed");
  }
  // let iv = crypto.randomBytes(IV_LENGTH);
  let iv = process.env.ENC_IV;
  iv = Buffer.from(iv, "utf8");
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(password), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export default async function handler(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({ error: "Unauthorized" });
    const { public_key, address } = jwt.verify(token, process.env.ENC_KEY);
    const { signature } = req.query;

    const tokenHex = Buffer.from(token, "utf8").toString("hex");
    console.log("tokenHex: ", tokenHex);
    const isVerified = rippleKP.verify(tokenHex, signature, public_key);
    if (isVerified) {
      const token = encrypt(address, process.env.ENC_KEY);
      res.status(200).json({ token: token, address: address });
    } else {
      res.status(400).json({ error: "Signature not verified" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message, line: error.stack });
  }
}
