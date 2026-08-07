import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatedPage } from '../components/AnimatedPage';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, ShieldCheck, User, Building, Mail, Lock } from 'lucide-react';

export const SignUpPage = () => {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Founder / Executive');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // If user is already logged in, redirect /signup to /dashboard
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    login(email, password);
  };

  const handleGoogleSignUp = () => {
    login();
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/15 blur-[160px] rounded-full pointer-events-none z-0" />

        <div className="w-full max-w-lg z-10 relative">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.2)]">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 group mb-4">
                <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="w-5 h-5 text-purple-400">
                    <path d="M 144 256 L 27.598 256 L 144 139.598 Z" />
                    <path d="M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z" />
                    <path d="M 0 204.402 L 0 112 L 92.402 112 Z" />
                  </svg>
                </div>
                <span className="font-semibold text-lg text-white">MANAIGER AI</span>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Create Your Account</h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1.5">
                Join 600+ enterprises automating workflows with AI agents
              </p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-purple-400" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@acme.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Primary Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0C15] border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500/60 transition-colors"
                >
                  <option value="Founder / Executive">Founder / Executive</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="Finance & Invoicing Lead">Finance & Invoicing Lead</option>
                  <option value="Software Engineer / Tech Lead">Software Engineer / Tech Lead</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 accent-purple-600 cursor-pointer"
                  />
                  <span className="text-xs text-gray-400 leading-normal">
                    I agree to MANAIGER AI's{' '}
                    <a href="#terms" className="text-purple-400 hover:underline">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#privacy" className="text-purple-400 hover:underline">Privacy Policy</a>.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!agreeTerms}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4 text-purple-200" />
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative px-3 bg-[#0D0C15] text-[11px] text-gray-500 uppercase font-mono">
                OR SIGN UP WITH
              </span>
            </div>

            {/* Social / Google Sign-Up Option */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full py-3 px-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl text-xs font-medium text-gray-200 flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
                <span>Sign up with Google</span>
              </button>

              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full py-2.5 px-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl text-xs font-medium text-gray-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Single Sign-On (SSO)</span>
              </button>
            </div>

            {/* Bottom link to Sign In */}
            <div className="mt-6 pt-5 border-t border-white/10 text-center">
              <p className="text-xs text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
