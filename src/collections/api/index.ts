import { useApproveRequest } from "./use-approve-request";
import { useAuth } from "./use-auth";
import { useCreateRequest } from "./use-create-request";
import { useDeclineRequest } from "./use-decline-request";
import { useLogin } from "./use-login";
import { useLogout } from "./use-logout";
import { useRegister } from "./use-register";

const api = {
  useAuth,
  useLogin,
  useRegister,
  useLogout,
  useCreateRequest,
  useApproveRequest,
  useDeclineRequest,
};

export default api;
