import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, ClipboardList, Info, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

function SubmitProject() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("design");

  const categories = [
    { id: "design",    name: "Design",    icon: "🏛️",  dbName: "Design"    },
    { id: "shading",   name: "Shading",   icon: "☂️",   dbName: "Shading"   },
    { id: "materials", name: "Materials", icon: "🧱",   dbName: "Materials" },
    { id: "nature",    name: "Nature",    icon: "🌿",   dbName: "Nature"    },
  ];

  const getCategoryQuestions = (dbName) => {
    return questions.filter(q => q.category === dbName);
  };

  const isCategoryCompleted = (dbName) => {
    const catQs = getCategoryQuestions(dbName);
    if (catQs.length === 0) return false;
    return catQs.every(q => answers[q._id] !== undefined);
  };

  const getCategoryAnsweredCount = (dbName) => {
    const catQs = getCategoryQuestions(dbName);
    return catQs.filter(q => answers[q._id] !== undefined).length;
  };

  const navigate = useNavigate();

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/questions");
        setQuestions(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load evaluation questions");
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!pdf) {
      toast.error("Please provide the architectural PDF documentation");
      return;
    }

    if (questions.length > 0 && Object.keys(answers).length !== questions.length) {
      toast.error("Please complete all evaluation questions");
      return;
    }

    setLoading(true);
    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      questionId,
      selectedAnswer: answers[questionId],
    }));

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("pdf", pdf);
    formData.append("answers", JSON.stringify(formattedAnswers));

    try {
      await api.post("/projects", formData);
      toast.success("Architectural project submitted successfully! 🏛️");
      navigate("/architect/dashboard");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!title || !description)) {
      toast.error("Please fill in basic project details");
      return;
    }
    if (step === 2 && !pdf) {
      toast.error("Please upload the project documentation");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-8xl">
        <div className="glass-card rounded-[3rem] overflow-hidden relative">
          <div className="urban-pattern absolute inset-0 opacity-5 dark:opacity-10 mix-blend-overlay" />
          
          <div className="grid lg:grid-cols-12 min-h-[680px]">
            
            {/* Sidebar / Progress */}
            <div className="lg:col-span-4 bg-neutral p-10 text-neutral-content flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-[0.2em] mb-8 border border-white/10 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                   SUBMISSION WIZARD
                </div>
                
                <h2 className="text-3xl font-black mb-12 leading-tight">
                  Launch Your <span className="text-primary italic">Architectural</span> Legacy.
                </h2>

                <div className="space-y-8">
                  {[
                    { id: 1, label: "Core Concept", icon: Info },
                    { id: 2, label: "Blueprints & Specs", icon: Upload },
                    { id: 3, label: "Final Evaluation", icon: ClipboardList }
                  ].map((s) => (
                    <div key={s.id} className={`flex items-center gap-4 transition-all duration-300 ${step === s.id ? 'opacity-100 translate-x-2' : 'opacity-40'}`}>
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 ${step === s.id ? 'bg-primary border-primary text-primary-content' : 'border-current/20'}`}>
                          <s.icon size={18} />
                       </div>
                       <span className="text-sm font-bold">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] opacity-50 font-bold tracking-widest uppercase">
                Urban Development Office © 2026
              </div>
            </div>

            {/* Form Content */}
            <div className="lg:col-span-8 p-10 lg:p-18 flex flex-col justify-between">
              
              <div className="flex-1">
                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="mb-10 text-center lg:text-left">
                       <h3 className="text-2xl font-black text-base-content mb-2">Basic Information</h3>
                       <p className="text-base-content/60 text-sm font-medium italic">Define the conceptual soul of your urban project.</p>
                    </div>
                    <div className="space-y-8">
                      <div className="group">
                        <label className="text-[10px] font-black tracking-widest text-base-content/40 uppercase mb-2 block group-focus-within:text-primary transition-colors">Project Title</label>
                        <input
                          type="text"
                          placeholder="e.g., The Sandstone Heights"
                          className="w-full bg-base-200/50 border-base-content/10 border-2 p-4 rounded-2xl focus:border-primary focus:bg-base-100 transition-all outline-none font-bold text-base-content"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="group">
                        <label className="text-[10px] font-black tracking-widest text-base-content/40 uppercase mb-2 block group-focus-within:text-primary transition-colors">Description / Vision</label>
                        <textarea
                          placeholder="Describe the architectural impact and structural integrity..."
                          className="w-full bg-base-200/50 border-base-content/10 border-2 p-4 rounded-2xl focus:border-primary focus:bg-base-100 transition-all outline-none font-medium text-base-content min-h-[150px]"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="mb-10">
                       <h3 className="text-2xl font-black text-base-content mb-2">Technical Documentation</h3>
                       <p className="text-base-content/60 text-sm font-medium italic">Upload your finalized blueprints in PDF format.</p>
                    </div>
                    
                    <div 
                      className={`relative border-4 border-dashed rounded-[2rem] p-12 transition-all flex flex-col items-center justify-center gap-4 text-center group cursor-pointer ${
                        pdf ? 'border-primary bg-primary/5' : 'border-base-content/10 hover:border-primary/50 hover:bg-base-200 focus-within:border-primary'
                      }`}
                    >
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setPdf(e.target.files[0])}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className={`p-6 rounded-[2rem] shadow-xl group-hover:scale-110 transition-transform ${pdf ? 'bg-primary text-primary-content' : 'bg-base-100 text-base-content/20'}`}>
                        {pdf ? <CheckCircle2 size={40} /> : <Upload size={40} />}
                      </div>
                      <div className="mt-4">
                        <span className={`text-lg font-black block ${pdf ? 'text-primary' : 'text-base-content'}`}>{pdf ? pdf.name : 'Select PDF File'}</span>
                        <span className="text-xs text-base-content/40 font-bold uppercase tracking-widest">Max 25MB • Architectural Plans</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">

                    {/* Header + Progress Bar */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-black text-base-content mb-1">Self-Evaluation</h3>
                          <p className="text-base-content/60 text-xs font-medium italic">Verify your project's alignment with urban and climate-resilience specifications.</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="text-xs font-black text-base-content/50 uppercase tracking-widest">
                            {Object.keys(answers).length} <span className="text-base-content/25">/</span> 10 Answered
                          </span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full bg-base-content/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${(Object.keys(answers).length / 10) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-3 custom-scrollbar scrollbar-none mb-4">
                      {categories.map((cat) => {
                        const isCompleted = isCategoryCompleted(cat.dbName);
                        const answeredCount = getCategoryAnsweredCount(cat.dbName);
                        const totalCount = getCategoryQuestions(cat.dbName).length;
                        const isActive = activeCategory === cat.id;

                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shrink-0 border-2 transition-all duration-300 ${
                              isActive
                                ? 'bg-primary border-primary text-primary-content shadow-md'
                                : 'bg-base-200/50 border-transparent text-base-content/60 hover:bg-base-200 hover:text-base-content'
                            }`}
                          >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-black ${
                              isActive ? 'bg-primary-content/20 text-primary-content' : 'bg-base-content/10 text-base-content/50'
                            }`}>
                              {answeredCount}/{totalCount}
                            </span>
                            {isCompleted && <CheckCircle2 size={11} className={isActive ? 'text-primary-content' : 'text-success'} />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Question Cards */}
                    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                      {getCategoryQuestions(categories.find(c => c.id === activeCategory)?.dbName).map((q) => {
                        const isAnswered = answers[q._id] !== undefined;
                        const isYes = answers[q._id] === "Yes";
                        const isNo = answers[q._id] === "No";

                        return (
                          <div
                            key={q._id}
                            className={`bg-base-200/40 border-2 rounded-[2rem] p-6 transition-all duration-300 hover:border-primary/20 hover:bg-base-200/60 ${
                              isAnswered ? 'border-base-content/10' : 'border-transparent'
                            }`}
                          >
                            <div className="flex justify-between items-center gap-4 mb-3">
                              <span className="bg-primary/10 text-primary text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-primary/10 shadow-sm">
                                +{q.points} PTS
                              </span>
                              {isAnswered && (
                                <span className="text-success flex items-center gap-1 text-[10px] font-black uppercase tracking-widest animate-in fade-in zoom-in duration-300">
                                  <CheckCircle2 size={12} /> Answered
                                </span>
                              )}
                            </div>

                            <p className="text-base-content font-bold text-sm md:text-base mb-5 leading-snug">
                              {q.question}
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                              <button
                                type="button"
                                onClick={() => handleAnswerChange(q._id, "Yes")}
                                className={`py-3.5 rounded-2xl text-sm font-black transition-all duration-300 flex items-center justify-center gap-2 border-2 hover:scale-[1.02] active:scale-[0.98] ${
                                  isYes
                                    ? 'bg-success border-success text-success-content shadow-lg shadow-success/20'
                                    : 'bg-base-100 border-base-content/5 text-base-content/70 hover:border-success/30 hover:text-success'
                                }`}
                              >
                                ✓ Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAnswerChange(q._id, "No")}
                                className={`py-3.5 rounded-2xl text-sm font-black transition-all duration-300 flex items-center justify-center gap-2 border-2 hover:scale-[1.02] active:scale-[0.98] ${
                                  isNo
                                    ? 'bg-neutral border-neutral text-neutral-content shadow-lg'
                                    : 'bg-base-100 border-base-content/5 text-base-content/70 hover:border-error/30 hover:text-error'
                                }`}
                              >
                                ✗ No
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-12 bg-base-100/40 pt-8 border-t border-base-content/10">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-5 border-2 border-base-content text-base-content rounded-[1.5rem] font-black hover:bg-base-content hover:text-base-100 transition-all duration-300"
                  >
                    <ChevronLeft size={20} />
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    onClick={nextStep}
                    className="flex-[2] flex items-center justify-center gap-2 px-8 py-5 bg-neutral text-neutral-content rounded-[1.5rem] font-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
                  >
                    Continue
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-[2] relative overflow-hidden flex items-center justify-center gap-2 px-8 py-5 bg-primary text-primary-content rounded-[1.5rem] font-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-primary-content/30 border-t-primary-content rounded-full animate-spin" />
                    ) : (
                      <>
                        Finalize Submission
                        <CheckCircle2 size={20} />
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitProject;