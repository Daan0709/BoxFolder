import { StatusBar } from 'expo-status-bar';
import {Platform, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import Navigator from "./app/routes/HomeStack";

export default function App() {
  return (
      <NavigationContainer>
        <Navigator style={styles.container}/>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
