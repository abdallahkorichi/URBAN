import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle, FileText, ChevronDown, ChevronUp } from "lucide-react";
import api from "../../services/api";

function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get("/projects");
        // The All Projects page serves as an archive strictly for approved projects
        const approvedOnly = res.data.filter((p) => p.status === "approved");
        setProjects(approvedOnly);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load approved projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedProjects();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) return <div className="p-8">Loading Archive...</div>;

  return (
    <div className="space-y-8 relative">
      <div className="glass-card p-8 rounded-[2rem] shadow-xl relative z-10 border border-base-content/5 overflow-hidden">
        <div className="urban-pattern absolute inset-0 opacity-5 dark:opacity-10 mix-blend-overlay pointer-events-none z-0" />
        <div className="relative z-10">
          <h2 className="text-2xl font-black text-base-content tracking-tight">Approved Projects Archive</h2>
          <p className="mt-2 text-base-content/50 text-sm font-medium italic">
            A historical log of all projects authorized and approved by the office.
          </p>
        </div>
      </div>

      <div className="glass-card rounded-[2rem] shadow-xl overflow-hidden relative z-10 border border-base-content/5">
        <div className="urban-pattern absolute inset-0 opacity-5 dark:opacity-10 mix-blend-overlay pointer-events-none z-0" />
        <div className="px-8 py-6 border-b border-base-content/5 flex justify-between items-center bg-success/10 relative z-10">
          <h2 className="text-xs font-black text-success uppercase tracking-[0.2em]">
            {projects.length} Authenticated Assets
          </h2>
        </div>

        {projects.length === 0 ? (
          <div className="p-20 text-center text-base-content/30 italic relative z-10">
            <CheckCircle size={48} className="mx-auto opacity-20 mb-6" />
            <p className="text-xl font-black text-base-content mb-2">No Approved Projects Yet.</p>
            <p className="text-sm font-medium">Check your dashboard to approve incoming submissions.</p>
          </div>
        ) : (
          <div className="divide-y divide-base-content/5 relative z-10">
            {projects.map((project) => (
              <div key={project._id} className="group transition-all duration-300">
                
                {/* ---------- CARD HEADER ---------- */}
                <div 
                  className="flex justify-between items-center cursor-pointer hover:bg-base-200/50 p-8 transition-colors"
                  onClick={() => toggleExpand(project._id)}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center text-success border border-success/10 shadow-inner">
                      <CheckCircle size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-base-content group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm text-base-content/50 font-medium">
                        Architect: <span className="text-base-content font-bold">{project.architect?.name}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <span className="px-4 py-1.5 bg-success/10 text-success rounded-full text-[10px] font-black uppercase tracking-widest border border-success/20 shadow-sm">
                      Approved
                    </span>
                    <div className="text-base-content/20 group-hover:text-primary transition-colors">
                      {expandedId === project._id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                  </div>
                </div>

                {/* ---------- EXPANDED DETAILS ---------- */}
                {expandedId === project._id && (
                  <div className="px-8 pb-12 pl-28 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-dashed border-base-content/10 pt-10">
                      {/* Left: Metadata */}
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-[10px] uppercase tracking-[0.2em] text-base-content/30 font-black mb-3">Architect Details</h4>
                          <p className="text-sm text-base-content/70 font-bold">{project.architect?.email}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] uppercase tracking-[0.2em] text-base-content/30 font-black mb-3">Project Description</h4>
                          <p className="text-sm text-base-content/70 bg-base-200/50 p-5 rounded-2xl border border-base-content/5 leading-relaxed italic">{project.description}</p>
                        </div>

                        <div className="flex items-center gap-6 mt-6">
                          <div className="bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10 min-w-[140px] text-center">
                            <span className="block text-[10px] uppercase text-primary font-black tracking-widest mb-1">Final Score</span>
                            <span className="block text-3xl font-black text-base-content">{project.score}</span>
                          </div>
                          
                          <a 
                            href={`http://localhost:5000/${project.pdf}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="btn btn-neutral btn-lg flex-1 rounded-2xl font-black normal-case gap-3 shadow-lg"
                          >
                            <FileText size={20} />
                            Inspect Specs
                          </a>
                        </div>
                      </div>

                      {/* Right: Evaluated Q&A */}
                      <div>
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-base-content/30 font-black mb-6">Expert Evaluation Record</h4>
                        <div className="bg-base-200/30 p-6 rounded-3xl border border-base-content/5 max-h-[350px] overflow-y-auto custom-scrollbar">
                          {project.answers && project.answers.length > 0 ? (
                            <ul className="space-y-4">
                              {project.answers.map((ans, idx) => (
                                <li key={idx} className="bg-base-100 p-5 rounded-2xl shadow-sm border border-base-content/5 group/ans hover:border-primary/20 transition-all">
                                  <div className="flex justify-between items-start gap-6">
                                    <p className="text-sm text-base-content/80 font-bold flex-1 leading-tight"><span className="text-[10px] font-black text-base-content/20 uppercase mr-3">Q{idx + 1}</span> {ans.selectedAnswer}</p>
                                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest shrink-0 shadow-sm ${ans.isCorrect ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                                      {ans.isCorrect ? `+${ans.pointsAwarded} PTS` : 'Flagged'}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-base-content/30 italic py-10 text-center font-medium">No specialized evaluation data present.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProjects;
