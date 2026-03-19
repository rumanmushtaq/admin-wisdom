import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import settingService from "@/services/setting";
import { toast } from "sonner";

const useSettings = () => {
  const queryClient = useQueryClient();

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

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: (payload: any) => settingService.updatePlatformSettings(payload),
    onSuccess: (res) => {
      if (res.success !== false) {
        toast.success("Settings updated successfully");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      } else {
        toast.error(res.message || "Failed to update settings");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });

  return {
    settings,
    settingsStatus,
    settingsRefetch,
    settingsIsPending,
    updateSettings,
    isUpdating,
  };
};

export default useSettings;
