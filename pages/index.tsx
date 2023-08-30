
import {useEffect, useRef, useState} from "react";
import {SquareLoader} from "react-spinners";
import Image from "next/image";
import {useUI} from "@/contexts/UIContext";

const URL = process.env.NEXT_PUBLIC_MAP_URL

const Home = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)

    const iframeRef = useRef<HTMLIFrameElement>(null)
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
    }, []);

    useEffect(() => {
        sendIframeMessage()
    }, [lightMode]);





    const handleIframeError = (event: any) => {
        console.error('Iframe failed to load:', event.toString());
    }

    const handleError = (state:boolean) => {
        setTimeout(() => {
            setIsError(state)
        }, 500)
    }

    const handleLoad = (event: any) => {
        sendIframeMessage()
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
                    onError={handleIframeError} ref={iframeRef} onLoad={handleLoad}/>
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