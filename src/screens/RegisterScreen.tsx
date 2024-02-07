import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Auth} from '../services';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {Formik} from 'formik';
import * as yup from 'yup';

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  // dateOfBirth: yup.date().max(
  //     new Date((new Date().setFullYear(new Date().getFullYear() - 18))),
  //     'Must be at least 18 years old',
  //   )
  //   .required('Date of Birth is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [date, setDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 18)),);

  const [show, setShow] = useState(false);
  

  const handleRegister = async (values: FormValues) => {
    const { username, email, password, confirmPassword, dateOfBirth } = values;
    if (password !== confirmPassword) {
      return;
    }
    try {
      await Auth.registerUser(username, email, password, dateOfBirth);
      navigation.navigate('Login');
    } catch (error: any) {
      error('Error during registration', error.message);
    }
  };
  const onChange = (_event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      maximumDate: new Date(
      new Date().setFullYear(new Date().getFullYear() - 18))
    });
  };
  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          dateOfBirth: new Date(
            new Date().setFullYear(new Date().getFullYear() - 18),
          ),
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}>
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
              style={styles.input}
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TouchableOpacity
              onPress={showDatepicker}
              style={styles.datePicker}>
              <Text>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {touched.dateOfBirth && errors.dateOfBirth && (
              <Text style={styles.errorText}>{String(errors.dateOfBirth)}</Text>
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

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View style={styles.signInTextContainer}>
        <Text>Already have an account? </Text>
        <Text
          style={styles.signInLink}
          onPress={() => navigation.navigate('Login')}>
          Sign In
        </Text>
      </View>
    </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF681F',
    marginBottom: 25,
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 18,
    borderRadius: 8,
    fontSize:16,
    marginBottom:15
  },
  datePicker: {
    width: '80%',
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    padding: 10,
  },
  button: {
    backgroundColor: '#FF681F',
    borderRadius: 8,
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },

  signInTextContainer: {
    flexDirection: 'row',
    marginTop: 18,
  },
 
  errorText:{
 color:"red",
 marginBottom: 14,
 alignSelf:"flex-start",
 fontSize: 16,
 marginLeft: 50,

  },
  signInLink: {
    color: '#FF681F',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
