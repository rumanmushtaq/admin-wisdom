export interface GetWithdrawsParams {
  page: number;
  limit: number;
  search?: string;
  isActive?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export enum WithdrawalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

export interface Withdraws {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  processedBy: {
    _id: string;
    name: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  amount: number;
  binancePayId: string;
  status: WithdrawalStatus;
  adminNotes?: string;
  rejectionReason?: string;
  processedAt?: string;
}
