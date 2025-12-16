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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreVertical, Eye, Trash2, ArchiveRestore } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserProfileModal } from "@/components/user-profile-modal";
import {
  useDeleteUser,
  useGetUsers,
  useRestoreUser,
  useToggleUserActive,
} from "@/views/users/useUsers";
import { Switch } from "./ui/switch";

export function UserTable() {
  /* -------------------- Filters (GLOBAL STATE) -------------------- */
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string | undefined>();
  const [isActive, setIsActive] = useState<string | undefined>();
  const [isVerified, setIsVerified] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* -------------------- API -------------------- */
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

  console.log("users", users);
  /* -------------------- Columns -------------------- */
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => (
          <div className="flex">
            <p className="font-medium">
              {row.original.firstName} {row.original.lastName}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div>
            <p className="text-sm text-muted-foreground">
              {row.original.email}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <div>
            <p className="text-sm text-muted-foreground">{row.original.role}</p>
          </div>
        ),
      },
      {
        accessorKey: "credits",
        header: "Credits",
        cell: ({ row }) => (
          <div>
            <p className="text-sm text-muted-foreground">
              {row.original.credits}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "totalEarnings",
        header: "Earnings",
        cell: ({ row }) => (
          <div>
            <p className="text-sm text-muted-foreground">
              {row.original.totalEarnings}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => {
          const user = row.original;
          const toggleUserActive = useToggleUserActive();

          const handleChange = (val: boolean) => {
            toggleUserActive.mutate({ id: user._id, isActive: val });
          };
          return (
            <div>
              <Switch
                checked={row.original.isActive}
                onCheckedChange={(val: boolean) => handleChange(val)}
                disabled={toggleUserActive.isPending}
              />
            </div>
          );
        },
      },
      {
        accessorKey: "isVerified",
        header: "Verified",
        cell: ({ row }) => {
          const isVerified = row.original.isVerified;
          return (
            <Badge
              variant={isVerified ? "default" : "outline"} // default = green, outline = grey
              className="px-2 py-1"
            >
              {isVerified ? "Verified" : "Not Verified"}
            </Badge>
          );
        },
      },

      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => <Badge>{getValue() as string}</Badge>,
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          const user = row.original;
          const deleteUser = useDeleteUser();
          const restoreUser = useRestoreUser();

          const handleDelete = () => {
            deleteUser.mutate({ id: user._id });
          };

          const handleRestore = () => {
            restoreUser.mutate({ id: user._id });
          };
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedUser(row.original);
                    setIsModalOpen(true);
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
                {row.original.isDeleted ? (
                  <DropdownMenuItem onClick={handleRestore}>
                    <ArchiveRestore className="mr-2 h-4 w-4" />
                    Restore User
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete User
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  /* -------------------- Table -------------------- */
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  /* -------------------- UI -------------------- */
  return (
    <div className="space-y-4">
      {/* Search */}
      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      {/* Table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length}>Loading...</TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </Button>

        <span>
          Page {page} of {totalPages}
        </span>

        <Button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>

        <Select
          value={String(limit)}
          onValueChange={(v) => {
            setPage(1);
            setLimit(Number(v));
          }}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50].map((v) => (
              <SelectItem key={v} value={String(v)}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedUser && (
        <UserProfileModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          user={selectedUser}
        />
      )}
    </div>
  );
}
