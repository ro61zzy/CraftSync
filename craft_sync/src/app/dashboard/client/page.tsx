// src/app/dashboard/client/page.tsx
"use client"
import { useState, useEffect } from 'react';

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

        <p>You have no assigned projects.</p>
    
    </div>
  );
}


