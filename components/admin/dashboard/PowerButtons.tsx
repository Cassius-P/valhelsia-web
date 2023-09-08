
interface PowerButtonsProps {
    currentStatus: string;
}

const PowerButtons = ({currentStatus}: PowerButtonsProps) => {

    const sendSignal = async (signal:string) => {
        const url = `/api/admin/signal`;
        let res = await fetch(`${url}`, {
            method: "POST",
            body: JSON.stringify({
                signal: signal
            })
        });
        if(!res.ok) {
            console.error("Error while sending signal")
            return
        }

        const json = await res.json();

        console.log("signal", json)
    }


    return (
        <div className={'col-span-4 sm:col-span-2 self-end lg:col-span-1'}>
            <div className={'flex space-x-4'}>

                <button disabled={currentStatus == "running"} className={'rounded-md p-2 font-semibold text-lg bg-blue-500 hover:bg-blue-400 flex-1 disabled:cursor-not-allowed disabled:bg-blue-400'}>
                    Start
                </button>

                <button disabled={currentStatus == ""} className={'rounded-md p-2 font-semibold text-lg bg-gray-300 hover:bg-gray-200 flex-1 disabled:cursor-not-allowed disabled:bg-gray-200'}>
                    Restart
                </button>

                <button disabled={currentStatus == ""} className={'rounded-md p-2 font-semibold text-lg bg-red-500 hover:bg-red-400 flex-1 disabled:cursor-not-allowed disabled:bg-red-400'}>
                    Stop
                </button>
            </div>



        </div>
    )

}
export default PowerButtons
