import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Clock, FileText, ChevronDown, ChevronUp } from "lucide-react";
import api, { getFileUrl } from "../../services/api";

function OfficeDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [projects, setProjects] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch stats
      const statsRes = await api.get("/projects/stats");
      setStats(statsRes.data);

      // Fetch projects
      const projectsRes = await api.get("/projects");
      // Office dashboard only shows pending or rejected items needing review
      const filtered = projectsRes.data.filter(
        (p) => p.status === "pending" || p.status === "rejected"
      );
      setProjects(filtered);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (projectId, newStatus) => {
    try {
      await api.put(`/projects/${projectId}/status`, { status: newStatus });
      toast.success(`Project ${newStatus} successfully!`);
      // Refresh to update stats and remove from this list (if approved)
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error(`Failed to mark project as ${newStatus}`);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) return <div className="p-8">Loading Dashboard...</div>;

  return (
    <div className="space-y-8 relative">

      {/* ================= STATS BANNER ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        <div className="glass-card p-6 rounded-2xl border-l-4 border-blue-500 shadow-lg">
          <p className="text-xs text-base-content/40 font-black uppercase tracking-widest mb-2">Total Submissions</p>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FileText className="text-blue-500" size={24} />
            </div>
            <h3 className="text-3xl font-black text-base-content">{stats.total}</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border-l-4 border-warning shadow-lg">
          <p className="text-xs text-base-content/40 font-black uppercase tracking-widest mb-2">Awaiting Review</p>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-warning/10 rounded-lg">
                <Clock className="text-warning" size={24} />
             </div>
            <h3 className="text-3xl font-black text-base-content">{stats.pending}</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border-l-4 border-success shadow-lg">
          <p className="text-xs text-base-content/40 font-black uppercase tracking-widest mb-2">Authenticated Assets</p>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="text-success" size={24} />
             </div>
            <h3 className="text-3xl font-black text-base-content">{stats.approved}</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border-l-4 border-error shadow-lg">
          <p className="text-xs text-base-content/40 font-black uppercase tracking-widest mb-2">Rejected Proposals</p>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-error/10 rounded-lg">
                <XCircle className="text-error" size={24} />
             </div>
            <h3 className="text-3xl font-black text-base-content">{stats.rejected}</h3>
          </div>
        </div>
      </div>

      {/* ================= PROJECTS LIST ================= */}
      <div className="glass-card rounded-2xl shadow-xl overflow-hidden relative z-10 border border-base-content/5">
        <div className="urban-pattern absolute inset-0 opacity-5 dark:opacity-10 mix-blend-overlay pointer-events-none z-0" />
        
        <div className="px-8 py-6 border-b border-base-content/5 flex justify-between items-center bg-base-100/30 relative z-10">
          <h2 className="text-xl font-black text-base-content tracking-tight">Requires Office Review</h2>
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/10">
            {projects.length} Files Pending
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="p-20 text-center text-base-content/40 relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/5 text-success mb-6">
               <CheckCircle size={48} />
            </div>
            <p className="text-2xl font-black text-base-content mb-2">Operational Excellence</p>
            <p className="text-sm font-medium">There are no pending projects awaiting review at this time.</p>
          </div>
        ) : (
          <div className="divide-y divide-base-content/5 relative z-10">
            {projects.map((project) => (
              <div key={project._id} className="group transition-all duration-300">
                
                {/* ---------- CARD HEADER ---------- */}
                <div 
                  className="flex justify-between items-center cursor-pointer p-8 hover:bg-base-200/50 transition-colors"
                  onClick={() => toggleExpand(project._id)}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-base-200 rounded-2xl flex items-center justify-center text-primary shadow-inner border border-base-content/5">
                      <FileText size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-base-content group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm text-base-content/50 font-medium">
                        Submitted by: <span className="text-base-content font-bold">{project.architect?.name}</span> • {project.architect?.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    {/* Status Badge */}
                    <span 
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                        project.status === "rejected" 
                          ? "bg-error/10 text-error border-error/20" 
                          : "bg-warning/10 text-warning border-warning/20"
                      }`}
                    >
                      {project.status}
                    </span>
                    
                    {/* Expand Icon */}
                    <div className="text-base-content/20 group-hover:text-primary transition-colors">
                      {expandedId === project._id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                  </div>
                </div>

                {/* ---------- EXPANDED DETAILS ---------- */}
                {expandedId === project._id && (
                  <div className="px-8 pb-10 pl-24 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t border-dashed border-base-content/10 pt-10">
                      
                      {/* Left Column: Details & Document */}
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-[10px] uppercase tracking-[0.2em] text-base-content/30 font-black mb-3">Architectural Vision</h4>
                          <p className="text-base-content/70 text-sm leading-relaxed font-medium">{project.description}</p>
                        </div>

                        <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 relative overflow-hidden">
                          <div className="flex items-center gap-3 mb-3 relative z-10">
                            <CheckCircle className="text-primary" size={20} />
                            <h4 className="font-black text-primary text-xs uppercase tracking-widest">Calculated Score</h4>
                          </div>
                          <p className="text-4xl font-black text-base-content relative z-10">{project.score}</p>
                          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl -mr-12 -mt-12" />
                        </div>

                        <div>
                          <a 
                            href={getFileUrl(project.pdf)} 
                            target="_blank" 
                            rel="noreferrer"
                            className="btn btn-neutral btn-md rounded-2xl font-black normal-case gap-2"
                          >
                            <FileText size={18} />
                            Inspect Blueprints
                          </a>
                        </div>
                      </div>

                      {/* Right Column: Q&A */}
                      <div className="bg-base-200/30 p-8 rounded-3xl border border-base-content/5">
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-base-content/30 font-black mb-6">Expert Questionnaire Analysis</h4>
                        <ul className="space-y-4 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                          {project.answers?.map((ans, idx) => (
                            <li key={idx} className="bg-base-100 p-5 rounded-2xl shadow-sm border border-base-content/5 group/ans hover:border-primary/20 transition-all">
                              <p className="text-[10px] font-black text-base-content/20 uppercase mb-3">Assessment {idx + 1}</p>
                              <div className="flex justify-between items-start gap-6">
                                <p className="text-sm font-bold text-base-content/80 flex-1 leading-tight">{ans.selectedAnswer}</p>
                                {ans.isCorrect ? (
                                  <span className="bg-success text-success-content text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-tighter shrink-0 shadow-lg shadow-success/20">
                                    +{ans.pointsAwarded} PTS
                                  </span>
                                ) : (
                                  <span className="bg-error/10 text-error text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-tighter shrink-0 border border-error/10">
                                    Flagged
                                  </span>
                                )}
                              </div>
                            </li>
                          ))}
                          {(!project.answers || project.answers.length === 0) && (
                            <li className="text-sm text-base-content/30 italic py-10 text-center font-medium">No specialized evaluation data present.</li>
                          )}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="col-span-1 lg:col-span-2 flex gap-4 mt-4 justify-end border-t border-base-content/5 pt-8">
                        {project.status === "rejected" ? null : (
                          <button 
                            onClick={() => handleUpdateStatus(project._id, "rejected")}
                            className="btn btn-ghost btn-md text-error hover:bg-error/10 rounded-2xl font-black normal-case px-8"
                          >
                            Decline Proposal
                          </button>
                        )}
                        
                        <button 
                          onClick={() => handleUpdateStatus(project._id, "approved")}
                          className="btn btn-success btn-md text-success-content rounded-2xl font-black normal-case px-10 shadow-lg shadow-success/20 hover:scale-105 transition-all"
                        >
                          Authenticate Submission
                        </button>
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

export default OfficeDashboard;
