export interface Deposit {
  _id?: string;
  userId?: string;
  type: string;
  amount: number;
  transactionId: string;
  image: string;
  status: string;
  balancebefore: number;
  createdAt?: string;
  updatedAt?: string;
  user : {
    _id : string;
    email : string;
    firstName : string;
    lastName : string;
    role : string;
  }
}

export interface GetDepositsParams {
  page: number;
  limit: number;
  search?: string;
  isActive?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
