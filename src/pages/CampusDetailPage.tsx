import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCampusById, fetchAllStudents, editStudentProfile } from "../api";

export default function CampusDetailPage() {
  const { id } = useParams<{ id: string }>();
  // converts campus id url STRING to a NUMBER
  const campusId = id ? parseInt(id, 10) : -1;
  const queryClient = useQueryClient();

  const {
    data: campus,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["campus", campusId],
    queryFn: () => fetchCampusById(campusId),
  });

  const {
    data: allStudents,
    isLoading: studentsLoading,
    isError: studentsError,
  } = useQuery({
    queryKey: ["students"],
    queryFn: fetchAllStudents,
  });

  const enrolledStudents =
    allStudents?.filter((s) => s.campusId === campusId) ?? [];

  //typeof enrolledStudents)[number] is a ts trick meaning 
  // "the type of one element of the enrolledStudents array" 
  // i.e. a single Student. It avoids having to import Student from types.
  // ts separately it just derives the type from the array 
  const unenrollMutation = useMutation({
    mutationFn: (student: (typeof enrolledStudents)[number]) =>
      editStudentProfile({ ...student, campusId: undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["campus", campusId] });
    },
  });
  
  return (
    <>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
        {/* Navigation Row */}
        <div className="flex items-center justify-between pb-2">
          <Link
            to="/campuses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150 group"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Campus Directory</span>
          </Link>
        </div>

        {/* Content Area: Loading / Error / Data Views */}
        {isLoading ? (
          <>
            {/* Profile Identity Card Skeleton */}
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start animate-pulse">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-slate-200 dark:bg-slate-800 shadow-inner shrink-0" />
              <div className="space-y-5 text-center md:text-left flex-1 w-full">
                <div className="space-y-3">
                  <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2 mx-auto md:mx-0" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3 mx-auto md:mx-0" />
                </div>
                <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl w-28 mx-auto md:mx-0" />
              </div>
            </div>

            {/* Enrolled Students Skeleton */}
            <div className="space-y-4">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4" />
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 animate-pulse">
                <div className="w-full sm:w-56 h-36 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
                <div className="flex-1 space-y-4 py-2">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2" />
                </div>
              </div>
            </div>
          </>
        ) : isError ? (
          (() => {
            const is404 =
              error instanceof Error && error.message.includes("404");

            if (is404) {
              return (
                <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl space-y-4 max-w-2xl mx-auto shadow-sm backdrop-blur-sm">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-2xl shadow-inner">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Campus Not Found
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                      It may have been deleted or the link may be outdated.
                    </p>
                  </div>

                  <Link
                    to="/campuses"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-150 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Return to Campus Directory
                  </Link>
                </div>
              );
            }

            return (
              <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-3xl space-y-4 max-w-2xl mx-auto shadow-sm backdrop-blur-sm">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl shadow-inner relative">
                  <div className="absolute inset-0 bg-red-500/20 dark:bg-red-400/20 rounded-2xl blur-lg animate-pulse" />
                  <svg
                    className="w-10 h-10 relative z-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Unable to load campus details
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    {error instanceof Error
                      ? error.message
                      : "An unexpected server error occurred while retrieving campus information."}
                  </p>
                </div>

                <button
                  onClick={() => refetch()}
                  className="px-5 py-2.5 bg-linear-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-150 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.21"
                    />
                  </svg>
                  Retry Connection
                </button>
              </div>
            );
          })()
        ) : campus ? (
          <>
            {/* Campus Profile Identity Card */}
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start transition-all duration-200">
              {/* Edit Button in Upper Right */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <Link
                  to={`/campuses/${campus.id}/edit`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-white dark:hover:text-white border border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-xl transition-all duration-150"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  <span>Edit Campus</span>
                </Link>
              </div>

              {/* Campus Image Frame */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner shrink-0 border border-slate-200/50 dark:border-slate-800/60">
                {campus.imageUrl ? (
                  <img
                    src={campus.imageUrl}
                    alt={campus.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${campus.name}`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400">
                    <svg
                      className="w-16 h-16 opacity-60"
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
                )}
              </div>

              {/* Campus Info Details */}
              <div className="space-y-5 text-center md:text-left flex-1">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {campus.name}
                  </h1>
                  <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <svg
                      className="w-4 h-4 text-slate-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {campus.address}
                  </p>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                  {campus.description}
                </p>

                {/* Enrollment Count Badge */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1">
                  <div className="bg-indigo-50/60 dark:bg-indigo-950/20 px-4.5 py-2.5 rounded-2xl border border-indigo-100/40 dark:border-indigo-900/30">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                      Enrolled Students
                    </span>
                    <span className="text-xl font-extrabold text-indigo-700 dark:text-indigo-300">
                      {studentsLoading ? "—" : enrolledStudents.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enrolled Students Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Enrolled Students
              </h2>

              {studentsLoading ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 animate-pulse space-y-4">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                </div>
              ) : studentsError ? (
                <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-6 text-sm text-slate-500 dark:text-slate-400 text-center">
                  Unable to load the student roster for this campus.
                </div>
              ) : enrolledStudents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {enrolledStudents.map((student) => (
                    <div
                      key={student.id}
                      className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all duration-200 flex items-center gap-4"
                    >
                      {/* Student Avatar */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/50 dark:border-slate-800/60">
                        {student.imageUrl ? (
                          <img
                            src={student.imageUrl}
                            alt={`${student.firstName} ${student.lastName}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${student.firstName}`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400">
                            <svg
                              className="w-6 h-6 opacity-60"
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
                        )}
                      </div>

                      {/* Student Info + Actions */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/students/${student.id}`}
                          className="font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150 truncate block"
                        >
                          {student.firstName} {student.lastName}
                        </Link>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          GPA {student.gpa.toFixed(2)}
                        </p>
                      </div>

                      {/* Un-enroll Button */}
                      <button
                        onClick={() => unenrollMutation.mutate(student)}
                        disabled={unenrollMutation.isPending && unenrollMutation.variables.id === student.id}
                        className="shrink-0 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-slate-200 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-900/50 rounded-xl transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {unenrollMutation.isPending && unenrollMutation.variables.id === student.id ? "Un-enrolling..." : "Un-enroll"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* No Students Enrolled Empty State */
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-700 dark:text-slate-300">
                      No Students Enrolled
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                      This campus doesn't have any students yet. You can enroll
                      a student from their profile page.
                    </p>
                  </div>
                  <Link
                    to="/students/add"
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl transition-colors duration-150"
                  >
                    Register a Student
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
