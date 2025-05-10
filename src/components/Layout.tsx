import { Outlet } from 'react-router-dom';
import BottomNavbar from './BottomNavbar';

interface LayoutProps {
  hideNavigation?: boolean;
}

function Layout({ hideNavigation = false }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-16">
        <Outlet />
      </main>
      {!hideNavigation && <BottomNavbar />}
    </div>
  );
}

export default Layout;