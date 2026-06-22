"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Layers,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package } from "@/types/package.types";
import { useDeletePackage, usePackages } from "@/views/package/usePackage";
import { cn } from "@/lib/utils";

interface PackagesDataTableProps {
  setIsModalOpen: (a: boolean) => void;
  setEditingPackageId: (a: string) => void;
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <TableRow className="border-white/[0.04] hover:bg-transparent">
      {Array.from({ length: cols }).map((_, i) => (
        <TableCell key={i} className="py-4 px-5">
          <div className="h-4 rounded-md bg-white/[0.04] animate-pulse w-3/4" />
        </TableCell>
      ))}
    </TableRow>
  );
}

export function PackagesDataTable({
  setIsModalOpen,
  setEditingPackageId,
}: PackagesDataTableProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isActive, setIsActive] = useState<string>("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data, packageIsPending } = usePackages({
    page,
    limit,
    search: debouncedSearch || undefined,
    isActive: isActive === "all" ? undefined : isActive,
    sortBy,
    sortOrder,
  });

  const packages = useMemo(() => data?.data?.data ?? [], [data?.data?.data]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleToEdit = (id: string) => {
    setIsModalOpen(true);
    setEditingPackageId(id);
  };

  const deleteMutation = useDeletePackage();

  const columns = useMemo<ColumnDef<Package>[]>(
    () => [
      {
        accessorKey: "displayOrder",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1.5 group text-[10px] uppercase tracking-[0.2em] font-black text-white/25 hover:text-primary transition-colors"
          >
            Order
            <ArrowUpDown className="h-3 w-3 group-hover:text-primary transition-colors" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-white/40 font-mono text-sm">
            #{row.getValue("displayOrder")}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1.5 group text-[10px] uppercase tracking-[0.2em] font-black text-white/25 hover:text-primary transition-colors"
          >
            Name
            <ArrowUpDown className="h-3 w-3 group-hover:text-primary transition-colors" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-semibold text-white">{row.getValue("name")}</span>
        ),
      },
      {
        accessorKey: "credits",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1.5 group text-[10px] uppercase tracking-[0.2em] font-black text-white/25 hover:text-primary transition-colors"
          >
            Credits
            <ArrowUpDown className="h-3 w-3 group-hover:text-primary transition-colors" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-primary font-black font-mono text-sm">
            {row.getValue("credits")}
          </span>
        ),
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1.5 group text-[10px] uppercase tracking-[0.2em] font-black text-white/25 hover:text-primary transition-colors"
          >
            Price
            <ArrowUpDown className="h-3 w-3 group-hover:text-primary transition-colors" />
          </button>
        ),
        cell: ({ row }) => {
          const price = Number.parseFloat(row.getValue("price"));
          return (
            <span className="text-white font-bold font-mono">
              ${price.toFixed(2)}
            </span>
          );
        },
      },
      {
        accessorKey: "description",
        header: () => (
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/25">
            Description
          </span>
        ),
        cell: ({ row }) => (
          <span className="text-white/40 text-sm truncate max-w-[200px] block">
            {(row.getValue("description") as string) || "—"}
          </span>
        ),
      },
      {
        accessorKey: "isActive",
        header: () => (
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/25">
            Status
          </span>
        ),
        cell: ({ row }) => {
          const active = row.getValue("isActive") as boolean;
          return (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                active
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-white/[0.04] text-white/30 border border-white/10"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  active ? "bg-primary" : "bg-white/20"
                )}
              />
              {active ? "Active" : "Inactive"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: () => (
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/25">
            Actions
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-white/20 hover:text-primary hover:bg-primary/10 transition-all"
              onClick={() => row?.original?._id && handleToEdit(row.original._id)}
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
              onClick={() =>
                row?.original?._id && deleteMutation.mutate(row.original._id)
              }
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ),
      },
    ],
    [deleteMutation]
  );

  const table = useReactTable({
    data: packages,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: { sorting, columnFilters, pagination },
  });

  return (
    <div className="space-y-6">
      {/* ── Filter Bar ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
          <Input
            placeholder="Search packages…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-11 bg-white/[0.03] border-white/[0.07] text-white placeholder:text-white/20 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        <Select value={isActive} onValueChange={setIsActive}>
          <SelectTrigger className="h-11 w-[160px] bg-white/[0.03] border-white/[0.07] text-white/60 rounded-xl focus:border-primary/50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#0d0d0d] border-white/10 rounded-xl">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={(v) => setSortOrder(v as "asc" | "desc")}
        >
          <SelectTrigger className="h-11 w-[140px] bg-white/[0.03] border-white/[0.07] text-white/60 rounded-xl focus:border-primary/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#0d0d0d] border-white/10 rounded-xl">
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ── Table ──────────────────────────────────── */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-white/[0.06] hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-4 px-5">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {packageIsPending ? (
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} cols={columns.length} />
              ))
            ) : table.getRowModel().rows?.length ? (
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
            ) : (
              <TableRow className="border-0 hover:bg-transparent">
                <TableCell colSpan={columns.length}>
                  <div className="flex flex-col items-center justify-center py-20 text-white/10">
                    <Layers className="h-12 w-12 mb-4 stroke-[1px]" />
                    <p className="text-lg font-black uppercase tracking-[0.2em]">No Packages</p>
                    <p className="text-sm font-medium mt-1 text-white/20">
                      Create your first package to get started.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Pagination ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-3">
          <p className="text-xs text-white/25 font-mono">
            Showing{" "}
            <span className="text-white/50">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize + 1}
            </span>
            {" – "}
            <span className="text-white/50">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}
            </span>{" "}
            of{" "}
            <span className="text-primary font-black">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            entries
          </p>

          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger className="h-8 w-[90px] bg-white/[0.03] border-white/[0.07] text-white/40 rounded-lg text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0d0d0d] border-white/10 rounded-xl">
              {[5, 10, 20, 50].map((s) => (
                <SelectItem key={s} value={s.toString()}>
                  {s} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="h-9 w-9 rounded-xl border border-white/[0.07] text-white/30 hover:text-primary hover:border-primary/30 hover:bg-primary/10 disabled:opacity-20 transition-all"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-9 w-9 rounded-xl border border-white/[0.07] text-white/30 hover:text-primary hover:border-primary/30 hover:bg-primary/10 disabled:opacity-20 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center px-3">
            <span className="text-xs font-mono text-white/25">
              Page{" "}
              <span className="text-primary font-black">
                {table.getState().pagination.pageIndex + 1}
              </span>{" "}
              / {table.getPageCount()}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-9 w-9 rounded-xl border border-white/[0.07] text-white/30 hover:text-primary hover:border-primary/30 hover:bg-primary/10 disabled:opacity-20 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="h-9 w-9 rounded-xl border border-white/[0.07] text-white/30 hover:text-primary hover:border-primary/30 hover:bg-primary/10 disabled:opacity-20 transition-all"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
