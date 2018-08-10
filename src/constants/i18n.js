import en from "./i18n/en";
import de from "./i18n/de";
import uk from "./i18n/en-gb";
import es from "./i18n/es";
import fr from "./i18n/fr";
import he from "./i18n/he";
import hi from "./i18n/hi";
import it from "./i18n/it";
import nl from "./i18n/nl";
import ch from "./i18n/zn-cn";
import moment from "moment";

export default {
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

moment.updateLocale("en", {
    longDateFormat: {
        L: "MMMM Do"
    }
});

moment.updateLocale("he", {
    longDateFormat: {
        L: "D לMMMM"
    }
});
