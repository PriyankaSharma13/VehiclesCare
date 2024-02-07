import {StyleSheet, View, Image, Text} from 'react-native';

const VehiclesOverview = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/car1.png')} style={styles.img} />

      <View style={styles.centerContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.carName}>Maruti Brezza 2022</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.carAmount}>Rs.10.00 Lakh</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.label}>Fuel Type:</Text>
            <Text style={styles.carAmount}>Diesel</Text>
          </View>
        </View>

        <View style={styles.infoBrands}>
          <View style={styles.carBrands}>
            <Text style={styles.BrandTitle}>Select your Card Brand:</Text>

            <View style={styles.brandContent}>
              <Image
                source={require('../assets/mazda-logo.png')}
                style={styles.logo}
              />
              <Text style={styles.carBrand}>Mazda</Text>
            </View>
            <View style={styles.brandContent}>
              <Image
                source={require('../assets/honda-logo.png')}
                style={styles.logo}
              />
              <Text style={styles.carBrand}>Honda</Text>
            </View>
            <View style={styles.brandContent}>
              <Image
                source={require('../assets/Kia-logo.png')}
                style={styles.logo}
              />
              <Text style={styles.carBrand}>Kia</Text>
            </View>
            <View style={styles.brandContent}>
              <Image
                source={require('../assets/jeep-logo.png')}
                style={styles.logo}
              />
               <Text style={styles.carBrand}>Jeep</Text>
            </View>
           
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // padding: 12,
  },
  img: {
    width: '100%',
    height: 180,
  },
  centerContainer: {
    padding: 8,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 2,
    elevation: 2,
    borderColor: '#ECECEC',
    borderWidth: 2,
    padding: 10,
  },
  carName: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginRight: 10,
  },
  carAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8C8C8C',
  },
  infoBrands: {
    marginTop: 7,
  },
  carBrands: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 2,
    elevation: 2,
    borderColor: '#ECECEC',
    borderWidth: 2,
    padding: 10,
  },
  brandContent: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  BrandTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  carBrand: {
    fontSize: 18,
    color: '#333333',
    marginTop: 8,
      
  },
  logo: {
    height: 80,
    width: '30%',
    marginRight:8  
  },
});

export default VehiclesOverview;
