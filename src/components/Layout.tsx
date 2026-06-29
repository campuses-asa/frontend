import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  // Style active link differently
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    const base = "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out group";
    const active = "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 shadow-sm shadow-indigo-100/20 dark:shadow-none";
    const inactive = "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40";
    return `${base} ${isActive ? active : inactive}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Decorative Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full" />

      {/* Header / Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Flex container layout: stacks on mobile, splits into 1/4 - 1/2 - 1/4 on desktop for perfect centering */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 md:py-0 md:h-16">

            {/* Logo Section */}
            <div className="flex items-center justify-center md:justify-start md:w-1/4">
              <NavLink to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 dark:shadow-none group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.082.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.082.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-500 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity duration-200">
                  Campuses
                </span>
              </NavLink>
            </div>

            {/* Centered Navigation Links */}
            <div className="flex items-center justify-center md:w-1/2">
              <nav className="flex items-center gap-1.5">
                <NavLink key={'/'} to={'/'} className={getNavLinkClass}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Dashboard</span>
                </NavLink>

                <NavLink key={'/campuses'} to={'/campuses'} className={getNavLinkClass}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Campuses</span>
                </NavLink>

                <NavLink key={'/students'} to={'/students'} className={getNavLinkClass}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Students</span>
                </NavLink>
              </nav>
            </div>

            {/* Empty spacer to balance the centered nav on desktop */}
            <div className="hidden md:block md:w-1/4" />

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80 py-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              &copy; {new Date().getFullYear()} Campuses. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}