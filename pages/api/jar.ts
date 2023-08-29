import {NextApiRequest, NextApiResponse} from "next";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method Not Allowed'});
    }
    if(!GITHUB_TOKEN) {
        return res.status(500).json({message: 'No GitHub token provided'});
    }

    const result = fetch(
        `https://api.github.com/repos/Cassius-P/ServerUtils/releases/latest`,
        {
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${GITHUB_TOKEN}`,
            }
        })
        .then((response) => response.json())
        .then((data) => {

            const jarAsset = data.assets.find((asset: any) => asset.name.endsWith('.jar'));

            if (!jarAsset) {
                 return res.status(404).json({message: 'No jar file found'});
            }

            // Set the latest version
            let version = data.tag_name;
            let url = jarAsset.browser_download_url;

            return res.status(200).json({version, url});
        })
        .catch((error) => {
            console.error('Error fetching GitHub release:', error);
        });
}

export default handler;