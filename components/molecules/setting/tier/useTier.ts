"use client";

import { Tier } from "@/types/tiers.types";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import tierService from "@/services/tiers";
import { useEffect } from "react";

export const useCreateTier = ({ tier }: { tier?: Tier | null }) => {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Omit<Tier, "id" | "createdAt">>({
    defaultValues: {
      name: "",
      level: 0,
      invitePercentage: 0,
      referralTaskPercentage: 0,
      minTasksCompleted: 0,
      minReferralCount: 0,
      isActive: true,
    },
  });

  useEffect(() => {
    if (tier) {
      reset({
        name: tier.name ?? "",
        level: tier.level ?? 0,
        invitePercentage: tier.invitePercentage ?? 0,
        referralTaskPercentage: tier.referralTaskPercentage ?? 0,
        minTasksCompleted: tier.minTasksCompleted ?? 0,
        minReferralCount: tier.minReferralCount ?? 0,
        isActive: tier.isActive ?? true,
      });
    }
  }, [tier, reset]);

  const createMutation = useMutation({
    mutationFn: tierService.createTier,
    onSuccess: (createdData: Tier) => {
      console.log("createdData", createdData);
      queryClient.setQueryData<Tier[]>(["tiers"], (oldData) => {
        if (!oldData) return [createdData];
        return [createdData, ...oldData];
      });
    },
    onError: (error: any) => {
      // Handle error (e.g., show an error message)
      console.error("Error submitting referral settings:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Tier> }) =>
      tierService.updateTier(id, data),
    onSuccess: (updatedTier: Tier) => {
      queryClient.setQueriesData<Tier[]>(
        { queryKey: ["tiers"] },
        (oldData: any) => {
          if (!oldData) return oldData;
          return oldData?.map((tier: Tier) =>
              tier._id === updatedTier?._id ? updatedTier : tier,
            )
        },
      );
      queryClient.setQueriesData(
        { queryKey: ["tier-detail", updatedTier] },
        updatedTier,
      );
    },
  });

  const onSubmit = (data: Tier) => {
    if (tier && tier._id) {
      updateMutation.mutate({
        id: tier._id,
        data,
      });
    } else {
      createMutation.mutate(data);
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    watch,
    onSubmit,
  };
};

export const useDeleteTier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tierService.deleteTier(id),
    onSuccess: (_data, deletedId) => {
      queryClient.setQueryData<Tier[]>(
        ["tiers"],
        (oldData) => oldData?.filter((tier) => tier._id !== deletedId) ?? [],
      );
    },
    onError: (err) => {
      console.log("Mutation Error:", err);
    },
  });
};
