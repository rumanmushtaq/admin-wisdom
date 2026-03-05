"use client";
import { AdminSidebar } from "@/components/admin-sidebar";
import { TasksDataTable } from "@/components/tasks-data-table";
import { NeonCard } from "@/components/neon-card";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheck,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Loader,
} from "lucide-react";
import { useState } from "react";
import { useTask } from "./useTask";
import { Task } from "@/types/task.types";
import { TaskStatus } from "./types";

export default function TasksPage() {
  const { tasks, taskIsPending } = useTask({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  console.log("tasks", tasks);
  const allTasks = tasks?.data || [];
  const totalTasks = tasks?.total || 0;

  console.log("allTasks", allTasks);
  const pendingTasks = allTasks.filter(
    (t: Task) => t.status === TaskStatus.PENDING,
  );
  const completedTasks = allTasks?.filter(
    (t: Task) => t.status === TaskStatus.COMPLETED,
  );
  const rejectedTasks = allTasks?.filter(
    (t: Task) => t.status === TaskStatus.REJECTED,
  );

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      {taskIsPending ? (
        <div className="flex-1 justify-center items-center">
          <Loader />
        </div>
      ) : (
        <main className="flex-1 lg:ml-64">
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold neon-text mb-2">
                  Tasks Management
                </h1>
                <p className="text-muted-foreground">
                  Assign and track user tasks
                </p>
              </div>
              <Button className="neon-glow">
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4 mb-8">
              <NeonCard
                title="Total Tasks"
                value={totalTasks}
                icon={ClipboardCheck}
              />
              <NeonCard
                title="Pending"
                value={pendingTasks?.length}
                icon={Clock}
              />
              <NeonCard
                title="Completed"
                value={completedTasks?.length}
                icon={CheckCircle}
              />
              <NeonCard
                title="Rejected"
                value={rejectedTasks?.length}
                icon={XCircle}
              />
            </div>

            {/* Tabs */}
            {/* Data Table */}
            <TasksDataTable />
          </div>
        </main>
      )}
    </div>
  );
}
