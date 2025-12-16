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
      usersService.toggleActive({ id, isActive });
    },
    onSuccess: (_, variables) => {
      queryClient.setQueriesData({ queryKey: ["users"] }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((user: any) =>
            user._id === variables.id
              ? { ...user, isActive: variables.isActive }
              : user
          ),
        };
      });
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
    mutationFn: ({ id }: DeleteUserParams) => usersService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.setQueriesData({ queryKey: ["users"] }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: oldData.data.data.map((user: any) =>
              user._id === variables.id
                ? { ...user, isDeleted: true }
                : user
            ),
          },
        };
      });
    },
  });
}

export function useRestoreUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteUserParams) => usersService.restore(id),

    onSuccess: (_, variables) => {
      queryClient.setQueriesData({ queryKey: ["users"] }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: oldData.data.data.map((user: any) =>
              user._id === variables.id
                ? { ...user, isDeleted: false }
                : user
            ),
          },
        };
      });
    },
  });
}

