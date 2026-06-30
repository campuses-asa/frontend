import { useParams, Link } from 'react-router-dom';
import type { Campus } from '../types';
import { useQuery } from "@tanstack/react-query";
import { fetchStudentById } from '../api';

// REMOVE LATER: Mock campuses database matching Campus interface from types.ts
const MOCK_CAMPUSES: Campus[] = [
  {
    id: 1,
    name: "Brooklyn College",
    address: "2900 Bedford Ave, Brooklyn, NY 11210",
    description: "A beautiful historic campus located in the heart of Brooklyn."
  },
  {
    id: 2,
    name: "Queens College",
    address: "65-30 Kissena Blvd, Queens, NY 11367",
    description: "Located in a park-like setting in Flushing, Queens."
  },
  {
    id: 3,
    name: "Hunter College",
    address: "695 Park Ave, New York, NY 10065",
    description: "A premier public institution located in Manhattan."
  }
];

export default function EditStudentPage() {
  const { id } = useParams<{ id: string }>();
  const studentId = id ? parseInt(id, 10) : 1;

  const { data: student, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => fetchStudentById(studentId)
  });

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Navigation Header */}
      <div>
        <Link
          to={`/students/${studentId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Student Profile</span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Edit{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Student Profile
          </span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Update the profile details, GPA, and campus registry enrollment for this student.
        </p>
      </div>

      {/* Content Area: Loading / Error / Form Views */}
      {isLoading ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-pulse">
          {/* Profile Picture Preview Skeleton */}
          <div className="flex flex-col items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800/80">
            <div className="w-24 h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 shadow-inner flex-shrink-0" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-32" />
          </div>

          {/* Input Fields Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-20" />
              <div className="h-10 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-20" />
              <div className="h-10 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-24" />
            <div className="h-10 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-16" />
              <div className="h-10 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-28" />
              <div className="h-10 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-28" />
            <div className="h-10 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full sm:w-32" />
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full sm:w-24" />
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full sm:w-32" />
            </div>
          </div>
        </div>
      ) : isError ? (
        (() => {
          const is404 = error instanceof Error && error.message.includes("404");

          if (is404) {
            return (
              <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl space-y-4 max-w-2xl mx-auto shadow-sm backdrop-blur-sm">
                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-2xl shadow-inner">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Student Profile Not Found
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    They may have been deleted or the link may be outdated.
                  </p>
                </div>

                <Link
                  to="/students"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-150 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Return to Student Registry
                </Link>
              </div>
            );
          }

          return (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-3xl space-y-4 max-w-2xl mx-auto shadow-sm backdrop-blur-sm">
              <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl shadow-inner relative">
                <div className="absolute inset-0 bg-red-500/20 dark:bg-red-400/20 rounded-2xl blur-lg animate-pulse" />
                <svg className="w-10 h-10 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Unable to load student details
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                  {error instanceof Error ? error.message : "An unexpected server error occurred while retrieving student information."}
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
          );
        })()
      ) : student ? (
        <form onSubmit={(e) => e.preventDefault()} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-all duration-200">
          {/* Profile Picture Preview */}
          <div className="flex flex-col items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800/80">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner border border-slate-200/50 dark:border-slate-800/60 flex-shrink-0">
              {student.imageUrl ? (
                <img
                  src={student.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${student.firstName}`;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400">
                  <svg className="w-10 h-10 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Profile Picture Preview</span>
          </div>

          {/* Input fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-1.5">
              <label htmlFor="firstName" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={student.firstName}
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all text-sm text-slate-900 dark:text-white"
                required
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <label htmlFor="lastName" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={student.lastName}
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all text-sm text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={student.email}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all text-sm text-slate-900 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* GPA */}
            <div className="space-y-1.5">
              <label htmlFor="gpa" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                GPA (0.00 - 4.00)
              </label>
              <input
                type="number"
                id="gpa"
                name="gpa"
                step="0.01"
                min="0.0"
                max="4.0"
                defaultValue={student.gpa}
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all text-sm text-slate-900 dark:text-white"
                required
              />
            </div>

            {/* Campus Select dropdown */}
            <div className="space-y-1.5">
              <label htmlFor="campusId" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Campus Enrollment
              </label>
              <select
                id="campusId"
                name="campusId"
                defaultValue={student.campusId || ""}
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all text-sm text-slate-900 dark:text-white"
              >
                <option value="">Not enrolled</option>
                {MOCK_CAMPUSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Profile Image URL */}
          <div className="space-y-1.5">
            <label htmlFor="imageUrl" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Profile Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              defaultValue={student.imageUrl || ""}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all text-sm text-slate-900 dark:text-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl transition-colors duration-150 order-last sm:order-first"
            >
              Delete Student
            </button>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              <Link
                to={`/students/${student.id}`}
                className="w-full sm:w-auto px-5 py-2.5 text-center text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-150"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-sm font-semibold text-white rounded-xl shadow-sm transition-colors duration-150"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}