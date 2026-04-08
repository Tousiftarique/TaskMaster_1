import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const { apiUrl } = useAuth();
  const token = localStorage.getItem('token');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${apiUrl}/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [apiUrl, token]);

  const addTask = async (taskData) => {
    const res = await axios.post(`${apiUrl}/tasks`, taskData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(prev => [...prev, res.data]);
  };

  const updateTask = async (id, updatedData) => {
    const res = await axios.put(`${apiUrl}/tasks/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(prev => prev.map(t => t._id === id ? res.data : t));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${apiUrl}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  if (loading) return <div className="text-center py-20 text-xl">Loading your tasks...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-5xl font-bold text-gray-800 mb-10">Your Tasks</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </div>
  );
}