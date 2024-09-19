import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Platform, PermissionsAndroid, Alert } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

export default function MarkAttendance() {
  const [studentId, setStudentId] = useState('');
  const [ssid, setSsid] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return true; // iOS handles permissions through Info.plist
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
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert(
          "Location Permission Denied",
          "You need to grant location permission to use this feature. You can enable it in the app settings.",
          [
            { text: "OK", onPress: () => console.log("Permission denied") }
          ]
        );
        return false;
      }
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

      console.log('Attempting to send request to:', 'http://127.0.0.1:5000/mark_attendance');
      console.log('Request payload:', {
        student_id: studentId,
        wifi_name: ssid,
      });

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

  return (
    <Animatable.View style={styles.container} animation="fadeInUp" duration={1000}>
      <Animatable.Text style={styles.header} animation="bounceIn" duration={1500}>
        Attendance Check-In
      </Animatable.Text>
      <TextInput
        style={styles.input}
        placeholder="Student ID"
        value={studentId}
        onChangeText={setStudentId}
      />
      <Animatable.View animation="zoomIn" duration={1000}>
        <Button title="Check In" onPress={handleCheckIn} />
      </Animatable.View>
      <Animatable.Text style={styles.message} animation="fadeIn" duration={1500}>
        {responseMessage}
      </Animatable.Text>
      {ssid && <Text style={styles.ssid}>Connected to: {ssid}</Text>}
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
  ssid: {
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
