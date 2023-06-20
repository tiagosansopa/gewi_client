import Layout from "../components/Layout";
import "../styles/globals.css";

import "../styles/react-datepicker.css";
import { AuthProvider } from "../context/AuthContext";
import dynamic from "next/dynamic";
import Head from "next/head";
import { register } from "next-pwa";
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
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
