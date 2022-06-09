import { RootState } from "../../store/store";
import { LobbyState } from "../../types";

export const getLobby = (state: RootState): LobbyState => state.lobby;
