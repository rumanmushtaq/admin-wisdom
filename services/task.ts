import { GetTasksParams } from "@/types/task.types";
import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class TaskService {
  async getAllTasks(params?: GetTasksParams) {
    try {
      const { data } = await HTTP_CLIENT.get(apiEndpoints.Tasks.GET_ALL, {
        params: {
          ...params,
          sortOrder: params?.sortOrder?.toUpperCase(), // asc -> ASC
        },
      });

      return data;
    } catch (error: any) {
      const err = error.response?.data || error.message;
      return err;
    }
  }

  async createTask(payload: any) {
    try {
      const { data } = await HTTP_CLIENT.post(
        apiEndpoints.Tasks.GET_ALL,
        payload,
      );
      return data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async updateTask(id: string, payload: any) {
    try {
      const { data } = await HTTP_CLIENT.patch(
        apiEndpoints.Tasks.UPDATE(id),
        payload,
      );
      return data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  async deleteTask(id: string) {
    try {
      const { data } = await HTTP_CLIENT.delete(apiEndpoints.Tasks.DELETE(id));
      return data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
}

export default new TaskService();
