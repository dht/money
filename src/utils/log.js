const  DEBUG = true; // Enable logging

export const log = function () {
    if (DEBUG) {
        console.log.apply(console, arguments);
    }
}