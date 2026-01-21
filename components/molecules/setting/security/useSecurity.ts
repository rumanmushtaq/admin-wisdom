"use client";
import { PasswordChangeForm } from "@/views/settings/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";

const useSecurity = () => {
  const [showPassword, setShowPassword] = useState<{
    current: boolean;
    new: boolean;
    confirm: boolean;
  }>({
    current: false,
    new: false,
    confirm: false,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangeForm>({
    defaultValues: {
      "current-password": "",
      "new-password": "",
      "confirm-password": "",
    },
  });

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: authService.changePassword,
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data: PasswordChangeForm) => {
    const payload = {
      currentPassword: data["current-password"],
      newPassword: data["new-password"],
    };
    changePassword(payload);
  };
  return {
    control,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    onSubmit,
    isPending
  };
};

export default useSecurity;
