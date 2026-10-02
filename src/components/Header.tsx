interface HeaderProps {
  onAddTask: () => void;
}

/**
 * Navigation header with the StudyTrack brand name and an "Add Task" button.
 * The gradient background runs from indigo/blue to purple.
 */
export default function Header({ onAddTask }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand name + icon */}
          <div className="flex items-center gap-3">
            {/* Book icon (inline SVG — no external dependencies) */}
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">StudyTrack</h1>
              <p className="text-xs text-blue-100 hidden sm:block">Student Task Manager</p>
            </div>
          </div>

          {/* Add Task button */}
          <button
            onClick={onAddTask}
            className="flex items-center gap-2 bg-white text-indigo-600 font-semibold
                       px-4 py-2 rounded-xl hover:bg-indigo-50 hover:shadow-md
                       active:scale-95 text-sm"
          >
            {/* Plus icon */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}
