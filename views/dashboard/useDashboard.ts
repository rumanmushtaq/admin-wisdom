"use client";
import { useQuery } from "@tanstack/react-query";
import { HTTP_CLIENT } from "@/utils/axiosClient";
import apiEndpoints from "@/utils/apiConfig";

export interface AdminDashboardParams {
  fromDate?: string;
  toDate?: string;
  userStatus?: string;
  transactionStatus?: string;
}

export const useAdminDashboard = (params: AdminDashboardParams) => {
  return useQuery({
    queryKey: ["admin-dashboard", params],
    queryFn: async () => {
      const res = await HTTP_CLIENT.get(
        apiEndpoints.Dashboard.GET_ADMIN_STATS,
        {
          params,
        },
      );
      return res.data;
    },
    staleTime: 30000, // 30 seconds
  });
};
