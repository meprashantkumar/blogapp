"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export const Context = createContext({ user: {} });

export function Providers({ children }) {
  const [user, setUser] = useState({});

  async function fetchUser() {
    try {
      const token =
        (await typeof window) !== "undefined"
          ? localStorage.getItem("token")
          : null;
      const { data } = await axios.get("/api/user/me", {
        headers: {
          token: token,
        },
      });
      setUser(data.user);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
      <Toaster />
    </Context.Provider>
  );
}
