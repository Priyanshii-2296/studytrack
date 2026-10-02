interface Stats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
}

interface DashboardStatsProps {
  stats: Stats;
}

/**
 * Displays four summary stat cards at the top of the dashboard.
 * Each card has an icon, a number, and a label.
 */
export default function DashboardStats({ stats }: DashboardStatsProps) {
  const cards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      color: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: 'Completed',
      value: stats.completed,
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
      text: 'text-green-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Pending',
      value: stats.pending,
      color: 'from-yellow-400 to-orange-400',
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'High Priority',
      value: stats.highPriority,
      color: 'from-red-500 to-pink-500',
      bg: 'bg-red-50',
      text: 'text-red-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5
                     hover:shadow-md hover:-translate-y-0.5 cursor-default"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className={`text-3xl font-bold mt-1 ${card.text}`}>{card.value}</p>
            </div>
            <div className={`w-12 h-12 ${card.bg} ${card.text} rounded-xl flex items-center justify-center`}>
              {card.icon}
            </div>
          </div>

          {/* Progress bar — percentage of total */}
          {stats.total > 0 && (
            <div className="mt-3 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
                style={{ width: `${Math.round((card.value / stats.total) * 100)}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
