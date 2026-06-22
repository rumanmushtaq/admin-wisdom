"use client";

import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreVertical,
  Eye,
  Trash2,
  ArchiveRestore,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Layers,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserProfileModal } from "@/components/userProfile/user-profile-modal";
import {
  useDeleteUser,
  useGetUsers,
  useRestoreUser,
  useToggleUserActive,
  useToggleUserVerified,
} from "@/views/users/useUsers";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-black tracking-wider flex-shrink-0">
      {initials || "?"}
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const isAdmin = role?.toLowerCase() === "admin";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest",
        isAdmin
          ? "bg-primary/15 text-primary border border-primary/30"
          : "bg-white/5 text-white/40 border border-white/10"
      )}
    >
      {role}
    </span>
  );
}

/* ─────────────────────────────────────────
   Cell Components
───────────────────────────────────────── */
type ToggleCellProps = {
  user: any;
  field: "isActive" | "isDeleted" | "isVerified";
  mutationHook: () => any;
};

function ToggleCell({ user, field, mutationHook }: ToggleCellProps) {
  const mutation = mutationHook();
  return (
    <Switch
      checked={user[field]}
      onCheckedChange={(val) => mutation.mutate({ id: user._id, [field]: val })}
      disabled={mutation.isPending}
    />
  );
}

