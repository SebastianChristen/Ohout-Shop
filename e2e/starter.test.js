// __tests__/MainPage.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainPage from '../app/(tabs)/index';
// Mocking von useNavigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('MainPage', () => {
  it('renders all items correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainPage />
      </NavigationContainer>
    );

    // Überprüfe, ob die Titel der Produkte angezeigt werden
    expect(getByText('Gelber Regenschirm')).toBeTruthy();
    expect(getByText('Grauer Hoodie')).toBeTruthy();
    expect(getByText('Timberbone Skelett')).toBeTruthy();
    expect(getByText('Samsung Galaxy A55')).toBeTruthy();
    expect(getByText('Mysteriöses Buch')).toBeTruthy();
    expect(getByText('Zelda D&D-Würfel')).toBeTruthy();
  });

  it('navigates to ProductDetails when an item is pressed', () => {
    // Mock der navigate-Funktion
    const mockNavigate = jest.fn();
    require('@react-navigation/native').useNavigation.mockReturnValue({
      navigate: mockNavigate,
    });

    const { getByText } = render(
      <NavigationContainer>
        <MainPage />
      </NavigationContainer>
    );

    // Wähle ein Produkt zum Testen
    const item = getByText('Gelber Regenschirm');
    
    // Simuliere einen Klick auf das Produkt
    fireEvent.press(item);

    // Überprüfe, ob die Navigation ausgelöst wird
    expect(mockNavigate).toHaveBeenCalledWith('ProductDetails', { item: expect.any(Object) });
  });
});
