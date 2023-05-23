import cookie from "js-cookie";
import { useRouter } from "next/router";
//set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
//remove from cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key);
  }
};
//get from cookie a stored token to make requests to server with auth
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get("token");
  }
};
//set in localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove localstorage
export const removeLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

//auth user by passing data to cookie and localstorage

export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

//access user info from localstorage

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      }
    }
  }
};

//sign out

export const logout = () => {
  removeCookie("token");
  removeLocalStorage("user");
  const router = useRouter();
  router.push("/login");
};
