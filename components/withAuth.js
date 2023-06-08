import { getDataFromToken } from "../helpers/auth";
export function withAuth(getServerSidePropsFunc) {
  return async (context) => {
    const { req, res } = context;
    console.log("running withaUTH");
    if (!req.cookies.token || !getDataFromToken(req.cookies.token)) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const pageProps = getServerSidePropsFunc
      ? await getServerSidePropsFunc(context)
      : {};

    return {
      props: {
        ...pageProps.props,
      },
    };
  };
}
