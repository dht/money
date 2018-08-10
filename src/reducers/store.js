import { applyMiddleware, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";

import autosave from "../middlewares/autosave";

import app from "./index";

let store = createStore(
    app,
    compose(
        applyMiddleware(ReduxThunk, autosave),
        window && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;
