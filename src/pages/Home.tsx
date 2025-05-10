import { useNavigate } from 'react-router-dom';
import { QrCode, ArrowRight } from 'lucide-react';
import { useHistory, ScanItem } from '../contexts/HistoryContext';
import HistoryCard from '../components/HistoryCard';

function Home() {
  const navigate = useNavigate();
  const { history } = useHistory();

  const handleScanClick = () => {
    navigate('/scanner');
  };

  return (
    <div className="container mx-auto px-4 pt-8 pb-20">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center mb-4">
          <QrCode size={32} className="text-[var(--primary-color)] mr-2" />
          <h1 className="text-2xl font-bold">Scan.in</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">by Fixcode Studio</p>
        
        <button 
          onClick={handleScanClick}
          className="btn-primary flex items-center justify-center w-full max-w-xs py-4 mb-8"
        >
          <span className="mr-2">Scan Sekarang</span>
          <QrCode size={20} />
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Riwayat Terakhir</h2>
        {history.length > 0 && (
          <button 
            onClick={() => navigate('/history')}
            className="text-sm text-[var(--primary-color)] flex items-center"
          >
            Lihat Semua 
            <ArrowRight size={16} className="ml-1" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {history.length > 0 ? (
          history.slice(0, 5).map((item: ScanItem) => (
            <HistoryCard key={item.id} item={item} />
          ))
        ) : (
          <div className="card flex flex-col items-center justify-center py-8">
            <QrCode size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">
              Belum ada riwayat pemindaian.<br />
              Mulai scan QR code untuk melihat hasilnya di sini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;