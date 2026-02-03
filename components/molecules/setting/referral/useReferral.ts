"use client";
import { useForm } from "react-hook-form";
import { FormData } from "./types";
import { useMutation } from "@tanstack/react-query";
import settingsService from "@/services/setting";
import { useEffect, useMemo, useState } from "react";

const useReferral = ({ settings }: { settings: any }) => {
 

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      referralCommission: 0, // Ensure these match your type
      referralBonus:  0,
    },
  });

  useEffect(() => {
    if (settings) {
      reset({
        referralCommission: settings.referralTaskPercentage ?? 0,
        referralBonus: settings.invitePercentage ?? 0,
      });
    }
  }, [settings, reset]);

  const mutation = useMutation({
    mutationFn: settingsService.updateReferralSetting,
    onSuccess: (data) => {
      // Handle success (e.g., show a success message)
      console.log("Referral settings saved successfully:", data);
    },
    onError: (error: any) => {
      // Handle error (e.g., show an error message)
      console.error("Error submitting referral settings:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data);

    // The data to send in the mutation
    const payload = {
      referralTaskPercentage: data.referralCommission, // Use the form data
      invitePercentage: data.referralBonus,
    };

    // Calling the mutation with settingKey and payload
    mutation.mutate(payload);
    // Add your form submission logic here, like API calls or state updates
  };

  return {
    control,
    handleSubmit,
    errors,
    watch,
    onSubmit,
  };
};

export default useReferral;
