import Head from "next/head";

import {NextPageContext} from "next";

import Layout from "@/components/layout";
import Loading from "@/components/utilities/Loading";
import Graph from "@/components/graph";

const GraphPage = ({ graphId } : {graphId: string}) => {

    return (
        <>
            <Head>
                <title>Graph</title>
                <meta name="description" content="Generative learning" />
                <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;" />
            </Head>
            <Layout>
                <Loading
                    loading={!graphId}
                    h={'100%'}
                >
                    <Graph
                        graphId={parseInt(graphId as string)}
                    />
                </Loading>
            </Layout>
        </>
    )
}

GraphPage.getInitialProps = async (ctx: NextPageContext) => {
    return {
        graphId: ctx.query.graphId
    };
}

export default GraphPage
