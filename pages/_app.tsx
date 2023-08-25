
import type {AppProps} from 'next/app'
import React from "react";
import Layout from "@/components/layouts/Layout";
import {AdminProvider} from "@/contexts/AdminContext";
import {ManagedUIContext} from "@/contexts/UIContext";
import '../styles/globals.css'
function App({Component, pageProps}: AppProps) {
    return (
        <ManagedUIContext>
            <AdminProvider>

                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <div id="portal">

                </div>

            </AdminProvider>
        </ManagedUIContext>
    )
}

export default App