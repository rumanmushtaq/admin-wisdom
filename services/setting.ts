import { ApiResponse } from "@/types/package.types";
import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class SettingsService {
  /* =========================
         UPDATE PACKAGE
      ========================== */
  async updateBinance(payload: Partial<any>): Promise<ApiResponse<any>> {
    try {
      const res = await HTTP_CLIENT.put(
        apiEndpoints.Settings.UPDATE_BINANCE,
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
  async getBinance() {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Settings.UPDATE_BINANCE);

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

export default new SettingsService();
