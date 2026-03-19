import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class ReferralService {
  async getReferralChains(): Promise<any> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Referral.GET_ALL_CHAINS);
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

export default new ReferralService();
