import React from "react";
import Head from "next/head";
import Header from "../../components/moleculas/header";
import Releases from "../../components/organismos/myReleases";
import { mdiCashCheck } from '@mdi/js';
import Icon from '@mdi/react'

const Home = () => {
    return (
        <div className="flex flex-col justify-between h-screen">
            <Head>
                <title>SaveMoney</title>
                <link rel="icon" href="/dolars.ico" />
            </Head>
            <div>
                <Header />
                <Releases />
            </div>

            <div className="flex justify-center items-center mb-5">
                <Icon path={mdiCashCheck}
                    title="User Profile"
                    size={2}
                    color="#00C897"
                />
                <h1 className="ml-1 mt-2">SaveMoney 1.0 K.A.A</h1>
            </div>
        </div>
    )
}

export default Home;