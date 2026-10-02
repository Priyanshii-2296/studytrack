// Task priority levels
export type Priority = 'low' | 'medium' | 'high';

// Task status
export type Status = 'pending' | 'completed';

// Filter options for the task list
export type FilterType = 'all' | 'pending' | 'completed' | 'high-priority';

/**
 * The main Task interface used throughout the app.
 * Every task created by the student has these properties.
 */
export interface Task {
  id: string;          // Unique identifier (generated with Date.now())
  title: string;       // Short task title
  subject: string;     // Academic subject (e.g., "Mathematics")
  description: string; // Detailed description of what needs to be done
  dueDate: string;     // ISO date string (YYYY-MM-DD)
  priority: Priority;  // How urgent the task is
  status: Status;      // Whether the task is done or not
  createdAt: string;   // ISO timestamp when task was created
}

/**
 * The shape of data inside the TaskForm (before an id/createdAt is assigned).
 * Used for both creating new tasks and editing existing ones.
 */
export type TaskFormData = Omit<Task, 'id' | 'createdAt'>;
