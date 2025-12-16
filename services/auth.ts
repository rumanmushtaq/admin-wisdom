import { Response, UserResponse } from "@/types/axios.types";
import { GetUsersParams } from "@/types/users";
import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";
import { LoginFormValues } from "@/views/login/useLogin";
import { ToggleActiveParams } from "@/views/users/useUsers";



class AuthService {
  async loginApi(params: LoginFormValues): Promise<any> {
        const payload  = {
        identifier: params.email,
        password: params.password
    }
    try {
      const res = await HTTP_CLIENT.post(apiEndpoints.Auth.LOGIN, payload);
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


export default new AuthService();