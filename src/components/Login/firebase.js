import firebase from 'firebase';
import * as i18n from "./i18n/language";

export const createUser = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export const login = (email, password, persistence) => {
    return setPersistance(persistence)
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        })
}

export const logout = () => {
    return firebase.auth().signOut();
}

export const resetPassword = (email) => {
    return firebase.auth().sendPasswordResetEmail(email)
}

export const setPersistance = (persistence = 'LOCAL') => {
    return firebase.auth().setPersistence(stringToPersistance(persistence))
}

// for future redirects (if already logged in)
export const currentUser = () => {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
            resolve(user);
        });
    })
}

export const locale = (language) => {
    i18n.setLanguage(language);
}

export const init = (credentials, language) => {
    locale(language);

    if (credentials) {
        return firebase.initializeApp(credentials);
    }
}

const stringToPersistance = (persistence = 'LOCAL') => {
    switch (persistence) {
        case 'LOCAL':
            return firebase.auth.Auth.Persistence.LOCAL;
        case 'SESSION':
            return firebase.auth.Auth.Persistence.SESSION;
        case 'NONE':
            return firebase.auth.Auth.Persistence.NONE;
    }
}