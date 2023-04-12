import React, {useState} from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import colors from "../config/colors";

function LanguageSwitch({ language, setLanguageHandler }) {

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
        <View style={styles.switchContainer}>
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
        alignItems: "center",
        justifyContent: "center",
    },
    flagsContainer: {
        flexDirection: "row",
    },
    switchContainer: {
        position: "absolute",
        width: "100%",
    },
    flagStyling: {
        fontSize: 30,
        textAlign: "center"
    }
})

export default LanguageSwitch;
