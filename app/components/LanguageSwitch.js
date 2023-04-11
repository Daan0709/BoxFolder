import React, {useState} from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import colors from "../config/colors";

function LanguageSwitch({ language, setLanguageHandler, opacity }) {

    const [clicked, setClicked] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(language);

    const uk = '🇬🇧 '
    const nl = '🇳🇱 '

    function setLanguage(lang){
        setCurrentLanguage(lang);
        if (lang === '🇳🇱 '){
            setLanguageHandler('nl');
        } else if (lang === '🇬🇧 '){
            setLanguageHandler('uk');
        }
        setClicked(false);
    };

    function languageClickHandler(){
        setClicked(true);
    };

    return (
        <View style={[styles.switchContainer, {opacity: opacity}]}>
            {
                clicked ?
                    <View style={styles.clickedContainer}>
                        <View style={styles.flagsContainer}>
                            <TouchableOpacity onPress={() => setLanguage(uk)}>
                                <Text style={styles.bigFlag}>{uk}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setLanguage(nl)}>
                                <Text style={styles.bigFlag}>{nl}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    :
                    <TouchableWithoutFeedback onPress={languageClickHandler}>
                        <Text style={styles.flagStyling}>{currentLanguage}</Text>
                    </TouchableWithoutFeedback>
            }
        </View>

    );
}

const styles = StyleSheet.create({
    bigFlag: {
        fontSize: 50,
    },
    clickedContainer: {
        position: "absolute",
        opacity: 0.85,
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: colors.Primary,
        top: -StatusBar.currentHeight,
        right: -15,
    },
    flagsContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    switchContainer: {
        position: "absolute",
        top: StatusBar.currentHeight,
        right: 15,
    },
    flagStyling: {
        fontSize: 30,
        padding: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: colors.Secondary,
        textAlign: "center"
    }
})

export default LanguageSwitch;
