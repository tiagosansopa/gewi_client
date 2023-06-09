import { getDataFromToken } from "../helpers/auth";
export function notAuth(getServerSidePropsFunc) {
  return async (context) => {
    const { req, res } = context;
    const user = getDataFromToken(req.cookies.token);
    if (user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    const pageProps = getServerSidePropsFunc
      ? await getServerSidePropsFunc(context)
      : {};
    return {
      props: {
        ...pageProps,
        user,
      },
    };
  };
}
