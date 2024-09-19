import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StudentRegistrationScreen from './components/StudentRegistrationScreen';
import AttendanceScreen from './components/AttendanceScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StudentRegistration">
          <Stack.Screen 
            name="StudentRegistration" 
            component={StudentRegistrationScreen} 
            options={{ title: 'Student Registration' }}
          />
          <Stack.Screen 
            name="Attendance" 
            component={AttendanceScreen} 
            options={{ title: 'Attendance' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}