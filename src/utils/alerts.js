import vex from "vex-js";

export const prompt = ({ message, value, callback, yesText }) => {
    const options = { message, value, callback };

    if (yesText) {
        options.yesText = yesText;
    }

    vex.dialog.prompt(options);

    focusOnInput();
};

export const alert = (message, yesText) => {
    const options = {
        message
    };

    if (yesText) {
        options.yesText = yesText;
    }

    vex.dialog.alert(options);
};

export const confirm = (message, callback, yesText) => {
    const options = {
        message,
        callback: value => {
            if (value === false) return;

            callback(value);
        }
    };

    if (yesText) {
        options.yesText = yesText;
    }

    vex.dialog.confirm(options);
};

const focusOnInput = () => {
    const element = document.querySelector(".vex-dialog-prompt-input");

    if (element) {
        setTimeout(() => {
            element.focus();
            element.select();
            element.autocomplete = "off";
            element.style.border = "1px solid #333";
        }, 10);
    }
};

export default {
    prompt,
    alert,
    confirm
};
