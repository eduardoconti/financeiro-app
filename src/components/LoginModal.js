import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FormLogin from "./FormLogin";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  botao: {
    backgroundColor: "#F9FEFB",
    width: "100%",
    boxShadow: "2px 2px 2px 1px rgba(47, 65, 167, 0.2)",
    "&:hover": {
      backgroundColor: "#9Ebfc0",
    },
    fontWeight: "bold",
  },
}));

export default function TransitionsModal({ open, setOpen, handleClose }) {
  const classes = useStyles();

  return (
    <Grid item xs={4} lg={12}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <FormLogin
            setOpen={(open) => {
              setOpen(open);
            }}
          />
        </Fade>
      </Modal>
    </Grid>
  );
}
