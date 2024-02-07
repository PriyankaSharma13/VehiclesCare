import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';



const CustomDrawerContent = ({ navigation }:any) => {
  const [displayName, setDisplayName] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {

        setDisplayName(user.displayName || '');
      }
    };

    fetchUserData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/car1.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileText}>{displayName}</Text>
      </View>

      <DrawerContentScrollView>
      
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home"  color={"#FF681F"}  size={25} />
          <Text style={styles.drawerItemText}>Profile</Text>
        </TouchableOpacity>
        

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-sharp"  color={"#FF681F"} size={25} />
          <Text style={styles.drawerItemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="exit" color={"#FF681F"} size={25} />
          <Text style={styles.drawerItemText} >Sign Out</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  headerContainer: {
    padding: 15,
    height:150,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF681F',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  profileText: {
    color: '#FFF',
    fontSize: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    // borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  drawerItemText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 18,
  },
});

export default CustomDrawerContent;
