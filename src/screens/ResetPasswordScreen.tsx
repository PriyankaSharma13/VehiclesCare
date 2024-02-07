import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';


const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(9, 'Password must be at least 9 characters')
    .matches(/[a-z]/, 'Password must contain lowercase letters')
    .matches(/[A-Z]/, 'Password must contain uppercase letters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ResetPasswordScreen = ({ navigation }: any) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    navigation.navigate('Welcome', { screen: 'WelcomeScreen' });
  };
  
  

  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleResetPassword}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <Text style={styles.title}>Reset Password</Text>
          <View style={styles.container}>
            <Text style={styles.titleParagraph}>
              At least 9 characters, with uppercase and lowercase letters.
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={{ color: 'red', fontSize: 16, marginBottom: 10 }}>
                  {errors.password}
                </Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={{ color: 'red', fontSize: 16, marginBottom: 10 }}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Backbutton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.BackbuttonText}>Back</Text>
          </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
 
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF681F',
    marginBottom: 15,
    padding:20
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  titleParagraph:{
    fontSize: 18,
    color: 'gray',
    marginBottom:30,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF681F',
    borderRadius: 25,
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
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

export default ResetPasswordScreen;
