"use client";
import { GetWithdrawsParams } from "@/types/withdraws.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import withdrawsService from "@/services/withdraws";

const useWithdraws = (params: GetWithdrawsParams) => {
  const { page = 1, limit = 10, sortBy, sortOrder, search, isActive } = params;

  const {
    data: withdraws,
    status: withdrawsStatus,
    refetch: withdrawsRefetch,
    isPending: withdrawsIsPending,
  } = useQuery({
    queryKey: ["withdraws", page, search, limit, sortBy, sortOrder, isActive],
    queryFn: () =>
      withdrawsService.getAllWithdraws({
        page,
        limit,
        sortBy,
        sortOrder,
        search,
      }),
    staleTime: 5000,
  });

  return { withdraws, withdrawsStatus, withdrawsRefetch, withdrawsIsPending };
};

export default useWithdraws;
