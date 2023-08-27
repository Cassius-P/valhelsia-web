import React, {ReactNode, useEffect} from "react";
import Sidebar from "@/components/layouts/Sidebar";
import {Tooltip} from "@nextui-org/react";

export default function MainFrame({ children }: { children: ReactNode }) {

    const [isMounted, setIsMounted] = React.useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, []);

    return (
        <>


            <Sidebar />
            <main className="flex flex-col flex-1 relative pl-16">
                {children}
            </main>
        </>

    )
}
