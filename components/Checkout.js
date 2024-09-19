// components/Checkout.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

export default function Checkout() {
  const [studentId, setStudentId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/checkout', {
        student_id: studentId,
      });

      setResponseMessage(response.data.message);

    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred.');
    }
  };

  return (
    <Animatable.View style={styles.container} animation="fadeInUp" duration={1000}>
      <Animatable.Text style={styles.header} animation="bounceIn" duration={1500}>
        Attendance Check-Out
      </Animatable.Text>
      <TextInput
        style={styles.input}
        placeholder="Student ID"
        value={studentId}
        onChangeText={setStudentId}
      />
      <Animatable.View animation="zoomIn" duration={1000}>
        <Button title="Check Out" onPress={handleCheckout} />
      </Animatable.View>
      <Animatable.Text style={styles.message} animation="fadeIn" duration={1500}>
        {responseMessage}
      </Animatable.Text>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  message: {
    marginTop: 16,
    textAlign: 'center',
    color: 'green',
  },
});
