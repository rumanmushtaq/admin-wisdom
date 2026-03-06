import { useQuery } from "@tanstack/react-query";
import usersService from "@/services/users";

export interface UserProfileData {
  user: {
    _id: string;
    email: string;
    username: string;
    role: string;
    credits: number;
    totalEarnings: number;
    isActive: boolean;
    isVerified: boolean;
    referralCode: string;
    referredBy: string | null;
    createdAt: string;
    updatedAt: string;
    lastClaimedAt: string | null;
    acceptTerms: boolean;
  };
  deposits: {
    list: any[];
    summary: {
      count: number;
      totalAmount: number;
    };
  };
  withdrawals: {
    list: any[];
    summary: {
      count: number;
      totalAmount: number;
    };
  };
  tasks: {
    completed: any[];
    pending: any[];
    summary: {
      completed: number;
      pending: number;
      inProgress: number;
      failed: number;
    };
  };
  transactionSummary: {
    totalDeposits: number;
    totalWithdrawals: number;
    totalEarnings: number;
    totalRefunds: number;
  };
}

export function useUserProfile(id: string | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user", id],
    queryFn: () => usersService.getUserById(id!),
    enabled: !!id,
    staleTime: 30000,
  });

  const profileData: UserProfileData | undefined = data?.data;

  return {
    data: profileData,
    user: profileData?.user,
    deposits: profileData?.deposits,
    withdrawals: profileData?.withdrawals,
    tasks: profileData?.tasks,
    transactionSummary: profileData?.transactionSummary,
    isLoading,
    error,
    refetch,
  };
}
