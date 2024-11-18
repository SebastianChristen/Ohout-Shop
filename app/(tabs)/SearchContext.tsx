import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext({
  searchQuery: '',
  setSearchQuery: (query: string) => {},
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
