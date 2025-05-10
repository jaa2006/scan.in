import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkIcon, FileText, Hash, Check, ExternalLink } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';

function ScanResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getFormattedTime } = useHistory();
  
  const resultData = location.state?.result;
  const resultType = determineType(resultData || '');
  
  useEffect(() => {
    // If no result data, redirect to home
    if (!resultData) {
      navigate('/');
      return;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(resultData)
      .then(() => {
        console.log('Content copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }, [resultData, navigate]);
  
  function determineType(content: string): 'URL' | 'TEXT' | 'NUMBER' {
    // Check if it's a URL
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    if (urlRegex.test(content)) return 'URL';
    
    // Check if it's a number
    const numberRegex = /^\d+$/;
    if (numberRegex.test(content)) return 'NUMBER';
    
    // Default to text
    return 'TEXT';
  }
  
  function getIconForType(type: string) {
    switch (type) {
      case 'URL':
        return <LinkIcon size={24} className="text-blue-500" />;
      case 'NUMBER':
        return <Hash size={24} className="text-purple-500" />;
      default:
        return <FileText size={24} className="text-green-500" />;
    }
  }
  
  function handleGoBack() {
    navigate('/');
  }
  
  function handleOpenLink() {
    if (resultType === 'URL') {
      // Ensure URL has protocol
      let url = resultData;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      window.open(url, '_blank');
    }
  }

  if (!resultData) return null;
  
  return (
    <div className="container mx-auto px-4 pt-8 pb-20">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Hasil Scan</h1>
        <p className="text-sm text-gray-500 mb-4">
          {getFormattedTime(Date.now())}
        </p>
        
        <div className="flex items-center justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-[var(--card-bg)] flex items-center justify-center mb-4 shadow-md">
            {getIconForType(resultType)}
          </div>
        </div>
        
        <div className="card w-full mb-4">
          <div className="mb-2 text-sm font-medium text-gray-500">
            {resultType}
          </div>
          <p className="break-words">
            {resultData}
          </p>
        </div>
        
        <div className="flex w-full gap-4 mb-4">
          <button 
            className="btn-primary flex-1 flex items-center justify-center"
          >
            <Check size={20} className="mr-2" />
            <span>Copied to Clipboard</span>
          </button>
          
          {resultType === 'URL' && (
            <button 
              onClick={handleOpenLink}
              className="bg-green-500 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <ExternalLink size={20} className="mr-2" />
              <span>Open Link</span>
            </button>
          )}
        </div>
        
        <button 
          onClick={handleGoBack}
          className="text-[var(--primary-color)] font-medium"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ScanResult;