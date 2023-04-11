import {nl} from "../assets/languages/nl";
import {uk} from "../assets/languages/uk"

export const translateText = (language, component, id) => {
    const location = component.localName;
    if (language === "uk") return uk()[component][id];
    if (language === "nl") return nl()[component][id];
}
