import { select, put, takeEvery } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";
import { GameItemData, LobbyState } from "../../types";

import { getLobby } from "./selector";

function insertAndShift(
  arr: GameItemData[],
  from: number,
  to: number
): GameItemData[] {
  if (to < 0 || to > arr.length) return arr;
  let cutOut = arr.splice(from, 1)[0];
  arr.splice(to, 0, cutOut);
  return arr;
}

export interface MovePayload {
  from: number;
  to: number;
}

export function* addLobby(action: PayloadAction) {
  try {
    console.log("addLobby in", action);
    const lobby = select(getLobby);
    console.log("lobby", lobby);
    return;
  } catch (error) {
    yield put({
      type: "ERROR",
      payload: { error, type: action.type },
    });
  }
}

export function* right(action: PayloadAction<MovePayload>) {
  try {
    console.log("right in", action);
    const lobby: LobbyState = yield select(getLobby);
    let changed = insertAndShift(
      [...lobby.list],
      action.payload.from,
      action.payload.to
    );
    yield put({ type: "lobby/listSet", payload: changed });
  } catch (error) {
    yield put({
      type: "ERROR",
      payload: { error, type: action.type },
    });
  }
}

export function* del(action: PayloadAction<{ index: number }>) {
  try {
    console.log("right in", action);
    const lobby: LobbyState = yield select(getLobby);

    let list = [...lobby.list];
    list.splice(action.payload.index, 1);

    yield put({ type: "lobby/listSet", payload: list });
  } catch (error) {
    yield put({
      type: "ERROR",
      payload: { error, type: action.type },
    });
  }
}
function getId() {
  return (Math.random() + 1).toString(36).substring(7);
}

export function* add(action: PayloadAction) {
  try {
    console.log("add");
    const lobby: LobbyState = yield select(getLobby);
    let list = [...lobby.list];
    let id = getId();

    let ids = list.map((item) => item.id);
    while (ids.includes(id)) {
      id = getId();
    }

    list.unshift({
      title: `${list.length + 1} New game`,
      id: id,
    });

    yield put({ type: "lobby/listSet", payload: list });
  } catch (error) {
    yield put({
      type: "ERROR",
      payload: { error, type: action.type },
    });
  }
}

const sagas = [
  takeEvery("SAGA_ADD_LOBBY", addLobby),
  takeEvery("SAGA_GAME_MOVE", right),
  takeEvery("SAGA_DEL", del),
  takeEvery("SAGA_ADD", add),
];

export default sagas;
