export interface GetUsersParams {
  page: number
  limit: number
  search?: string
  role?: string
  isActive?: string
  isVerified?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}


export interface User {
  _id: string;
  email: string;
  name: string;
  role: "customer" | "admin" | "barber"; 
  isVerified: boolean;
  isActive: boolean;
  phone?:string;
  // socialAuth?: SocialAuth;
  // verification?: Verification;
  // preferences?: UserPreferences;
  createdAt: string;  // or Date
  updatedAt: string;  // or Date
  lastLoginAt?: string; // or Date
  isDeleted?:boolean;
  __v?: number;
}