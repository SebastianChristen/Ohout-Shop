import React, { createContext, useState, useContext } from 'react';

// Create the context
const SearchContext = createContext({
  searchQuery: '',
  setSearchQuery: (query: string) => {},
});

// Custom hook for easier usage
export const useSearch = () => useContext(SearchContext);

// Provider component to wrap your app
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
