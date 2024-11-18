import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useNavigation } from "@react-navigation/native";
import { useSearch } from "./SearchContext";

export default function TaskList() {
  const { searchQuery, setSearchQuery } = useSearch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem("user");
      setIsLoggedIn(!!user);
    };
    checkLoginStatus();
  }, []);

  const handleCartPress = () => {
    navigation.navigate('shoppingcart');
  };

  const handleLogoPress = () => {
    navigation.navigate('');
  };

  const router = useRouter(); 

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = () => {
    console.log("Suchanfrage:", searchQuery);
  };

  const loginHandler = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      Alert.alert("Abgemeldet", "Du wurdest erfolgreich abgemeldet.");
    } else {
      router.push("/loginPage");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Logo */}
        <TouchableOpacity onPress={handleLogoPress}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/Ohout Logo.png")}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>

        {/* Suchleiste */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder="Suche"
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            { backgroundColor: "blue", padding: 10, borderRadius: 8 },
          ]}
          onPress={loginHandler}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            {isLoggedIn ? "Logout" : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Warenkorb Icon */}
        <TouchableOpacity style={styles.iconContainer} onPress={handleCartPress}>
          <Ionicons name="cart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tabs Component */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // This hides the tabs
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
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
  },
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
