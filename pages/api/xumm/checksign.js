const verifySignature = require("verify-xrpl-signature").verifySignature;
const crypto = require("crypto");

const encrypt = (text, password) => {
  console.log(`text: ${text}`);
  if (process.versions.openssl <= "1.0.1f") {
    throw new Error("OpenSSL Version too old, vulnerability to Heartbleed");
  }
  console.log(`password: ${password}`);
  // let iv = crypto.randomBytes(IV_LENGTH);
  let iv = process.env.ENC_IV;
  iv = Buffer.from(iv, "utf8");
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(password), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

// const decrypt = (text, password) => {
//   let textParts = text.split(":");
//   let iv = Buffer.from(textParts.shift(), "hex");
//   let encryptedText = Buffer.from(textParts.join(":"), "hex");
//   let decipher = crypto.createDecipheriv(
//     "aes-256-cbc",
//     Buffer.from(password),
//     iv
//   );
//   let decrypted = decipher.update(encryptedText);

//   decrypted = Buffer.concat([decrypted, decipher.final()]);

//   return decrypted.toString();
// };

export default function handler(req, res) {
    try {
        const resp = verifySignature(req.query.hex);
        if (resp.signatureValid === true) {
            // res.status(200).json({xrpAddress:resp.signedBy});
            const xrpAddress = resp.signedBy;
            console.log(`xrpAddress: ${xrpAddress}`);
            const encrypted = encrypt(xrpAddress, process.env.ENC_KEY);
            console.log(`encrypted: ${encrypted}`);
            res.status(200).json({xrpAddress:resp.signedBy, token:encrypted});
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}