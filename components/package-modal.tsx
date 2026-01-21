"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Package, PackageFormValues } from "@/types/package.types";
import {
  useCreatePackage,
  useGetAPackage,
  useUpdatePackage,
} from "@/views/package/usePackage";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  editPackage?: string | null; // package ID
}

export function PackageModal({
  isOpen,
  onClose,
  editPackage,
}: PackageModalProps) {
  const { control, handleSubmit, reset } = useForm<PackageFormValues>({
    defaultValues: {
      name: "",
      credits: 0,
      price: 0,
      description: "",
      isActive: true,
      displayOrder: 0,
    },
  });

  const { mutate: createPackage, isPending: isCreating } = useCreatePackage();

  const { mutate: updatePackage, isPending: isUpdating } = useUpdatePackage();

  const { data: packageData, isPending } = useGetAPackage(editPackage);
  // 🔁 Sync fetched data → form
  useEffect(() => {
    if (!isOpen) return;

    if (packageData) {
      reset({
        name: packageData.name,
        credits: packageData.credits,
        price: packageData.price,
        description: packageData.description,
        isActive: packageData.isActive,
        displayOrder: packageData.displayOrder,
      });
    }

    if (!editPackage) {
      reset();
    }
  }, [packageData, editPackage, isOpen, reset]);

  const submitHandler = (data: PackageFormValues) => {
    const formattedData = {
      ...data,
      credits: Number(data.credits),
      price: Number(data.price),
      displayOrder: Number(data.displayOrder),
    };

    if (editPackage) {
      updatePackage(
        {
          id: editPackage,
          data: formattedData,
        },
        { onSuccess: () => onClose() }
      );
    } else {
      createPackage(formattedData, { onSuccess: () => onClose() });
 
    }
  };

  if (!isOpen) return null;

  // ⏳ Loading state (edit only)
  if (editPackage && isPending) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <span className="text-[#BFFF00] text-lg">Loading package...</span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-lg border border-[#BFFF00]/30 bg-black/90 p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 opacity-70 hover:opacity-100"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-4 text-2xl font-bold text-[#BFFF00]">
          {editPackage ? "Edit Package" : "Create Package"}
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <Label>Package Name *</Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input {...field} className="neon-border bg-black/30" />
                )}
              />
            </div>

            {/* Credits */}
            <div>
              <Label>Credits *</Label>
              <Controller
                name="credits"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    className="neon-border bg-black/30"
                  />
                )}
              />
            </div>

            {/* Price */}
            <div>
              <Label>Price *</Label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    className="neon-border bg-black/30"
                  />
                )}
              />
            </div>

            {/* Display Order */}
            <div>
              <Label>Display Order</Label>
              <Controller
                name="displayOrder"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    className="neon-border bg-black/30"
                  />
                )}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  className="neon-border bg-black/30 min-h-24"
                />
              )}
            />
          </div>

          {/* Active Switch */}
          <div className="flex items-center gap-2">
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label>Active</Label>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#BFFF00] text-black">
              {editPackage ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
