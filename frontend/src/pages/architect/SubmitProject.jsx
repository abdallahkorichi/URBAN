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
      <div className="relative z-10 w-full max-w-4xl">
        <div className="glass-card rounded-[3rem] overflow-hidden relative">
          <div className="urban-pattern absolute inset-0 opacity-5 dark:opacity-10 mix-blend-overlay" />
          
          <div className="grid lg:grid-cols-12 min-h-[600px]">
            
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
            <div className="lg:col-span-8 p-10 lg:p-16 flex flex-col justify-between">
              
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
                    <div className="mb-10 text-center lg:text-left">
                       <h3 className="text-2xl font-black text-base-content mb-2">Self-Evaluation</h3>
                       <p className="text-base-content/60 text-sm font-medium italic">Verify your project's alignment with urban specifications.</p>
                    </div>

                    <div className="space-y-6 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                      {questions.map((q, idx) => (
                        <div key={q._id} className="bg-base-200/50 border-2 border-base-content/10 rounded-3xl p-6 transition-all focus-within:border-primary/50">
                          <label className="text-xs font-black text-base-content/40 uppercase tracking-widest mb-4 block">Question {idx + 1}</label>
                          <p className="text-base-content font-bold text-lg mb-6 leading-tight">{q.question}</p>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {q.options.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => handleAnswerChange(q._id, option)}
                                className={`p-4 rounded-2xl text-sm font-bold border-2 transition-all text-left flex items-center justify-between group ${
                                  answers[q._id] === option 
                                    ? 'bg-primary border-primary text-primary-content shadow-lg' 
                                    : 'bg-base-100 border-transparent text-base-content/70 hover:border-primary/30'
                                }`}
                              >
                                {option}
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${answers[q._id] === option ? 'border-primary-content' : 'border-base-content/20 group-hover:border-primary/30'}`}>
                                   {answers[q._id] === option && <CheckCircle2 size={12} />}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
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