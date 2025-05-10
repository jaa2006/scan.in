import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';

// Pages
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import History from './pages/History';
import Settings from './pages/Settings';
import Developer from './pages/Developer';
import Layout from './components/Layout';
import ScanResult from './pages/ScanResult';
import SplashScreen from './components/SplashScreen';

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    // Update body class based on theme
    document.body.className = theme;
  }, [theme]);

  // Hide bottom navigation on scanner page
  const hideNavigation = location.pathname === '/scanner';

  return (
    <div className={`app ${theme} min-h-screen`}>
      <SplashScreen />
      <Routes>
        <Route path="/" element={<Layout hideNavigation={hideNavigation} />}>
          <Route index element={<Home />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
          <Route path="developer" element={<Developer />} />
          <Route path="result" element={<ScanResult />} />
        </Route>
        <Route path="/scanner" element={<Scanner />} />
      </Routes>
    </div>
  );
}

export default App;