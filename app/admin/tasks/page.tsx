import { AdminSidebar } from "@/components/admin-sidebar"
import { TaskCard } from "@/components/task-card"
import { NeonCard } from "@/components/neon-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardCheck, Clock, CheckCircle, XCircle, Plus } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Complete Social Media Share",
    description: "Share platform on Twitter and Facebook",
    assignedTo: { name: "John Doe", email: "john@example.com" },
    status: "pending" as const,
    progress: 50,
    reward: "$25",
    deadline: "Dec 20, 2024",
  },
  {
    id: 2,
    title: "Verify Email Address",
    description: "Verify email to activate account features",
    assignedTo: { name: "Sarah Smith", email: "sarah@example.com" },
    status: "completed" as const,
    progress: 100,
    reward: "$10",
    deadline: "Dec 15, 2024",
  },
  {
    id: 3,
    title: "Complete Profile Information",
    description: "Fill out complete profile with all required fields",
    assignedTo: { name: "Mike Johnson", email: "mike@example.com" },
    status: "pending" as const,
    progress: 75,
    reward: "$15",
    deadline: "Dec 22, 2024",
  },
  {
    id: 4,
    title: "Watch Tutorial Videos",
    description: "Complete all platform tutorial videos",
    assignedTo: { name: "Emily Brown", email: "emily@example.com" },
    status: "completed" as const,
    progress: 100,
    reward: "$20",
    deadline: "Dec 18, 2024",
  },
  {
    id: 5,
    title: "Invite 5 Friends",
    description: "Invite at least 5 friends to join the platform",
    assignedTo: { name: "David Lee", email: "david@example.com" },
    status: "rejected" as const,
    progress: 20,
    reward: "$50",
    deadline: "Dec 25, 2024",
  },
  {
    id: 6,
    title: "Daily Login Streak",
    description: "Maintain 7-day consecutive login streak",
    assignedTo: { name: "John Doe", email: "john@example.com" },
    status: "pending" as const,
    progress: 85,
    reward: "$30",
    deadline: "Dec 21, 2024",
  },
]

export default function TasksPage() {
  const pendingTasks = tasks.filter((t) => t.status === "pending")
  const completedTasks = tasks.filter((t) => t.status === "completed")
  const rejectedTasks = tasks.filter((t) => t.status === "rejected")

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold neon-text mb-2">Tasks Management</h1>
              <p className="text-muted-foreground">Assign and track user tasks</p>
            </div>
            <Button className="neon-glow">
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <NeonCard title="Total Tasks" value={tasks.length} icon={ClipboardCheck} />
            <NeonCard title="Pending" value={pendingTasks.length} icon={Clock} />
            <NeonCard title="Completed" value={completedTasks.length} icon={CheckCircle} />
            <NeonCard title="Rejected" value={rejectedTasks.length} icon={XCircle} />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="neon-border">
              <TabsTrigger value="all">All Tasks ({tasks.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedTasks.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </TabsContent>

            <TabsContent value="pending" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingTasks.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </TabsContent>

            <TabsContent value="completed" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </TabsContent>

            <TabsContent value="rejected" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rejectedTasks.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
