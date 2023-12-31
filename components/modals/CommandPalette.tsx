import React, {ReactNode, useState} from "react";
import {cn} from "@/libs/Utils";
import {useAdmin} from "@/contexts/AdminContext";
import {useRouter} from "next/router";
import {useUI} from "@/contexts/UIContext";
import {Achievement} from "@prisma/client";
import {useUser} from "@/contexts/UserContext";

interface Choice {
    name: string,
    callback: () => void,
    callbackEvent?: 'click' | 'hover',
    iconSVG?: ReactNode,
    disabled?: boolean
}

const CommandPalette = () => {

    const [searchedAdvancements, setSearchedAdvancements] = useState<Achievement[]>([])

    const {searchAdvancementQuery} = useAdmin();
    const router = useRouter()
    const {closeModal, setModalView} = useUI();
    const {isUserConnected} = useUser();


    const choices = [
        {
            name: "Create a waypoint",
            callback: () => {
                console.log("Search")
            },
            iconSVG: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>,
            disabled: true
        }, {
            name: !isUserConnected ? "Login" : "Logout",
            callback: (e:any) => {
                if (isUserConnected) {
                    fetch('/api/auth/logout', {method:'POST'}).then(async res => {
                      if (res.ok) {
                          console.log("User logged out")
                      }
                    })
                }
                handleLoginView(e)
            },
            callbackEvent: 'hover',
            iconSVG: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>,

            disabled: false
        }
    ] as Choice[]

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let search = e.target.value
        if(search.length >= 3) {
            searchAdvancementQuery(search).then((advancements) => {
                setSearchedAdvancements(advancements)
            }).catch((error) => {
                console.error(error)
                setSearchedAdvancements([])
            })
        }
        if (search.length < 3) setSearchedAdvancements([])
    }

    const handleLoginView = (e:any) => {
        setModalView("LOGIN")
    }

    const handleAdvancementClick = (advancement: Achievement) => {
        closeModal()
        router.push(`/advancements/${advancement.mod_id}/#${advancement.id}`)
    }



    return (
        <div className={"focus:outline-none ring-0 focus:ring-0 relative"}>
            <div className={'w-full h-16 p-2 flex items-center'}>
                <span className={'p-2'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>


                <input
                    onChange={handleSearchChange}
                    placeholder={"Search advancement"}
                    className={'placeholder-gray-600 dark:placeholder-gray-200 w-full h-full bg-transparent outline-none focus:outline-none ring-0 focus:ring-0 border-none rounded-md'}/>

            </div>
            <div className={'flex flex-col gap-2 outline-none p-2 relative'}>
                {searchedAdvancements.length == 0 && choices.map((choice: Choice, index) => {
                    return (
                        <button key={index}
                                onClick={choice.callback}
                                disabled={choice.disabled}
                                className={
                            cn('flex items-center gap-2 p-3 rounded-lg transition-all focus:outline-none delay-75',
                                {
                                    'dark:text-gray-500 text-gray-200': choice.disabled,
                                    'hover:bg-gray-200 hover:dark:bg-gray-600/60': !choice.disabled
                                })}>
                            {choice.iconSVG}
                            <p>{choice.name}</p>
                        </button>
                    )
                })}
                {searchedAdvancements.length > 0 && searchedAdvancements.map((advancement: Achievement) => {
                   return (
                       <button className={'flex items-center justify-between gap-2 p-3 rounded-lg transition-all focus:outline-none delay-75 hover:bg-gray-200 hover:dark:bg-gray-600/60'}
                           onClick={() => handleAdvancementClick(advancement)} key={advancement.id}>
                           <span>
                               {advancement.title}
                           </span>
                           <div className={'font-semibold h-8 flex items-center space-x-2'}>
                               <span>
                                   {/* @ts-ignore */}
                                   {advancement?.mods?.displayName ? advancement.mods.displayName : advancement.mod_id}
                               </span>
                               <span className={'bg-origin-content bg-center bg-no-repeat bg-contain h-full aspect-square rounded-full'}
                                        style={{backgroundImage: `url(https://cassiusbucket.s3.eu-west-3.amazonaws.com/minecraft/mods/${advancement.mod_id}.png)`}}>
                               </span>
                           </div>

                       </button>
                    )
                })}


            </div>


        </div>

    )
}

export default CommandPalette