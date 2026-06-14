import { FileText, Download } from "lucide-react";

const decrees = [
  {
    id: "decree-arabic",
    lang: "AR",
    label: "العربية",
    title: "المرسوم التنفيذي رقم 14/27",
    subtitle: "المؤرخ في 1 فبراير 2014",
    description: "النص الرسمي باللغة العربية",
    file: "/assets/decrees/decree-14-27-ar.pdf",
    dir: "rtl",
    flagEmoji: "🇩🇿",
    color: "from-[#C2A97F]/10 to-[#F5EFE6]",
    border: "border-[#C2A97F]/30",
    badge: "bg-[#C2A97F]/15 text-[#7A5C35]",
  },
  {
    id: "decree-french",
    lang: "FR",
    label: "Français",
    title: "Décret Exécutif N° 14/27",
    subtitle: "Du 1er Février 2014",
    description: "Texte officiel en langue française",
    file: "/assets/decrees/decree-14-27-fr.pdf",
    dir: "ltr",
    flagEmoji: "🇫🇷",
    color: "from-[#9C7B52]/10 to-[#F5EFE6]",
    border: "border-[#9C7B52]/30",
    badge: "bg-[#9C7B52]/15 text-[#5C3D1A]",
  },
];

function DecreeSection() {
  return (
    <section className="py-24 bg-base-100 border-t border-[#E8DFD0]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#C2A97F]/15 text-[#7A5C35] text-xs font-bold uppercase tracking-widest mb-4">
            Legal Reference
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3E2F1C]">
            Executive Decree No. 14/27
          </h2>
          <p className="mt-4 text-[#5C4B37] max-w-2xl mx-auto leading-relaxed">
            The KOUTHBAN evaluation system is built upon the provisions of
            Executive Decree No. 14/27 of February 1, 2014, governing urban
            planning and construction in the Southern Provinces of Algeria.
            Download the official texts below.
          </p>
        </div>

        {/* Decree Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {decrees.map((decree) => (
            <a
              key={decree.id}
              href={decree.file}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gradient-to-br ${decree.color} border ${decree.border} rounded-3xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
              title={`Open ${decree.title} (PDF)`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-[#E8DFD0] flex items-center justify-center">
                    <FileText size={22} className="text-[#9C7B52]" />
                  </div>
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${decree.badge} mb-1`}
                    >
                      {decree.flagEmoji} {decree.label}
                    </span>
                    <p className="text-[11px] text-[#9C7B52] font-medium">
                      PDF Document
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/70 border border-[#E8DFD0] flex items-center justify-center group-hover:bg-[#C2A97F] group-hover:border-[#C2A97F] transition-colors duration-300">
                  <Download
                    size={16}
                    className="text-[#9C7B52] group-hover:text-white transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Content */}
              <div dir={decree.dir}>
                <h3 className="text-xl font-bold text-[#3E2F1C] leading-snug">
                  {decree.title}
                </h3>
                <p className="text-sm text-[#9C7B52] font-medium mt-1">
                  {decree.subtitle}
                </p>
                <p className="text-sm text-[#5C4B37] mt-3">
                  {decree.description}
                </p>
              </div>

              {/* Footer row */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#9C7B52] group-hover:text-[#7A5C35] transition-colors mt-auto pt-2 border-t border-[#E8DFD0]">
                <FileText size={13} />
                <span>Click to open document</span>
                <span className="ml-auto text-[10px] uppercase tracking-widest opacity-60">
                  Official Text
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Notice */}
        <p className="mt-10 text-center text-xs text-[#9C7B52]/70 font-medium">
          These documents are official texts issued by the Algerian government.
          All evaluation criteria within the KOUTHBAN platform are derived from
          these regulatory instruments.
        </p>
      </div>
    </section>
  );
}

export default DecreeSection;
