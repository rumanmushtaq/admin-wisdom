import { GetWithdrawsParams, Withdraws } from "@/types/withdraws.types";
import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

class WithdrawsService {
  /* =========================
     GET WITHDRAWS (LIST)
  ========================== */
  async getAllWithdraws(params?: GetWithdrawsParams): Promise<
    ApiResponse<{
      data: Withdraws[];
      total: number;
      page: number;
      limit: number;
    }>
  > {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Withdraws.GET_ALL, {
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
     GET STATS
  ========================== */
  async getStats(): Promise<ApiResponse<any>> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Withdraws.GET_STATS);
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
     SEED DUMMY DATA
  ========================== */
  async seed(): Promise<ApiResponse<any>> {
    try {
      const res = await HTTP_CLIENT.post(apiEndpoints.Withdraws.SEED);
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

export default new WithdrawsService();
