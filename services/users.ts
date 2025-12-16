import { Response, UserResponse } from "@/types/axios.types";
import { GetUsersParams } from "@/types/users";
import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";
import { ToggleActiveParams } from "@/views/users/useUsers";

class UsersService {
  async getUsers(params?: GetUsersParams): Promise<any> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Users.GET_ALL, { params });
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async toggleActive({ id, isActive }: ToggleActiveParams): Promise<any> {
    try {
      const res = await HTTP_CLIENT.put(`${apiEndpoints.Users.GET_ALL}/${id}`, {
        isActive,
      });
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const res = await HTTP_CLIENT.delete(
        `${apiEndpoints.Users.GET_ALL}/${id}`
      );
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async restore(id: string): Promise<any> {
    try {
      const res = await HTTP_CLIENT.patch(
        `${apiEndpoints.Users.GET_ALL}/restore/${id}`
      );
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }
}

export default new UsersService();
