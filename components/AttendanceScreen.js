import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Platform, PermissionsAndroid, ScrollView } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

export default function AttendanceScreen() {
  const [studentId, setStudentId] = useState('');
  const [ssid, setSsid] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location to get WiFi information",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getWifiSSID = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        throw new Error('Location permission denied');
      }
      const ssid = await NetworkInfo.getSSID();
      if (ssid === null) {
        throw new Error('Unable to get SSID. If you\'re using an iOS simulator, this is expected behavior.');
      }
      return ssid;
    } catch (error) {
      console.error('Error getting SSID:', error);
      throw error;
    }
  };

  const handleCheckIn = async () => {
    try {
      setResponseMessage('Checking in...');
      const ssid = await getWifiSSID();
      setSsid(ssid);

      const response = await axios.post('http://127.0.0.1:5000/mark_attendance', {
        student_id: studentId,
        wifi_name: ssid,
      });

      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred: ' + error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      setResponseMessage('Checking out...');
      const response = await axios.post('http://127.0.0.1:5000/checkout', {
        student_id: studentId,
      });

      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.formContainer}>
          <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.header}>
            Attendance
          </Animatable.Text>
          <Animatable.View animation="fadeInUp" delay={500}>
            <TextInput
              style={styles.input}
              placeholder="Student ID"
              placeholderTextColor="#a0a0a0"
              value={studentId}
              onChangeText={setStudentId}
            />
          </Animatable.View>
          <Animatable.View animation="bounceIn" delay={1000} style={styles.buttonContainer}>
            <Button title="Check In" onPress={handleCheckIn} color="#1e90ff" />
            <View style={styles.buttonSpacer} />
            <Button title="Check Out" onPress={handleCheckout} color="#ff4500" />
          </Animatable.View>
          <Animatable.Text style={styles.message} animation="fadeIn" duration={1500}>
            {responseMessage}
          </Animatable.Text>
          {ssid && (
            <Animatable.Text style={styles.ssid} animation="fadeIn" duration={1500}>
              Connected to: {ssid}
            </Animatable.Text>
          )}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonSpacer: {
    width: 16,
  },
  message: {
    marginTop: 16,
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
  },
  ssid: {
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
  },
});