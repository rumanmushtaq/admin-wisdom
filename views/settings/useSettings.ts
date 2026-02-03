"use client";

import { useQuery } from "@tanstack/react-query";
import settingService from "@/services/setting";

const useSettings = () => {
  const {
    data: settings,
    status: settingsStatus,
    refetch: settingsRefetch,
    isPending: settingsIsPending,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: () => settingService.getSettings(),
    staleTime: 5000,
  });
  return {
    settings,
    settingsStatus,
    settingsRefetch,
    settingsIsPending,
  };
};

export default useSettings;
