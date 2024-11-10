import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProductDetails = () => {
  const route = useRoute(); // Zugriff auf die Route, um die übergebene Produktdaten zu erhalten
  const navigation = useNavigation();
  const { item } = route.params; // Produktdaten, die von der MainPage übergeben wurden. Parameter

  return (
    <ScrollView style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>CHF {item.price}.-</Text>
        <Text style={styles.star}>{item.stars}</Text>
        <Text style={styles.reviews}>({item.reviews} Bewertungen)</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Button title="Zurück zur Hauptseite" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    color: '#C00',
    marginBottom: 8,
  },
  star: {
    fontSize: 18,
    color: '#FFD700',
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
});

export default ProductDetails;
