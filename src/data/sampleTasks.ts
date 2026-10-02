import { Task } from '../types/Task';

/**
 * Sample tasks loaded on first launch so the app is not empty.
 * These are stored in localStorage just like user-created tasks.
 */
export const sampleTasks: Task[] = [
  {
    id: 'sample-1',
    title: 'Complete Calculus Assignment',
    subject: 'Mathematics',
    description: 'Solve problems 1–20 from Chapter 5 on integration techniques. Show all working steps clearly.',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
    priority: 'high',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    title: 'Read History Chapter 8',
    subject: 'History',
    description: 'Read Chapter 8 about World War II and take notes on the key events and their causes.',
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 days from now
    priority: 'medium',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-3',
    title: 'Physics Lab Report',
    subject: 'Physics',
    description: 'Write up the lab report for the pendulum experiment. Include hypothesis, data, graphs, and conclusion.',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // tomorrow
    priority: 'high',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-4',
    title: 'English Essay Draft',
    subject: 'English',
    description: 'Write a 500-word first draft of the essay on "The Importance of Critical Thinking in Modern Society".',
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 days from now
    priority: 'medium',
    status: 'completed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-5',
    title: 'Biology Flashcards',
    subject: 'Biology',
    description: 'Create flashcards for all the key terms in the Cell Division chapter for the upcoming quiz.',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
    priority: 'low',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-6',
    title: 'Computer Science Project',
    subject: 'Computer Science',
    description: 'Build a simple sorting visualizer using Python and document the code with comments.',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    priority: 'high',
    status: 'completed',
    createdAt: new Date().toISOString(),
  },
];
