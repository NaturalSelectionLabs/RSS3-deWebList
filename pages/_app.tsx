import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";

function Application({ Component, pageProps }: AppProps) {
    return <>
        <Head>
            <title>deWebList</title>
            <meta name="description" content="Explore the many awesome decentralized websites."/>
            <meta name="keywords" content="deWeb, Web3, List"/>
            <meta property="og:title" content="deWebList" />
            <link href="favicon.svg" rel="icon" type="image/svg+xml"/>
        </Head>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </>;
}

export default Application;
