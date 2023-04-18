import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Octicons, AntDesign } from '@expo/vector-icons';

import {translateText} from "../services/LanguageService";
import {useFonts} from "expo-font";
import {LinearGradient} from "expo-linear-gradient";

function ThemeSwitch({ currentTheme, swapThemeHandler, language, allThemes }) {

    const [clicked, setClicked] = useState(false);
    const [loaded] = useFonts({
        Sono_ExtraLight: require('../assets/fonts/Sono-ExtraLight.ttf'),
        Sono_Bold: require('../assets/fonts/Sono-Bold.ttf'),
        Sono_ExtraBold: require('../assets/fonts/Sono-ExtraBold.ttf'),
        Sono_Light: require('../assets/fonts/Sono-Light.ttf'),
        Sono_Medium: require('../assets/fonts/Sono-Medium.ttf'),
        Sono_Regular: require('../assets/fonts/Sono-Regular.ttf'),
        Sono_SemiBold: require('../assets/fonts/Sono-SemiBold.ttf'),
    })
    const [themes] = useState(allThemes);

    function swapTheme(theme){
        swapThemeHandler(theme);
        setClicked(false);
    }

    function themeClickHandler(){
        setClicked(!clicked);
    }

    if(!loaded){
        return null;
    }

    return (
        <View style={styles.themeSwitch}>
            {clicked ?
                <View style={styles.themeSwitch}>
                    <TouchableOpacity onPress={themeClickHandler} style={[styles.button]}>
                        <Octicons name="paintbrush" size={24} color={currentTheme.textColor} />
                        <Text style={[styles.extraLightText, {color: currentTheme.textColor}]}>{translateText(language, "HomeScreen", "theme-button")}</Text>
                    </TouchableOpacity>
                    <AntDesign style={styles.caret} name="caretdown" size={24} color={currentTheme.Primary} />
                    <View style={[styles.themesContainer, {backgroundColor: currentTheme.Primary}]}>
                        <View style={styles.themesRow}>
                            {themes.filter(theme => theme.index < 4).map((theme) => {
                                return (
                                        <TouchableOpacity style={{borderColor: currentTheme.textColor, borderWidth: 2}}
                                                          onPress={() => swapTheme(theme)} key={theme.index}>
                                            <LinearGradient colors={[theme.Primary, theme.Secondary, theme.Tertiary]}
                                                            start={{x: 1, y: 0}} end={{x: 0, y: 1}}
                                                            style={styles.themeButton}/>
                                        </TouchableOpacity>
                                    )
                            })}
                        </View>
                        <View style={styles.themesRow}>
                            {themes.filter(theme => theme.index >= 4 && theme.index < 8).map((theme) => {
                                return (
                                    <TouchableOpacity style={{borderColor: currentTheme.textColor, borderWidth: 2}}
                                                      onPress={() => swapTheme(theme)} key={theme.index}>
                                        <LinearGradient colors={[theme.Primary, theme.Secondary, theme.Tertiary]}
                                                        start={{x: 1, y: 0}} end={{x: 0, y: 1}}
                                                        style={styles.themeButton}/>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </View>

                :
                <TouchableOpacity onPress={themeClickHandler} style={[styles.button]}>
                    <Octicons name="paintbrush" size={24} color={currentTheme.textColor} />
                    <Text style={[styles.extraLightText, {color: currentTheme.textColor}]}>{translateText(language, "HomeScreen", "theme-button")}</Text>
                </TouchableOpacity>
            }
        </View>

    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        justifyContent: "center",
        flexDirection: "row"
    },
    caret: {
        position: "absolute",
        bottom: 25,
        opacity: 0.85
    },
    extraLightText: {
        padding: 4,
        fontSize: 15,
        fontFamily: 'Sono-ExtraLight'
    },
    themeButton: {
        height: 40,
        width: 40,
    },
    themesContainer: {
        position: 'absolute',
        opacity: 0.95,
        borderRadius: 15,
        height: 200,
        width: Dimensions.get('screen').width - 20,
        bottom: 40,
        justifyContent: "center",
        alignItems: "center",
        rowGap: 10,
    },
    themesRow: {
        opacity: 1,
        flexDirection: "row",
        columnGap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    themeSwitch: {
        justifyContent: "center",
        alignItems: "center"
    },
})

export default ThemeSwitch;
