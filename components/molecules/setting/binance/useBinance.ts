"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import settingsService from "@/services/setting";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BinanceForm } from "@/views/settings/types";

const useBinance = () => {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BinanceForm>({
    defaultValues: {
      binance: "",
    },
  });

  const { mutate: binanceChange, isPending } = useMutation({
    mutationFn: settingsService.updateBinance,
    onSuccess: (res) => {
      console.log("res", res);

      queryClient.setQueriesData<any>(
        { queryKey: ["binance"] },
        (oldData: any) => {
          if (!oldData) return [res];

          return {
            ...oldData,
            data: {
              ...oldData?.data,
              data: [res?.data, ...oldData?.data?.data],
            },
          };
        },
      );
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data: BinanceForm) => {
    binanceChange(data);
  };

  return {
    showPassword,
    onSubmit,
    isPending,
    setShowPassword,
    control,
    handleSubmit,
    errors,
  };
};

export default useBinance;

export const useGetBinance = () => {
  const {
    data: binance,
    status: binanceStatus,
    refetch: binanceRefetch,
    isPending: binanceIsPending,
  } = useQuery({
    queryKey: ["binance"],
    queryFn: () => settingsService.getBinance(),
    staleTime: 5000,
  });

  return { binance, binanceStatus, binanceRefetch, binanceIsPending };
};
