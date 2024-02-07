import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  vehicleNumber: Yup.string().required('Vehicle Reg. No is required'),
  mobileNumber: Yup.string()
    .required('Mobile Number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
});

const InsuranceForm = () => {
  const handleSubmit = (values: {
    vehicleNumber: string;
    mobileNumber: string;
  }) => {
    console.log('Form submitted with values:', values);
  };
  
  return (
    <View style={styles.container}>
       <Image source={require('../assets/img.jpg')} style={styles.img} />
      <Formik
        initialValues={{
          vehicleNumber: '',
          mobileNumber: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Text style={styles.label}>Enter Vehicle Registration Number :</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Reg No."
              value={values.vehicleNumber}
              onChangeText={handleChange('vehicleNumber')}
              onBlur={handleBlur('vehicleNumber')}
            />
            {touched.vehicleNumber && errors.vehicleNumber && (
              <Text style={styles.errorText}>{errors.vehicleNumber}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              value={values.mobileNumber}
              onChangeText={handleChange('mobileNumber')}
              onBlur={handleBlur('mobileNumber')}
              keyboardType="numeric"
            />
            {touched.mobileNumber && errors.mobileNumber && (
              <Text style={styles.errorText}>{errors.mobileNumber}</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Generate OTP</Text>
            </TouchableOpacity>
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
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  img:{
   width:"100%",
   height:300
  },
  label:{
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom:15
  },
  input: {
    height: 50,
    width:"80%",
    borderRadius: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 18,
  },
  button: {
    backgroundColor: '#FF681F',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '80%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 14,
    fontSize: 18,
    alignSelf:"flex-start",
    marginLeft:50
  },
});

export default InsuranceForm;
