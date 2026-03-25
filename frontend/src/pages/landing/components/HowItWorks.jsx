function HowItWorks() {
  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#3E2F1C]">
          How It Works
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {/* Step 1 */}
          <div>
            <div className="w-14 h-14 mx-auto rounded-full bg-[#C2A97F] text-white flex items-center justify-center text-xl font-bold">
              1
            </div>
            <h3 className="mt-6 text-xl font-semibold text-[#3E2F1C]">
              Submit Project
            </h3>
            <p className="mt-3 text-gray-600 text-sm">
              Architects upload structured documentation and PDFs for review.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <div className="w-14 h-14 mx-auto rounded-full bg-[#C2A97F] text-white flex items-center justify-center text-xl font-bold">
              2
            </div>
            <h3 className="mt-6 text-xl font-semibold text-[#3E2F1C]">
              Office Review
            </h3>
            <p className="mt-3 text-gray-600 text-sm">
              Studies offices evaluate compliance and urban planning standards.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <div className="w-14 h-14 mx-auto rounded-full bg-[#C2A97F] text-white flex items-center justify-center text-xl font-bold">
              3
            </div>
            <h3 className="mt-6 text-xl font-semibold text-[#3E2F1C]">
              Approval Workflow
            </h3>
            <p className="mt-3 text-gray-600 text-sm">
              Digital approval or rejection with status tracking and
              notifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
