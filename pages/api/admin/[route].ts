import {NextApiRequest, NextApiResponse} from "next";

const SERVER_API_TOKEN = process.env.SERVER_API_TOKEN;
const SERVER_API_URL = "https://cp.actiniumcloud.com/api/client/servers/a34d9d84-050f-4e13-8658-cae3bb0d2692/"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if(!SERVER_API_TOKEN) {
        return res.status(500).json({message: 'Server API token not found'});
    }

    const askedRoute = req.query.route as string;

    switch (askedRoute) {
        case 'details':
            DETAILS(req, res);
            break;
        case 'resources':
            RESOURCES(req, res);
            break;
        case 'console':
            CONSOLE(req, res);
            break;
        case 'command':
            COMMAND(req, res);
            break;
        case 'power':
            POWER(req, res);
            break;
        default:
            res.status(404).json({message: 'Not found'});

    }
}

const DETAILS = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'GET') {
        res.status(405).json({message: 'Method not allowed'});
    }
    const response = await fetch(SERVER_API_URL, {
        headers: {
            'Authorization': 'Bearer ' + SERVER_API_TOKEN
        }
    });

    const data = await response.json();
    return res.status(200).json(data);
}
const RESOURCES = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'GET') {
        res.status(405).json({message: 'Method not allowed'});
    }
    const response = await fetch(SERVER_API_URL + 'resources', {
        headers: {
            'Authorization': 'Bearer ' + SERVER_API_TOKEN
        }
    });

    const data = await response.json();
    return res.status(200).json(data);
}

const CONSOLE = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'GET') {
        res.status(405).json({message: 'Method not allowed'});
    }
    const response = await fetch(SERVER_API_URL + 'websocket', {
        headers: {
            'Authorization': 'Bearer ' + SERVER_API_TOKEN
        }
    });
    const data = await response.json();
    return res.status(200).json(data);
}

const COMMAND = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }
    if(!req.body.command) {
        return res.status(400).json({message: 'Missing command'});
    }


    const response = await fetch(SERVER_API_URL + 'command', {
        method: 'POST',
        body: JSON.stringify({
            command: req.body.command
        }),
        headers: {
            'Authorization': 'Bearer ' + SERVER_API_TOKEN
        }
    });
    const data = await response.json();
    return res.status(200).json(data);
}

const POWER = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        res.status(405).json({message: 'Method not allowed'});
    }
    if(!req.body.signal) {
        res.status(400).json({message: 'Missing signal'});
    }
    if(req.body.signal !== 'start' && req.body.signal !== 'stop' && req.body.signal !== 'restart' && req.body.signal !== 'kill') {
        res.status(400).json({message: 'Invalid signal'});
    }

    const response = await fetch(SERVER_API_URL + 'power', {
        method: 'POST',
        body: JSON.stringify({
            signal: req.body.signal
        }),
        headers: {
            'Authorization': 'Bearer ' + SERVER_API_TOKEN
        }
    });
    const data = await response.json();
    return res.status(200).json(data);
}

export default handler;