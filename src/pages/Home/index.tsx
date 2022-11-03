import React from "react";
import Head from "next/head";
import Header from "../../components/moleculas/header";
import Releases from "../../components/organismos/myReleases";


const Home = () => {
    return (
        <div>
            <Head>
                <title>SaveMoney</title>
                <link rel="icon" href="/dolars.ico" />
            </Head>
            <Header />
            <Releases />

        </div>
    )
}

export default Home;