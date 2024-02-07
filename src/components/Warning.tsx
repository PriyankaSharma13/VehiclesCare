import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Entypo"

interface WarningProps {
  message: string;
  onClose?: () => void;
}

const Warning: React.FC<WarningProps> = ({message,onClose}) => {
  return (
    <View style={styles.warningContainer}>
     <View style={styles.warningTextContainer}>
        <Text style={styles.warningText}>{message}</Text>
        {onClose && (
          <TouchableOpacity onPress={onClose}>
            <Icon name="cross" color={'#FF681F'} size={20} style={styles.crossIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  warningContainer: {
    backgroundColor: 'yellow',
    padding: 8,
    margin: 5,
    borderRadius: 8,
  },
  warningTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  warningText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  crossIcon: {
    marginLeft: 10,
    marginBottom:10
  },
});

export default Warning;
