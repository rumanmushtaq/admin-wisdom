const apiEndpoints = {
  Auth: {
    LOGIN: "/api/v1/auth/signin",
    CHANGE_PASSWORD: "/api/v1/auth/change-password",
  },
  Users: {
    GET_ALL: `/api/v1/users`,
    GET_ONE: (id: string) => `/api/v1/users/details/${id}`,
    RESTORE: `/api/v1/users/restore`,
    SHARE_CREDITS: (id: string) => `/api/v1/users/${id}/share-credits`,
  },
  Referral: {
    GET_ALL_CHAINS: "/api/v1/referral/all-chains",
  },
  Packages: {
    GET_ALL: "/api/v1/packages",
    CREATE: "/api/v1/packages",
    UPDATE: (id: string) => `/api/v1/packages/${id}`,
    GET_ONE: (id: string) => `/api/v1/packages/${id}`,
    DELETE: (id: string) => `/api/v1/packages/${id}`,
  },
  Deposits: {
    GET_ALL: "/api/v1/transactions",
    APPROVE: (id: string) => `/api/v1/transactions/approve/${id}`,
    REJECCT: (id: string) => `/api/v1/transactions/reject/${id}`,
    GET_STATS: "/api/v1/transactions/global-stats",
  },
  Tasks: {
    GET_ALL: "/api/v1/tasks",
    UPDATE: (id: string) => `/api/v1/tasks/${id}`,
    APPROVE: (id: string) => `/api/v1/transactions/approve/${id}`,
    REJECCT: (id: string) => `/api/v1/transactions/reject/${id}`,
  },
  Settings: {
    UPDATE_BINANCE: `/api/v1/settings/binance`,
    BINANCE_ADDRESSES: `/api/v1/settings/binance/addresses`,
    BINANCE_ADDRESS: (id: string) => `/api/v1/settings/binance/addresses/${id}`,
    UPDATE: `/api/v1/settings`,
    ALL: `/api/v1/settings`,
  },
  Wallet: {
    GET_ALL: "/api/v1/wallets",
    CREATE: "/api/v1/wallets",
    UPDATE: (id: string) => `/api/v1/wallets/${id}`,
    GET_ONE: (id: string) => `/api/v1/wallets/${id}`,
    DELETE: (id: string) => `/api/v1/wallets/${id}`,
    SET_ACTIVE: (id: string) => `/api/v1/wallets/${id}/activate`,
  },
  Tier: {
    GET_ALL: "/api/v1/tiers",
    CREATE: "/api/v1/tiers",
    UPDATE: (id: string) => `/api/v1/tiers/${id}`,
    GET_ONE: (id: string) => `/api/v1/tiers/${id}`,
    DELETE: (id: string) => `/api/v1/tiers/${id}`,
  },
  Dashboard: {
    GET_ALL: "/api/v1/dashboard",
    STATS: "/api/v1/dashboard/stats",
    GET_ADMIN_STATS: "/api/v1/dashboard/admin",
  },
  Withdraws: {
    GET_ALL: "/api/v1/withdrawals/all",
    APPROVE: (id: string) => `/api/v1/withdrawals/approve/${id}`,
    REJECCT: (id: string) => `/api/v1/withdrawals/reject/${id}`,
    GET_STATS: "/api/v1/withdrawals/stats",
    SEED: "/api/v1/withdrawals/seed",
  },
};

export default apiEndpoints;
