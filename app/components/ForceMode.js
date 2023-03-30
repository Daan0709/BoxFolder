import React from 'react';
import {View} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";

function ForceMode({ mode }) {
    useFocusEffect(() => {
        ScreenOrientation.lockAsync(mode); // Lock screen to a certain mode (portrait or landscape
    });

    return (
        <View/>
    );
}

export default ForceMode;
