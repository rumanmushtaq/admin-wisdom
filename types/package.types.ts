export interface Package {
  _id?: string;
  id: string;
  name: string;
  price: number;
  credits: number;
  description: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
}

export interface GetPackagesParams {
  page: number;
  limit: number;
  search?: string;
  isActive?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PackagesResponse {
  data: Package[];
  total: number;
  page: number;
  limit: number;
}

export interface PackageFormValues {
  name: string;
  credits: number;
  price: number;
  description: string;
  isActive: boolean;
  displayOrder: number;
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}