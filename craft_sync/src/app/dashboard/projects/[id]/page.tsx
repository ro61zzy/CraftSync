// src/app/projects/[id]/page.tsx
"use client";
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  name: string;
}

interface Milestone {
  id: number;
  name: string;
  dueDate: string; // Assuming it's in ISO format
}

interface Project {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
  milestones: Milestone[];
  clientName?: string; // Optional client name
  teamMembers?: string[]; // Optional list of team members
}

// Add a parameter to receive `params` from the route
const ProjectDetailsPage = ({ params }: { params: { id: string } }) => {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (params.id) {
        const res = await fetch(`/api/projects/${params.id}`);
        const data = await res.json();
        setProject(data.project);
      }
    };
    fetchProjectDetails();
  }, [params.id]);

  if (!project) {
    return <p className="text-center text-lg">Loading...</p>; // Show loading state
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-header text-center">{project.name}</h1>
        <p className="mb-6 text-lg text-black">{project.description}</p>

        <div className="mb-6">
          <h2 className="font-bold text-2xl mb-2 text-header">Tasks 🚀</h2>
          <ul className="list-disc list-inside pl-5">
            {project.tasks.length > 0 ? (
              project.tasks.map((task) => (
                <li key={task.id} className="text-lg text-black">{task.name}</li>
              ))
            ) : (
              <li className="text-lg text-gray-500">No tasks available.</li>
            )}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="font-bold text-2xl text-header mb-2">Milestones 📅</h2>
          <ul className="list-disc list-inside pl-5">
            {project.milestones.length > 0 ? (
              project.milestones.map((milestone) => (
                <li key={milestone.id} className="text-lg text-gray-800">
                  {milestone.name} - Due by <strong>{new Date(milestone.dueDate).toLocaleDateString()}</strong>
                </li>
              ))
            ) : (
              <li className="text-lg text-gray-500">No milestones available.</li>
            )}
          </ul>
        </div>

        {project.clientName && (
          <div className="mt-4">
            <h2 className="font-bold text-2xl mb-2">Client:</h2>
            <p className="text-lg text-gray-800">{project.clientName}</p>
          </div>
        )}

        {project.teamMembers && project.teamMembers.length > 0 && (
          <div className="mt-4">
            <h2 className="font-bold text-2xl mb-2">Team Members:</h2>
            <ul className="list-disc list-inside pl-5">
              {project.teamMembers.map((member, index) => (
                <li key={index} className="text-lg text-gray-800">{member}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
