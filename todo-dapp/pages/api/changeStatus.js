import { ethers } from 'ethers';
import * as Constants from "../../utils/config";

async function handler(req, res) {
    try {
        const id = parseInt(req.body);

        if (isNaN(id) || id < 0) {
            res.status(400).json({ message: "Invalid task ID" });
            return;
        }

        const provider = new ethers.providers.JsonRpcProvider(Constants.API_URL);
        const signer = new ethers.Wallet(Constants.PRIVATE_KEY, provider);
        const contract = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);
        const tx = await contract.markAsFinished(id);
        await tx.wait();

        res.status(200).json({ message: "Task status has been changed to Finish" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default handler;
