// src/app/dashboard/page.tsx 
"use client"
import { useState } from 'react';

export default function AdminDashboard() {
  const [projectName, setProjectName] = useState('');
  const [taskList, setTaskList] = useState([{ name: '' }]); // Ensure this is always an array
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('TEAM');
  const [message, setMessage] = useState('');
  const [projectMessage, setProjectMessage] = useState('');

  // Create a new task
  const handleTaskChange = (index: number, value: string) => {
    const tasks = [...taskList];
    tasks[index].name = value;
    setTaskList(tasks);
  };

  const addTask = () => {
    setTaskList([...taskList, { name: '' }]);
  };

  // Create a new project with tasks
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const testPayload = {
      name: 'Video Edit',
      tasks: [{ name: 'Load the video' }, { name: 'JD create the video' }],
    };
    
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
    });
  
    if (res.ok) {
      setProjectMessage('Project created successfully!');
    } else {
      const errorResponse = await res.json();
      setProjectMessage(`Error creating project: ${errorResponse.message}`);
    }
  };
  

  // Invite team members or clients
  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });

    if (res.ok) {
      setMessage('Invite sent successfully');
    } else {
      setMessage('Error sending invite');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Create a Project Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Create a New Project</h2>
        <form onSubmit={handleProjectSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <h3 className="text-lg font-bold">Add Tasks</h3>
          {taskList.map((task, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Task ${index + 1}`}
              value={task.name}
              onChange={(e) => handleTaskChange(index, e.target.value)}
              className="border p-2 w-full mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addTask}
            className="bg-gray-500 text-white p-2 w-full mb-4"
          >
            Add Task
          </button>

          <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            Create Project
          </button>
        </form>
        {projectMessage && <p>{projectMessage}</p>}
      </section>

      {/* Invite Users Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Invite Users to Project</h2>
        <form onSubmit={handleInviteSubmit} className="mb-4">
          <input
            type="email"
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 w-full mb-4"
          >
            <option value="TEAM">Invite as Team Member</option>
            <option value="CLIENT">Invite as Client</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            Send Invite
          </button>
        </form>
        {message && <p>{message}</p>}
      </section>
    </div>
  );
}
