const verifySignature = require("verify-xrpl-signature").verifySignature;

export default async function handler(req, res) {
    try {
        const resp = await verifySignature(req.query.hex);
        if (resp.signatureValid === true) {
            res.status(200).json({xrpAddress:resp.signedBy});
        }
    } catch (error) {
        res.status(400).json(error);
    }
}