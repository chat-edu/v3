import React from 'react';

import Head from "next/head";

import Layout from "@/components/layout";
import Onboarding from "@/components/onboarding";

import {NextPage} from "next";

const OnboardingPage: NextPage = () => {

    return (
        <>
            <Head>
                <title>Rabbithole - Onboarding</title>
                <meta name="description" content="Generative learning for thinkers, dreamers, and visionaries." />
                <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;" />
            </Head>
            <Layout
                authGate
            >
                <Onboarding />
            </Layout>
        </>
    )
};

export default OnboardingPage;
