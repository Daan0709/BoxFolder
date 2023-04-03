import { NavigationContainer } from '@react-navigation/native'
import * as SystemUI from 'expo-system-ui';


import Navigator from "./app/routes/HomeStack";
import colors from "./app/config/colors";

export default function App() {
    SystemUI.setBackgroundColorAsync(colors.Primary);   // Prevents the screen flashing white when switching screens (Android only)
    return (
        <NavigationContainer style={{backgroundColor: colors.Primary}}>
            <Navigator style={{backgroundColor: colors.Primary}}/>
        </NavigationContainer>
    );
}
