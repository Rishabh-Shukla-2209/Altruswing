import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  ImagePlus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const charities = [
  {
    id: "C-001",
    name: "Future Learners Alliance",
    category: "Education",
    region: "Global",
    status: "Active",
    contributions: "$142,500",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&q=60",
  },
  {
    id: "C-002",
    name: "Amazonas Reforest",
    category: "Environment",
    region: "South America",
    status: "Active",
    contributions: "$98,200",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&q=60",
  },
  {
    id: "C-003",
    name: "Vitality Health Hub",
    category: "Health",
    region: "Africa",
    status: "Active",
    contributions: "$76,800",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=200&q=60",
  },
  {
    id: "C-004",
    name: "Swift Response Team",
    category: "Crisis Relief",
    region: "Global",
    status: "Under Review",
    contributions: "$54,100",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=200&q=60",
  },
  {
    id: "C-005",
    name: "Blue Horizon Trust",
    category: "Oceans",
    region: "Asia Pacific",
    status: "Inactive",
    contributions: "$31,400",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=200&q=60",
  },
];

export default function CharitiesAdminPage() {
  return (
    <>
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">
            Charity Management
          </h2>
          <p className="text-on-surface-variant max-w-2xl">
            Add, edit, and manage charity organizations. Control content, media
            assets, and partnership details.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm hover:opacity-90 transition-opacity">
          <Plus size={16} />
          Add Charity
        </button>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Charities", value: "24", border: "border-primary" },
          { label: "Active Partners", value: "18", border: "border-secondary" },
          { label: "Total Contributions", value: "$402,900", border: "border-tertiary" },
          { label: "Pending Review", value: "3", border: "border-amber-400" },
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
            placeholder="Search charities by name, category, or region..."
            className="pl-12 pr-4 py-3 h-auto bg-surface-container-lowest border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-outline/50"
          />
        </div>
        <select className="appearance-none px-6 py-3 bg-surface-container-lowest rounded-xl border-none text-on-surface font-medium text-sm cursor-pointer">
          <option>All Categories</option>
          <option>Education</option>
          <option>Environment</option>
          <option>Health</option>
          <option>Crisis Relief</option>
          <option>Oceans</option>
        </select>
      </div>

      {/* Charity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities.map((c) => (
          <div
            key={c.id}
            className="bg-surface-container rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${
                    c.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : c.status === "Under Review"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-error/10 text-error border-error/20"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="bg-surface-container-lowest/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-on-surface-variant">
                  {c.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-headline font-bold text-lg">{c.name}</h4>
                  <p className="text-xs text-on-surface-variant">{c.region}</p>
                </div>
                <span className="text-xs font-mono text-on-surface-variant">
                  {c.id}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
                <div>
                  <p className="text-[10px] text-outline uppercase tracking-widest font-label">
                    Contributions
                  </p>
                  <p className="text-primary font-bold font-headline">
                    {c.contributions}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                    title="View"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                    title="Media"
                  >
                    <ImagePlus size={14} />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-error transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
