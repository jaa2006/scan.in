import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Search, FilterX } from 'lucide-react';
import { useHistory, ScanItem } from '../contexts/HistoryContext';
import HistoryCard from '../components/HistoryCard';

function History() {
  const { history, clearHistory } = useHistory();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'URL' | 'TEXT' | 'NUMBER'>('ALL');

  // Filter and search history items
  const filteredHistory = history.filter(item => {
    const matchesFilter = filter === 'ALL' || item.type === filter;
    const matchesSearch = item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all scan history?')) {
      clearHistory();
    }
  };

  const handleItemClick = (item: ScanItem) => {
    navigate('/result', { state: { result: item.content } });
  };

  return (
    <div className="container mx-auto px-4 pt-8 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">History</h1>
        {history.length > 0 && (
          <button 
            onClick={handleClearHistory}
            className="text-red-500 flex items-center"
          >
            <Trash2 size={18} className="mr-1" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {history.length > 0 && (
        <>
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)]"
            />
            {searchQuery && (
              <button 
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setSearchQuery('')}
              >
                <FilterX size={18} className="text-gray-400" />
              </button>
            )}
          </div>

          <div className="flex mb-4 space-x-2 overflow-x-auto pb-2">
            {(['ALL', 'URL', 'TEXT', 'NUMBER'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
                  filter === type 
                    ? 'bg-[var(--primary-color)] text-white' 
                    : 'bg-[var(--card-bg)] border border-[var(--border-color)]'
                }`}
              >
                {type === 'ALL' ? 'All' : type}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="space-y-3">
        {filteredHistory.length > 0 ? (
          filteredHistory.map(item => (
            <div key={item.id} onClick={() => handleItemClick(item)}>
              <HistoryCard item={item} />
            </div>
          ))
        ) : (
          <div className="card flex flex-col items-center justify-center py-8">
            {history.length === 0 ? (
              <>
                <Search size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-500 text-center">
                  No scan history yet.<br />
                  Items you scan will appear here.
                </p>
              </>
            ) : (
              <>
                <FilterX size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-500 text-center">
                  No results found.<br />
                  Try a different search or filter.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;