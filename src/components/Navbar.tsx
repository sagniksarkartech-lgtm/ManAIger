import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'AI Agents', path: '/agents' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Documentation', path: '/docs' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080C]/90 backdrop-blur-md border-b border-white/10 py-3 sm:py-4 shadow-lg shadow-purple-950/20'
          : 'bg-transparent py-4 sm:py-6'
      } px-6 sm:px-10 md:px-14`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo & Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 group-hover:border-purple-500/60 transition-colors">
            <svg
              viewBox="0 0 256 256"
              fill="currentColor"
              className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors"
            >
              <path d="M 144 256 L 27.598 256 L 144 139.598 Z" />
              <path d="M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z" />
              <path d="M 0 204.402 L 0 112 L 92.402 112 Z" />
            </svg>
          </div>
          <span className="font-semibold text-lg tracking-tight text-white group-hover:text-purple-200 transition-colors">
            MANAIGER AI
          </span>
        </Link>

        {/* Center Links (hidden below md) */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: CTA / Logout & Mobile toggle */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="hidden sm:inline-block text-sm font-medium text-gray-300 hover:text-white transition-colors mr-1"
              >
                Sign In
              </Link>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 rounded-lg group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-purple-400/30 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 mr-2 text-purple-200 group-hover:rotate-12 transition-transform" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#08080C]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium py-1.5 ${
                location.pathname === item.path
                  ? 'text-purple-400 font-bold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="text-sm font-medium text-red-400 hover:text-red-300 py-1.5 border-t border-white/10 pt-3 flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="border-t border-white/10 pt-3 flex flex-col gap-2.5">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-white py-1.5"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-center text-white bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 rounded-lg shadow-lg"
              >
                Sign Up Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
