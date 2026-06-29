import { Link } from 'react-router-dom';

export default function HomePage() {

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-12">
      {/* Centered Welcome Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Campuses
          </span>
        </h1>
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          A clean, intuitive space to manage university branches, oversee location details, and track student registries.
        </p>
      </div>

      {/* Main Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">

        {/* Campuses Directory Card */}
        <div className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 flex flex-col items-center text-center justify-between shadow-sm hover:shadow-md hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all duration-200">
          <div className="space-y-4 flex flex-col items-center">
            {/* Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Campuses
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                Explore campus locations, edit details, view branch lists, and check student enrollment stats.
              </p>
            </div>
          </div>

          <div className="mt-8 w-full space-y-3">
            <Link
              to="/campuses"
              className="block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-sm font-semibold text-white rounded-xl shadow-sm transition-colors duration-150"
            >
              Browse Campuses
            </Link>
            <Link
              to="/campuses/add"
              className="inline-block text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-150"
            >
              + Add New Campus
            </Link>
          </div>
        </div>

        {/* Students Directory Card */}
        <div className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 flex flex-col items-center text-center justify-between shadow-sm hover:shadow-md hover:border-purple-500/50 dark:hover:border-purple-400/50 transition-all duration-200">
          <div className="space-y-4 flex flex-col items-center">
            {/* Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Students
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                Review the global student registry, monitor GPA rankings, and assign campus enrollments.
              </p>
            </div>
          </div>

          <div className="mt-8 w-full space-y-3">
            <Link
              to="/students"
              className="block w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-sm font-semibold text-white rounded-xl shadow-sm transition-colors duration-150"
            >
              Browse Students
            </Link>
            <Link
              to="/students/add"
              className="inline-block text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-150"
            >
              + Register Student
            </Link>
          </div>
        </div>

      </div>
    </div>

  );
}