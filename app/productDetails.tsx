import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const ProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;

  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [stars, setStars] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [userMadeReviews, setUserMadeReviews] = useState([]);

  // Load reviews from AsyncStorage when component mounts
  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      const storedReviews = await AsyncStorage.getItem(`reviews_${item.id}`);
      if (storedReviews) {
        setUserMadeReviews(JSON.parse(storedReviews));
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  }

  async function addToShoppingCart(item) {
    try {
      const jsonCart = await AsyncStorage.getItem('shoppingCart');
      let cartItems = jsonCart != null ? JSON.parse(jsonCart) : [];

      cartItems.push(item);
      await AsyncStorage.setItem('shoppingCart', JSON.stringify(cartItems));

      Alert.alert("Hinzugefügt", "Das Produkt wurde dem Warenkorb hinzugefügt");
    } catch (error) {
      console.error("Fehler beim Hinzufügen zum Warenkorb:", error);
    }
  }

  async function addReview() {
    if (!name || !reviewText || !stars) {
      Alert.alert("Fehler", "Bitte alle Felder ausfüllen");
      return;
    }

    const newReview = {
      name,
      text: reviewText,
      stars,
      image: imageBase64,
    };

    const updatedReviews = [...userMadeReviews, newReview];
    setUserMadeReviews(updatedReviews);

    try {
      await AsyncStorage.setItem(`reviews_${item.id}`, JSON.stringify(updatedReviews));
      setName('');
      setReviewText('');
      setStars('');
      setImageBase64(null);
      Alert.alert("Erfolg", "Ihre Bewertung wurde gespeichert");
    } catch (error) {
      console.error("Fehler beim Speichern der Bewertung:", error);
    }
  }

  async function pickImageFromLibrary() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageBase64(result.assets[0].base64);
    }
  }

  async function takePhoto() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageBase64(result.assets[0].base64);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>CHF {item.price}.-</Text>
        <Text style={styles.star}>{item.stars}</Text>
        <Text style={styles.reviews}>({item.reviews} Bewertungen)</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Button title="Zum Warenkorb hinzufügen" onPress={() => addToShoppingCart(item)} />

        <Text style={styles.reviewsHeader}>Create your review:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Review"
          value={reviewText}
          onChangeText={setReviewText}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Stars (1-5)"
          value={stars}
          onChangeText={setStars}
          keyboardType="numeric"
        />
        <Button title="Pick an Image from Library" onPress={pickImageFromLibrary} />
        <Button title="Take a Photo" onPress={takePhoto} />
        {imageBase64 && <Image source={{ uri: `data:image/png;base64,${imageBase64}` }} style={styles.reviewImage} />}
        <Button title="Submit Review" onPress={addReview} />

        <Text style={styles.reviewsHeader}>Reviews:</Text>
        {userMadeReviews && userMadeReviews.length > 0 ? (
          userMadeReviews.map((review, index) => (
            <View key={index} style={styles.reviewContainer}>
              <Text style={styles.reviewText}>{review.name}</Text>
              <Text style={styles.reviewStars}>{review.stars} stars</Text>
              <Text style={styles.reviewText}>{review.text}</Text>
              {review.image && <Image source={{ uri: `data:image/png;base64,${review.image}` }} style={styles.reviewImage} />}
            </View>
          ))
        ) : (
          <Text style={styles.noReviewsText}>No reviews available</Text>
        )}
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
  reviewsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  reviewContainer: {
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
  },
  reviewStars: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  reviewImage: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
    marginVertical: 8,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  noReviewsText: {
    fontSize: 14,
    color: '#777',
  },
});

export default ProductDetails;
