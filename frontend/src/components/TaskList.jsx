import { useState } from "react";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    onUpdate(editingId, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setEditingId(null);
  };

  const toggleComplete = (task) => {
    const newStatus = task.status === "done" ? "todo" : "done";
    onUpdate(task._id, { status: newStatus });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No tasks yet. Add your first task above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="bg-white p-6 rounded-lg shadow-md">
          {editingId === task._id ? (
            <div>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3
                  className={`text-xl font-semibold ${task.status === "done" ? "line-through text-gray-500" : "text-gray-800"}`}
                >
                  {task.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(task)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      task.status === "done"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    }`}
                  >
                    {task.status === "done" ? "Completed" : "Mark Complete"}
                  </button>
                  <button
                    onClick={() => startEdit(task)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {task.description && (
                <p
                  className={`text-gray-600 ${task.status === "done" ? "line-through" : ""}`}
                >
                  {task.description}
                </p>
              )}
              <div className="text-sm text-gray-400 mt-2">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
