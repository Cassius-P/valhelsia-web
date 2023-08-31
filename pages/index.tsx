
import {useEffect, useRef, useState} from "react";
import {SquareLoader} from "react-spinners";
import {useUI} from "@/contexts/UIContext";

const URL = process.env.NEXT_PUBLIC_MAP_URL

const Home = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)

    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [mapInitialized, setMapInitialized] = useState<boolean>(false)
    const {lightMode} = useUI()





    useEffect(() => {

        if(URL == null) {
            handleError(true)
            return;
        }

        setTimeout(() =>{
            setIsLoading(false)
        }, 500)


        document.title = "Map"

        window.addEventListener('message', messageHandler);

    }, []);

    useEffect(() => {
        sendIframeMessage()
    }, [lightMode, mapInitialized]);


    const messageHandler = (event: any) => {
        if (event.data === "VueAppReady") {
            setMapInitialized(true)
        }
    }


    const handleIframeError = (event: any) => {
        console.error('Iframe failed to load:', event.toString());
    }

    const handleError = (state:boolean) => {
        setTimeout(() => {
            setIsError(state)
        }, 500)
    }


    const sendIframeMessage = () => {
        if(iframeRef.current){
            let iframe = iframeRef.current as any
            if(iframe != null){
                iframe.contentWindow.postMessage({lightMode}, "*");
            }
        }
    }


    return (
    <div className={'flex w-full items-center grow justify-center relative dark:bg-gray-600'}>
        {!isLoading && !isError && (

            <iframe src={URL} className={'w-full h-full'}
                    onError={handleIframeError} ref={iframeRef}/>
        )}
        {isError && (
            <span className={"dark:text-white"}>
                Erreur
            </span>
        )}
        {isLoading && (
            <SquareLoader
                color='white'
            />
        )}



    </div>
    )
}


export default Home