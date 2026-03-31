function Featers() {
  return (
    <section className="bg-base-200 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#3E2F1C]">
          Platform Capabilities
        </h2>

        <p className="mt-4 text-[#5C4B37] max-w-2xl mx-auto">
          Built to modernize and standardize urban planning processes in arid
          and desert environments.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#3E2F1C]">
              Structured Submissions
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Architects submit projects with organized documentation and
              detailed compliance information.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#3E2F1C]">
              Review Workflow
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Studies offices efficiently evaluate, approve, or reject
              submissions with digital tracking.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#3E2F1C]">
              Compliance Tracking
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Maintain regulatory alignment with KHOUTHBAN planning standards
              and policies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featers;
