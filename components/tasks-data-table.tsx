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
  Eye,
  X,
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
import { Task } from "@/types/task.types";
import { useTask } from "@/views/task/useTask";
import { format } from "date-fns";

export function TasksDataTable() {
  /* =========================
       QUERY STATE
    ========================== */
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Function to clear all filters
  const clearAllFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
  };

  /* =========================
     FETCH TASKS
  ========================== */
  const { tasks, taskIsPending } = useTask({
    page,
    limit,
    search: debouncedSearch || undefined,
    taskStatus: statusFilter === "all" ? undefined : statusFilter,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    sortBy,
    sortOrder,
  });

  const allTasks = useMemo(() => tasks?.data ?? [], [tasks?.data]);
  const totalTasks = tasks?.total || 0;
  const pageCount = Math.ceil(totalTasks / limit);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: limit,
  });

  // Sync internal tanstack table pagination state with our backend parameters
  const handlePaginationChange = (updater: any) => {
    // Tanstack passes a function or the new state
    const newPagination =
      typeof updater === "function" ? updater(pagination) : updater;
    setPagination(newPagination);
    setPage(newPagination.pageIndex + 1);
    setLimit(newPagination.pageSize);
  };

  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        id: "user",
        header: "User",
        cell: ({ row }) => {
          const user = row.original?.user;
          return (
            <div>
              <div className="font-semibold text-white">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
            </div>
          );
        },
      },
      {
        id: "taskTitle",
        accessorFn: (row) => row.task?.title,
        header: "Task",
        cell: ({ row }) => {
          const task = row.original?.task;
          return (
            <div>
              <div className="font-medium text-white truncate max-w-[200px]">
                {task?.title || "N/A"}
              </div>
              <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                {task?.description || "N/A"}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "earnedCredits",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="hover:text-[#BFFF00] px-0"
            >
              Earned Credits
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <span className="text-[#BFFF00] font-semibold">
              {row.getValue("earnedCredits")}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original?.task.status as string;
          let colorClass = "bg-gray-500/20 text-gray-400";

          if (status === "pending") {
            colorClass = "bg-yellow-500/20 text-yellow-500";
          } else if (status === "completed") {
            colorClass = "bg-[#BFFF00]/20 text-[#BFFF00]";
          } else if (status === "rejected") {
            colorClass = "bg-red-500/20 text-red-500";
          }

          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${colorClass}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="hover:text-[#BFFF00] px-0"
            >
              Created At
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const dateStr = row.getValue("createdAt") as string;
          if (!dateStr) return <span>-</span>;
          return <span>{format(new Date(dateStr), "MMM dd, yyyy")}</span>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:text-[#BFFF00]"
                onClick={() => console.log("View", row.original._id)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:text-blue-500"
                onClick={() => console.log("Edit", row.original._id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: allTasks,
    columns,
    pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: handlePaginationChange,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div className="space-y-4">
      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 w-full">
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm text-muted-foreground">Search</label>
          <Input
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm neon-border bg-black/30 w-full sm:w-auto"
          />
        </div>

        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm text-muted-foreground">Status</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] neon-border bg-black/30">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm text-muted-foreground">Date Range</label>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full sm:w-[150px] neon-border bg-black/30"
              placeholder="From Date"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full sm:w-[150px] neon-border bg-black/30"
              placeholder="To Date"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm text-muted-foreground">Sort Order</label>
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value as "asc" | "desc")}
          >
            <SelectTrigger className="w-full sm:w-[180px] neon-border bg-black/30">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear All Filters Button */}
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm text-transparent">Action</label>
          <Button
            onClick={clearAllFilters}
            variant="outline"
            className="neon-border hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-colors"
            title="Clear all filters"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#BFFF00]/30 bg-black/30 backdrop-blur-sm overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-[#BFFF00]/20 hover:bg-[#BFFF00]/5"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-[#BFFF00] whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {taskIsPending ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Loading tasks...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-[#BFFF00]/10 hover:bg-[#BFFF00]/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            {totalTasks > 0
              ? table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                1
              : 0}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              totalTasks,
            )}{" "}
            of {totalTasks} entries
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px] neon-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="neon-border h-8 w-8 p-0 hidden sm:flex"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="neon-border"
          >
            <ChevronLeft className="h-4 w-4 mr-1 hidden sm:block" />
            Previous
          </Button>
          <div className="flex items-center gap-1 mx-2">
            <span className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount() || 1}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="neon-border"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1 hidden sm:block" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="neon-border h-8 w-8 p-0 hidden sm:flex"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
