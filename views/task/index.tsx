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
import { CreateTaskModal } from "./create-task-modal";

export default function TasksPage() {
  const { tasks, taskIsPending } = useTask({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("tasks", tasks);
  const allTasks = tasks?.data || [];
  const totalTasks = tasks?.stats?.total || 0;
  const pendingTasks = tasks?.stats?.pending || 0;
  const completedTasks = tasks?.stats?.completed || 0;
  const rejectedTasks = tasks?.stats?.rejected || 0;

  console.log("pendingTasks", pendingTasks);

  return (
    <main className="flex-1 w-full lg:ml-64 bg-[#020202] min-h-screen selection:bg-primary/30 selection:text-white">
      {taskIsPending ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader className="h-10 w-10 animate-spin text-primary/20" />
        </div>
      ) : (
        <div className="p-8 lg:p-12 max-w-[1400px] mx-auto space-y-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-primary/60">
                  Operations Center
                </span>
              </div>
              <h1 className="text-6xl font-black tracking-tight text-white leading-tight">
                Operations <span className="text-primary">.</span> Tasks
              </h1>
              <p className="text-muted-foreground/60 max-w-xl text-lg font-medium leading-relaxed">
                Assign, monitor, and track user tasks and progress workflows.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="h-14 px-8 bg-primary hover:bg-primary/80 text-black font-bold rounded-2xl shadow-[0_0_30px_rgba(209,255,77,0.1)] transition-all"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Task
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
            <NeonCard
              title="Total Tasks"
              value={totalTasks}
              icon={ClipboardCheck}
              className="bg-primary/5 border-primary/20"
            />
            <NeonCard
              title="Pending"
              value={pendingTasks}
              icon={Clock}
              className="bg-yellow-500/5 border-yellow-500/20"
            />
            <NeonCard
              title="Completed"
              value={completedTasks}
              icon={CheckCircle}
              className="bg-green-500/5 border-green-500/20"
            />
            <NeonCard
              title="Rejected"
              value={rejectedTasks}
              icon={XCircle}
              className="bg-red-500/5 border-red-500/20"
            />
          </div>

          {/* Data Table */}
          <div className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
            <TasksDataTable />
          </div>
        </div>
      )}

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </main>
  

  );
}
