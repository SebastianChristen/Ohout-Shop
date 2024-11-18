import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ShoppingCart from '../path/to/ShoppingCart';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('ShoppingCart', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockResolvedValue(
      JSON.stringify([
        { id: 1, title: 'Test Item', price: 10.99, image: 'image-path' },
        { id: 1, title: 'Test Item', price: 10.99, image: 'image-path' },
        { id: 2, title: 'Another Item', price: 20.0, image: 'image-path' },
      ])
    );
    AsyncStorage.setItem.mockResolvedValue();
  });

  it('should load and group cart items correctly', async () => {
    const { getByText } = render(<ShoppingCart />);

    await waitFor(() => {
      expect(getByText('Test Item')).toBeTruthy();
      expect(getByText('Another Item')).toBeTruthy();
      expect(getByText('2')).toBeTruthy();
      expect(getByText('1')).toBeTruthy(); 
      expect(getByText('Gesamtsumme: €41.98')).toBeTruthy();
    });
  });

  it('should increment item quantity', async () => {
    const { getByText, getAllByText } = render(<ShoppingCart />);

    await waitFor(() => expect(getByText('Gesamtsumme: €41.98')).toBeTruthy());
    
    const incrementButton = getAllByText('+')[0];
    fireEvent.press(incrementButton);

    await waitFor(() => {
      expect(getByText('3')).toBeTruthy(); 
      expect(getByText('Gesamtsumme: €52.97')).toBeTruthy();
    });
  });

  it('should decrement item quantity', async () => {
    const { getByText, getAllByText } = render(<ShoppingCart />);

    await waitFor(() => expect(getByText('Gesamtsumme: €41.98')).toBeTruthy());

    const decrementButton = getAllByText('−')[0];
    fireEvent.press(decrementButton);

    await waitFor(() => {
      expect(getByText('1')).toBeTruthy();
      expect(getByText('Gesamtsumme: €31.98')).toBeTruthy();
    });
  });

  it('should navigate to checkout when the button is pressed', async () => {
    const { getByText } = render(<ShoppingCart />);

    const checkoutButton = getByText('Zum Checkout');
    fireEvent.press(checkoutButton);

    await waitFor(() => {
      expect(require('expo-router').router.push).toHaveBeenCalledWith('CheckoutPage');
    });
  });
});
