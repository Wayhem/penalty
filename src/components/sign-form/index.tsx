"use client";

import { Wrapper } from "./styles";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/ui";
import { api } from "@/collections";
import { redirect, usePathname } from "next/navigation";
import { ButtonVariants } from "../../ui/button/button";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SignForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = api.useLogin();
  const { isAuthed } = api.useAuth();
  const { register: registerUser } = api.useRegister();
  const path = usePathname();

  if (isAuthed) {
    redirect("/");
  }

  const onSubmit = (data: FieldValues) => {
    try {
      if (path === "/login") {
        login(data.username, data.password);
      }
      if (path === "/register") {
        registerUser(data.username, data.password);
      }
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      toast.error(message);
    }
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="error-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        )}
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="error-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        )}
      </label>

      <Button wide type="submit">
        {path === "/login" ? "Login" : "Register"}
      </Button>
      <Link href={path === "/login" ? "/register" : "/login"}>
        <Button variant={ButtonVariants.link}>
          {path === "/login"
            ? "New? Go to register page"
            : "Already have an user? Sign in"}
        </Button>
      </Link>
    </Wrapper>
  );
}
