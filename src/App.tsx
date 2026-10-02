import { useState } from 'react';
import { Task } from './types/Task';
import { useTasks } from './hooks/useTasks';

import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import SearchBar from './components/SearchBar';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

/**
 * Root component.
 * Calls the useTasks hook for all state and business logic,
 * then passes the relevant pieces down to child components.
 */
export default function App() {
  const {
    filteredTasks,
    stats,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTask,
    updateTask,
    deleteTask,
    toggleStatus,
  } = useTasks();

  // Controls whether the TaskForm modal is open
  const [isFormOpen, setIsFormOpen] = useState(false);
  // When set, the form opens in "edit" mode pre-filled with this task
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleAddTask = () => {
    setTaskToEdit(null);   // Ensure no pre-fill (new task)
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: Parameters<typeof addTask>[0]) => {
    if (taskToEdit) {
      updateTask(taskToEdit.id, formData);
    } else {
      addTask(formData);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setTaskToEdit(null);
  };

  // Delete with a simple confirmation prompt
  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <Header onAddTask={handleAddTask} />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Dashboard statistics */}
        <DashboardStats stats={stats} />

        {/* Search + Filter row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="w-full sm:max-w-sm">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <FilterButtons
            activeFilter={filter}
            onFilterChange={setFilter}
            counts={{
              all:          stats.total,
              pending:      stats.pending,
              completed:    stats.completed,
              highPriority: stats.highPriority,
            }}
          />
        </div>

        {/* Task count label */}
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </h2>
        </div>

        {/* Task grid / empty state */}
        <TaskList
          tasks={filteredTasks}
          searchQuery={searchQuery}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleStatus={toggleStatus}
          onAddTask={handleAddTask}
        />
      </main>

      {/* Add / Edit modal */}
      {isFormOpen && (
        <TaskForm
          taskToEdit={taskToEdit}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400">
        StudyTrack &mdash; Built with React, TypeScript &amp; Tailwind CSS
      </footer>
    </div>
  );
}
