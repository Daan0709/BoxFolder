import { NavigationContainer } from '@react-navigation/native'


import Navigator from "./app/routes/HomeStack";
import colors from "./app/config/colors";

export default function App() {
    return (
        <NavigationContainer style={{backgroundColor: colors.Primary}}>
            <Navigator style={{backgroundColor: colors.Primary}}/>
        </NavigationContainer>
    );
}
