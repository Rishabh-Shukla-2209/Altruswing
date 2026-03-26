import {
  Search,
  UserPlus,
  Edit3,
  MoreHorizontal,
  Shield,
  CreditCard,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const users = [
  {
    id: "U-001",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    handicap: 8,
    subscription: "Premium",
    status: "Active",
    scores: [42, 36, 38, 35, 32],
    joined: "Jan 12, 2024",
  },
  {
    id: "U-002",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    handicap: 14,
    subscription: "Standard",
    status: "Active",
    scores: [28, 31, 33, 29, 30],
    joined: "Feb 08, 2024",
  },
  {
    id: "U-003",
    name: "James Wilson",
    email: "james.wilson@example.com",
    handicap: 22,
    subscription: "Premium",
    status: "Suspended",
    scores: [22, 25, 24, 20, 23],
    joined: "Mar 01, 2024",
  },
  {
    id: "U-004",
    name: "Maria Rodriguez",
    email: "maria.r@example.com",
    handicap: 5,
    subscription: "Elite",
    status: "Active",
    scores: [40, 42, 39, 44, 41],
    joined: "Jan 02, 2024",
  },
  {
    id: "U-005",
    name: "David Kim",
    email: "david.kim@example.com",
    handicap: 18,
    subscription: "Standard",
    status: "Expired",
    scores: [26, 28, 30, 27, 29],
    joined: "Apr 15, 2024",
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Suspended: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Expired: "bg-error/10 text-error border-error/20",
  };
  return (
    <span
      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${styles[status] || ""}`}
    >
      {status}
    </span>
  );
}

function SubBadge({ sub }: { sub: string }) {
  const styles: Record<string, string> = {
    Elite: "bg-primary/10 text-primary border-primary/20",
    Premium: "bg-secondary/10 text-secondary border-secondary/20",
    Standard:
      "bg-surface-container-highest text-on-surface-variant border-outline-variant/20",
  };
  return (
    <span
      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${styles[sub] || ""}`}
    >
      {sub}
    </span>
  );
}

export default function UsersPage() {
  return (
    <>
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">
            User Management
          </h2>
          <p className="text-on-surface-variant max-w-2xl">
            View and edit user profiles, manage golf scores, and control
            subscription states.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm hover:opacity-90 transition-opacity">
          <UserPlus size={16} />
          Add User
        </button>
      </section>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "14,208", border: "border-primary" },
          { label: "Active Subscriptions", value: "11,942", border: "border-secondary" },
          { label: "Avg. Handicap", value: "14.2", border: "border-tertiary" },
          { label: "Suspensions", value: "23", border: "border-error" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-surface-container-lowest p-5 rounded-xl border-l-4 ${stat.border}`}
          >
            <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">
              {stat.label}
            </p>
            <h4 className="text-2xl font-bold font-headline">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
          />
          <Input
            placeholder="Search users by name, email, or ID..."
            className="pl-12 pr-4 py-3 h-auto bg-surface-container-lowest border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-outline/50"
          />
        </div>
        <select className="appearance-none px-6 py-3 bg-surface-container-lowest rounded-xl border-none text-on-surface font-medium text-sm cursor-pointer">
          <option>All Subscriptions</option>
          <option>Elite</option>
          <option>Premium</option>
          <option>Standard</option>
        </select>
        <select className="appearance-none px-6 py-3 bg-surface-container-lowest rounded-xl border-none text-on-surface font-medium text-sm cursor-pointer">
          <option>All Status</option>
          <option>Active</option>
          <option>Suspended</option>
          <option>Expired</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface-container rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  User
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Handicap
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Rolling 5
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Subscription
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Status
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Joined
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="group hover:bg-surface-container-highest/30 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div>
                      <div className="font-medium text-sm">{u.name}</div>
                      <div className="text-xs text-on-surface-variant">
                        {u.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-sm font-bold">
                    {u.handicap}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-1">
                      {u.scores.map((s, i) => (
                        <span
                          key={i}
                          className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold ${
                            i === u.scores.length - 1
                              ? "bg-primary/10 text-primary"
                              : "bg-surface-container-highest text-on-surface-variant"
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <SubBadge sub={u.subscription} />
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={u.status} />
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">
                    {u.joined}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                        title="Edit Profile"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                        title="Manage Subscription"
                      >
                        <CreditCard size={14} />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                        title="Permissions"
                      >
                        <Shield size={14} />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                        title="More"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-surface-container-low px-6 py-4 flex justify-between items-center text-xs text-on-surface-variant">
          <span>Showing 1-5 of 14,208 users</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-primary text-on-primary font-bold">
              1
            </button>
            <button className="px-3 py-1 rounded-md bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors">
              2
            </button>
            <button className="px-3 py-1 rounded-md bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors">
              3
            </button>
            <button className="px-3 py-1 rounded-md bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
