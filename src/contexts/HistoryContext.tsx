import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { formatDistanceToNow } from 'date-fns';

export interface ScanItem {
  id: string;
  content: string;
  type: 'URL' | 'TEXT' | 'NUMBER';
  timestamp: number;
}

interface HistoryContextType {
  history: ScanItem[];
  addItem: (content: string) => void;
  deleteItem: (id: string) => void;
  clearHistory: () => void;
  getFormattedTime: (timestamp: number) => string;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

// Helper to determine the type of scanned content
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

export function HistoryProvider({ children }: { children: ReactNode }) {
  // Initialize history from localStorage
  const [history, setHistory] = useState<ScanItem[]>(() => {
    const savedHistory = localStorage.getItem('scanHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Update localStorage when history changes
  useEffect(() => {
    localStorage.setItem('scanHistory', JSON.stringify(history));
  }, [history]);

  // Add a new item to history
  const addItem = (content: string) => {
    const newItem: ScanItem = {
      id: Date.now().toString(),
      content,
      type: determineType(content),
      timestamp: Date.now()
    };
    
    setHistory(prevHistory => [newItem, ...prevHistory]);
  };

  // Delete an item from history
  const deleteItem = (id: string) => {
    setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
  };

  // Clear all history
  const clearHistory = () => {
    setHistory([]);
  };

  // Format timestamp as "X time ago"
  const getFormattedTime = (timestamp: number) => {
    return formatDistanceToNow(timestamp, { addSuffix: true });
  };

  return (
    <HistoryContext.Provider value={{ 
      history, 
      addItem, 
      deleteItem, 
      clearHistory,
      getFormattedTime
    }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}