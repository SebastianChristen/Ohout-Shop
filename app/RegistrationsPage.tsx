import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  const isValidEmail = (email: string) => {
    return email.includes('@');
  };

  const backToHome = () => {
    navigation.navigate("index");
  }

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
      const existingUser = await AsyncStorage.getItem('user');
      if (existingUser) {
        setErrorMessage('Benutzer bereits registriert!');
        return;
      }

      const user = { email, password };
      await AsyncStorage.setItem('user', JSON.stringify(user));

      Alert.alert('Erfolg', 'Registrierung abgeschlossen!');
      router.push('index');
    } catch (error) {
      console.error(error);
      setErrorMessage('Fehler beim Speichern der Daten');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrierung</Text>

      {/* Fehlernachricht */}
      {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}

      {/* Falsche eingabe */}
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

      {/* Registrieren Button */}
      <Button title="Registrieren" onPress={handleRegister} />

      {/* Zurück zur Login Page */}
      <Text style={styles.registerText}>
        Schon registriert?{' '}
        <Button
          style={styles.registerLink}
          onPress={backToHome}
        >
          Anmelden
        </Button>
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

export default RegistrationPage;
