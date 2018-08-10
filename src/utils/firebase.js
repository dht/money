import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDEDmGYBP8wCf_NQ-14Nq96YoLKWLabOu8",
    authDomain: "plat-9790a.firebaseapp.com",
    databaseURL: "https://plat-9790a.firebaseio.com",
    projectId: "plat-9790a",
    storageBucket: "plat-9790a.appspot.com",
    messagingSenderId: "118620774901"
};

const mainApp = firebase.initializeApp(config),
    allBoardsRef = mainApp.database().ref("buckets"),
    permissionsRef = mainApp.database().ref("permissions");

let boardRef,
    adhocRef,
    currentIndexRef,
    dataRef,
    adhocDataRef,
    categoriesRef,
    budgetsRef,
    plannedBudgetsRef,
    // lineMappingRef,
    adhocAutoCompleteRef,
    projectsRef;

export const initBoard = boardKey => {
    boardRef = allBoardsRef.child(boardKey);
    currentIndexRef = boardRef.child("currentIndexes");
    dataRef = boardRef.child("data");
    adhocRef = boardRef.child("adhoc");
    adhocDataRef = adhocRef.child("data");
    adhocAutoCompleteRef = adhocRef.child("autoComplete");
    categoriesRef = boardRef.child("categories");
    budgetsRef = boardRef.child("budgets");
    plannedBudgetsRef = boardRef.child("plannedBudgets");
    // lineMappingRef = boardRef.child("lineMapping");
    projectsRef = boardRef.child("projects");
};

const timestamp = () => new Date().getTime();

const getRef = ref => {
    return new Promise(resolve => {
        ref.once("value", function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const getBoard = () => {
    return getRef(boardRef);
};

export const getAdHoc = () => {
    // console.log('adhocRef.ref.toString()', adhocRef.ref.toString());
    return getRef(adhocRef);
};

export const addAdhoc = data => {
    const ref = adhocDataRef.push(),
        key = ref.key;

    let newData = { ...data };

    newData.id = key;
    newData.ts = timestamp();

    return ref.set(newData).then(() => {
        return { key };
    });
};

export const updateAdhoc = (id, data) => {
    const ref = adhocDataRef.child(id);
    return ref.update(data);
};

export const removeAdhoc = id => {
    const ref = adhocDataRef.child(id);
    return ref.remove();
};

export const addAdhocAutoComplete = data => {
    const ref = adhocAutoCompleteRef.push(),
        key = ref.key;

    data.id = key;

    return ref.set(data).then(() => {
        return { key };
    });
};

export const removeAdhocAutoComplete = id => {
    const ref = adhocAutoCompleteRef.child(id);
    return ref.remove();
};

export const clearAdhoc = () => {
    return adhocDataRef.remove();
};

export const clearAdhocAutoComplete = () => {
    return adhocAutoCompleteRef.remove();
};

export const setAdhocStartTime = time => {
    const ref = adhocRef.child("startTime");

    return ref.set(time);
};

export const setAdhocCurrentIndex = currentIndex => {
    const ref = adhocRef.child("currentIndex");
    return ref.set(currentIndex);
};

export const addData = data => {
    const ref = dataRef.push(),
        key = ref.key;

    let newData = { ...data };

    newData.id = key;
    newData.ts = timestamp();

    return ref
        .set(newData)
        .then(() => {
            return addChangeLog(key, newData);
        })
        .then(keyChangeLog => {
            return { key, keyChangeLog };
        });
};

export const addChangeLog = (id, data) => {
    const changesRef = dataRef.child(id).child("changes");
    let newData = { ...data };

    const ref = changesRef.push(),
        key = ref.key;

    newData.id = key;
    newData.ts = timestamp();

    return ref.set(newData).then(() => key);
};

export const updateData = (id, data, noChangeLog) => {
    const ref = dataRef.child(id);

    if (noChangeLog) {
        return ref.update(data);
    }

    return ref
        .update(data)
        .then(() => {
            return addChangeLog(id, data);
        })
        .then(keyChangeLog => {
            return { keyChangeLog };
        });
};

export const removeData = id => {
    const ref = dataRef.child(id);
    return ref.remove();
};

export const addCategory = data => {
    const ref = categoriesRef.push(),
        key = ref.key;

    let newData = { ...data };

    newData.id = key;
    newData.ts = timestamp();

    return ref.set(newData).then(() => {
        return { key };
    });
};

export const updateCategory = (id, data) => {
    const ref = categoriesRef.child(id);

    return ref.update(data);
};

export const removeCategory = id => {
    const ref = categoriesRef.child(id);
    return ref.remove();
};

export const addCategoryName = (id, data) => {
    const ref = categoriesRef
            .child(id)
            .child("names")
            .push(),
        key = ref.key;

    let newData = { ...data };

    newData.id = key;
    newData.ts = timestamp();

    return ref.set(newData).then(() => {
        return { key };
    });
};

export const createPermissions = (boardId, userId) => {
    const ref = permissionsRef.child(boardId);
    return ref.set({ owner: userId });
};

export const setBoardMode = (boardId, mode) => {
    const ref = allBoardsRef.child(boardId);
    return ref.set({ mode: mode });
};

export const createBoard = (boardId, userId, mode) => {
    return createPermissions(boardId, userId).then(() => {
        return setBoardMode(boardId, mode);
    });
};

export const removeCategoryName = (id, nameId) => {
    const ref = categoriesRef
        .child(id)
        .child("names")
        .child(nameId);
    return ref.remove();
};

export const saveCurrentIndex = (week, index) => {
    return currentIndexRef.child(week).set(index);
};

export const saveBudget = budget => {
    return budgetsRef.update(budget);
};

export const savePlannedBudget = (period, categoryId, value) => {
    return plannedBudgetsRef
        .child(period)
        .child(categoryId)
        .set(value);
};

export const createUser = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
};
export const currentUser = () => {
    return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(user => {
            resolve(user);
        });
    });
};

export const checkPermissions = () => {
    return budgetsRef.child("check").update({ ok: true });
};

export const addProject = data => {
    const ref = projectsRef.push(),
        key = ref.key;

    let newData = { ...data };

    newData.id = key;
    newData.ts = timestamp();

    return ref.set(newData).then(() => {
        return { key };
    });
};

export const updateProject = (id, data) => {
    const ref = projectsRef.child(id);
    return ref.update(data);
};

export const removeProject = id => {
    const ref = projectsRef.child(id);
    return ref.remove();
};

export const setProjectLine = (id, week, value) => {
    const ref = projectsRef
        .child(id)
        .child("lines")
        .child(week);
    return ref.set(value);
};
