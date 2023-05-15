const { XummSdk } = require("xumm-sdk");

export default async function handler(req, res) {
    try {

        const xumm = new XummSdk(
            "8099edd7-72d2-48ab-9e30-c0526e7b070f",
            "63cdb6b4-3e90-4e0d-b579-2fb92a8238cd"
        );
         
        const signInPayload = {
            txjson: {
              TransactionType: "SignIn",
            },
          };
        const payload = await xumm.payload.create(signInPayload, true);
        res.status(200).json({payload: payload});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error});        
    }
}