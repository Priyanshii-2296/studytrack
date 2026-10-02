import { FilterType } from '../types/Task';

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
    highPriority: number;
  };
}

/**
 * Tab-style filter buttons allowing students to quickly switch between
 * different views of their task list.
 */
export default function FilterButtons({ activeFilter, onFilterChange, counts }: FilterButtonsProps) {
  const filters: { id: FilterType; label: string; count: number; color: string }[] = [
    { id: 'all',           label: 'All Tasks',     count: counts.all,         color: 'indigo' },
    { id: 'pending',       label: 'Pending',       count: counts.pending,     color: 'yellow' },
    { id: 'completed',     label: 'Completed',     count: counts.completed,   color: 'green'  },
    { id: 'high-priority', label: 'High Priority', count: counts.highPriority, color: 'red'   },
  ];

  // Tailwind active styles per color (must be fully spelled out for purge to keep them)
  const activeStyles: Record<string, string> = {
    indigo: 'bg-indigo-600 text-white shadow-md',
    yellow: 'bg-yellow-500 text-white shadow-md',
    green:  'bg-green-600 text-white shadow-md',
    red:    'bg-red-500 text-white shadow-md',
  };

  const inactiveStyles =
    'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600';

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => onFilterChange(f.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      active:scale-95 ${activeFilter === f.id ? activeStyles[f.color] : inactiveStyles}`}
        >
          {f.label}
          {/* Badge showing how many tasks match this filter */}
          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded-full
              ${activeFilter === f.id ? 'bg-white/30' : 'bg-gray-100 text-gray-500'}`}
          >
            {f.count}
          </span>
        </button>
      ))}
    </div>
  );
}
