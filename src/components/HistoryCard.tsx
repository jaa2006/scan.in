import { LinkIcon, FileText, Hash, Trash2 } from 'lucide-react';
import { ScanItem, useHistory } from '../contexts/HistoryContext';

interface HistoryCardProps {
  item: ScanItem;
}

function HistoryCard({ item }: HistoryCardProps) {
  const { deleteItem, getFormattedTime } = useHistory();
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'URL':
        return <LinkIcon size={18} className="text-blue-500" />;
      case 'NUMBER':
        return <Hash size={18} className="text-purple-500" />;
      default:
        return <FileText size={18} className="text-green-500" />;
    }
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this item from history?')) {
      deleteItem(item.id);
    }
  };
  
  // Get a truncated version of the content for display
  const getTruncatedContent = (content: string) => {
    return content.length > 50 ? content.substring(0, 50) + '...' : content;
  };
  
  return (
    <div className="card hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <div className="flex items-center mb-1">
            {getIconForType(item.type)}
            <span className="text-xs font-medium ml-1 text-gray-500">{item.type}</span>
          </div>
          <p className="break-words">{getTruncatedContent(item.content)}</p>
          <div className="text-xs text-gray-500 mt-1">
            {getFormattedTime(item.timestamp)}
          </div>
        </div>
        <button 
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;