export interface GameItemData {
  title: string;
  id: string;
  index?: number;
}

export interface LobbyState {
  editing: boolean;
  list: GameItemData[];
}

export interface MovePayload {
  from: number;
  to: number;
}
