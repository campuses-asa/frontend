export default function AddStudentPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-pink-200 dark:from-slate-900 dark:via-purple-950 dark:to-pink-950 p-8 flex items-center gap-8">
          {/* Icon */}
          <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-900 shadow flex items-center justify-center">
            <svg
              className="w-10 h-10 text-purple-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              Add {" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Student
              </span>
            </h1>

            <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
              Create a new student profile and add their details
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-900 p-8 space-y-6">
          {/* First & Last Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                First Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Enter first name"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                Last Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Enter last name"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white">
              Email <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              placeholder="Enter email address"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white">
              Image URL
            </label>

            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* GPA */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white">
              GPA <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              min="0"
              max="4"
              step="0.1"
              placeholder="Enter GPA (0.0 - 4.0)"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Campus */}
          <div>
        <label className="block mb-2 text-sm font-semibold text-slate-900 dark:text-white">
          Campus ID{" "}
          <span className="text-slate-500 dark:text-slate-400 font-normal">
            (Optional)
          </span>
        </label>

        <input
          type="number"
          placeholder="Enter campus ID (leave blank if unenrolled)"
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Leave blank if the student is not enrolled in a campus.
        </p>
      </div>

          {/* Submit Button */}
          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-sm transition-all duration-150">
            Create Student
          </button>
        </div>
      </div>
    </div>
  );
}