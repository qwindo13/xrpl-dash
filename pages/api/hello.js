// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//rfFfo87G2a7R7Csr1f6yHm7gxVGvx8ypo3
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

export default function handler(req, res) {
  res.status(200).json({ name: encrypt(req.query.address, process.env.ENC_KEY) });
}
