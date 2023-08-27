
import type {AppProps} from 'next/app'
import React from "react";
import Layout from "@/components/layouts/Layout";
import {AdminProvider} from "@/contexts/AdminContext";
import {ManagedUIContext} from "@/contexts/UIContext";
import '../styles/globals.css'
import {Tooltip} from "react-tooltip";
function App({Component, pageProps}: AppProps) {
    return (
            <ManagedUIContext>
                <AdminProvider>

                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    <div id="portal">

                    </div>
                    <Tooltip id={'general-tip'} className={'z-50'} disableStyleInjection={true}/>

                </AdminProvider>
            </ManagedUIContext>
    )
}

export default App