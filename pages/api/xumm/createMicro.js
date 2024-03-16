const { XummSdk } = require("xumm-sdk");
const { createDecipheriv } = require("crypto");

export default async function handler(req, res) {
    try {
        const { destination, memoStr, address } = req.body;

        const memoType = "XRPLDASH"
        const memoTypeHex = Buffer.from(memoType, 'utf-8').toString('hex');
        const memoStrHex = Buffer.from(memoStr, 'utf-8').toString('hex');

        const xumm = new XummSdk(
            "8099edd7-72d2-48ab-9e30-c0526e7b070f",
            "63cdb6b4-3e90-4e0d-b579-2fb92a8238cd"
        );
         
        const signInPayload = {
            txjson: {
                TransactionType: "Payment",
                Account: address,
                Destination: destination,
                Amount: "10",
                Memos: [
                    {
                        Memo: {
                            MemoType: memoTypeHex,
                            MemoData: memoStrHex
                        }
                    }
                ]
            },
          };
        const payload = await xumm.payload.create(signInPayload, true);
        res.status(200).json({payload: payload});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error});        
    }
}