import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotScreen = ({navigation}:any ) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = (values: { email: string }) => {
    console.log('Form submitted with values:', values);
    navigation.navigate('resetPassword');
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  return (
  <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={handleResetPassword}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Forgot your Password?</Text>
          <Text style={styles.titleParagraph}>Confirm your email, and we'll send the instructions.</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={{ color: 'red', fontSize: 16, marginTop: 4 }}>{errors.email}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.button}  onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Backbutton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.BackbuttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
 
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF681F',
    marginBottom:15
  },
  titleParagraph:{
    fontSize: 18,
    color: 'gray',
    marginBottom:25,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 18,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#FF681F',
    borderRadius: 25,
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
  },
  signUpTextContainer: {
    flexDirection: 'row',
    marginTop: 18,
  },
  signUpLink: {
    color: '#FF681F',
    fontWeight: 'bold',
  },
  Backbutton:{
    // alignSelf:"flex-start"
  },
  BackbuttonText:{
    color: '#FF681F',
    fontSize: 16,
    fontWeight: '400',
    padding:10
  },
});

export default ForgotScreen;
