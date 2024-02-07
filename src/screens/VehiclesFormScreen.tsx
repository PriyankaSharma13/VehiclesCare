import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  vehicleBrands,
  vehicleCategories,
  vehicleModels,
  vehicleFuelType,
  vehicleVariants,
} from '../components/data';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';


// const validationSchema = Yup.object().shape({
//   vehicleCategory: Yup.string().required('Vehicle Category is required'),
//   vehicleNumber: Yup.string().required('Vehicle Number is required'),
//   brand: Yup.string().required('Brand is required'),
//   model: Yup.string().required('Model is required'),
//   variant: Yup.string().required('Variant is required'),
//   fuelType: Yup.string().required('Fuel Type is required'),
// });

const VehiclesFormScreen = () => {
  const [selectCategory, setSelectCategory] = useState<{
    title: string;
    id: string;
  } | null>(null);
  const [selected, setSelected] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<{
    title: string;
    id: string;
  } | null>(null);
  const [selectedModel, setSelectedModel] = useState<{
    title: string;
    id: string;
  } | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<{
    title: string;
    id: string;
  } | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<{
    title: string;
    id: string;
  } | null>(null);
  const [show, setShow] = useState(false);
  const [polutionExpirationDate, setPollutionExpirationDate] = useState<Date>(
    new Date(),
  );
  const [insuranceExpirationDate, setInsuranceExpirationDate] = useState<Date>(
    new Date(),
  );
  const [serviceDueDate, setServiceDueDate] = useState<Date>(new Date());
  const [selectedImage, setSelectedImage] = useState(null);


  // -----------------Image------------------
  // const openImagePicker = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     includeBase64: false,
  //     maxHeight: 2000,
  //     maxWidth: 2000,
  //   };

  //   launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('Image picker error: ', response.error);
  //     } else {
  //       let imageUri = response.uri || response.assets?.[0]?.uri;
  //       setSelectedImage(imageUri);
  //     }
  //   });
  // };
  // --------------------DatePicker---------------

  const showMode = (currentMode: 'date' | 'time', dateType: string) => {
    setShow(true);
    DateTimePickerAndroid.open({
      value: polutionExpirationDate,
      onChange: (event: any, selectedDate: any) => {
        setShow(false);
        if (selectedDate !== undefined) {
          if (dateType === 'polutionExpirationDate') {
            setPollutionExpirationDate(selectedDate as Date);
          } else if (dateType === 'insuranceExpirationDate') {
            setInsuranceExpirationDate(selectedDate as Date);
          } else if (dateType === 'serviceDueDate') {
            setServiceDueDate(selectedDate as Date);
          }
        }
      },
      mode: currentMode,
      is24Hour: true,
      maximumDate: new Date(),
    });
  };
  const showPollutionExpiration = () => {
    showMode('date', 'polutionExpirationDate');
  };
  const showInsuranceExpiration = () => {
    showMode('date', 'insuranceExpirationDate');
  };

  const showServiceDueDate = () => {
    showMode('date', 'serviceDueDate');
  };
        
  // ------------------submitForm-------------

  const handleSubmitForm = async (values: any) => {
    try {
      await firestore()
        .collection('vehicles')
        .add({
          vehicleCategory: selectCategory?.title || '',
          vehicleNumber: values.vehicleNumber,
          brand: selectedBrand?.title || '',
          model: selectedModel?.title || '',
          variant: selectedVariant?.title || '',
          fuelType: selectedFuel?.title || '',
          polutionExpirationDate: polutionExpirationDate?.toISOString(),
          insuranceExpirationDate: insuranceExpirationDate?.toISOString(),
          serviceDueDate: serviceDueDate?.toISOString(),
        });

      Alert.alert(
        'Success',
        'Form data submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Error submitting form data:', error);
      Alert.alert('Error', 'An error occurred while submitting the form.');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          vehicleCategory: '',
          vehicleNumber: '',
          brand: '',
          model: '',
          variant: '',
          fuelType: '',
          vehicleImage:""
        }}
        // validationSchema={validationSchema}
        onSubmit={handleSubmitForm}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.inputContainer}>
            <Dropdown
              data={vehicleCategories}
              value={selectCategory}
              onChange={(value) => setSelectCategory(value)}
              labelField="title"
              valueField="id"
              style={styles.input}
              placeholder="Vehicle Categories"
            />
            {touched.vehicleCategory && errors.vehicleCategory && (
              <Text style={styles.errorText}>{errors.vehicleCategory}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Vehicle Number"
              onChangeText={handleChange('vehicleNumber')}
              onBlur={handleBlur('vehicleNumber')}
              value={values.vehicleNumber}
            />
            {touched.vehicleNumber && errors.vehicleNumber && (
              <Text style={styles.errorText}>{errors.vehicleNumber}</Text>
            )}

            <Dropdown
              data={vehicleBrands}
              value={selectedBrand}
              onChange={(value) => setSelectedBrand(value)}
              labelField="title"
              valueField="id"
              style={styles.input}
              placeholder="Vehicle Brands"
            />
            {touched.brand && errors.brand && (
              <Text style={styles.errorText}>{errors.brand}</Text>
            )}

            <Dropdown
              data={vehicleModels}
              value={selectedModel}
              onChange={(value) => setSelectedModel(value)}
              labelField="title"
              valueField="id"
              style={styles.input}
              placeholder="Vehicle Models"
            />
            {touched.model && errors.model && (
              <Text style={styles.errorText}>{errors.model}</Text>
            )}

            <Dropdown
              data={vehicleVariants}
              value={selectedVariant}
              onChange={(value) => setSelectedVariant(value)}
              labelField="title"
              valueField="id"
              style={styles.input}
              placeholder="Vehicle Variants"
            />
            {touched.variant && errors.variant && (
              <Text style={styles.errorText}>{errors.variant}</Text>
            )}

            <Dropdown
              data={vehicleFuelType}
              value={selectedFuel}
              onChange={(value) => setSelectedFuel(value)}
              labelField="title"
              valueField="id"
              style={styles.input}
              placeholder="Vehicle FuelType"
            />
            {touched.fuelType && errors.fuelType && (
              <Text style={styles.errorText}>{errors.fuelType}</Text>
            )}

            {/* <TouchableOpacity onPress={openImagePicker} style={styles.datePicker}>
              <Text>Choose from Device</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={showPollutionExpiration}
              style={styles.datePicker}>
              <Text>{polutionExpirationDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showInsuranceExpiration}
              style={styles.datePicker}>
              <Text>{insuranceExpirationDate.toLocaleDateString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={showServiceDueDate}
              style={styles.datePicker}>
              <Text>{serviceDueDate.toLocaleDateString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
  },

  input: {
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    fontSize: 16,
  },

  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  datePicker: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FF681F',
    borderRadius: 25,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default VehiclesFormScreen;

