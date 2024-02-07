import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from './src/screens/WelcomeScreen';
import {TabNavigator} from './src/navigation/TabNavigation';
import StackNavigator from './src/navigation/StackNavigation';

const Stack = createStackNavigator();

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={StackNavigator}
          options={{headerShown: false}}
        />
        {userLoggedIn ? <TabNavigator /> : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
