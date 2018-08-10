const DATA_KEY = "CACHED_DATA";

export const saveStorageData = (bucket, data) => {
    localStorage.setItem(DATA_KEY + "_" + bucket, JSON.stringify(data));
};

export const getStorageData = bucket => {
    let output;

    try {
        output =
            JSON.parse(localStorage.getItem(DATA_KEY + "_" + bucket)) || {};
    } catch (e) {
        output = {};
    }

    return output;
};

export const getStorageKey = (key, defaultValue) => {
    let output;

    output = localStorage.getItem(key);

    return output !== null ? output : defaultValue;
};

export const getStorageBool = (key, defaultValue) => {
    let output;

    output = localStorage.getItem(key);

    return output !== null ? output === "true" : defaultValue;
};
