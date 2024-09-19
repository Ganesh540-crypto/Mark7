import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

export default function StudentRegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [branch, setBranch] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async () => {
    try {
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
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.formContainer}>
          <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.header}>
            Student Registration
          </Animatable.Text>
          <Animatable.View animation="fadeInUp" delay={500}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#a0a0a0"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Roll Number"
              placeholderTextColor="#a0a0a0"
              value={rollNo}
              onChangeText={setRollNo}
            />
            <TextInput
              style={styles.input}
              placeholder="Current Year"
              placeholderTextColor="#a0a0a0"
              value={currentYear}
              onChangeText={setCurrentYear}
            />
            <TextInput
              style={styles.input}
              placeholder="Branch"
              placeholderTextColor="#a0a0a0"
              value={branch}
              onChangeText={setBranch}
            />
          </Animatable.View>
          <Animatable.View animation="bounceIn" delay={1500}>
            <Button title="Submit" onPress={handleSubmit} color="#1e90ff" />
          </Animatable.View>
          <Animatable.Text style={styles.message} animation="fadeIn" duration={1500}>
            {responseMessage}
          </Animatable.Text>
          <Animatable.View animation="fadeInUp" delay={2000}>
            <Button
              title="Go to Attendance"
              onPress={() => navigation.navigate('Attendance')}
              color="#32cd32"
            />
          </Animatable.View>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: 'white',
    width: 300,
  },
  message: {
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
  },
});