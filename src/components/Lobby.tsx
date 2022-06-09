import React, { useCallback } from "react";
import styled from "styled-components";
import GameItem from "./GameItem";
import { useSelector } from "react-redux";

import useMediaQuery from "@mui/material/useMediaQuery";
import { RootState } from "../store/store";

const Lobby = React.memo((props) => {
  const landscape = useMediaQuery("(orientation: landscape)");
  const list = useSelector((state: RootState) => state.lobby.list);

  const renderItems = useCallback(
    () => list.map((item, index) => <GameItem data={item} index={index} />),
    [list]
  );

  return (
    <Container className={`${landscape ? "horizontal" : "vertical"}`}>
      {renderItems()}
    </Container>
  );
});

export default Lobby;

const Container = styled.main`
  min-height: 33rem;
  flex: 1;
  flex-direction: column;
  display: flex;
  gap: 10px;
  overflow: auto;
  position: relative;
  height: 100%;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  &.horizontal {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;
