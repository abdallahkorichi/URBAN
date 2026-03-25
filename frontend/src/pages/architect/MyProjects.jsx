import { useEffect, useState } from "react";
import { CheckCircle, FileText, BadgeCheck, Download } from "lucide-react";
import api from "../../services/api";
import EmptyState from "../../components/ui/EmptyState";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get("/projects/my");
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter only approved projects
  const approvedProjects = projects.filter(
    (project) => project.status === "approved"
  );

  if (loading) return <div className="p-8">Loading Archive...</div>;

  if (approvedProjects.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle}
        title="No Approved Assets"
        description="Your approved architectural projects will be archived here for your records."
        buttonText="View Dashboard"
        buttonLink="/architect/dashboard"
      />
    );
  }

  return (
    <div className="relative min-h-[80vh]">
      <div className="relative z-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-base-content">
              Authorized Archive
            </h2>
            <p className="text-base-content/60 mt-1">Verified and approved architectural masterpieces.</p>
          </div>
          <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-2xl border border-success/20 text-sm font-bold shadow-sm">
            <BadgeCheck size={18} />
            {approvedProjects.length} Verified
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approvedProjects.map((project) => (
            <div
              key={project._id}
              className="group relative overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl border border-base-content/10"
            >
              {/* Premium Glass Card */}
              <div className="absolute inset-0 bg-base-100/70 dark:bg-base-100/40 backdrop-blur-xl transition-all group-hover:bg-base-200/50" />
              <div className="urban-pattern absolute inset-0 opacity-10 dark:opacity-20" />
              
              <div className="relative p-10 z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 bg-success/10 text-success rounded-2xl flex items-center justify-center shadow-inner">
                    <CheckCircle size={32} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-base-content/40 uppercase tracking-[0.2em] mb-1">Score</span>
                    <span className="text-3xl font-black text-base-content leading-none">{project.score ?? "100"}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-base-content mb-3 group-hover:text-success transition-colors">
                  {project.title}
                </h3>

                <p className="text-base-content/60 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
                  {project.description || "Historical record of the architectural submission and its subsequent approval by the Urban Planning office."}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-base-content/10 italic">
                   <a 
                    href={`http://localhost:5000/${project.pdf}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-base-content/40 hover:text-primary transition"
                   >
                     <FileText size={14} />
                     View Specs
                   </a>
                   <div className="h-2 w-2 rounded-full bg-success shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                </div>
              </div>

              {/* Hover Overlay Accent */}
              <div className="absolute inset-0 bg-success/0 group-hover:bg-success/[0.03] transition-colors pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
