import { setStatusBarBackgroundColor,StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform } from "react-native";

const SignIn = () => {
  setStatusBarBackgroundColor('#3361FF',false);
  return (
      <View style={styles.container} >
          <Text>Tela de Login</Text>
          <StatusBar style="light" translucent={false}/>
      </View>
      
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 13,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  imageView: {
    flex: 1
  },
  imageStyle: {
    flex: 1,
    ... Platform.select({
      android: {
        resizeMode:'contain'
      },
      ios:{
        resizeMode:'contain'
      },
      default:{
        resizeMode: 'cover'
      }
    }),
  },
});

export default SignIn;
