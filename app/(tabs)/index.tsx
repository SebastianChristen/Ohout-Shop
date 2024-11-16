import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importiere den Navigation Hook
import { useSearch } from './SearchContext'; // Import the context

const data = [
  { id: '1', image: require('../../assets/images/regenschirm.jpg'), title: 'Gelber Regenschirm', types: ['Wetterschutz'], price: 27, stars: "★★★★☆", reviews: 139, description: "Gelber Regenschirm, um den Regen abzuhalten. Am besten zu benutzen an Regentagen." },
  { id: '2', image: require('../../assets/images/hoodie.webp'), title: 'Grauer Hoodie', types: ['Kleidung','Hoodies'], price: 59, stars: "★★★★☆", reviews: 357, description: "Grössen: XS, S, M, XL, XXL\nStoff: Baumwolle" },
  { id: '3', image: require('../../assets/images/skelett.jpg'), title: 'Timberbone Skelett', types: ['Kostüm',"Dekorationen"], price: 40, stars: "★★★★✩", reviews: 7, description: "Skelett nach Abbild des berühmten Youtubers 'Timberbone'" },
  { id: '4', image: require('../../assets/images/natel.jpg'), title: 'Samsung Galaxy A55', types: ['Smartphone'], price: 321, stars: "★★★★☆", reviews: 408, description: "256 GB, Grau, 6.6\", 5G, 50 Mpx" },
  { id: '5', image: require('../../assets/images/mystery-book.jpg'), title: 'Mysteriöses Buch', types: ['Bücher'], price: 642, stars: "★★★★★", reviews: 0, description: "Mysteriöses Buch, unbekannte Herkunft" },
  { id: '6', image: require('../../assets/images/Zelda-dnd.webp'), title: 'Zelda D&D-Würfel', types: ['D&D'], price: 69, stars: "★★★★☆", reviews: 1100, description: "Würfel-Set, Grün mit Triforce" },
];

const MainPage = () => {
  const navigation = useNavigation(); // Navigation Hook

  // Weiterleiten zur Produktdetail-Seite. Gibt jeweils das gesamte Produkt mit.
  const handlePress = (item) => {
    navigation.navigate('ProductDetails', { item });
  };

  const { searchQuery } = useSearch(); // Hier ist jetzt die Suchfunktion

  // Filter the data
  const filteredData = data.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Search in the title
      item.types.some(type => type.toLowerCase().includes(searchQuery.toLowerCase())) // Search in the types
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.type}>{item.types.join(', ')}</Text>
      <Text style={styles.price}>CHF {item.price}.-</Text>
      <Text style={styles.star}> {item.stars}</Text>
      <Text style={styles.reviews}>{item.reviews} Bewertungen</Text>  
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={1}
      contentContainerStyle={styles.listContainer}
    />
  );
};

// Hier alles CSS
const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    margin: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  // Die Bilder. Die Höhe ist nicht ganz 100%, so dass mehrere Items Platz haben.
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 1.5,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    color: '#C00',
    marginBottom: 4,
  },
  type: {
    fontSize: 12,
    color: '#00f',
  },
  star: {
    fontSize: 18,
    color: '#FFD700',
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
});

export default MainPage;
