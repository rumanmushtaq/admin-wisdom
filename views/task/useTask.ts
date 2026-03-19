"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import taskServices from "@/services/task";

export const useTask = (params: any) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    search,
    isActive,
    taskStatus,
    dateFrom,
    dateTo,
  } = params;

  const {
    data: tasks,
    status: queryStatus,
    refetch: taskRefetch,
    isPending: taskIsPending,
  } = useQuery({
    queryKey: [
      "tasks",
      page,
      search,
      limit,
      sortBy,
      sortOrder,
      isActive,
      taskStatus,
      dateFrom,
      dateTo,
    ],
    queryFn: () =>
      taskServices.getAllTasks({
        page,
        limit,
        sortBy,
        sortOrder,
        search,
        taskStatus,
        dateFrom,
        dateTo,
      }),
    staleTime: 5000,
  });
  return { tasks, taskStatus: queryStatus, taskRefetch, taskIsPending };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => taskServices.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
