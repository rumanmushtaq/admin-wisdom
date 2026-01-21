"use client";

import { useState } from "react";
import { Plus, Loader2, PackageIcon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PackagesDataTable } from "@/components/packages-data-table";
import { PackageModal } from "@/components/package-modal";

import { Package } from "@/types/package.types";
import {
  useCreatePackage,
  usePackages,
  useUpdatePackage,
  useDeletePackage,
} from "./usePackage";

export default function PackagesPage() {
  /* =========================
     UI STATE
  ========================== */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  /* =========================
     MUTATIONS
  ========================== */
  const createMutation = useCreatePackage();
  const updateMutation = useUpdatePackage();
  const deleteMutation = useDeletePackage();

  /* =========================
     HANDLERS
  ========================== */
  const handleCreate = () => {
    setEditingPackageId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (pkg: Package) => {
    if (pkg._id) {
      setEditingPackageId(pkg._id);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    // deleteMutation.mutate(deleteId, {
    //   onSuccess: () => setDeleteId(null),
    // });
  };

  const handleSubmit = (data: Omit<Package, "id"> | Package) => {
    if ("id" in data) {
      updateMutation.mutate(
        { id: data.id, data },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingPackageId(null);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  /* =========================
     RENDER
  ========================== */
  return (
    // <div className="min-h-screen bg-background p-8 lg:ml-64">
    //   <div className=" max-w-7xl">
    <main className="flex-1 lg:ml-64">
      <div className="p-6 lg:p-8">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <PackageIcon className="h-8 w-8 text-[#BFFF00]" />
              <h1 className="text-4xl font-bold text-[#BFFF00]">Packages</h1>
            </div>
            <p className="mt-2 text-muted-foreground">
              Manage credit packages for your platform
            </p>
          </div>

          <Button
            onClick={handleCreate}
            className="bg-[#BFFF00] text-black hover:bg-[#BFFF00]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Package
          </Button>
        </div>

        <PackagesDataTable
          setIsModalOpen={setIsModalOpen}
          setEditingPackageId={setEditingPackageId}
        />
      </div>
      {/* MODAL */}
      <PackageModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPackageId(null);
        }}
        editPackage={editingPackageId}
      />
    </main>
  );
}
