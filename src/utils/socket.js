import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  const auth = async (cb) => {
    const tokenObj = await cookieStore.get("token");
    cb({ token: tokenObj?.value });
  };
  const isLocal = location.hostname === "localhost";
  return io(isLocal ? BASE_URL : "/", {
    auth,
    ...(isLocal ? {} : { path: "/api/socket.io" }),
  });
};
