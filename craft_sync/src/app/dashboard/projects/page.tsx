// src/app/dashboard/projects/page.tsx
"use client";

import { useEffect, useState } from 'react';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.projects);
    }
    fetchProjects();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found. Create a new project to get started.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-bold">{project.name}</h2>
              <h3 className="font-bold mt-4">Tasks</h3>
              <ul>
                {project.tasks.map((task) => (
                  <li key={task.id}>{task.name}</li>
                ))}
              </ul>
              <h3 className="font-bold mt-4">Milestones</h3>
              <ul>
                {project.milestones.map((milestone) => (
                  <li key={milestone.id}>{milestone.name} - Due by {new Date(milestone.dueDate).toLocaleDateString()}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectsPage;
