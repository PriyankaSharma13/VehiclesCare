import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AuthenticationBtn from '../components/common/Button';
import {useNavigation} from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();

  const handleSignUp = () => {
    (navigation as any).navigate('Auth', {screen: 'Register'});
  };

  const handleLogin = () => {
    (navigation as any).navigate('Auth', {screen: 'Login'});
  };
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/welcome.png')} />
      <AuthenticationBtn onPress={handleLogin} title={'I have an account'} />
      <AuthenticationBtn onPress={handleSignUp} title={'Sign Up'} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  img: {
    width: 200,
    height: 170,
    resizeMode: 'stretch',
  },
});

export default Welcome;
