import {useEffect, useState} from "react";


interface ConsoleProps {
    wsInfo: {socket:string, token:number} | null;
}
const Console = ({wsInfo}: ConsoleProps) => {

    const [messages, setMessages] = useState<string[]>([])
    const [input, setInput] = useState<string>("")

    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {

        console.log("wsInfo", wsInfo)


        if(wsInfo == null) return

        const wssUrl = wsInfo.socket;
        const token = wsInfo.token;

        console.log("Connecting to WebSocket:", wssUrl, token)

        // Create a new WebSocket connection
        const websocket = new WebSocket(wssUrl);

        // Set up the necessary WebSocket events
        websocket.onopen = (event) => {
            console.log('WebSocket connection opened:', event);

            websocket.send(JSON.stringify({"event":"auth","args":[token]}));
        };

        websocket.onmessage = (event) => {
            console.log('Received message:', event.data);
            // Handle incoming messages/data here
        };

        websocket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        websocket.onerror = (error) => {
            console.warn('WebSocket error:', error);
        };

        setWs(websocket);

        // Cleanup logic when component unmounts
        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, [wsInfo]); // Reconnect only if wssUrl or token changes

    return (
        <div className={'col-span-1 md:col-span-3 p-2 bg-red-400 aspect-video'}>
            <h1>Console</h1>
        </div>
    )
}

export default Console