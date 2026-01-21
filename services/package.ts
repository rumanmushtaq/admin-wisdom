import { GetPackagesParams, Package } from "@/types/package.types";
import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

class PackagesService {
  /* =========================
     GET PACKAGES (LIST)
  ========================== */
  async getPackages(params?: GetPackagesParams): Promise<
    ApiResponse<{
      data: Package[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Packages.GET_ALL, {
        params: {
          ...params,
          sortOrder: params?.sortOrder?.toUpperCase(), // asc -> ASC
        },
      });

      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.response?.data || error.message,
      };
    }
  }

  /* =========================
     CREATE PACKAGE
  ========================== */
  async createPackage(
    payload: Omit<Package, "id" | "createdAt">
  ): Promise<ApiResponse<Package>> {
    try {
      const res = await HTTP_CLIENT.post(
        apiEndpoints.Packages.GET_ALL,
        payload
      );

      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.response?.data || error.message,
      };
    }
  }

  /* =========================
     UPDATE PACKAGE
  ========================== */
  async updatePackage(
    id: string,
    payload: Partial<Package>
  ): Promise<ApiResponse<Package>> {
    try {
      const res = await HTTP_CLIENT.put(
        apiEndpoints.Packages.UPDATE(id),
        payload
      );

      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.response?.data || error.message,
      };
    }
  }

  /* =========================
     DELETE PACKAGE
  ========================== */
  async deletePackage(id: string): Promise<ApiResponse<null>> {
    try {
      await HTTP_CLIENT.delete(apiEndpoints.Packages.DELETE(id));

      return {
        success: true,
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.response?.data || error.message,
      };
    }
  }

  /* =========================
     GET A PACKAGE
  ========================== */
  async getById(id: string): Promise<ApiResponse<null>> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Packages.GET_ONE(id));

      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.response?.data || error.message,
      };
    }
  }
}

export default new PackagesService();
