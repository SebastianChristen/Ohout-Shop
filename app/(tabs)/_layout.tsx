import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useNavigation } from '@react-navigation/native'; // Importiere den Navigation Hook

export default function TaskList() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

 
  const handlePress = () => {
    navigation.navigate('LoginPage');
    console.log("es geit irgendwie nid")
  };


  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };


  const handleSearchSubmit = () => {
    console.log("Suchanfrage:", searchQuery);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Gelb: Logo */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/Ohout Logo.png")}
            style={styles.image}
          />
        </View>

        {/* Blau: Suchleiste */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            value={searchQuery}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSearchSubmit}
            placeholder="Suche"
          />
        </View>

          {/* Grün: Login Button */}
          <Button
            title="Login"
            onPress={handlePress}
            style={styles.loginButton}
          />

         {/* Rot: Warenkorb Icon */}
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="cart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tabs Component */}
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "code-slash" : "code-slash-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120},
  header: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "white",
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
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
    borderColor: "#ccc",
  },
  loginButton: {
    marginRight: 10,
    width: 90,
  },
  iconContainer: {
    padding: 10,
  },
});
