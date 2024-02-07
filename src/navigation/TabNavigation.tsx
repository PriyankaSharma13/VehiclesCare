import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingsScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomSideBar';
import VehiclesScreen from '../screens/VehiclesScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const ProfileDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Profile" component={HomeScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
  
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#FF681F',
        tabBarStyle: {
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ProfileDrawerNavigator}
        options={{
          tabBarIcon: () => (
            <Ionicons name="home" color={"#FF681F"} size={25} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="car" color={"#FF681F"} size={25} />
          ),
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="settings-sharp" color={"#FF681F"} size={25} />
          ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileDrawerNavigator}
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-circle" color="#FF681F" size={25} />
          ),
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
  );
};
export {ProfileDrawerNavigator, TabNavigator };
