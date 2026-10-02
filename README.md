# 📚 StudyTrack — Student Task Manager

A clean, beginner-friendly web application that helps students manage their academic tasks, assignments, and study activities — all stored locally in the browser.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Add Tasks** | Title, subject, description, due date, and priority (Low / Medium / High) |
| **Task Cards** | Attractive cards with colour-coded priority accents and urgency labels |
| **Complete / Pending** | Toggle any task between completed and pending with one click |
| **Edit Tasks** | Open any task in a pre-filled form and save changes |
| **Delete Tasks** | Remove tasks with a confirmation prompt |
| **Filter Tasks** | All · Pending · Completed · High Priority tabs with live counts |
| **Search** | Instant search by title or subject |
| **Dashboard Stats** | Total / Completed / Pending / High-Priority counters with progress bars |
| **LocalStorage** | All tasks are saved in the browser — no backend needed |
| **Empty State** | Friendly message and CTA button when no tasks match |
| **Form Validation** | Required-field errors shown on blur and on submit |
| **Responsive** | Works on mobile, tablet, and desktop |
| **Sample Data** | Pre-loaded with 6 sample tasks on first launch |

---

## 🛠 Technologies Used

- **React 18** — component-based UI
- **TypeScript** — type-safe code
- **Vite** — fast development server and build tool
- **Tailwind CSS** — utility-first styling
- **localStorage** — browser-native persistence (no backend)

---

## 🚀 How to Install and Run

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

### Steps

```bash
# 1. Navigate into the project folder
cd student-task-manager

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (Vite default).

To create a production build:
```bash
npm run build
```

---

## 🤖 How IBM Bob Was Used

This project was built entirely with the help of **IBM Bob**, an AI-powered software engineering assistant.

Bob was used to:
1. **Design the architecture** — folder structure, component hierarchy, and data-flow explanation
2. **Scaffold the project** — `package.json`, `vite.config.ts`, `tsconfig.json`, Tailwind and PostCSS config, `index.html`
3. **Define TypeScript types** — the `Task` interface, `Priority`, `Status`, and `FilterType` union types
4. **Write the custom hook** — `useTasks.ts` with localStorage persistence, CRUD operations, memoised filtering, and search
5. **Build every component** — `Header`, `DashboardStats`, `SearchBar`, `FilterButtons`, `TaskCard`, `TaskForm`, `TaskList`
6. **Wire everything together** — root `App.tsx` managing modal state and event handlers
7. **Add sample data** — `sampleTasks.ts` so the app is not empty on first launch
8. **Write this README**

---

## 🔮 Future Improvements

- **Due-date notifications** — browser push notifications when a task is overdue
- **Categories / Tags** — group tasks by custom labels beyond subject
- **Drag-and-drop reordering** — rearrange tasks visually
- **Dark mode** — system-preference-aware colour scheme
- **Export to CSV/PDF** — print or share your task list
- **Recurring tasks** — automatically recreate weekly/monthly tasks
- **Progress charts** — visualise completion rate over time
- **Cloud sync** — optional account login to sync tasks across devices

---

## 📂 Project Structure

```
student-task-manager/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── DashboardStats.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterButtons.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskForm.tsx
│   │   └── TaskList.tsx
│   ├── hooks/
│   │   └── useTasks.ts
│   ├── types/
│   │   └── Task.ts
│   ├── data/
│   │   └── sampleTasks.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```
