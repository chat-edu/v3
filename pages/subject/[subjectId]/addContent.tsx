import Head from "next/head";

import {NextPageContext} from "next";

import Layout from "@/components/layout";
import Loading from "@/components/utilities/Loading";
import AddContent from "../../../components/addContent";

const AddContentSubjectPage = ({ subjectId } : {subjectId: string}) => {
    return (
        <>
            <Head>
                <title>ChatEDU - Subject</title>
                <meta name="description" content="Generative learning"/>
                <meta name="viewport"
                      content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png"/>
                <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon-192x192.png"/>
            </Head>
            <Layout
                authGate
            >
                <Loading
                    loading={!subjectId}
                    h={'100%'}
                >
                    <AddContent
                        graphId={parseInt(subjectId)}
                    />
                </Loading>
            </Layout>
        </>
    )
}

AddContentSubjectPage.getInitialProps = async (ctx: NextPageContext) => {
    return {
        subjectId: ctx.query.subjectId
    };
}

export default AddContentSubjectPage
