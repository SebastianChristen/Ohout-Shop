import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadCartItems();
  }, []);

  // Lade Warenkorb-Elemente aus dem AsyncStorage
  async function loadCartItems() {
    try {
      const jsonCart = await AsyncStorage.getItem('shoppingCart');
      const items = jsonCart != null ? JSON.parse(jsonCart) : [];
      const groupedItems = groupItemsById(items);
      setCartItems(groupedItems);
      calculateTotalPrice(groupedItems);
    } catch (error) {
      console.error("Fehler beim Laden des Warenkorbs:", error);
    }
  }

  // Speichere Warenkorb-Elemente im AsyncStorage
  async function saveCartItems(items) {
    try {
      const jsonCart = JSON.stringify(items.flatMap((item) => 
        Array(item.quantity).fill({ ...item, quantity: undefined }) // Menge entfernen, um Originalformat wiederherzustellen
      ));
      await AsyncStorage.setItem('shoppingCart', jsonCart);
    } catch (error) {
      console.error("Fehler beim Speichern des Warenkorbs:", error);
    }
  }

  // Gruppiere Artikel mit derselben ID
  const groupItemsById = (items) => {
    const grouped = items.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
    return grouped;
  };

  // Berechne die Gesamtsumme
  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Erhöhe die Anzahl eines Artikels
  const incrementQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
    saveCartItems(updatedItems);
  };

  // Verringere die Anzahl eines Artikels
  const decrementQuantity = (id) => {
    const updatedItems = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // Entferne Artikel mit 0 Menge
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
    saveCartItems(updatedItems);
  };

  // Hier wird das jeweilige einzelne Item erstellt
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>€{(item.price).toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decrementQuantity(item.id)} style={styles.button}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Warenkorb</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)} // Stelle sicher, dass item.id ein String ist
          />
          <View>
            <Text style={styles.totalText}>Gesamtsumme: €{totalPrice.toFixed(2)}</Text>
            <Button
              title="Zum Checkout"
              onPress={() => router.push("CheckoutPage")} // Richtige Syntax
            />
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>Der Warenkorb ist leer.</Text>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#C00',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  button: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 16,
    color: '#000',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
});

export default ShoppingCart;
