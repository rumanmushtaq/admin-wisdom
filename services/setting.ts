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
        payload,
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

  async getSettings() {
    try {
      const {data} = await HTTP_CLIENT.get(apiEndpoints.Settings.ALL);
      return data.data;
    } catch (error: any) {
      return error.response?.data || error.message;
    }
  }

  async updateReferralSetting(
    payload: Partial<any>,

  ): Promise<ApiResponse<any>> {
    try {
      const res = await HTTP_CLIENT.put(
        apiEndpoints.Settings.UPDATE,
        payload,
      );

      return res.data;
    } catch (error: any) {
      return error.response?.data || error.message;
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

  /* =========================
     BINANCE ADDRESSES
     ========================== */
  async getBinanceAddresses(): Promise<ApiResponse<any>> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Settings.BINANCE_ADDRESSES);
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

  async addBinanceAddress(payload: { name: string; address: string }): Promise<ApiResponse<any>> {
    try {
      const res = await HTTP_CLIENT.post(apiEndpoints.Settings.BINANCE_ADDRESSES, payload);
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

  async updateBinanceAddress(id: string, payload: { name?: string; address?: string; isActive?: boolean }): Promise<ApiResponse<any>> {
    try {
      const res = await HTTP_CLIENT.put(apiEndpoints.Settings.BINANCE_ADDRESS(id), payload);
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

  async deleteBinanceAddress(id: string): Promise<ApiResponse<any>> {
    try {
      const res = await HTTP_CLIENT.delete(apiEndpoints.Settings.BINANCE_ADDRESS(id));
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

  async setActiveBinanceAddress(id: string): Promise<ApiResponse<any>> {
    try {
      const res = await HTTP_CLIENT.patch(`${apiEndpoints.Settings.BINANCE_ADDRESS(id)}/activate`);
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
