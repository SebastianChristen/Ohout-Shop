import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';

const PaymentPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePayment = () => {
    if (name && address && phone && selectedPayment) {
      Alert.alert('Erfolgreich gekauft', 'Vielen Dank für deinen Einkauf!');
    } else {
      Alert.alert('Fehler', 'Bitte fülle alle Felder aus.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Vor/Nachname"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefonnummer"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Rabatt Code"
        value={discountCode}
        onChangeText={setDiscountCode}
      />

      <Text style={styles.paymentTitle}>Zahlungsmethoden</Text>
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            selectedPayment === 'Kreditkarte' && styles.selectedPayment,
          ]}
          onPress={() => setSelectedPayment('Kreditkarte')}
        >
          <Image
            style={styles.icon}
            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/credit-card.png' }}
          />
          <Text>Kreditkarte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            selectedPayment === 'Klarna' && styles.selectedPayment,
          ]}
          onPress={() => setSelectedPayment('Klarna')}
        >
          <Image
            style={styles.icon}
            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/money-transfer.png' }}
          />
          <Text>Klarna</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            selectedPayment === 'PayPal' && styles.selectedPayment,
          ]}
          onPress={() => setSelectedPayment('PayPal')}
        >
          <Image
            style={styles.icon}
            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/paypal.png' }}
          />
          <Text>PayPal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            selectedPayment === 'Apple Pay' && styles.selectedPayment,
          ]}
          onPress={() => setSelectedPayment('Apple Pay')}
        >
          <Image
            style={styles.icon}
            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/apple-pay.png' }}
          />
          <Text>Apple Pay</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
        <Text style={styles.confirmButtonText}>Zahlung bestätigen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentButton: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '22%',
  },
  selectedPayment: {
    borderColor: '#007BFF',
    backgroundColor: '#E0F7FF',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentPage;
