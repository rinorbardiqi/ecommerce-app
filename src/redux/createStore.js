import { createStore, applyMiddleware } from "redux";
import createSagaMiddle from "redux-saga";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddle();
export const middlewares = [sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export const presistor = persistStore(store);

export default { store, presistor };