function ActionsCell({
  user,
  onViewProfile,
}: {
  user: any;
  onViewProfile: (user: any) => void;
}) {
  const deleteUser = useDeleteUser();
  const restoreUser = useRestoreUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-white/30 hover:text-primary hover:bg-primary/10 transition-all"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl shadow-black/50 p-1"
      >
        <DropdownMenuItem
          onClick={() => onViewProfile(user)}
          className="rounded-lg text-white/70 hover:text-primary hover:bg-primary/10 cursor-pointer"
        >
          <Eye className="mr-2 h-4 w-4" />
          View Profile
        </DropdownMenuItem>
        {user.isDeleted ? (
          <DropdownMenuItem
            onClick={() => restoreUser.mutate({ id: user._id })}
            className="rounded-lg text-green-400 hover:text-green-300 hover:bg-green-500/10 cursor-pointer"
          >
            <ArchiveRestore className="mr-2 h-4 w-4" />
            Restore User
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => deleteUser.mutate({ id: user._id })}
            className="rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete User
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ─────────────────────────────────────────
   Skeleton Row
───────────────────────────────────────── */
function SkeletonRow({ cols }: { cols: number }) {
  return (
    <TableRow className="border-white/[0.04] hover:bg-transparent">
      {Array.from({ length: cols }).map((_, i) => (
        <TableCell key={i}>
          <div className="h-4 rounded-md bg-white/[0.04] animate-pulse w-3/4" />
        </TableCell>
      ))}
    </TableRow>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export function UserTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string | undefined>();
  const [isActive, setIsActive] = useState<string | undefined>();
  const [isVerified, setIsVerified] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const { data, isLoading } = useGetUsers({
    page,
    limit,
    search,
    role,
    isActive,
    isVerified,
    sortBy,
    sortOrder,
  });

  const users = data?.data?.data ?? [];
  const totalPages = data?.data?.pagination?.totalPages ?? 1;

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => {
          const fullName = `${row.original?.firstName ?? ""} ${row.original?.lastName ?? ""}`.trim();
          return (
            <div className="flex items-center gap-3">
              <UserAvatar name={fullName} />
              <div>
                <p className="font-semibold text-white text-sm">{fullName || "—"}</p>
                <p className="text-[11px] text-white/30 font-mono mt-0.5">
                  {row.original?.email}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <RoleBadge role={row.original.role} />,
      },
      {
        accessorKey: "credits",
        header: "Credits",
        cell: ({ row }) => (
          <span className="text-primary font-black font-mono text-sm">
            {Number(row.original.credits).toFixed(2)}
          </span>
        ),
      },
      {
        accessorKey: "totalEarnings",
        header: "Earnings",
        cell: ({ row }) => (
          <span className="text-white/60 font-mono text-sm">
            {row.original.totalEarnings ?? "—"}
          </span>
        ),
      },
      {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => (
          <ToggleCell
            user={row.original}
            field="isActive"
            mutationHook={useToggleUserActive}
          />
        ),
      },
      {
        accessorKey: "isDeleted",
        header: "Restricted",
        cell: ({ row }) => (
          <ToggleCell
            user={row.original}
            field="isDeleted"
            mutationHook={row.original.isDeleted ? useRestoreUser : useDeleteUser}
          />
        ),
      },
      {
        accessorKey: "isVerified",
        header: "Verified",
        cell: ({ row }) => (
          <ToggleCell
            user={row.original}
            field="isVerified"
            mutationHook={useToggleUserVerified}
          />
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <ActionsCell
            user={row.original}
            onViewProfile={(u) => setSelectedUser(u._id)}
          />
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <div className="space-y-6">
      {/* ── Filter Bar ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
          <Input
            placeholder="Search users by name or email…"
            value={search}
            onChange={(e) => { setPage(1); setSearch(e.target.value); }}
            className="pl-9 h-11 bg-white/[0.03] border-white/[0.07] text-white placeholder:text-white/20 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        <Select value={isActive ?? "all"} onValueChange={(v) => setIsActive(v === "all" ? undefined : v)}>
          <SelectTrigger className="h-11 w-[160px] bg-white/[0.03] border-white/[0.07] text-white/60 rounded-xl focus:border-primary/50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#0d0d0d] border-white/10 rounded-xl">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={limit.toString()} onValueChange={(v) => { setPage(1); setLimit(Number(v)); }}>
          <SelectTrigger className="h-11 w-[120px] bg-white/[0.03] border-white/[0.07] text-white/60 rounded-xl focus:border-primary/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#0d0d0d] border-white/10 rounded-xl">
            {[10, 20, 50].map((v) => (
              <SelectItem key={v} value={v.toString()}>{v} / page</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Table ──────────────────────────────────── */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="border-white/[0.06] hover:bg-transparent">
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-[10px] uppercase tracking-[0.2em] font-black text-white/25 py-4 px-5"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} cols={columns.length} />
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow className="border-0 hover:bg-transparent">
                <TableCell colSpan={columns.length}>
                  <div className="flex flex-col items-center justify-center py-20 text-white/10">
                    <Layers className="h-12 w-12 mb-4 stroke-[1px]" />
                    <p className="text-lg font-black uppercase tracking-[0.2em]">Void</p>
                    <p className="text-sm font-medium mt-1 text-white/20">No users match your filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "border-white/[0.04] transition-all duration-150 group",
                    "hover:bg-primary/[0.04] hover:border-primary/10",
                    idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3.5 px-5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Pagination ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
        <p className="text-xs text-white/25 font-mono">
          Page <span className="text-primary font-black">{page}</span> of{" "}
          <span className="text-white/40">{totalPages}</span>
        </p>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="h-9 w-9 rounded-xl border border-white/[0.07] text-white/30 hover:text-primary hover:border-primary/30 hover:bg-primary/10 disabled:opacity-20 transition-all"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="h-9 w-9 rounded-xl border border-white/[0.07] text-white/30 hover:text-primary hover:border-primary/30 hover:bg-primary/10 disabled:opacity-20 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page pills */}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const p = i + 1;
            return (
              <Button
                key={p}
                variant="ghost"
                size="icon"
                onClick={() => setPage(p)}
                className={cn(
                  "h-9 w-9 rounded-xl border text-xs font-black transition-all",
                  page === p
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-white/[0.07] text-white/20 hover:text-primary hover:border-primary/30 hover:bg-primary/10"
                )}
              >
                {p}
              </Button>
            );
          })}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="h-9 w-9 rounded-xl border border-white/[0.07] text-white/30 hover:text-primary hover:border-primary/30 hover:bg-primary/10 disabled:opacity-20 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="h-9 w-9 rounded-xl border border-white/[0.07] text-white/30 hover:text-primary hover:border-primary/30 hover:bg-primary/10 disabled:opacity-20 transition-all"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {selectedUser && (
        <UserProfileModal
          open={Boolean(selectedUser)}
          onOpenChange={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}
    </div>
  );
}
