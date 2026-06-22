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
        },
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
    <main className="flex-1 w-full lg:ml-64 bg-[#020202] min-h-screen selection:bg-primary/30 selection:text-white">
      <div className="p-8 lg:p-12 max-w-[1400px] mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <PackageIcon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-primary/60">
                Monetization Module
              </span>
            </div>
            <h1 className="text-6xl font-black tracking-tight text-white leading-tight">
              Store <span className="text-primary">.</span> Packages
            </h1>
            <p className="text-muted-foreground/60 max-w-xl text-lg font-medium leading-relaxed">
              Manage credit packages and pricing structures for your platform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleCreate}
              className="h-14 px-8 bg-primary hover:bg-primary/80 text-black font-bold rounded-2xl shadow-[0_0_30px_rgba(209,255,77,0.1)] transition-all"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Package
            </Button>
          </div>
        </div>

        <div className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
          <PackagesDataTable
            setIsModalOpen={setIsModalOpen}
            setEditingPackageId={setEditingPackageId}
          />
        </div>
      </div>
      {/* MODAL */}
      {isModalOpen && (
        <PackageModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPackageId(null);
          }}
          editPackage={editingPackageId}
        />
      )}
    </main>
  );
}
