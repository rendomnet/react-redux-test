import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    lobby: reducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(sagas);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
