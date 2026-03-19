import { useQuery } from "@tanstack/react-query";
import referralService from "@/services/referral";

export function useGetReferralChains() {
  return useQuery({
    queryKey: ["referral-chains"],
    queryFn: () => referralService.getReferralChains(),
  });
}
