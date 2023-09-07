const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  try {
    const pubkey = req.query.pubkey;
    const address = req.query.address;
    const uuid = uuidv4();
    const token = jwt.sign(
      { uuid: uuid, public_key: pubkey, address: address },
      process.env.ENC_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
