import { Task } from '../types/Task';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  searchQuery: string;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onAddTask: () => void;
}

/**
 * Renders the grid of TaskCards, or a friendly empty-state message
 * when there are no tasks matching the current filter/search.
 */
export default function TaskList({
  tasks,
  searchQuery,
  onEdit,
  onDelete,
  onToggleStatus,
  onAddTask,
}: TaskListProps) {
  // Empty state: no tasks at all vs no tasks matching the search/filter
  if (tasks.length === 0) {
    const isSearching = searchQuery.trim().length > 0;

    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        {/* Illustration */}
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-indigo-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isSearching ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            )}
          </svg>
        </div>

        <h3 className="text-lg font-bold text-gray-700 mb-1">
          {isSearching ? 'No tasks found' : 'No tasks here yet!'}
        </h3>
        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
          {isSearching
            ? `No tasks match "${searchQuery}". Try a different keyword.`
            : 'Start by adding your first academic task. Stay organised and on top of your studies!'}
        </p>

        {!isSearching && (
          <button
            onClick={onAddTask}
            className="mt-6 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white text-sm font-semibold px-5 py-2.5 rounded-xl
                       hover:from-indigo-700 hover:to-purple-700 shadow-md active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Your First Task
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}
