import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useDeleteTier, useGetTier, useUpdateTier } from "./useTier";
import { Tier } from "@/types/tiers.types";
import { PencilLine, ToggleLeft, Trash2 } from "lucide-react";
import TierForm from "@/components/molecules/setting/tier";

/* ----------------------------------
   Component
----------------------------------- */
const Index = ({
  form,
  setForm,
}: {
  form: boolean;
  setForm: (form: boolean) => void;
}) => {
  const { data = [], tierIsPending } = useGetTier();
  const deleteMutation = useDeleteTier();

  const updateMutation = useUpdateTier();

  const [isEdit, setIsEdit] = useState<Tier | null>(null);

  const handleToDelete = (tier: Tier) => {
    setForm(true);
    setIsEdit(tier);
  };
  /* ----------------------------------
   Columns
----------------------------------- */
  const columns: ColumnDef<Tier>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "level",
      header: "Level",
    },
    {
      accessorKey: "invitePercentage",
      header: "Invite %",
    },
    {
      accessorKey: "referralTaskPercentage",
      header: "Referral Task %",
    },
    {
      accessorKey: "minTasksCompleted",
      header: "Min Tasks",
    },
    {
      accessorKey: "minReferralCount",
      header: "Min Referrals",
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ getValue }) => {
        const isActive = getValue<boolean>();
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-semibold
            ${
              isActive
                ? "bg-primary text-primary-foreground neon-glow"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const tier = row.original;

        return (
          <div className="flex gap-2">
            <button
              title="Edit"
              className="px-2 py-1 rounded-md bg-primary text-primary-foreground neon-glow hover:neon-glow-strong transition cursor-pointer"
              onClick={() => tier && handleToDelete(tier)}
            >
              <PencilLine className="h-4 w-4" />
            </button>

            <button
              title="Delete"
              className="px-2 py-1 rounded-md bg-destructive text-destructive-foreground hover:opacity-90 transition cursor-pointer"
              onClick={() => tier._id && deleteMutation.mutate(tier._id)}
            >
              <Trash2 className="h-4 w-4" />
            </button>

            <button
              title="Toggle"
              className="px-2 py-1 rounded-md bg-primary text-primary-foreground neon-glow hover:neon-glow-strong transition cursor-pointer"
              onClick={() =>
                tier?._id &&
                updateMutation.mutate({
                  id: tier._id,
                  data: {
                    isActive: !tier.isActive,
                  },
                })
              }
            >
              <ToggleLeft className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (tierIsPending) {
    return <div className="text-muted-foreground py-6">Loading tiers…</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg neon-border bg-card">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-secondary">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-semibold text-muted-foreground border-b border-border"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-muted-foreground"
              >
                No tiers found
              </td>
            </tr>
          )}

          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-secondary/50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 border-b border-border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {form && (
        <TierForm
          form={form}
          setForm={setForm}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
    </div>
  );
};

export default Index;
