import React from "react";

import {
  Button,
  CardMedia,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { GameItemData } from "../types";

import useMediaQuery from "@mui/material/useMediaQuery";
interface GameItemProps {
  data: GameItemData;
  index: number;
  optionalArgument?: string;
}

const GameItem = React.memo((props: GameItemProps) => {
  const editing = useSelector((state: RootState) => state.lobby.editing);
  const landscape = useMediaQuery("(orientation: landscape)");
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        maxWidth: 900,
        maxHeight: 200,
        minWidth: 300,
        minHeight: editing ? 250 : 200,
      }}
    >
      <CardMedia
        component="img"
        alt="img"
        height="140"
        image="https://cdn4.iconfinder.com/data/icons/slot-machines/512/Grapes-512.png"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {props.data.title}
        </Typography>
      </CardContent>
      {editing && (
        <CardActions>
          <Button
            size="small"
            onClick={() =>
              dispatch({ type: "SAGA_DEL", payload: { index: props.index } })
            }
          >
            del
          </Button>

          <Button
            size="small"
            onClick={() =>
              dispatch({
                type: "SAGA_GAME_MOVE",
                payload: { from: props.index, to: props.index - 1 },
              })
            }
          >
            back
          </Button>
          <Button
            size="small"
            onClick={() =>
              dispatch({
                type: "SAGA_GAME_MOVE",
                payload: { from: props.index, to: props.index + 1 },
              })
            }
          >
            forward
          </Button>
        </CardActions>
      )}
    </Card>
  );
});

export default GameItem;
