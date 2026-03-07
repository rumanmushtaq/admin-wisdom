"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import settingService from "@/services/setting";

export interface BinanceAddress {
  _id: string;
  name: string;
  address: string;
  user?: {
    _id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}

export default function useBinanceAddresses() {
  const queryClient = useQueryClient();
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["binance-addresses"],
    queryFn: async () => {
      const res = await settingService.getBinanceAddresses();
      // API returns array directly in res.data
      const list: BinanceAddress[] = res.data || [];
      return list;
    },
  });

  const addresses: BinanceAddress[] = data || [];

  // auto-select first address if none selected
  const resolvedActiveId = activeId || (addresses.length > 0 ? addresses[0]._id : null);

  const addMutation = useMutation({
    mutationFn: (payload: { name: string; address: string }) =>
      settingService.addBinanceAddress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["binance-addresses"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => settingService.deleteBinanceAddress(id),
    onSuccess: (_, deletedId) => {
      if (activeId === deletedId) setActiveId(null);
      queryClient.invalidateQueries({ queryKey: ["binance-addresses"] });
    },
  });

  const setActiveMutation = useMutation({
    mutationFn: (id: string) => settingService.setActiveBinanceAddress(id),
    onMutate: (id) => {
      // Optimistic update — reflect immediately in UI
      setActiveId(id);
    },
    onError: (_, id) => {
      // Revert on failure
      setActiveId(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["binance-addresses"] });
    },
  });

  const setActiveAddress = (id: string) => {
    setActiveMutation.mutate(id);
  };

  return {
    addresses,
    activeId: resolvedActiveId,
    isLoading,
    addAddress: addMutation.mutateAsync,
    deleteAddress: deleteMutation.mutateAsync,
    setActiveAddress,
    isAdding: addMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isSettingActive: setActiveMutation.isPending,
  };
}
