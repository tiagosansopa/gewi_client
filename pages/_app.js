import Layout from "../components/Layout";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import dynamic from "next/dynamic";
import Head from "next/head";
import { register } from "next-pwa";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>GEWI</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />{" "}
        {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
export const getServerSideProps = async () => {
  register();
};
