import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import GameScreen from "../screens/GameScreen";
import HelpScreen from "../screens/HelpScreen";
import ResponsibilityScreen from "../screens/ResponsibilityScreen";

const Stack = createNativeStackNavigator();

function HomeStack(){
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="ResponsibilityScreen" component={ResponsibilityScreen}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="CategoryScreen" component={CategoryScreen}/>
            <Stack.Screen name="GameScreen" component={GameScreen}/>
            <Stack.Screen name="HelpScreen" component={HelpScreen}/>
        </Stack.Navigator>
    )
}

export default HomeStack;
