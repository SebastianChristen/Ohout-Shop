import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  // Lade Warenkorb-Elemente aus dem AsyncStorage
  async function loadCartItems() {
    try {
      const jsonCart = await AsyncStorage.getItem('shoppingCart');
      const items = jsonCart != null ? JSON.parse(jsonCart) : [];
      setCartItems(items);
    } catch (error) {
      console.error("Fehler beim Laden des Warenkorbs:", error);
    }
  }

  // Hier wird das jeweilige einzelne Item erstellt
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Warenkorb</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}/>
    </View>
  );
};

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#C00',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
});

export default ShoppingCart;
