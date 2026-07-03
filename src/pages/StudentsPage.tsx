import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { fetchAllStudents, fetchAllCampuses } from '../api';

export default function StudentsPage() {
  const { data: students, isLoading: isLoadingStudents, isError: isErrorStudents, error: studentsError, refetch: refetchStudents } = useQuery({
    queryKey: ["students"],
    queryFn: fetchAllStudents
  });

  const { data: campuses, isLoading: isLoadingCampuses, isError: isErrorCampuses, error: campusesError, refetch: refetchCampuses } = useQuery({
    queryKey: ["campuses"],
    queryFn: fetchAllCampuses
  });

  const isLoading = isLoadingStudents || isLoadingCampuses;
  const isError = isErrorStudents || isErrorCampuses;
  const error = studentsError || campusesError;
  const refetch = () => {
    refetchStudents();
    refetchCampuses();
  };

  // Map campus id to name
  const campusMap = new Map<number, string>();
  if (campuses) {
    campuses.forEach((campus) => {
      campusMap.set(campus.id, campus.name);
    });
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 space-y-12">
      {/* Centered Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Student{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Registry
          </span>
        </h1>
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Browse enrolled students, view their academic details, and register new members.
        </p>
      </div>

      {/* Action and Search Controls Layout */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        {/* Mock Search Field */}
        <div className="relative w-full sm:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all"
            disabled
          />
        </div>

        {/* Register Button */}
        <Link
          to="/students/add"
          className="w-full sm:w-auto px-5 py-2.5 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-sm font-semibold text-white rounded-xl shadow-sm text-center transition-colors duration-150"
        >
          + Register Student
        </Link>
      </div>

      {/* Content Area: Loading / Error / Data Views */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm flex flex-col animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="relative aspect-[4/5] w-full bg-slate-200 dark:bg-slate-800/60" />

              {/* Content Skeleton */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2" />
                </div>

                {/* Footer Skeleton */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                  <div className="w-3.5 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-3xl space-y-4 max-w-2xl mx-auto shadow-sm backdrop-blur-sm">
          {/* Glowing Error Icon */}
          <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl shadow-inner relative">
            <div className="absolute inset-0 bg-red-500/20 dark:bg-red-400/20 rounded-2xl blur-lg animate-pulse" />
            <svg className="w-10 h-10 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Unable to load students
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              {error instanceof Error ? error.message : "An unexpected server error occurred while retrieving the student registry list."}
            </p>
          </div>

          <button
            onClick={() => refetch()}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-150 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.21" />
            </svg>
            Retry Connection
          </button>
        </div>
      ) : students && students.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
          {students.map((student) => (
            <Link
              key={student.id}
              to={`/students/${student.id}`}
              className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-purple-500/50 dark:hover:border-purple-400/50 transition-all duration-200 flex flex-col"
            >
              {/* Student Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800/60">
                {student.imageUrl ? (
                  <img
                    src={student.imageUrl}
                    alt={`${student.firstName} ${student.lastName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${student.firstName}`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400">
                    <svg className="w-16 h-16 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}

                {/* GPA Tag Badge */}
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider text-purple-600 dark:text-purple-400 border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
                  GPA {student.gpa.toFixed(2)}
                </div>
              </div>

              {/* Student details block */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-150 truncate">
                    {student.firstName} {student.lastName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {student.campusId && campusMap.has(student.campusId)
                      ? campusMap.get(student.campusId)
                      : "Unassigned Campus"}
                  </p>
                </div>

                {/* Bottom Card Footer Action Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  <span>View Profile</span>
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl space-y-4 max-w-xl mx-auto">
          <div className="p-4 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-2xl">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Students Found</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              The student registry is currently empty. Click the button above to add your first student.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}