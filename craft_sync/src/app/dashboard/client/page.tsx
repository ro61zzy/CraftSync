// src/app/dashboard/client/page.tsx
import { useState, useEffect } from 'react';

export default function ClientDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch all the projects assigned to this client
    async function fetchProjects() {
      const res = await fetch('/api/client/projects');
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
              <p>Project Progress: {project.progress}%</p>
              <p>Tasks:</p>
              <ul>
                {project.tasks.map((task) => (
                  <li key={task.id}>
                    <span>{task.name} - </span>
                    <span>{task.status === 'done' ? '✔️ Completed' : '❌ In Progress'}</span>
                  </li>
                ))}
              </ul>
              <textarea
                placeholder="Leave feedback or comments"
                className="block w-full p-2 mt-2 border"
                onBlur={(e) => handleFeedback(project.id, e.target.value)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

async function handleFeedback(projectId, feedback) {
  // Make API call to submit the feedback
  await fetch(`/api/client/projects/${projectId}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feedback }),
  });
}
