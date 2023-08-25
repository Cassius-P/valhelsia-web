import {NextApiRequest, NextApiResponse} from "next";
import {SQLQuery} from "@/helpers/DBHelper";

interface AchievementID {
    id: string;
}

const handler = async (req: NextApiRequest, res:NextApiResponse) => {

    // Post request with string array as body
    if(req.method === 'POST') {
        await handlePOST(req, res)
    }
}



const handlePOST = async (req: NextApiRequest, res:NextApiResponse) => {
    // Get body
    const body = req.body;
    // Check if body is string array
    console.log(body)
    if(Array.isArray(body) && body.every((e) => typeof e === 'string')) {
        console.log("Verify", body)
        let results = await SQLQuery("SELECT id FROM su_achievements")
        console.log("Results", results)

        const dbIDs = results.map((item:AchievementID) => item.id);

        // Find IDs that are in request body but not in the database
        const idsToAdd = body.filter(id => !dbIDs.includes(id));

        // Find IDs that are in the database but not in request body
        const idsToDelete = dbIDs.filter((id: string) => !body.includes(id));






        return res.status(200).json({ data: idsToAdd});
    }

    return res.status(400).json({ error: 'Invalid body' });
}


export default handler;