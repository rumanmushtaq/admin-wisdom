import { GetUsersParams } from "@/types/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import usersService from "@/services/users";

export function useGetUsers(params: GetUsersParams) {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    role,
    search,
    isActive,
    isVerified,
  } = params;

  const {
    data,
    status: userStatus,
    refetch: userRefetch,
    isPending: isLoading,
  } = useQuery({
    queryKey: [
      "users",
      page,
      search,
      limit,
      sortBy,
      sortOrder,
      role,
      isActive,
      isVerified,
    ],
    queryFn: () =>
      usersService.getUsers({
        page,
        limit,
        sortBy,
        sortOrder,
        role,
        search,
      }),
    staleTime: 5000,
    // keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });

  return { data, userStatus, userRefetch, isLoading };
}

export interface ToggleActiveParams {
  id: string;
  isActive: boolean;
}

export function useToggleUserActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isActive }: ToggleActiveParams) => {
      return usersService.toggleActive({ id, isActive });
    },
    onSuccess: (response) => {
      if (response?.success) {
        // Invalidate all users queries to refetch fresh data
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (err) => {
      console.error("Failed to update user status", err);
    },
  });
}

interface DeleteUserParams {
  id: string;
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteUserParams) => {
      return usersService.delete(id);
    },
    onSuccess: (response) => {
      if (response?.success) {
        // Invalidate all users queries to refetch fresh data
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (err) => {
      console.error("Failed to delete user", err);
    },
  });
}

export function useRestoreUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteUserParams) => {
      return usersService.restore(id);
    },
    onSuccess: (response) => {
      if (response?.success) {
        // Invalidate all users queries to refetch fresh data
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (err) => {
      console.error("Failed to restore user", err);
    },
  });
}

