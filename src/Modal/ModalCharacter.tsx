import React, { Dispatch, SetStateAction } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./ModalStyle.css";
import { objectCharacter } from "../routes/Characters";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: "1000px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#2F4368",
  color: "#EAEAEA",
};

type PropsModal = {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  characterModal: objectCharacter,
}

export default function ModalCharacter(props: PropsModal) {
  const {openModal, setOpenModal, characterModal} = props
  const handleCloseModal = () => setOpenModal(false);
  const { name, gender, image, location, origin, species, status } =
    characterModal;
  return (
    <div>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="div-button">
            <Button
              sx={{
                width: "20px",
                height: "20px",
                color: "#EAEAEA",
              }}
              onClick={handleCloseModal}
            >
              X
            </Button>
          </div>
          <div className="image-div">
            <img
              style={{ display: "block", width: "100%", maxWidth: "300px" }}
              src={image}
              alt={name}
            />
          </div>
          <div className="text-modal">
            <Typography>Name: {name}</Typography>
            <Typography>Gender: {gender}</Typography>
            <Typography>Species: {species}</Typography>
            <Typography>Status: {status}</Typography>
            <Typography>Origin: {origin.name}</Typography>
            <Typography>Location: {location.name}</Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
