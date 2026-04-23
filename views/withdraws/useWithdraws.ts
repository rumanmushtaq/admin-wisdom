"use client";
import { GetWithdrawsParams } from "@/types/withdraws.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import withdrawsService from "@/services/withdraws";
import { toast } from "sonner";
import { HTTP_CLIENT } from "@/utils/axiosClient";
import apiEndpoints from "@/utils/apiConfig";

export const useWithdraws = (params: GetWithdrawsParams) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    search,
    status,
    fromDate,
    toDate,
    minAmount,
    maxAmount,
    userId,
  } = params;

  const {
    data: withdraws,
    status: withdrawsStatus,
    refetch: withdrawsRefetch,
    isPending: withdrawsIsPending,
  } = useQuery({
    queryKey: [
      "withdraws",
      page,
      search,
      limit,
      sortBy,
      sortOrder,
      status,
      fromDate,
      toDate,
      minAmount,
      maxAmount,
      userId,
    ],
    queryFn: () =>
      withdrawsService.getAllWithdraws({
        page,
        limit,
        sortBy,
        sortOrder,
        search,
        status,
        fromDate,
        toDate,
        minAmount,
        maxAmount,
        userId,
      }),
    staleTime: 5000,
  });

  return { withdraws, withdrawsStatus, withdrawsRefetch, withdrawsIsPending };
};

export const useUpdateWithdrawStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      rejectionReason,
      adminNotes,
    }: {
      id: string;
      status: string;
      rejectionReason?: string;
      adminNotes?: string;
    }) =>
      HTTP_CLIENT.put(
        `${apiEndpoints.Withdraws.GET_ALL.replace("/all", "")}/${id}`,
        { status, rejectionReason, adminNotes },
      ),
    onSuccess: (res: any) => {
      toast.success("Withdrawal updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["withdraws"] });
      queryClient.invalidateQueries({ queryKey: ["withdraw-stats"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update withdrawal",
      );
    },
  });
};

export const useWithdrawStats = () => {
  return useQuery({
    queryKey: ["withdraw-stats"],
    queryFn: () => withdrawsService.getStats(),
    staleTime: 10000,
  });
};

export const useSeedWithdrawals = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => withdrawsService.seed(),
    onSuccess: (res: any) => {
      if (res.success) {
        toast.success("Dummy withdrawals seeded successfully!");
        queryClient.invalidateQueries({ queryKey: ["withdraws"] });
        queryClient.invalidateQueries({ queryKey: ["withdraw-stats"] });
      } else {
        toast.error(res.data?.message || "Failed to seed withdrawals");
      }
    },
    onError: () => {
      toast.error("Failed to seed withdrawals");
    },
  });
};

export default useWithdraws;
