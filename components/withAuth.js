import { getDataFromToken } from "../helpers/auth";
export function withAuth(getServerSidePropsFunc) {
  return async (context) => {
    const { req, res } = context;
    const user = getDataFromToken(req.cookies.token);
    if (!req.cookies.token || !user) {
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
        ...pageProps,
        user,
      },
    };
  };
}
