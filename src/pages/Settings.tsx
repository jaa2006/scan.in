import { Moon, Sun, Info, MessageSquare, Github } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container mx-auto px-4 pt-8 pb-20">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-4">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {theme === 'dark' ? (
                <Moon size={20} className="mr-3 text-[var(--primary-color)]" />
              ) : (
                <Sun size={20} className="mr-3 text-[var(--primary-color)]" />
              )}
              <span>Dark Mode</span>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                theme === 'dark' ? 'bg-[var(--primary-color)]' : 'bg-gray-300'
              }`}
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="card space-y-3">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          
          <div className="flex justify-between items-center py-2 border-b border-[var(--border-color)]">
            <div className="flex items-center">
              <Info size={20} className="mr-3 text-[var(--primary-color)]" />
              <span>About App</span>
            </div>
            <span className="text-sm text-gray-500">v1.0.0</span>
          </div>
          
          <div className="flex items-center py-2 border-b border-[var(--border-color)]">
            <MessageSquare size={20} className="mr-3 text-[var(--primary-color)]" />
            <span>Send Feedback</span>
          </div>
          
          <div className="flex items-center py-2">
            <Github size={20} className="mr-3 text-[var(--primary-color)]" />
            <span>GitHub Repository</span>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Fixcode Studio.<br />
          All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Settings;