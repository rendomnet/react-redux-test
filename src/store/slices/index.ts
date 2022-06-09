import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameItemData, LobbyState } from "../../types";

const initialState: LobbyState = {
  editing: false,
  list: [
    { title: "1Poker", id: "poker-1" },
    { title: "2 Tetris", id: "tetris-2" },
    { title: "3 Jack", id: "jack-3" },
    { title: "4 Poker", id: "poker-4" },
    { title: "5 Tetris", id: "tetris-5" },
    { title: "6 Jack", id: "jack-6" },
  ],
};

export const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    listSet: (state, action: PayloadAction<GameItemData[]>) => {
      state.list = action.payload;
    },
    add: (state, action: PayloadAction<GameItemData>) => {
      state.list.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.list.splice(action.payload, 1);
    },
    toggleEditing: (state) => {
      state.editing = !state.editing;
    },
  },
});

export const { add, remove, toggleEditing } = lobbySlice.actions;

export default lobbySlice.reducer;
