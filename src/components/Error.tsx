import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Entypo"

interface ErrorProps {
  message: string;
  onRemove?: () => void;
}

const Error : React.FC<ErrorProps> = ({message,onRemove}) => {
  return (
    <View style={styles.errorContainer}>
       
      <View style={styles.errorTextContainer}>
      <Text style={styles.errorText}>{message}</Text>
       {onRemove && (
         <TouchableOpacity onPress={onRemove}>
           <Icon name="cross" color={'black'} size={20} style={styles.crossIcon} />
         </TouchableOpacity>
       )}
     </View>
   
    
 
    </View>
    
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    margin: 8,
    borderRadius: 8,
  },
  errorTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  crossIcon: {
    marginLeft: 10,
    marginBottom:10
  },
});

export default Error;