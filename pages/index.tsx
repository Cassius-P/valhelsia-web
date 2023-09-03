
import {useEffect, useRef, useState} from "react";
import {SquareLoader} from "react-spinners";
import {useUI} from "@/contexts/UIContext";
import Link from "next/link";

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

        fetch(URL).then((response) => {
            if (!response.ok) {
                handleError(true)
            }
        }).catch((error) => {
            handleError(true)
        });


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
            <div className={"dark:text-white flex flex-col text-center"}>
                <span className={'font-semibold text-6xl relative'}>
                    Uh oh
                    <span className={'a-delay-150 bounce inline-block'}>
                        .
                    </span>
                    <span className={'a-delay-500 bounce inline-block'}>
                        .
                    </span>
                </span>
                <span className={'dark:text-light-gray-900'}>
                    Something went wrong. Please try again later.
                </span>

                <Link href={'/#'} className={'underline text-blue-500 hover:cursor'}>
                    Try again
                </Link>

            </div>
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