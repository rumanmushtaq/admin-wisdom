import { User } from "./users";

export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  data: string;
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;

export interface UserResponse {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
  users : User[]
}