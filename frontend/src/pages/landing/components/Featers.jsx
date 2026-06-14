function Featers() {
  return (
    <section className="bg-base-200 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#3E2F1C]">
          Platform Capabilities
        </h2>

        <p className="mt-4 text-[#5C4B37] max-w-3xl mx-auto leading-relaxed">
          The platform is designed to ensure the management and monitoring of
          urban and architectural planning processes in arid and desert
          environments, in compliance with the provisions of{" "}
          <span className="font-semibold text-[#9C7B52]">
            Executive Decree No. 14-27 of February 1, 2014
          </span>
          , applicable to the Southern Provinces of Algeria, as defined by the
          Decision of March 31, 2014.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#3E2F1C]">
              Structured Submissions
            </h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Architects submit their projects with organized documentation and
              detailed information demonstrating their compliance with the
              requirements and standards adopted within the KOUTHBAN Evaluation
              System.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#3E2F1C]">
              Review Workflow
            </h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              The platform offers an integrated digital workflow for managing
              evaluation processes, allowing tracking and review of submissions
              and informed decision-making, with full traceability across all
              stages within the "KOUTHBAN" evaluation system.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#3E2F1C]">
              Compliance Tracking
            </h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Tracking project compliance with the approved planning and design
              standards and requirements under the «KOUTHBAN» evaluation system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featers;
