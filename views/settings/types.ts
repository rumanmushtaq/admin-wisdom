export interface PasswordChangeForm {
  "current-password": string;
  "new-password": string;
  "confirm-password"?: string;
}

export interface PasswordChangeFormTypes {
  currentPassword: string;
  newPassword: string;
}



export interface BinanceForm {
  binance: string;

}