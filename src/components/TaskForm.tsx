import { useState, useEffect } from 'react';
import { Task, TaskFormData, Priority } from '../types/Task';

interface TaskFormProps {
  /** If provided, the form is in "edit" mode and pre-fills the fields */
  taskToEdit?: Task | null;
  onSubmit: (data: TaskFormData) => void;
  onClose: () => void;
}

/** Today's date in YYYY-MM-DD format, used as the minimum allowed due date */
function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

const EMPTY_FORM: TaskFormData = {
  title: '',
  subject: '',
  description: '',
  dueDate: todayString(),
  priority: 'medium',
  status: 'pending',
};

/**
 * Modal form for adding a new task or editing an existing one.
 * Validates required fields before allowing submission.
 */
export default function TaskForm({ taskToEdit, onSubmit, onClose }: TaskFormProps) {
  const [form, setForm] = useState<TaskFormData>(EMPTY_FORM);
  // Tracks which fields have been "touched" (blurred at least once) so we only
  // show errors after the student has interacted with a field.
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Pre-fill the form when editing an existing task
  useEffect(() => {
    if (taskToEdit) {
      const { id, createdAt, ...rest } = taskToEdit;
      // Suppress unused-vars warning — id and createdAt are intentionally excluded
      void id; void createdAt;
      setForm(rest);
    } else {
      setForm({ ...EMPTY_FORM, dueDate: todayString() });
    }
    setTouched({});
  }, [taskToEdit]);

  const isEditing = Boolean(taskToEdit);

  // ── Validation ─────────────────────────────────────────────────────────────
  const errors: Record<string, string> = {};
  if (!form.title.trim())   errors.title   = 'Task title is required.';
  if (!form.subject.trim()) errors.subject = 'Subject is required.';
  if (!form.dueDate)        errors.dueDate = 'Due date is required.';

  const hasErrors = Object.keys(errors).length > 0;

  // ── Helpers ────────────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched so all errors are shown on submit
    setTouched({ title: true, subject: true, dueDate: true });
    if (hasErrors) return;
    onSubmit(form);
    onClose();
  };

  // Close modal when clicking the backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    // Dark semi-transparent backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh]
                      overflow-y-auto flex flex-col">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4
                        border-b border-gray-100
                        bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
          <h2 className="text-lg font-bold text-white">
            {isEditing ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              onBlur={() => handleBlur('title')}
              placeholder="e.g. Complete Calculus Assignment"
              className={`w-full px-3 py-2.5 rounded-xl border text-sm
                          focus:outline-none focus:ring-2 focus:ring-indigo-400
                          ${touched.title && errors.title
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-200 bg-gray-50'}`}
            />
            {touched.title && errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              onBlur={() => handleBlur('subject')}
              placeholder="e.g. Mathematics"
              className={`w-full px-3 py-2.5 rounded-xl border text-sm
                          focus:outline-none focus:ring-2 focus:ring-indigo-400
                          ${touched.subject && errors.subject
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-200 bg-gray-50'}`}
            />
            {touched.subject && errors.subject && (
              <p className="mt-1 text-xs text-red-600">{errors.subject}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What needs to be done? (optional)"
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50
                         text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>

          {/* Due Date + Priority — side by side on wider screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                onBlur={() => handleBlur('dueDate')}
                min={todayString()}
                className={`w-full px-3 py-2.5 rounded-xl border text-sm
                            focus:outline-none focus:ring-2 focus:ring-indigo-400
                            ${touched.dueDate && errors.dueDate
                              ? 'border-red-400 bg-red-50'
                              : 'border-gray-200 bg-gray-50'}`}
              />
              {touched.dueDate && errors.dueDate && (
                <p className="mt-1 text-xs text-red-600">{errors.dueDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50
                           text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {(['low', 'medium', 'high'] as Priority[]).map(p => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status — only shown in edit mode */}
          {isEditing && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50
                           text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          {/* Submit / Cancel */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm
                         font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white
                         bg-gradient-to-r from-indigo-600 to-purple-600
                         hover:from-indigo-700 hover:to-purple-700
                         active:scale-95 shadow-md"
            >
              {isEditing ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
