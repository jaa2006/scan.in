import { QrCode } from 'lucide-react';
import { useEffect, useState } from 'react';

function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-[var(--bg-color)] flex flex-col items-center justify-center z-50">
      <div className="animate-bounce mb-4">
        <QrCode size={64} className="text-[var(--primary-color)]" />
      </div>
      <h1 className="text-3xl font-bold mb-2 animate-fade-in">Scan.in</h1>
      <p className="text-gray-500 animate-fade-in-delay">by Fixcode Studio</p>
    </div>
  );
}

export default SplashScreen;