import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { RiCloseLargeLine } from "react-icons/ri";

import img from "../../images/popUpImage.png";

import css from "./PopUp.module.css";
import { Link } from "react-router-dom";

export default function PopUp({ setIsOpenPopUp, isOpenPopUp }) {
  const handleClose = () => {
    setIsOpenPopUp(false);
  };

  return (
    <>
      <Dialog
        open={isOpenPopUp}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          backgroundColor: "rgba(36, 41, 100, 0.50)",
          backdropFilter: "blur(2px)",
          "& .MuiDialog-paper": {
            padding: "0",
            borderRadius: "24px",
            backgroundColor: "#FBF9FF",
          },
          "& .MuiDialogTitle-root": {
            padding: "0",
          },
        }}
      >
        <DialogContent
          sx={{ padding: "40px 32px 0 32px", marginBottom: "24px" }}
        >
          <button type="button" className={css.btn} onClick={handleClose}>
            <RiCloseLargeLine size={24} />
          </button>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ position: "relative" }}
          >
            <img
              src={img}
              alt="Celebrating people"
              width={388}
              height={574}
              className={css.image}
            />
          </DialogContentText>
          <DialogTitle className={css.title}>You are registered!</DialogTitle>
          <p className={css.subtitle}>
            We are very happy that you have joined us, because now we are going
            to have fun together!
          </p>
          <p className={css.slogan}>
            Put on your festive hat and join the all events!
          </p>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "40px" }}>
          <Link
            to="/events"
            onClick={handleClose}
            autoFocus
            className={css.link}
          >
            See more events
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}
