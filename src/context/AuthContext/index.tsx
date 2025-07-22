"use client";

import React from "react";
import { AuthContextProps, AuthProviderProps } from "./interface";
import { LoginAuthenticated } from "@/interfaces/Authenticated";
import { User } from "@/interfaces/User";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import useFetch from "@/hooks/useFetch/hook";
import { LoginSchemaType } from "@/schemas/loginSchema";
import { Toast, useToast } from "@chakra-ui/react";

const AuthContext = React.createContext<AuthContextProps>({
  login: async () => ({} as LoginAuthenticated),
  logout: async () => {},
  isLoadingLogin: false,
  user: {} as User,
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User>({} as User);
  const router = useRouter();
  const toast = useToast();

  const [requestLogin, isLoadingLogin] = useFetch<LoginAuthenticated>();

  const handleSetCookies = (data: string) => {
    setCookie(undefined, "token", data);
  };

  const handleUserState = (data: User) => {
    const { aplicacaoid, username } = data;
    setUser(data);
    handleSetCookies(aplicacaoid);
    localStorage.setItem("username", username);
  };

  const login = async (dataForm: LoginSchemaType) => {
    try {
      const resp = await requestLogin("/api/auth", {
        method: "POST",
        body: dataForm,
      });

      handleUserState(resp.data.credenciais[0]);

      toast({
        title: "Login realizado com sucesso!",
        status: "success",
        position: "top-right",
        duration: 3000,
      });

      return resp.data;
    } catch (error) {
      throw error;
    }
  };

  const clearSession = () => {
    setUser({} as User);
    destroyCookie(undefined, "token", { path: "/" });
  };

  const logout = async () => {
    clearSession();
    router.push("/");
    toast({
      title: "Usuário deslogado!",
      status: "success",
      position: "top-right",
      duration: 3000,
    });
  };

  const validatedToken = () => {
    const { token } = parseCookies();
    try {
      if (token) {
        setUser({
          aplicacaoid: token,
          username: localStorage.getItem("username") || "",
        });
      } else {
        clearSession();
      }
    } catch {
      clearSession();
      Toast({
        title: "Session expired",
        description: "Please log in again.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  React.useEffect(() => {
    validatedToken();
  }, []);

  return (
    <AuthContext.Provider value={{ login, isLoadingLogin, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
