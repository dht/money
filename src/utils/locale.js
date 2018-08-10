const getQS = () => {
    return document.location.search
        .slice(1)
        .split("&")
        .map(p => p.split("="))
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
};

export const qsToLocaleParams = () => {
    const qs = getQS() || {},
        i = qs["i"];

    switch (i) {
        case "iw":
            return { locale: "he", isRTL: true };
        default:
            return { locale: "en", isRTL: false };
    }
};
