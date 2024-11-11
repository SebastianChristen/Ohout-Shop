import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskList() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = () => {
    console.log('Search query:', searchQuery);
  };

  return (
    <View style={styles.container}>
      {/* Left: Personal Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://your-image-url.com/image.png' }}
          style={styles.image}
        />
      </View>

      {/* Center: Searchbar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={handleSearchChange}
          onSubmitEditing={handleSearchSubmit}
          placeholder="Search"
        />
      </View>

      {/* Right Center: Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Button title="Login" onPress={() => console.log('Navigate to login page')} />
      </TouchableOpacity>

      {/* Right: Cart Button */}
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="cart" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
  },
  loginButton: {
    marginRight: 10,
  },
  iconContainer: {
    padding: 10,
  },
});
