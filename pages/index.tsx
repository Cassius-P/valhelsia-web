
import {CSSProperties, useEffect, useRef, useState} from "react";
import {SquareLoader} from "react-spinners";
import Image from "next/image";

const URL = process.env.NEXT_PUBLIC_MAP_URL

const Home = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const [players, setPlayers] = useState<ServerPlayer[] | null>(null)

    const parentRef = useRef(null)


    useEffect(() => {

        /*if(URL == null) {
            handleError(true)
            return;
        }*/

        setTimeout(() =>{
            setIsLoading(false)
        }, 500)


        /*const isUp = fetch(URL.toString(), {
            method: 'GET',

        }).then((r) => {
            console.log(r)
            if(r.status == 200){
                handleError(false)
            }else{
                handleError(true)
            }
        }).catch((e) => {
            console.log(e)
            handleError(true)
        })*/


        window.addEventListener("message", (event) => {
            // Check the message content
            handleEventMessage(event)
        });

        if(parentRef.current){
            let parent = parentRef.current as any
            if(parent != null){

                parent.addEventListener('message', (event: MessageEvent) => {
                    handleEventMessage(event)
                })
            }

        }


    }, []);


    const handleEventMessage = (event : MessageEvent) => {
        //console.log("event", event)
        const data = event.data
        if(data == null) return;

        if(data.type == "error"){
            setIsError(true)
        }


        if(data.type == "markers" && data.data.players != null){

            if(data.data.players.length == 0 && players?.length == 0) return;
            setPlayers([...data.data.players])

        }
    }


    useEffect(() => {

    }, []);




    const handleIframeError = (event: any) => {
        console.error('Iframe failed to load:', event.toString());
    }
     const handleIframeLoad = (event: any) => {
        console.log('Iframe loaded:', event);
     }

     const handleError = (state:boolean) => {
        setTimeout(() => {
            setIsError(state)
        }, 500)
     }



    return (
    <div className={'flex w-full items-center grow justify-center relative dark:bg-gray-600'} ref={parentRef}>
        {!isLoading && !isError && (

            <iframe src={"http://146.59.177.169:30528"} className={'w-full h-full'}
                    onError={handleIframeError} name={Date.now().toString()}/>
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

        {(players && players.length > 0) && (
            <div className={'absolute top-2 left-2'}>
                <div className={'bg-light-gray-500 dark:bg-gray-700 rounded-md drop-shadow p-4'}>

                    {players && players.map((player: ServerPlayer) => (

                        <div key={player.uuid} className={'flex space-x-3 items-center font-semibold'}>
                            <span className={'w-5 h-5 rounded-full flex items-center'}>
                                <Image src={`https://crafatar.com/avatars/${player.uuid}`} alt={player.name} className={'h-full w-full aspect-square'} width={50} height={50}/>
                            </span>
                            <p>{player.name}</p>
                            <span className={'flex flex-col text-xs font-thin'}>
                                <span className={'flex'}>x : &nbsp;<p className={'font-bold'}>{Math.floor(player.position.x)}</p></span>
                                <span className={'flex'}>y : &nbsp;<p className={'font-bold'}>{Math.floor(player.position.y)}</p></span>
                                <span className={'flex'}>z : &nbsp;<p className={'font-bold'}>{Math.floor(player.position.z)}</p></span>

                            </span>
                        </div>
                    ))}

                </div>
            </div>
        )}



    </div>
    )
}


export default Home