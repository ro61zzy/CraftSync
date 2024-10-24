// src/app/dashboard/team/page.tsx
"use client"
import { useState, useEffect } from 'react';

export default function TeamDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch all the projects assigned to this team member
    async function fetchProjects() {
      const res = await fetch('/api/team/projects');
      const data = await res.json();
      setProjects(data.projects);
    }

    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>
      {projects.length === 0 ? (
        <p>You have no assigned projects.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="mb-4 p-4 border">
              <h2 className="text-xl font-bold">{project.name}</h2>
              <p>Tasks:</p>
              <ul>
                {project.tasks.map((task) => (
                  <li key={task.id}>
                    <span>{task.name} - </span>
                    <select
                      value={task.status}
                      onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                    >
                      <option value="not_started">Not Started</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                    <textarea
                      placeholder="Add notes"
                      value={task.notes}
                      onChange={(e) => handleTaskNotesChange(task.id, e.target.value)}
                      className="block w-full p-2 mt-2 border"
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function handleTaskStatusChange(taskId, status) {
  // Make API call to update the task status
  fetch(`/api/tasks/${taskId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
}

function handleTaskNotesChange(taskId, notes) {
  // Make API call to update the task notes
  fetch(`/api/tasks/${taskId}/notes`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes }),
  });
}
