import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL, {
      auth: async (cb) => {
        const tokenObj = await cookieStore.get("token");
        cb({ token: tokenObj?.value });
      },
    });
  } else {
    return io("/", {
      auth: async (cb) => {
        const tokenObj = await cookieStore.get("token");
        cb({ token: tokenObj?.value });
      },
      path: "/api/socket.io",
    });
  }
};
