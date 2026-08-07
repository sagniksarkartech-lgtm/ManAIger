import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#050508] border-t border-white/10 pt-16 sm:pt-24 pb-12 px-6 sm:px-10 md:px-14 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 sm:gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <svg viewBox="0 0 256 256" fill="currentColor" className="w-5 h-5 text-purple-400">
                  <path d="M 144 256 L 27.598 256 L 144 139.598 Z" />
                  <path d="M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z" />
                  <path d="M 0 204.402 L 0 112 L 92.402 112 Z" />
                </svg>
              </div>
              <span className="font-semibold text-lg tracking-tight text-white">MANAIGER AI</span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal max-w-sm">
              Enterprise AI Workflow Automation platform. Deploy autonomous AI agents to manage business operations while keeping humans in complete control.
            </p>

            {/* Newsletter Input */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-gray-300 mb-2">Subscribe to Enterprise AI Updates</div>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="enter your email..."
                  className="px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shrink-0 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Column: Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400 font-normal">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/agents" className="hover:text-white transition-colors">AI Agents</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Command Center</Link></li>
              <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Column: Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-4">Features</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400 font-normal">
              <li><Link to="/features" className="hover:text-white transition-colors">Email Automation</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Invoice Parser</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Human Gatekeeper</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Audit Logging</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Security Controls</Link></li>
            </ul>
          </div>

          {/* Column: Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400 font-normal">
              <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
              <li><Link to="/docs" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link to="/docs" className="hover:text-white transition-colors">Integration Guides</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">System Status</Link></li>
            </ul>
          </div>

          {/* Column: Company & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400 font-normal">
              <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Portal Login</Link></li>
              <li><Link to="/docs" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/docs" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/docs" className="hover:text-white transition-colors">SOC2 Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Social */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} MANAIGER AI, Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="X Twitter">
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
