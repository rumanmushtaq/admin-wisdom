"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateTask, useUpdateTask } from "./useTask";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  websiteUrl: z.string().url("Invalid URL").min(1, "Website URL is required"),
  verificationDuration: z.string().min(1, "Duration is required"),
  date: z.string().min(1, "Date is required"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

/** Shape of the task record passed in when editing */
interface TaskData {
  _id: string;
  title: string;
  description?: string;
  websiteUrl: string;
  verificationDuration: number;
  date: string;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pass the existing task to switch the modal into edit mode */
  task?: TaskData | null;
}

export function CreateTaskModal({
  isOpen,
  onClose,
  task,
}: CreateTaskModalProps) {
  const isEditMode = Boolean(task);

  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const isPending = isCreating || isUpdating;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      websiteUrl: "",
      verificationDuration: "60",
      date: new Date().toISOString().split("T")[0],
    },
  });

  // Pre-populate form when a task is provided (edit mode)
  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description ?? "",
        websiteUrl: task.websiteUrl,
        verificationDuration: String(task.verificationDuration),
        date: task.date
          ? task.date.split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    } else {
      form.reset({
        title: "",
        description: "",
        websiteUrl: "",
        verificationDuration: "60",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [task, isOpen]);

  const onSubmit = (values: TaskFormValues) => {
    const payload = {
      ...values,
      verificationDuration: Number(values.verificationDuration),
    };

    if (isEditMode && task) {
      // --- EDIT MODE ---
      updateTask(
        { id: task._id, payload },
        {
          onSuccess: () => {
            toast.success("Task updated successfully!");
            onClose();
          },
          onError: (error: any) => {
            toast.error(error?.message || "Failed to update task");
          },
        },
      );
    } else {
      // --- CREATE MODE ---
      const userStr =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      const user = userStr ? JSON.parse(userStr) : null;
      const adminId = user?._id;

      if (!adminId) {
        toast.error("Admin session not found. Please log in again.");
        return;
      }

      createTask(
        { ...payload, isVerified: true, createdBy: adminId },
        {
          onSuccess: () => {
            toast.success("Task created successfully!");
            form.reset();
            onClose();
          },
          onError: (error: any) => {
            toast.error(error?.message || "Failed to create task");
          },
        },
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#0A0A0A] border-[#BFFF00]/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold neon-text">
            {isEditMode ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#BFFF00]">Task Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Visit Website & Signup"
                      className="neon-border bg-black/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#BFFF00]">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter task details..."
                      className="neon-border bg-black/50 min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#BFFF00]">Website URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      className="neon-border bg-black/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="verificationDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#BFFF00]">
                      Duration (sec)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="neon-border bg-black/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#BFFF00]">Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="neon-border bg-black/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="neon-border hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="neon-glow bg-[#BFFF00] text-black hover:bg-[#BFFF00]/90"
                disabled={isPending}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? "Save Changes" : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
