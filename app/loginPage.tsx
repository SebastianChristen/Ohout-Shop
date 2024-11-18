import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const router = useRouter();

  // Überprüft, ob die E-Mail-Adresse gültig ist
  const isValidEmail = (email) => {
    return email.includes('@');
  };
  
  const loginHandler = () => {
    router.push("RegistrationsPage");
  };

  // Login des Benutzers
  const handleLogin = async () => {
    if (email === '' || password === '') {
      setErrorMessage('Bitte fülle alle Felder aus!');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein!');
      return;
    }

    try {
      const user = await AsyncStorage.getItem('user');

      if (user === null) {
        setErrorMessage('Keine Benutzerdaten gefunden. Bitte registriere dich zuerst.');
        return;
      }

      const parsedUser = JSON.parse(user);

      if (parsedUser && parsedUser.email === email && parsedUser.password === password) {
        router.push("")
      } else {
        setErrorMessage('Ungültige Anmeldedaten!');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Fehler beim Abrufen der Daten');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Fehlernachricht */}
      {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}

      {/* Eingabefelder */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Passwort"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <Button title="Login" onPress={handleLogin} />

      {/* Registrierung Button */}
      <Button title="Jetzt registrieren" onPress={loginHandler} />


      {/* zweite Registration */}
      <Text style={styles.registerText}>
        Noch keinen Account?{' '}
        <Text style={styles.registerLink} onPress={loginHandler}>
          Registrieren
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
  },
  registerLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
