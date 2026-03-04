import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class DashboardService {
  /* =========================
     GET STATS (LIST)
  ========================== */
  async getStats() {
    try {
      const { data } = await HTTP_CLIENT.get(apiEndpoints.Dashboard.STATS);
      return data;
    } catch (error: any) {
      const err = error.response?.data || error.message;
      return err;
    }
  }
}

export default new DashboardService();
