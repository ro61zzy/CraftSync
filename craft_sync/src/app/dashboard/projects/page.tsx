// src/app/dashboard/projects/page.tsx

"use client";

import { useEffect, useState } from 'react';
import InviteModal from './InviteModal';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.projects);
    }
    fetchProjects();
  }, []);

  const openInviteModal = (projectId) => {
    setSelectedProjectId(projectId); // Store the project ID
    setShowInviteModal(true); // Open modal
  };

  const closeInviteModal = () => {
    setShowInviteModal(false);
    setSelectedProjectId(null); // Reset project ID
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found. Create a new project to get started.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="p-4 bg-primary shadow rounded">
              <h2 className="text-xl font-bold text-white">{project.name}</h2>
              <h3 className="font-bold mt-4">Tasks</h3>
              <ul>
                {project.tasks.map((task) => (
                  <li key={task.id}>{task.name}</li>
                ))}
              </ul>
              <h3 className="font-bold mt-4 text-white">Milestones</h3>
              <ul>
                {project.milestones.map((milestone) => (
                  <li key={milestone.id}>{milestone.name} - Due by {new Date(milestone.dueDate).toLocaleDateString()}</li>
                ))}
              </ul>
              <button
                onClick={() => openInviteModal(project.id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Invite Users
              </button>
            </li>
          ))}
        </ul>
      )}

      {showInviteModal && (
        <InviteModal projectId={selectedProjectId} onClose={closeInviteModal} />
      )}
    </div>
  );
};

export default ProjectsPage;
