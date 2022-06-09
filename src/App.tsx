import React from "react";
import Lobby from "./components/Lobby";
import "./App.css";

import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toggleEditing } from "./store/slices";
import { RootState } from "./store/store";

function App() {
  const dispatch = useDispatch();
  const editing = useSelector((state: RootState) => state.lobby.editing);
  const matches = useMediaQuery("(orientation: landscape)");

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lobby
          </Typography>
          {editing && (
            <Button
              color="inherit"
              onClick={() =>
                dispatch({
                  type: "SAGA_ADD",
                  payload: {},
                })
              }
            >
              Add
            </Button>
          )}
          <Button color="inherit" onClick={() => dispatch(toggleEditing())}>
            Edit
          </Button>
        </Toolbar>
      </AppBar>

      <Lobby />
    </React.Fragment>
  );
}

export default App;
