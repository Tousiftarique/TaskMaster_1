import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-tight">TaskMaster</Link>
        {user ? (
          <div className="flex items-center gap-6">
            <span className="font-medium">Hi, {user.name} 👋</span>
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 px-5 py-2 rounded-2xl font-semibold hover:bg-indigo-100 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-6 text-lg">
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
