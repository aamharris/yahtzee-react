import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

type GameOverProps = {
  open: boolean;
  totalScore: number;
  onClose: () => void;
};
function GameOverDialog({ totalScore, open, onClose }: GameOverProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog maxWidth={"xs"} fullWidth onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">Game Over</DialogTitle>
      <DialogContent>
        <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
          <Typography>Game Over!</Typography>
          <Typography>Score: {totalScore}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GameOverDialog;
