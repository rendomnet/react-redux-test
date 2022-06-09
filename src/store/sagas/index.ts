import { all } from "redux-saga/effects";
import lobby from "./lobby.saga";

export default function* rootSaga() {
  yield all([...lobby]);
}
