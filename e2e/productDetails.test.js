import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductDetails from '../app/productDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {}); 

it('should display item details correctly', () => {
  const { getByText } = render(<ProductDetails route={{ params: { item: mockItem } }} />);

  expect(getByText('Test Product')).toBeTruthy(); 
  expect(getByText('CHF 99.99.-')).toBeTruthy(); 
  expect(getByText('4.5')).toBeTruthy(); 
  expect(getByText('(10 Bewertungen)')).toBeTruthy(); 
  expect(getByText('A test product description')).toBeTruthy();
});


describe('ProductDetails', () => {
  const mockItem = {
    id: '1',
    title: 'Test Product',
    price: '99.99',
    stars: '4.5',
    reviews: 10,
    description: 'A test product description',
    image: 'https://example.com/product-image.jpg',
  };

  beforeEach(() => {
    AsyncStorage.getItem.mockResolvedValue(null);
    AsyncStorage.setItem.mockResolvedValue();
  });

  it('should allow the user to submit a review', async () => {
    const { getByPlaceholderText, getByText } = render(<ProductDetails route={{ params: { item: mockItem } }} />);

    const nameInput = getByPlaceholderText('Name');
    const reviewInput = getByPlaceholderText('Review');
    const starsInput = getByPlaceholderText('Stars (1-5)');
    const submitButton = getByText('Submit Review');

    fireEvent.changeText(nameInput, 'Max Mustermann');
    fireEvent.changeText(reviewInput, 'Great product!');
    fireEvent.changeText(starsInput, '5');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        `reviews_${mockItem.id}`,
        expect.any(String)
  )});

    expect(nameInput.props.value).toBe('');
    expect(reviewInput.props.value).toBe('');
    expect(starsInput.props.value).toBe('');
  });

  it('should show an alert if required fields are missing', async () => {
    const { getByText, getByPlaceholderText } = render(<ProductDetails route={{ params: { item: mockItem } }} />);

    const nameInput = getByPlaceholderText('Name');
    const reviewInput = getByPlaceholderText('Review');
    const starsInput = getByPlaceholderText('Stars (1-5)');
    const submitButton = getByText('Submit Review');

    fireEvent.changeText(reviewInput, 'Good product!');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });

    expect(Alert.alert).toHaveBeenCalledWith('Fehler', 'Bitte alle Felder ausfüllen');
  });
});
