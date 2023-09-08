import React, {useEffect, useState} from "react";
import StatsColumn from "@/components/admin/dashboard/StatsColumn";
import PowerButtons from "@/components/admin/dashboard/PowerButtons";
import Console from "@/components/admin/dashboard/Console";

export type ComponentUsage = {
    max: number;
    used: number;
}

const AdminDashboard = () => {

    const [serverName, setServerName] = useState<string>("")
    const [currentState, setCurrentState] = useState<string>("")
    const [ramUsage, setRamUsage] = useState<ComponentUsage>({max: 0, used: 0})
    const [cpuUsage, setCpuUsage] = useState<ComponentUsage>({max: 0, used: 0})
    const [uptime, setUptime] = useState<number>(0)
    const [error, setError] = useState<string>("")

    const [wsInfo, setWsInfo] = useState<{socket:string, token:number} | null>(null)


    useEffect(() => {
        fetchResources()
        fetchDetails()
        fetchConsole()

        let resources = setInterval(() => {
            fetchResources()
        }, 3000)

        return () => {
            clearInterval(resources)
        }
    }, []);


    const fetchResources = async () => {
        const url = `/api/admin/resources`;
        let res = await fetch(`${url}`);
        if(!res.ok) {
            setError("Error while fetching resources")
            return
        }

        const json = await res.json();

        const state = json.attributes.current_state

        const currentRam = json.attributes?.resources?.memory_bytes
        const currentCPU = json.attributes?.resources?.cpu_absolute

        const uptime = json.attributes?.resources?.uptime

        setCurrentState(state)
        setRamUsage(prev => ({...prev, used: parseFloat((currentRam / 1000000000).toFixed(2))}))
        setCpuUsage(prev => ({...prev, used: parseFloat((currentCPU).toFixed(2))}))
        setUptime(uptime)

        //console.log("resources", json)
    }

    const fetchDetails = async () => {
        const url = `/api/admin/details`;
        let res = await fetch(`${url}`);

        if(!res.ok) {
            setError("Error while fetching details")
            return
        }
        const json = await res.json();
        console.log("details", json)

        const maxRam = json.attributes.limits.memory
        const maxCpu = json.attributes.limits.cpu

        const name = json.attributes.name

        setServerName(name)
        setCpuUsage(prev => ({...prev, max: parseFloat((maxCpu).toFixed(1))}))
        setRamUsage(prev => ({...prev, max: parseFloat((maxRam / 1000).toFixed(2))}))

        return json

    }

    const fetchConsole = async () => {
        const url = `/api/admin/console`;
        let res = await fetch(`${url}`);

        if(!res.ok) {
            setError("Error while fetching console")
            return
        }
        const json = await res.json();

        setWsInfo(json.data!)
        console.log("Console", json)
    }


    return (
        <div className={'w-full h-full flex justify-center p-4'}>
            <div className={'flex flex-col w-full lg:w-5/6 space-y-2'}>

                {/* Server name and buttons*/}
                <section className={'w-full grid grid-cols-4 gap-2'}>

                    <h1 className={'font-bold text-2xl hidden sm:flex sm:col-span-2 lg:col-span-3'}>
                        {serverName}
                    </h1>

                    <PowerButtons currentStatus={currentState} />

                </section>

                {/* Console and infos */}
                <section className={'w-full grid grid-cols-1 xl:grid-cols-4 gap-2'}>

                    {/* Console */}
                    <Console wsInfo={wsInfo}/>

                    {/* Stats */}
                    <StatsColumn ramUsage={ramUsage} cpuUsage={cpuUsage} uptime={uptime}/>

                </section>

                {/* Charts */}
                <section className={'w-full flex flex-col md:flex-row'}>

                </section>
            </div>

        </div>
    )
}

export default AdminDashboard