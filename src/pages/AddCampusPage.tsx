
export default function AddCampus() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">

        <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-purple-200 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950 p-10 flex items-center gap-8">

          {/* Icon */}
          <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 shadow flex items-center justify-center">
            <svg
              className="w-12 h-12 text-indigo-600 dark:text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white">
              Add {" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Campus
              </span>
            </h1>

            <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
              Create a new campus location and add its details
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-900 p-10 space-y-7">

          {/* Campus Name */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white">
              Campus Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter campus name"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white">
              Address <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter campus address"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white">
              Image URL
            </label>

            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white">
              Description <span className="text-red-500">*</span>
            </label>

            <textarea
              rows={5}
              placeholder="Describe the campus"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Button */}
          <button
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-sm hover:opacity-90 transition"
          >
            Create Campus
          </button>

        </div>
      </div>
    </div>
  );
}