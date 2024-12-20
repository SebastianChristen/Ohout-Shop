import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskList from '../path/to/TaskList';
import { SearchProvider } from '../path/to/SearchContext'; 

describe('TaskList - SearchBar', () => {
  it('should render the search bar with initial value', () => {
    const { getByPlaceholderText } = render(
      <SearchProvider>
        <TaskList />
      </SearchProvider>
    );

    const searchBar = getByPlaceholderText('Suche');
    expect(searchBar.props.value).toBe('');
  });

  it('should update searchQuery on text input', () => {
    const { getByPlaceholderText } = render(
      <SearchProvider>
        <TaskList />
      </SearchProvider>
    );

    const searchBar = getByPlaceholderText('Suche');
    fireEvent.changeText(searchBar, 'Testsuche');
    expect(searchBar.props.value).toBe('Testsuche');
  });

  it('should log search query on search submit', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByPlaceholderText } = render(
      <SearchProvider>
        <TaskList />
      </SearchProvider>
    );

    const searchBar = getByPlaceholderText('Suche');
    fireEvent.changeText(searchBar, 'Testsuche');
    fireEvent(searchBar, 'submitEditing'); 

    expect(consoleSpy).toHaveBeenCalledWith('Suchanfrage:', 'Testsuche');
    consoleSpy.mockRestore();
  });
});
