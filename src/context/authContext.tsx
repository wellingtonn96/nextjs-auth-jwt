import React, { createContext, useContext, useEffect, useState } from "react";
import { signInRequest, recoverUserInformation } from "../services/auth";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/api";

type IAuthContextData = {
  isAuthenticated: boolean;
  signIn: ({ email, passowrd }: ISignInData) => Promise<void>;
  user: User;
};

type ISignInData = {
  email: string;
  passowrd: string;
};

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "next-auth.token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => setUser(response.user));
    }
  }, []);

  const signIn = async ({ email, passowrd }: ISignInData) => {
    const { token, user } = await signInRequest({
      email,
      passowrd,
    });

    setCookie(undefined, "next-auth.token", token, {
      maxAge: 60 * 60 * 24, // 1 day
    });

    api.defaults.headers["Authorization"];

    setUser(user);

    Router.push("/dashboard");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be provided!");
  }

  return context;
};

export { AuthProvider, useAuth };
