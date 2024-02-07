import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Auth} from '../services';
import {Formik} from 'formik';
import * as Yup from 'yup';

type InputStyle =
  | {
      borderColor: string;
    }
  | false;

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = ({navigation}: any) => {

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    if (!email || !password) {
      Alert.alert('Enter email and password');
    } else {
      try {
        const user = await Auth.loginUser(email, password);
        console.log('User signed in successfully!', user);

        navigation.navigate('HomeScreen', user);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={handleLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={[
                styles.input,
                (touched.email &&
                  errors.email && {borderColor: 'red'}) as InputStyle,
              ]}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text
              style={styles.forgot}
              onPress={() => navigation.navigate('forgotPassword')}>
              Forgot Password?
            </Text>

            <View style={styles.signUpTextContainer}>
              <Text>Don't have an account? </Text>
              <Text
                style={styles.signUpLink}
                onPress={() => navigation.navigate('Register')}>
                Sign Up
              </Text>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF681F',
    marginBottom: 25,
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 14,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 20,
  },
  inputWithError: {
    borderColor: 'red',
  },
  errorText: {
    color:"red",
   marginBottom: 10,
   alignSelf:"flex-start",
   fontSize: 16,
    marginLeft: 50,
  },
  button: {
    backgroundColor: '#FF681F',
    borderRadius: 8,
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  forgot: {
    marginTop: 20,
    color: '#FF681F',
    fontWeight: 'bold',
  },
  signUpTextContainer: {
    flexDirection: 'row',
    marginTop: 18,
  },
  signUpLink: {
    color: '#FF681F',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
