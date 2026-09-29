import colors from "../config/colors";

export const getColorTheme = (theme) => {
    return colors[theme]
}

export const getAllThemes = () => {
    const themeNames = ['green', 'lightgreen', 'purple', 'black', 'white', 'coral', 'mediteranean', 'hey']
    let result = [];
    themeNames.forEach((name) => {
        result.push(colors[name]);
    })
    return result;
}
