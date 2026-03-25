import { useEffect, useState } from "react";
import { FolderPlus, Clock, CheckCircle, XCircle, FileText } from "lucide-react";
import api from "../../services/api";
import EmptyState from "../../components/ui/EmptyState";

function ArchitectDashboard() {
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

  const activeProjects = projects.filter(
    (project) => project.status !== "approved"
  );

  if (loading) return <div className="p-8">Loading Dashboard...</div>;

  if (activeProjects.length === 0) {
    return (
      <EmptyState
        icon={FolderPlus}
        title="No Active Projects"
        description="Submit your architectural plans to start the evaluation process."
        buttonText="Submit New Project"
        buttonLink="/architect/submit"
      />
    );
  }

  return (
    <div className="relative min-h-[80vh]">
      <div className="relative z-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-base-content">
              Operational Pipeline
            </h2>
            <p className="text-base-content/60 mt-1">Manage your active architectural submissions.</p>
          </div>
          <span className="bg-base-200 text-primary px-4 py-1.5 rounded-full text-sm font-bold border border-base-300">
            {activeProjects.length} Pending Actions
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {activeProjects.map((project) => (
            <div
              key={project._id}
              className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:translate-y-[-4px] border border-base-content/10 shadow-xl"
            >
              {/* Glassmorphic Background */}
              <div className="absolute inset-0 bg-base-100/70 dark:bg-base-100/40 backdrop-blur-xl transition-all group-hover:bg-base-200/80" />
              <div className="urban-pattern absolute inset-0 opacity-10 dark:opacity-20" />
              
              <div className="relative p-8 z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-base-100 rounded-2xl shadow-sm text-primary">
                      <FileText size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-semibold text-base-content/40 tracking-widest uppercase mt-1">
                        ID: {project._id.slice(-8)}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border ${
                      project.status === "pending" 
                         ? "bg-warning/10 text-warning border-warning/20" 
                        : "bg-error/10 text-error border-error/20"
                    }`}>
                    {project.status === "pending" ? <Clock size={12} /> : <XCircle size={12} />}
                    {project.status}
                  </div>
                </div>

                <p className="text-base-content/70 text-sm line-clamp-2 mb-8 leading-relaxed">
                  {project.description || "No description provided for this architectural submission."}
                </p>

                <div className="flex justify-between items-center pt-6 border-t border-base-content/10">
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">Score</span>
                      <span className="text-2xl font-black text-base-content">{project.score ?? "0"}</span>
                   </div>
                   
                   <div className="flex gap-3">
                      <button className="text-xs font-bold text-base-content/40 hover:text-base-content transition underline underline-offset-4">
                        Edit Draft
                      </button>
                   </div>
                </div>
              </div>

              {/* Decorative Urban Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArchitectDashboard;