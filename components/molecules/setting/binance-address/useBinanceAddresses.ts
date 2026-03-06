"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import settingService from "@/services/setting";

export interface BinanceAddress {
  _id: string;
  name: string;
  address: string;
  isActive: boolean;
  createdAt?: string;
}

export default function useBinanceAddresses() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["binance-addresses"],
    queryFn: async () => {
      const res = await settingService.getBinanceAddresses();
      return res.data?.data || [];
    },
  });

  const addresses: BinanceAddress[] = data || [];

  const addMutation = useMutation({
    mutationFn: (payload: { name: string; address: string }) =>
      settingService.addBinanceAddress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["binance-addresses"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => settingService.deleteBinanceAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["binance-addresses"] });
    },
  });

  const setActiveMutation = useMutation({
    mutationFn: (id: string) => settingService.setActiveBinanceAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["binance-addresses"] });
    },
  });

  return {
    addresses,
    isLoading,
    addAddress: addMutation.mutateAsync,
    deleteAddress: deleteMutation.mutateAsync,
    setActiveAddress: setActiveMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isSettingActive: setActiveMutation.isPending,
  };
}
