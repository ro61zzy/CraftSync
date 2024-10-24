//app/dashboard/page.tsx

"use client";
import { useState } from 'react';

export default function AdminDashboard() {
  const [projectName, setProjectName] = useState('');
  const [taskList, setTaskList] = useState([{ name: '' }]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('TEAM');
  const [message, setMessage] = useState('');
  const [projectMessage, setProjectMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTaskChange = (index: number, value: string) => {
    const tasks = [...taskList];
    tasks[index].name = value;
    setTaskList(tasks);
  };

  const addTask = () => {
    setTaskList([...taskList, { name: '' }]);
  };

  const removeTask = (index: number) => {
    const tasks = [...taskList];
    tasks.splice(index, 1);
    setTaskList(tasks);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName || taskList.some(task => !task.name)) {
      setProjectMessage('Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    const payload = {
      name: projectName,
      tasks: taskList.filter(task => task.name.trim() !== ''),
    };
    
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  
    if (res.ok) {
      setProjectMessage('Project created successfully!');
      setProjectName('');
      setTaskList([{ name: '' }]);
    } else {
      const errorResponse = await res.json();
      setProjectMessage(`Error creating project: ${errorResponse.message}`);
    }
    setLoading(false);
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter an email.');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });

    if (res.ok) {
      setMessage('Invite sent successfully');
      setEmail('');
    } else {
      setMessage('Error sending invite');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100">
      {/* Left Section: Form */}
      <div className="w-full md:w-5/12 p-6 bg-white shadow-md rounded-lg space-y-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-header">Admin Dashboard</h1>

        {/* Create a Project Section */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-header text-center">Create a New Project</h2>
          <form onSubmit={handleProjectSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border p-2 w-full rounded text-black"
            />

            <h3 className="text-lg font-bold text-header">Add Tasks</h3>
            {taskList.map((task, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder={`Task ${index + 1}`}
                  value={task.name}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  className="border p-2 w-full rounded text-black"
                />
                <button
                  type="button"
                  onClick={() => removeTask(index)}
                  className="bg-red-500 text-white px-6 rounded"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTask}
              className="bg-gray-500 text-white p-2 w-full rounded"
            >
              Add Task
            </button>

            <button type="submit" className="bg-primary text-white p-2 w-full rounded">
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </form>
          {projectMessage && <p className="text-red-500 mt-4 text-center">{projectMessage}</p>}
        </section>

        {/* Invite Users Section */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-header text-center">Invite Users to Project</h2>
          <form onSubmit={handleInviteSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="User Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full rounded text-black"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 w-full rounded"
            >
              <option value="TEAM">Invite as Team Member</option>
              <option value="CLIENT">Invite as Client</option>
            </select>
            <button type="submit" className="bg-primary text-white p-2 w-full rounded">
              {loading ? 'Sending...' : 'Send Invite'}
            </button>
          </form>
          {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
        </section>
      </div>

      {/* Right Section: Text/Instructions */}
      <div className="hidden md:flex md:w-5/12 p-6 text-white bg-primary flex-col justify-center items-start rounded-lg ml-6">
        <h2 className="text-5xl font-bold mb-8 text-center ">Welcome to the Admin Dashboard!</h2>
        <p className="mb-4 text-2xl text-center mt-4">
          Here, you can create new projects by adding a project name and assigning tasks to team members.
          You can also invite users to collaborate on projects, either as team members or clients.
        </p>
        <p className="mb-4  text-2xl text-center mt-4">
          Make sure to fill in all fields when creating a project and sending invitations. After creating a project,
          you will be able to track tasks and manage the progress from the dashboard.
        </p>
        <p className=' text-2xl text-center mt-4'>
          If you encounter any issues, feel free to contact our support team for assistance.
        </p>
      </div>
    </div>
  );
}
