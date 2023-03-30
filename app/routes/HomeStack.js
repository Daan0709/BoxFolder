import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import GameScreen from "../screens/GameScreen";

const Stack = createNativeStackNavigator();

function HomeStack(){
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="CategoryScreen" component={CategoryScreen}/>
            <Stack.Screen name="GameScreen" component={GameScreen}/>
        </Stack.Navigator>
    )
}

export default HomeStack;
