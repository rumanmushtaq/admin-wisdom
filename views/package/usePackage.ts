import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  GetPackagesParams,
  Package,
  PackagesResponse,
} from "@/types/package.types";
import packagesService from "@/services/package";
/* ===========================
   GET PACKAGES (LIST)
=========================== */

export const usePackages = (params: GetPackagesParams) => {
  const { page = 1, limit = 10, sortBy, sortOrder, search, isActive } = params;

  const {
    data,
    status: packageStatus,
    refetch: packageRefetch,
    isPending: packageIsPending,
  } = useQuery({
    queryKey: ["packages", page, search, limit, sortBy, sortOrder, isActive],
    queryFn: () =>
      packagesService.getPackages({
        page,
        limit,
        sortBy,
        sortOrder,
        search,
      }),
    staleTime: 5000,
  });

  return { data, packageStatus, packageRefetch, packageIsPending };
};

/* ===========================
   CREATE PACKAGE
=========================== */

export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Package, "id">) =>
      packagesService.createPackage(data),

    onSuccess: (res) => {
      console.log("res", res);
      // ✅ res should be the created Package
      queryClient.setQueriesData<Package[]>(
        { queryKey: ["packages"] },
        (oldData: any) => {
          if (!oldData) return [res];

          return {
            ...oldData,
            data: {
              ...oldData?.data,
              data: [res?.data, ...oldData?.data?.data],
              total: oldData.data.total + 1,
            },
          };
        }
      );
    },
  });
};

/* ===========================
   UPDATE PACKAGE
=========================== */

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Package> }) =>
      packagesService.updatePackage(id, data),

    onSuccess: (updatedPackage: any) => {
      // ✅ Update list cache
      queryClient.setQueriesData<Package[]>(
        { queryKey: ["packages"] },
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
        { queryKey: ["package-detail", updatedPackage.id] },
        updatedPackage?.data
      );
    },
  });
};

/* ===========================
   DELETE PACKAGE
=========================== */

export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => packagesService.deletePackage(id),
    onSuccess: (_, deletedId) => {
      // Update packages list in cache
      queryClient.setQueryData<any>(["packages"], (oldData:any) => {
        if (!oldData) return oldData;

        return {
          ...oldData, // keep limit, page, total
          data: {
            ...oldData?.data,
            data: oldData?.data?.data?.filter(
              (pkg: any) => pkg.id !== deletedId
            ),
            total: oldData.data.total - 1, // optional: update total
          },
        };
      });
    },
  });
};

/* ===========================
   GET A PACKAGE
=========================== */

export const useGetAPackage = (id?: string | null) => {
  return useQuery<Package>({
    queryKey: ["package-detail", id],
    enabled: !!id,
    staleTime: 5_000,

    queryFn: async () => {
      const res: ApiResponse<any> = await packagesService.getById(id as string);

      return res.data; // ✅ THIS FIXES EVERYTHING
    },
  });
};
