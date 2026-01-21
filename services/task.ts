import { GetTasksParams } from "@/types/task.types";
import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class TaskService {
  async getAllTasks(params?: GetTasksParams) {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Tasks.GET_ALL, {
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
}

export default new TaskService();
