import {NextApiRequest, NextApiResponse} from "next";

import {statusJava} from 'node-mcstatus'


const SERVER_IP = '146.59.177.169';
const SERVER_PORT = 25618; // Default Minecraft port

const handler = async (req: NextApiRequest, res:NextApiResponse) => {
    try {
        const status = await statusJava(SERVER_IP, SERVER_PORT);
        res.status(200).json({ status });


    } catch (error) {
        res.status(500).json({ error: 'Failed to query Minecraft server', message: error });
    }
}


export default handler;