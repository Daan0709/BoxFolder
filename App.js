import { NavigationContainer } from '@react-navigation/native'

import Navigator from "./app/routes/HomeStack";

export default function App() {
  return (
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
  );
}
