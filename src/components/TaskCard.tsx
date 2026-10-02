import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

/** Returns the right colour classes for each priority level */
function getPriorityStyle(priority: Task['priority']) {
  switch (priority) {
    case 'high':   return { badge: 'bg-red-100 text-red-700',    dot: 'bg-red-500'    };
    case 'medium': return { badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' };
    case 'low':    return { badge: 'bg-green-100 text-green-700', dot: 'bg-green-500'  };
  }
}

/** Formats an ISO date string (YYYY-MM-DD) to a readable format */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00'); // Force local timezone
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Returns how many days until the due date (negative = overdue) */
function getDaysUntil(dateStr: string): number {
  const due = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * A card that displays one task with all its details.
 * Contains buttons to toggle status, edit, and delete the task.
 */
export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) {
  const priority = getPriorityStyle(task.priority);
  const daysUntil = getDaysUntil(task.dueDate);
  const isCompleted = task.status === 'completed';

  // Determine the urgency colour for the due-date label
  let dueDateColor = 'text-gray-500';
  if (!isCompleted) {
    if (daysUntil < 0)       dueDateColor = 'text-red-600 font-semibold';   // Overdue
    else if (daysUntil <= 2) dueDateColor = 'text-orange-500 font-semibold'; // Due very soon
    else if (daysUntil <= 5) dueDateColor = 'text-yellow-600';               // Due soon
  }

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border hover:shadow-md
                  hover:-translate-y-0.5 flex flex-col
                  ${isCompleted ? 'border-green-200 opacity-80' : 'border-gray-100'}`}
    >
      {/* Card top accent bar — colour by priority */}
      <div
        className={`h-1 rounded-t-2xl ${
          task.priority === 'high'   ? 'bg-gradient-to-r from-red-500 to-pink-500' :
          task.priority === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                                       'bg-gradient-to-r from-green-400 to-emerald-400'
        }`}
      />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Header row: subject badge, priority badge, and completed checkmark */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg">
            {task.subject}
          </span>
          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${priority.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
        </div>

        {/* Task title */}
        <h3 className={`text-base font-bold text-gray-800 leading-snug
                        ${isCompleted ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Due date */}
        <div className={`flex items-center gap-1.5 text-xs ${dueDateColor}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>
            {isCompleted
              ? `Due: ${formatDate(task.dueDate)}`
              : daysUntil < 0
              ? `Overdue by ${Math.abs(daysUntil)} day${Math.abs(daysUntil) === 1 ? '' : 's'}`
              : daysUntil === 0
              ? 'Due today!'
              : daysUntil === 1
              ? 'Due tomorrow'
              : `Due in ${daysUntil} days (${formatDate(task.dueDate)})`}
          </span>
        </div>
      </div>

      {/* Action row */}
      <div className="px-5 pb-4 flex items-center justify-between gap-2 border-t border-gray-50 pt-3">
        {/* Toggle complete/pending */}
        <button
          onClick={() => onToggleStatus(task.id)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                      ${isCompleted
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d={isCompleted ? 'M6 18L18 6M6 6l12 12' : 'M5 13l4 4L19 7'} />
          </svg>
          {isCompleted ? 'Mark Pending' : 'Mark Done'}
        </button>

        <div className="flex items-center gap-1">
          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          {/* Delete */}
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
