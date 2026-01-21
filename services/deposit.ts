import { Deposit, GetDepositsParams } from "@/types/deposit.types";
import { ApiResponse } from "@/types/package.types";
import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class DepositService {
  /* =========================
     GET PACKAGES (LIST)
  ========================== */
  async getDeposits(params?: GetDepositsParams) {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Deposits.GET_ALL, {
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

  async approvePackage(id: string): Promise<ApiResponse<Deposit>> {
    try {
      const res = await HTTP_CLIENT.patch(apiEndpoints.Deposits.APPROVE(id));

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

  async rejectPackage(id: string): Promise<ApiResponse<Deposit>> {
    try {
      const res = await HTTP_CLIENT.patch(apiEndpoints.Deposits.REJECCT(id));

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

export default new DepositService();
