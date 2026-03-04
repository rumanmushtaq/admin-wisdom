"use client";
import { useQuery } from "@tanstack/react-query";
import DashboardService from "@/services/dashboard";

const useHome = () => {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => DashboardService.getStats(),
  });

  console.log("Stats values:", stats);

  return { stats, isLoading, isError };
};

export default useHome;
