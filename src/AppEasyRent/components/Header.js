import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 170,
    width: '100%',
    /*backgroundColor: 'rgb(251, 251, 243)',*/
    backgroundColor: "red",
    justifyContent: 'left',
    alignItems: 'left',
    flexDirection: 'row',
  },
  icon:{
    width: 50,
    height: 350,
    marginLeft: 20,
    marginTop: 10,   
  },
});
