import { getDataFromToken } from "../helpers/auth";

export function withAdmin(getServerSidePropsFunc) {
  return async (context) => {
    const { req, res } = context;

    if (!req.cookies.token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const { name, role } = getDataFromToken(req.cookies.token);

    if (role !== "admin") {
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
        user: {
          name,
          role,
        },
        ...pageProps.props,
      },
    };
  };
}
