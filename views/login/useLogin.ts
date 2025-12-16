"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import authService from "@/services/auth"

export interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

const useLogin = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
  })

 const { mutate: login, isPending } = useMutation({
    mutationFn: authService.loginApi,
    onSuccess: () => {
      router.push("/")
    },
    onError: (error: any) => {
      console.error("Login failed:", error)
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    login(data)
  }
  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    showPassword,
    setShowPassword,
  }
}

export default useLogin
