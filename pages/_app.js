import Layout from "../components/Layout";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
