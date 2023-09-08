import {BsMemory, BsCpu, BsClock} from "react-icons/bs";
import {ComponentUsage} from "@/pages/admin";
import moment from "moment";
import 'moment-duration-format';

import {useEffect, useState} from "react";


interface StatsColumnProps {
    ramUsage: ComponentUsage;
    cpuUsage: ComponentUsage;
    uptime: number;
}

const StatsColumn = ({ramUsage, cpuUsage, uptime}: StatsColumnProps) => {

    const [uptimeString, setUptimeString] = useState<string>("0")
    useEffect(() => {
        let duration = moment.duration(uptime, 'milliseconds');
        // @ts-ignore
        let formatted = duration.format("hh[h] mm[m] ss[s]");

        setUptimeString(formatted)
    }, [uptime]);

    return (
        <div className={'col-span-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-2 h-fit'}>

            {/*Uptime*/}
            <div className={'rounded-md bg-light-gray-400 dark:bg-gray-600 p-2 flex h-20'}>
                <div className={'flex w-full h-full items-center space-x-6'}>
                    <span className={'h-full rounded-md bg-light-gray-600 dark:bg-gray-500 p-1 aspect-square flex items-center justify-center'}>
                        <BsClock className={"w-full"}/>
                    </span>

                    <div className={'flex flex-col'}>
                        <h1 className={'text-2xl font-bold'}>
                            Uptime
                        </h1>
                        <div>
                            <span className={'font-semibold text-xl'}>
                                {uptimeString}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/*RAM*/}
            <div className={'rounded-md bg-light-gray-400 dark:bg-gray-600 p-2 flex h-20'}>
                <div className={'flex w-full h-full items-center space-x-6'}>
                    <span className={'h-full rounded-md bg-light-gray-600 dark:bg-gray-500 p-1 aspect-square flex items-center justify-center'}>
                        <BsMemory className={"w-full"}/>
                    </span>

                    <div className={'flex flex-col'}>
                        <h1 className={'text-2xl font-bold'}>
                            RAM
                        </h1>
                        <div>
                            <span className={'font-semibold text-xl'}>
                                {ramUsage.used} GB
                            </span>
                            <span className={'font-thin text-sm opacity-60'}>
                                &nbsp;/ {ramUsage.max } GB
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/*CPU*/}
            <div className={'rounded-md bg-light-gray-400 dark:bg-gray-600 p-2 flex h-20'}>
                <div className={'flex w-full h-full items-center space-x-6'}>
                    <span className={'h-full rounded-md bg-light-gray-600 dark:bg-gray-500 p-1 aspect-square flex items-center justify-center'}>
                        <BsCpu className={"w-full"}/>
                    </span>

                    <div className={'flex flex-col'}>
                        <h1 className={'text-2xl font-bold'}>
                            CPU
                        </h1>
                        <div>
                            <span className={'font-semibold text-xl'}>
                                {cpuUsage.used}%
                            </span>
                            <span className={'font-thin text-sm opacity-60'}>
                                &nbsp;/ {cpuUsage.max } %
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StatsColumn;