
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
    title: string;
    onPress: () => void;

  }
  
  const AuthenticationBtn: React.FC<ButtonProps> = ({ title, onPress}) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
  

const styles = StyleSheet.create({
  btn: {
    backgroundColor:'#FF681F',
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  text: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },

});
export default AuthenticationBtn;