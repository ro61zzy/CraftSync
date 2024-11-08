"use client";

import { useEffect, useState } from 'react';
import InviteModal from './InviteModal';
import { useRouter } from 'next/navigation';
import Loader from '../../components/Loader';

// Define your interfaces for Task, Milestone, and Project
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
}

const ProjectsPage = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.projects); 
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) {
    return <Loader />; // Use the reusable Loader component here
  }


  const openInviteModal = (projectId: number) => {
    setSelectedProjectId(projectId);
    setShowInviteModal(true);
  };


  const closeInviteModal = () => {
    setShowInviteModal(false);
    setSelectedProjectId(null);
  };


  const truncateText = (text: string) => {
    const words = text.split(' ');
    return words.slice(0, 10).join(' ') + (words.length > 10 ? '...' : '');
  };

  const goToProjectDetails = (projectId: number) => {
    router.push(`/dashboard/projects/${projectId}`);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-header text-center">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-lg text-black text-center">No projects found. Create a new project to get started.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-primary text-white p-6 rounded-lg flex flex-col justify-between transition-shadow duration-300">
              <div className="text-center" onClick={() => goToProjectDetails(project.id)}>
                <h2 className="text-3xl font-bold mb-2">{project.name} 🎉</h2>
                <p className="mb-4 text-lg">{truncateText(project.description)}</p>

                {/* Display only the first task */}
                {project.tasks.length > 0 && (
                  <>
                    <h3 className="font-bold text-lg">Tasks 🚀</h3>
                    <p className="text-left">{truncateText(project.tasks[0].name)} ✅</p>
                  </>
                )}

                {/* Display only the first milestone */}
                {project.milestones.length > 0 && (
                  <>
                    <h3 className="font-bold text-lg mt-4">Milestones 📅</h3>
                    <p className="text-left">
                      {truncateText(project.milestones[0].name)} - Due by {new Date(project.milestones[0].dueDate).toLocaleDateString()} 📆
                    </p>
                  </>
                )}
              </div>
              <button
                onClick={() => openInviteModal(project.id)}
                className="mt-4 bg-header text-white px-4 py-2 rounded transition duration-300 hover:bg-hover self-center"
              >
                Invite Users
              </button>
            </div>
          ))}
        </div>
      )}

{showInviteModal && (
  <InviteModal projectId={selectedProjectId ? String(selectedProjectId) : ''} onClose={closeInviteModal} />
)}
    </div>
  );
};

export default ProjectsPage;