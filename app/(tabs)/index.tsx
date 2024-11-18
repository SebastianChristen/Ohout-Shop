import React, { useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSearch } from "./SearchContext"; 
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const data = [
  {
    id: "1",
    image: require("../../assets/images/regenschirm.jpg"),
    title: "Gelber Regenschirm",
    types: ["Wetterschutz"],
    price: 27,
    stars: "★★★★☆",
    reviews: 139,
    description: "Gelber Regenschirm, um den Regen abzuhalten. Am besten zu benutzen an Regentagen.",
    userReviews: [
      {
        name: "Max Mustermann",
        text: "Toller Regenschirm, sehr zufrieden!",
        stars: "5",
        image: null,
      },
      {
        name: "Piper",
        text: "Sehr guter Regenschirm",
        stars: "5",
        image: null,
      },
      {
        name: "scubly",
        text: "Das ist der SCHLECHTESTE Regenschirm EVER!!! Ist direkt kaputt gegangen.",
        stars: "1",
        image: null,
      },
      {
        name: "StarsBrawl77",
        text: "Schöner Regenschirm, aber ein bisschen schwer zu halten bei starkem Wind.",
        stars: "3",
        image: null,
      },
      {
        name: "dududududu",
        text: "Perfekt für Spaziergänge im Regen!",
        stars: "5",
        image: null,
      },
    ],
  },

  {
    id: "2",
    image: require("../../assets/images/hoodie.webp"),
    title: "Grauer Hoodie",
    types: ["Kleidung", "Hoodies"],
    price: 59,
    stars: "★★★★☆",
    reviews: 357,
    description: "Grössen: XS, S, M, XL, XXL\nStoff: Baumwolle",
    userReviews: [
      {
        name: "Max Mustermann",
        text: "Tolles Produkt, sehr zufrieden!",
        stars: "5",
        image: null,
      },
      {
        name: "Anna Schmidt",
        text: "Gut, aber es gibt Raum für Verbesserungen.",
        stars: "4",
        image: null,
      },
      {
        name: "Fashion92",
        text: "Sehr bequem und sieht schick aus!",
        stars: "5",
        image: null,
      },
      {
        name: "nichtSoLecker",
        text: "Nach ein paar Waschgängen etwas eingegangen, sonst gut.",
        stars: "3",
        image: null,
      },
      {
        name: "modePro36",
        text: "Top Qualität, ich habe ihn direkt in mehreren Farben bestellt.",
        stars: "5",
        image: null,
      },
    ],
  },

  {
    id: "3",
    image: require("../../assets/images/skelett.jpg"),
    title: "Timberbone Skelett",
    types: ["Kostüm", "Dekorationen"],
    price: 40,
    stars: "★★★★✩",
    reviews: 7,
    description: "Skelett nach Abbild des berühmten Youtubers 'Timberbone'",
    userReviews: [
      {
        name: "SkelettFan33",
        text: "Super lustig für Halloween, alle waren begeistert!",
        stars: "5",
        image: null,
      },
      {
        name: "DarkSoul999",
        text: "Ganz okay, aber nicht so stabil wie erwartet.",
        stars: "3",
        image: null,
      },
      {
        name: "Timberbone",
        text: "Omg, wie kuul!",
        stars: "5",
        image: null,
      },
    ],
  },
  {
    id: "4",
    image: require("../../assets/images/natel.jpg"),
    title: "Samsung Galaxy A55",
    types: ["Smartphone"],
    price: 321,
    stars: "★★★★☆",
    reviews: 408,
    description: '256 GB, Grau, 6.6", 5G, 50 Mpx',
    userReviews: [
      {
        name: "TechGuru89",
        text: "Top Smartphone für den Preis. Kamera ist klasse!",
        stars: "5",
        image: null,
      },
      {
        name: "SandyTech",
        text: "Ganz gut, aber manchmal hängt die Software.",
        stars: "4",
        image: null,
      },
      {
        name: "PeterW",
        text: "Akku hält super lange! Bin zufrieden.",
        stars: "5",
        image: null,
      },
    ],
  },
  {
    id: "5",
    image: require("../../assets/images/mystery-book.jpg"),
    title: "Mysteriöses Buch",
    types: ["Bücher"],
    price: 642,
    stars: "★★★★★",
    reviews: 0,
    description: "Mysteriöses Buch, unbekannte Herkunft",
    userReviews: [],
  },
  {
    id: "6",
    image: require("../../assets/images/Zelda-dnd.webp"),
    title: "Zelda D&D-Würfel",
    types: ["D&D"],
    price: 69,
    stars: "★★★★☆",
    reviews: 1100,
    description: "Würfel-Set, Grün mit Triforce",
    userReviews: [
      {
        name: "DungeonMaster3000",
        text: "Diese Würfel sind ein Muss für jeden Zelda- und D&D-Fan!",
        stars: "5",
        image: null,
      },
      {
        name: "CriticalFail",
        text: "Schöne Optik, aber die Würfel sind nicht ganz ausgewogen.",
        stars: "3",
        image: null,
      },
      {
        name: "RadioMarco",
        text: "habe keine Ahnung, für was die sind, aber sind cool",
        stars: "5",
        image: null,
      },
    ],
  },
];

const MainPage = () => {
  const navigation = useNavigation();
  const { searchQuery } = useSearch(); 


  useEffect(() => {
    initializeReviews();
  }, []);

  const initializeReviews = async () => {
    try {
      for (let product of data) {
        const storedReviews = await AsyncStorage.getItem(`reviews_${product.id}`);
        let existingReviews = storedReviews ? JSON.parse(storedReviews) : [];
  
        const updatedReviews = [...existingReviews, ...product.userReviews.filter(
          (newReview) => !existingReviews.some((existingReview) =>
            existingReview.name === newReview.name &&
            existingReview.text === newReview.text
          )
        )];
  
        // Save the merged reviews back to AsyncStorage
        await AsyncStorage.setItem(`reviews_${product.id}`, JSON.stringify(updatedReviews));
      }
    } catch (error) {
      console.error("Error initializing reviews in AsyncStorage:", error);
    }
  };

  const handlePress = (item) => {
    navigation.navigate('ProductDetails', { item });
  };

  const filteredData = data.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.types.some(type => type.toLowerCase().includes(searchQuery.toLowerCase())) 
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
