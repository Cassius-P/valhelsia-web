
import {CSSProperties, useEffect, useRef, useState} from "react";
import {SquareLoader} from "react-spinners";



const Home = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)

    const parentRef = useRef(null)


    useEffect(() => {
        setTimeout(() =>{
            setIsLoading(false)
        }, 500)


        window.addEventListener("message", (event) => {
            // Check the message content
            handleEventMessage(event)
        });

        if(parentRef.current){
            let parent = parentRef.current
            if(parent != null){
                parent.addEventListener('message', (event: MessageEvent) => {
                    handleEventMessage(event)
                })
            }

        }


    }, []);


    const handleEventMessage = (event : MessageEvent) => {
        console.log(event.data)
        if (event.data === "iframeLoaded") {
            console.log("The iframe content has loaded!");
            // Handle the loaded event here
        }
    }


    function handleIframeLoad(event) {
        /*const iframe = event.target;
        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            // If we can access the contentDocument, the iframe loaded correctly
            if (doc) {
                console.log('Iframe loaded successfully');
            }
        } catch (error) {
            console.error('Cannot access iframe content:', error);
        }*/
    }

    function handleIframeError(event) {
        console.error('Iframe failed to load:', event);
    }



    return (
    <div className={'flex w-full items-center grow justify-center'} ref={parentRef}>
        {!isLoading && !isError && (
            // @ts-ignore
            <iframe src={"http://146.59.177.169:30529"} className={'w-full h-full'}  onLoad={handleIframeLoad}
                    onError={handleIframeError} name={Date.now().toString()} />
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