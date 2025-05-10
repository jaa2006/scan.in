import { NavLink } from 'react-router-dom';
import { Home, Clock, Settings, User } from 'lucide-react';

function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--card-bg)] border-t border-[var(--border-color)] flex justify-around items-center h-16 z-10">
      <NavLink 
        to="/" 
        className={({isActive}) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
        end
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>
      
      <NavLink 
        to="/history" 
        className={({isActive}) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
      >
        <Clock size={24} />
        <span className="text-xs mt-1">History</span>
      </NavLink>
      
      <NavLink 
        to="/settings" 
        className={({isActive}) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
      >
        <Settings size={24} />
        <span className="text-xs mt-1">Settings</span>
      </NavLink>

      <NavLink 
        to="/developer" 
        className={({isActive}) => 
          `bottom-nav-item ${isActive ? 'active' : ''}`
        }
      >
        <User size={24} />
        <span className="text-xs mt-1">Developer</span>
      </NavLink>
    </nav>
  );
}

export default BottomNavbar