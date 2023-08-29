import React, {ReactNode} from "react";
import Sidebar from "@/components/layouts/Sidebar";

export default function MainFrame({ children }: { children: ReactNode }) {

 ;

    return (
        <>
            <Sidebar />
            <main className="flex flex-col flex-1 relative pl-16 dark:bg-gray-500 bg-light-gray-200">
                {children}
            </main>
        </>

    )
}
