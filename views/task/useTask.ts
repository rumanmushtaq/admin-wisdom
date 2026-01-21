"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import taskServices from "@/services/task";

export const useTask = (params: any) => {
  const { page = 1, limit = 10, sortBy, sortOrder, search, isActive } = params;

  const {
    data: tasks,
    status: taskStatus,
    refetch: taskRefetch,
    isPending: taskIsPending,
  } = useQuery({
    queryKey: ["tasks", page, search, limit, sortBy, sortOrder, isActive],
    queryFn: () =>
      taskServices.getAllTasks({
        page,
        limit,
        sortBy,
        sortOrder,
        search,
      }),
    staleTime: 5000,
  });
  return {tasks,taskStatus, taskRefetch,taskIsPending };
};
