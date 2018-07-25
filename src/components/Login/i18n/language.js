import en from './en';
import he from './he';

const all = {
    en,
    he,
}

const defaultLanguage = 'he';
const rtlLanguages = ['he'];

let i18n, isRTL;

const clear = () => {
    setLanguage(defaultLanguage)
}

const checkRTL = (language) => {
    return rtlLanguages.indexOf(language) >= 0;
}

export const setLanguage = (key) => {
    if (all[key]) {
        i18n = all[key];
        isRTL = checkRTL(key);
    }
}

export const getLanguage = () => {
    return i18n || all[defaultLanguage];
}

export const getIsRTL = () => {
    return isRTL;
}

clear();