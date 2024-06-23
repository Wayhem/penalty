import { useAuth } from "./use-auth";
import { useCreateRequest } from "./use-create-request";
import { useLogin } from "./use-login";
import { useLogout } from "./use-logout";
import { useRegister } from "./use-register";

const api = { useAuth, useLogin, useRegister, useLogout, useCreateRequest };

export default api;
