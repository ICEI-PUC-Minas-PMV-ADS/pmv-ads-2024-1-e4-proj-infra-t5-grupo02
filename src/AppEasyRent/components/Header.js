import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image 
        source={require('../assets/icon.png')} 
        style={styles.icon} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    width: '100%',
    backgroundColor: 'rgb(251, 251, 243)',
    justifyContent: 'left',
    alignItems: 'left',
    flexDirection: 'row',
  },
  icon:{
    width: 50,
    height: 50,
    marginLeft: 20,
    marginTop: 10,   
  },
});
