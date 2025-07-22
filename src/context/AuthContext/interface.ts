import { LoginAuthenticated } from "@/interfaces/Authenticated";
import { User } from "@/interfaces/User";
import { LoginSchemaType } from "@/schemas/loginSchema";

export interface AuthContextProps {
  login: (params: LoginSchemaType) => Promise<LoginAuthenticated>;
  logout: () => Promise<void>;
  isLoadingLogin: boolean;
  user: User;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
