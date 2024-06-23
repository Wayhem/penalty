import { useAuth } from "./use-auth";
import { useLogin } from "./use-login";
import { useLogout } from "./use-logout";
import { useRegister } from "./use-register";

const api = { useAuth, useLogin, useRegister, useLogout };

export default api;
