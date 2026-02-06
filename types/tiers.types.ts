export interface Tier {
  _id?: string;
  name: string;
  level: number;
  invitePercentage: number;
  referralTaskPercentage: number;
  minTasksCompleted: number;
  minReferralCount: number;
  isActive: boolean;
}
