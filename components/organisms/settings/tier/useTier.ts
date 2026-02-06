"use client";
import tierService from "@/services/tiers";
import { Tier } from "@/types/tiers.types";
import { useQuery, useQueryClient , useMutation} from "@tanstack/react-query";

export const useGetTier = () => {
  const {
    data = [],
    status: tierStatus,
    refetch: tierRetch,
    isPending: tierIsPending,
  } = useQuery<Tier[]>({
    queryKey: ["tiers"],
    queryFn: () => tierService.getTiers(),
    staleTime: 5000,
  });

  return {
    data,
    tierStatus,
    tierRetch,
    tierIsPending,
  };
};

export const useDeleteTier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:  (id: string) =>  tierService.deleteTier(id),

    onSuccess: (_data, deletedId) => {
      console.log("onSuccess Fired");
      console.log("Deleted ID:", deletedId);
      queryClient.setQueryData<Tier[]>(["tiers"], (oldData) =>
        oldData?.filter((tier) => tier._id !== deletedId) ?? []
      );
    },

    onError: (err) => {
      console.log("Mutation Error:", err);
    }
  });
};

export const useUpdateTier = () => {
  const queryClient = useQueryClient();
return useMutation({
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

}