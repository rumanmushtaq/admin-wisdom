"use client";

import depositService from "@/services/deposit";
import { Deposit } from "@/types/deposit.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDeposit = (params: any) => {
  const { page = 1, limit = 10, sortBy, sortOrder, search, isActive } = params;

  const {
    data: deposits,
    status: depositStatus,
    refetch: depositRefetch,
    isPending: depositIsPending,
  } = useQuery({
    queryKey: ["deposits", page, search, limit, sortBy, sortOrder, isActive],
    queryFn: () =>
      depositService.getDeposits({
        page,
        limit,
        sortBy,
        sortOrder,
        search,
      }),
    staleTime: 5000,
  });

  return { deposits, depositStatus, depositRefetch, depositIsPending };
};

export const useApproveDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => depositService.approvePackage(id),

    onSuccess: (updatedPackage: any) => {
      // ✅ Update list cache
      queryClient.setQueriesData<Deposit[]>(
        { queryKey: ["deposits"] },
        (oldData: any) => {
          console.log("old", oldData);
          console.log("updatedPackage", updatedPackage?.data);
          if (!oldData) return oldData;

          return {
            ...oldData, // keep limit, page, total

            data: {
              ...oldData?.data,
              data: oldData?.data?.data?.map((pkg: any) => {
                return pkg._id === updatedPackage?.data?._id
                  ? updatedPackage?.data
                  : pkg;
              }),
            },
          };
        }
      );

      // ✅ Update detail cache
      queryClient.setQueriesData(
        { queryKey: ["deposit-detail", updatedPackage.id] },
        updatedPackage?.data
      );
    },
  });
};

export const useRejectDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => depositService.rejectPackage(id),

    onSuccess: (updatedPackage: any) => {
      // ✅ Update list cache
      queryClient.setQueriesData<Deposit[]>(
        { queryKey: ["deposits"] },
        (oldData: any) => {
          console.log("old", oldData);
          console.log("updatedPackage", updatedPackage?.data);
          if (!oldData) return oldData;

          return {
            ...oldData, // keep limit, page, total

            data: {
              ...oldData?.data,
              data: oldData?.data?.data?.map((pkg: any) => {
                return pkg._id === updatedPackage?.data?._id
                  ? updatedPackage?.data
                  : pkg;
              }),
            },
          };
        }
      );

      // ✅ Update detail cache
      queryClient.setQueriesData(
        { queryKey: ["deposit-detail", updatedPackage.id] },
        updatedPackage?.data
      );
    },
  });
};
