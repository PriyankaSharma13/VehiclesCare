import {
  Image,
  StyleSheet,
  TextInput,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import {data} from '../components/data';
import Warning from '../components/Warning';
import Error from '../components/Error';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// interface Location {
//   longitude: string;
//   latitude: string;
// }

const HomeScreen = () => {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
  const [warnings, setWarnings] = useState<string[]>([
    'Your pollution is expiring on 20-02-2024',
  ]);
  const [errors, setErrors] = useState<string[]>(['Your pollution is expired']);

  const handleProfilePicClick = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleFormPress = () => {
    navigation.navigate("InsuranceForm" as never);
  };

  const handleCrossIconClick = () => {
    const updatedWarnings = [...warnings];
    updatedWarnings.shift();
    setWarnings(updatedWarnings);
  };

  const handleRemoveCross = () => {
    const updatedErrors = [...errors];
    updatedErrors.shift();
    setErrors(updatedErrors);
  };

  // const fetchAddressFromCoordinates = async (latitude: any, longitude: any) => {
  //   try {
  //     const apiKey = 'AIzaSyAv3KpYRhrlM0i92xtAJwHMdrlS8jWZPjU';
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
  //     );
  //     console.log(response, 'response322');

  //     if (response.data.results.length > 0) {
  //       const address = response.data.results[0].formatted_address;
  //       setCurrentAddress(address);
  //     } else {
  //       console.log('No address found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching address:', error);
  //   }
  // };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        setDisplayName(user.displayName || '');
      }
    };

    const checkLocationPermission = async () => {
      try {
        const locationPermissionStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (locationPermissionStatus === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              // console.log(latitude, longitude,'test');
              
              setCurrentLocation({latitude, longitude});
              // fetchAddressFromCoordinates(latitude, longitude);
            },
            error => {
              console.log('Error getting current location:', error);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else if (locationPermissionStatus === RESULTS.BLOCKED) {
          console.log(
            'Location permission is blocked. Please enable it in your device settings.',
          );
        } else {
          const requestResult = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (requestResult === RESULTS.GRANTED) {
            fetchUserData();
          } else {
            console.log('Location permission not granted.');
          }
        }
      } catch (error) {
        console.log('Error handling location permission:', error);
      }
    };

    checkLocationPermission();
    fetchUserData();
  }, []);


  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleProfilePicClick}>
          <Image
            source={require('../assets/car1.png')}
            style={styles.profilePic}
          />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}> {displayName}</Text>
          {currentLocation && (
            <Text style={styles.locationText}>
              <Ionicons
                name="location-sharp"
                size={15}
                color="#000000"
                style={styles.searchIcon}
              />
              <Text style={{marginLeft: 5}}>
                {currentLocation.latitude}, {currentLocation.longitude}
              </Text>
            </Text>
          )}
        </View>
      </View>

      {/* --------------------warning----------- */}
      {warnings.map((message, index) => (
        <Warning key={index} message={message} onClose={handleCrossIconClick} />
      ))}
      {/* -----------error----------- */}
      {errors.map((message, index) => (
        <Error key={index} message={message} onRemove={handleRemoveCross} />
      ))}
      {/* ---------------Search section------ */}
      <View style={styles.searchContainer}>
        <Icons
          name="search"
          size={20}
          color="#000000"
          style={styles.searchIcon}
        />
        <TextInput style={styles.inputBox} placeholder="Search Service...." />
      </View>
      {/* ---------------content section------ */}
      <View>
        <ImageBackground
          style={styles.image}
          source={require('../assets/car1.png')}>
          <View style={styles.overlayContainer}>
            <Text style={styles.overlayText1}>30%</Text>
            <Text style={styles.overlayText2}>off on car</Text>
            <Text style={styles.overlayText2}>Services</Text>
          </View>
          <TouchableOpacity style={styles.overlayButton}>
            <Text style={styles.buttonText}>View Offer</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* ---------------Services------------ */}
      <View style={styles.MainServicesContainer}>
        <View style={styles.ServicesContainer}>
          <Text style={styles.ServicesText}>Services</Text>
          <Ionicons name="settings-sharp" color={'#FF681F'} size={25} />
        </View>

        <View style={styles.ServicesContent}>
          <View style={styles.serviceItem1}>
            <Ionicons name="search" color={'#FF681F'} size={30} />
            <Text style={styles.serviceName1}>Search RC</Text>
          </View>
          <TouchableOpacity style={styles.serviceItem1} onPress={handleFormPress}>
            <Ionicon name="safety-check" color={'#FF681F'} size={30} />
            <Text style={styles.serviceName1}>Check Insurance</Text>
          </TouchableOpacity>
          <View style={styles.serviceItem1}>
            <Ionicons name="car" color={'#FF681F'} size={30} />
            <Text style={styles.serviceName1}>Car Insurance</Text>
          </View>
        </View>
      </View>
      {/* ----------Our Top--------- */}
      <View>
        <View>
          <View style={styles.ServicesContainer}>
            <Text style={styles.ServicesText}>Our Top Services</Text>
            <Text style={styles.SeeAll}>See All</Text>
          </View>
        </View>
        {/* -------map in array-------- */}
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.serviceItem}>
              <Image source={item.image} style={styles.serviceImage} />
              <Text style={styles.serviceName}>{item.name}</Text>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: '#000000',
  },
  headerTextContainer: {
    flexDirection: 'column',
    marginLeft: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  locationText: {
    fontSize: 15,
    color: '#888888',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D8E2F0',
    borderRadius: 18,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 10,
  },
  inputBox: {
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
    marginVertical: 10,
  },
  overlayContainer: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
  overlayText1: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  overlayText2: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  overlayButton: {
    position: 'absolute',
    bottom: 15,
    left: 10,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  MainServicesContainer: {
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 2,
    elevation: 2,
    borderColor: '#ECECEC',
    borderWidth: 1,
    padding: 10,
  },
  ServicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  ServicesText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  SeeAll: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
  },
  serviceItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  ServicesContent: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  serviceName: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
  },
  serviceItem1: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  serviceName1: {
    fontSize: 14,
    color: '#333333',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;
