"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";
import { LoginFormValues } from "./types";

const useLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: authService.loginApi,
    onSuccess: (data) => {
      const { access_token, refresh_token, user } = data?.data;

      if (access_token && refresh_token) {
        // Local Storage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        // Cookies
        document.cookie = `access_token=${access_token}; path=/; secure; samesite=strict;`;
        document.cookie = `refresh_token=${refresh_token}; path=/; secure; samesite=strict;`;
      }
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };
  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    showPassword,
    setShowPassword,
  };
};

export default useLogin;
