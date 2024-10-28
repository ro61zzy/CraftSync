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
    
        <p>You have no assigned projects.</p>
   
    </div>
  );
}

