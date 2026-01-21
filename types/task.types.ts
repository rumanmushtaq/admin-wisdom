
export interface Task {
  _id: string;
  userId?: string;
  taskId?: string;
  verificationCode: string;
  status: string;
  earnedCredits: string;
  expiresAt: string;
  createdAt?: string;
  updatedAt?: string;
  user : {
    _id : string;
    email : string;
    firstName : string;
    lastName : string;
    role : string;
  },
  task : {
    _id : string;
    title : string;
    description : string;
    websiteUrl : string;
    verificationDuration : number;
    status : string;
    assignedCount : number;
    isActive : boolean;
    date : string;
    createdAt : string;
    updatedAt : string;
  }
}


export interface GetTasksParams {
  page: number;
  limit: number;
  search?: string;
  isActive?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
