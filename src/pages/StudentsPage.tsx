import { Link } from 'react-router-dom';
import type { Student } from '../types';

// REMOVE LATER: Mock campuses names map to resolve campus names visually
const MOCK_CAMPUSES: Record<number, string> = {
  1: "Brooklyn College",
  2: "Queens College",
  3: "Hunter College"
};

// REMOVE LATER: Mock students matching the Student interface from types.ts
const MOCK_STUDENTS: Student[] = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "sarah.jenkins@example.edu",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    gpa: 3.85,
    campusId: 1,
  },
  {
    id: 2,
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@example.edu",
    // imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    gpa: 3.62,
    campusId: 2,
  },
  {
    id: 3,
    firstName: "Emily",
    lastName: "Chen",
    email: "emily.chen@example.edu",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    gpa: 3.95,
    campusId: 1,
  },
  {
    id: 4,
    firstName: "Marcus",
    lastName: "Johnson",
    email: "marcus.johnson@example.edu",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    gpa: 3.15,
    campusId: 3,
  },
  {
    id: 5,
    firstName: "Chloe",
    lastName: "Patel",
    email: "chloe.patel@example.edu",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    gpa: 3.78,
    campusId: 2,
  },
  {
    id: 6,
    firstName: "Daniel",
    lastName: "Smith",
    email: "daniel.smith@example.edu",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face",
    gpa: 3.45,
  }
];

export default function StudentsPage() {
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

      {/* Students Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
        {MOCK_STUDENTS.map((student) => (
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
                  {student.campusId && student.campusId in MOCK_CAMPUSES
                    ? MOCK_CAMPUSES[student.campusId]
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
    </div>
  );
}