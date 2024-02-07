import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {VehiclesInfo} from '../components/data';

const SettingScreen = () => {
  const [items, setItems] = useState(VehiclesInfo);

  const handleDelete = (id: any) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const onAddPress = (id: any) => {};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vehicles Screen</Text>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Sr no</Text>
          {/* <Text style={styles.headerText}>Brand</Text> */}
          <Text style={styles.headerText}>Car No</Text>
          <Text style={styles.headerText}>Category</Text>
          <Text style={styles.headerText}>Image</Text>
          <Text style={styles.headerText}>Action</Text>
        </View>
        <FlatList
        data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.row}>
              <Text style={styles.srNoText}>{item.srNo}</Text>
              <Text style={styles.carNoText}>{item.carNo}</Text>
              <Text style={styles.categoryText}>{item.Category}</Text>
              <Image source={item.image} style={styles.image} />
              <View style={styles.actionButton}>
                <TouchableOpacity onPress={() => onAddPress(item.id)}>
                  <View style={styles.addButton}>
                    <Text style={styles.buttonText}>Add</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <View style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff', 
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  table: {
    marginTop: 10,
    shadowColor: '#000',
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  srNoText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  carNoText: {
    color: 'black',
    fontSize: 15,
  },
  categoryText: {
    color: 'black',
    fontSize: 15,
  },
  image: {
    width: 60,
    height: 50,
    alignItems: 'center',

  },
  actionButton: {
    flexDirection: 'column',
    marginTop: 5,
    gap:5
  },
  addButton: {
    backgroundColor: 'green',
    padding: 3,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 4,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default SettingScreen