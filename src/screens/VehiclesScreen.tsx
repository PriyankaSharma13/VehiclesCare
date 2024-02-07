import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const VehiclesScreen = ({navigation}: any) => {
  
  const handleVehiclePress = () => {
    navigation.navigate('VehiclesOverview');
  };

  const handleSubmit = () => {
    navigation.navigate('VehiclesForm');
  };
  return (
    <ScrollView style={styles.maincontainer}>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>Add New Vehicles</Text>
      </TouchableOpacity>
      <View style={styles.vehicleContainer}>
        <TouchableOpacity style={styles.Container} onPress={handleVehiclePress}>
          <Image source={require('../assets/car1.png')} style={styles.img} />
          <Text style={styles.vehicleName}>Maruti Brezza</Text>
          <Text style={styles.vehiclePrice}>Rs.7.99 - 11.70 Lakh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Container} onPress={handleVehiclePress}>
          <Image source={require('../assets/bike.jpg')} style={styles.img} />
          <Text style={styles.vehicleName}>Honda Hornet 2.0</Text>
          <Text style={styles.vehiclePrice}>Rs.1.40 Lakh</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.vehicleContainer}>
        <TouchableOpacity style={styles.Container} onPress={handleVehiclePress}>
          <Image source={require('../assets/bike.jpg')} style={styles.img} />
          <Text style={styles.vehicleName}>Honda Hornet 2.0</Text>
          <Text style={styles.vehiclePrice}>Rs.1.40 Lakh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Container} onPress={handleVehiclePress}>
          <Image source={require('../assets/car1.png')} style={styles.img} />
          <Text style={styles.vehicleName}>Maruti Brezza</Text>
          <Text style={styles.vehiclePrice}>Rs.7.99 - 11.70 Lakh</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.vehicleContainer}>
        <TouchableOpacity style={styles.Container} onPress={handleVehiclePress}>
          <Image source={require('../assets/car1.png')} style={styles.img} />
          <Text style={styles.vehicleName}>Maruti Brezza</Text>
          <Text style={styles.vehiclePrice}>Rs.7.99-11.70 Lakh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Container} onPress={handleVehiclePress}>
          <Image source={require('../assets/bike.jpg')} style={styles.img} />
          <Text style={styles.vehicleName}>Honda Hornet 2.0</Text>
          <Text style={styles.vehiclePrice}>Rs.1.40 Lakh</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 10,
  },
  vehicleContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    backgroundColor: '#FF681F',
    paddingVertical: 10,
    width: '50%',
    marginBottom:10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  Container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowRadius: 2,
    elevation: 2,
  },
  img: {
    width: 160,
    height: 170,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 8,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    // padding: 8,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
});

export default VehiclesScreen;
