import { Tier } from "@/types/tiers.types";
import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class TiersService {
  /* =========================
         CREATE TIER
  ========================== */
  async createTier(payload: Omit<Tier, "id" | "createdAt">): Promise<Tier> {
    try {
      const { data } = await HTTP_CLIENT.post(
        apiEndpoints.Tier.CREATE,
        payload,
      );
      return data;
    } catch (error: any) {
      return error.response?.data || error.message;
    }
  }

  /* =========================
     GET PACKAGES (LIST)
  ========================== */
  async getTiers(): Promise<Tier[]> {
    try {
      console.log("getTiers")
      const { data } = await HTTP_CLIENT.get(apiEndpoints.Tier.GET_ALL);
      return data;
    } catch (error: any) {
      return error.response?.data || error.message;
    }
  }

  /* =========================
     UPDATE PACKAGE
  ========================== */
  async updateTier(
    id: string,
    payload: Partial<Tier>
  ): Promise<Tier> {
    try {
      const {data} = await HTTP_CLIENT.patch(
        apiEndpoints.Tier.UPDATE(id),
        payload
      );
      return data;
    } catch (error: any) {
      return error.response?.data || error.message;
    }
  }

    /* =========================
     DELETE PACKAGE
  ========================== */
  async deleteTier(id: string): Promise<string> {
    try {
      const {data} = await HTTP_CLIENT.delete(apiEndpoints.Tier.DELETE(id));
      return data;
    } catch (error: any) {
      return  error.response?.data || error.message;
    }
  }

  /* =========================
     GET A PACKAGE
  ========================== */
  async getById(id: string): Promise<null> {
    try {
      const {data} = await HTTP_CLIENT.get(apiEndpoints.Tier.GET_ONE(id));
      return data;
    } catch (error: any) {
      return error.response?.data || error.message;
    }
  }

}

export default new TiersService();
