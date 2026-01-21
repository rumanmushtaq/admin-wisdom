const apiEndpoints = {
  Auth: {
    LOGIN: "/api/v1/auth/signin",
    CHANGE_PASSWORD: "/api/v1/auth/change-password",
  },
  Users: {
    GET_ALL: `/api/v1/users`,
    RESTORE: `/api/v1/users/restore`,
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
  },
  Tasks: {
    GET_ALL: "/api/v1/tasks",
    APPROVE: (id: string) => `/api/v1/transactions/approve/${id}`,
    REJECCT: (id: string) => `/api/v1/transactions/reject/${id}`,
  },
  Settings : {
    UPDATE_BINANCE : `/api/v1/settings/binance`,
  }
};

export default apiEndpoints;
