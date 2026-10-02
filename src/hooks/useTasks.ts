import { useState, useEffect, useMemo } from 'react';
import { Task, TaskFormData, FilterType } from '../types/Task';
import { sampleTasks } from '../data/sampleTasks';

// Key used to store tasks in localStorage
const STORAGE_KEY = 'studytrack-tasks';

/**
 * Custom hook that manages all task state and operations.
 * - Loads tasks from localStorage on first render (seeds with sample data if empty)
 * - Saves tasks to localStorage whenever they change
 * - Provides CRUD operations: add, update, delete, toggle status
 * - Provides filtered + searched task list
 */
export function useTasks() {
  // ── State ──────────────────────────────────────────────────────────────────

  const [tasks, setTasks] = useState<Task[]>(() => {
    // Try to load saved tasks from localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as Task[];
      }
    } catch {
      // If parsing fails (corrupted data), fall through to sample data
    }
    // First launch: seed with sample tasks
    return sampleTasks;
  });

  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ── Persistence ───────────────────────────────────────────────────────────

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ── CRUD Operations ───────────────────────────────────────────────────────

  /** Add a brand-new task */
  const addTask = (formData: TaskFormData) => {
    const newTask: Task = {
      ...formData,
      id: `task-${Date.now()}`,          // Unique ID based on timestamp
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]); // Newest task appears at the top
  };

  /** Replace an existing task with updated data */
  const updateTask = (id: string, formData: TaskFormData) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...formData } : task
      )
    );
  };

  /** Remove a task by ID */
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  /** Flip a task between 'pending' and 'completed' */
  const toggleStatus = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  // ── Derived Data ──────────────────────────────────────────────────────────

  /**
   * Compute dashboard statistics from the full (unfiltered) task list.
   * Wrapped in useMemo so it only recalculates when tasks change.
   */
  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
  }), [tasks]);

  /**
   * Apply the active filter, then narrow by search query.
   * Also wrapped in useMemo for performance.
   */
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Step 1: Apply status/priority filter
    switch (filter) {
      case 'pending':
        result = result.filter(t => t.status === 'pending');
        break;
      case 'completed':
        result = result.filter(t => t.status === 'completed');
        break;
      case 'high-priority':
        result = result.filter(t => t.priority === 'high');
        break;
      default:
        break; // 'all' — no filter applied
    }

    // Step 2: Apply search query (case-insensitive match on title or subject)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.title.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q)
      );
    }

    return result;
  }, [tasks, filter, searchQuery]);

  return {
    tasks,
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
  };
}
