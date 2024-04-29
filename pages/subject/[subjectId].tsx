import Head from "next/head";

import {NextPageContext} from "next";

import Layout from "@/components/layout";
import Loading from "@/components/utilities/Loading";
import Subject from "@/components/subject";

const SubjectPage = ({ subjectId } : {subjectId: string}) => {
    return (
        <>
            <Head>
                <title>Subject</title>
                <meta name="description" content="Generative learning" />
                <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;" />
                <link rel="icon" href="/logo.ico" />
            </Head>
            <Layout
                authGate
            >
                <Loading
                    loading={!subjectId}
                    h={'100%'}
                >
                    <Subject
                        subjectId={parseInt(subjectId as string)}
                    />
                </Loading>
            </Layout>
        </>
    )
}

SubjectPage.getInitialProps = async (ctx: NextPageContext) => {
    return {
        subjectId: ctx.query.subjectId
    };
}

export default SubjectPage