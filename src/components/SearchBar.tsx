interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * A search input that lets students find tasks by title or subject.
 * The magnifying-glass icon is decorative and rendered as inline SVG.
 */
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      {/* Search icon inside the input */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title or subject…"
        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white
                   text-sm text-gray-700 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                   shadow-sm"
      />

      {/* Clear button — only visible when there is text */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
