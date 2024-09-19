// components/StudentRegistration.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

export default function StudentRegistration() {
  const [fullName, setFullName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [branch, setBranch] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async () => {
    try {

      console.log('Attempting to send request to:', 'http://127.0.0.1:5000/submit_details');
        console.log('Request payload:', {
          name: fullName,
          roll_no: rollNo,
          year: currentYear,
          branch: branch,
        });

      const response = await axios.post('http://127.0.0.1:5000/submit_details', {
        name: fullName,
        roll_no: rollNo,
        year: currentYear,
        branch: branch,
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
        Student Registration
      </Animatable.Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={rollNo}
        onChangeText={setRollNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Current Year"
        value={currentYear}
        onChangeText={setCurrentYear}
      />
      <TextInput
        style={styles.input}
        placeholder="Branch"
        value={branch}
        onChangeText={setBranch}
      />
      <Animatable.View animation="zoomIn" duration={1000}>
        <Button title="Submit" onPress={handleSubmit} />
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
