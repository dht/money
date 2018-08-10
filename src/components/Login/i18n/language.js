import en from "./en";
import he from "./he";
import hi from "./hi";
import de from "./de";
import fr from "./fr";
import es from "./es";
import it from "./it";
import nl from "./nl";
import uk from "./en-gb";
import ch from "./zn-cn";

const all = {
    en,
    de,
    "en-gb": uk,
    es,
    fr,
    he,
    hi,
    it,
    nl,
    "zn-cn": ch
};

const defaultLanguage = "en";
const rtlLanguages = ["he"];

let i18n, isRTL;

const clear = () => {
    setLanguage(defaultLanguage);
};

const checkRTL = language => {
    return rtlLanguages.indexOf(language) >= 0;
};

export const setLanguage = key => {
    if (all[key]) {
        i18n = all[key];
        isRTL = checkRTL(key);
    }
};

export const getLanguage = () => {
    return i18n || all[defaultLanguage];
};

export const getIsRTL = () => {
    return isRTL;
};

clear();
