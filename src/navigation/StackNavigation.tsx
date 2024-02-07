import React from 'react';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotScreen from '../screens/ForgotScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {TabNavigator} from './TabNavigation';
import VehiclesOverview from '../screens/VehiclesOverview';
import InsuranceForm from '../screens/InsuranceForm';
import VehiclesFormScreen from '../screens/VehiclesFormScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="resetPassword"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="HomeScreen" component={TabNavigator} options={{headerShown: false}}/>
      <Stack.Screen
        name="VehiclesScreen"
        component={TabNavigator}
  
      />
      <Stack.Screen
        name="VehiclesOverview"
        component={VehiclesOverview}
  
      />
      <Stack.Screen
        name="InsuranceForm"
        component={InsuranceForm}
  
      />
      <Stack.Screen
        name="VehiclesForm"
        component={VehiclesFormScreen}
  
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
