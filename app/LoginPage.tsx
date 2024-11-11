import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Überprüft, ob die E-Mail-Adresse gültig ist
  const isValidEmail = (email) => {
    return email.includes('@'); // Überprüft, ob ein '@' enthalten ist
  };

  // Registrierung des Benutzers
  const handleRegister = async () => {
    if (email === '' || password === '') {
      setErrorMessage('Bitte fülle alle Felder aus!');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein!');
      return;
    }

    try {
      const user = { email, password };
      await AsyncStorage.setItem('user', JSON.stringify(user)); // Speichere die Benutzerdaten
      Alert.alert('Erfolg', 'Registrierung abgeschlossen!');
      navigation.navigate('Home'); // Navigiere nach erfolgreicher Registrierung
    } catch (error) {
      console.error(error);
      setErrorMessage('Fehler beim Speichern der Daten');
    }
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
      const user = await AsyncStorage.getItem('user'); // Hole die gespeicherten Benutzerdaten

      if (user === null) {
        setErrorMessage('Keine Benutzerdaten gefunden. Bitte registriere dich zuerst.');
        return;
      }

      const parsedUser = JSON.parse(user); // JSON.parse ist wichtig, um die Daten als Objekt zu erhalten

      if (parsedUser && parsedUser.email === email && parsedUser.password === password) {
        navigation.navigate('Home'); // Erfolgreich eingeloggt
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

      {/* Registrieren Button */}
      <Button title="Registrieren" onPress={handleRegister} />

      {/* Alternative Registrierungsmöglichkeit */}
      <Text style={styles.registerText}>
        Schon registriert?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('LoginPage')}>
          Anmelden
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
