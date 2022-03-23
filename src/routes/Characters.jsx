import { useState, useEffect } from "react";
import "./Cards.css";
import ModalCharacter from "../Modal/ModalCharacter";
import { Typography } from "@mui/material";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [characterShow, setCharacterShow] = useState([]);
  const [tempModal, setTempModal] = useState(false);
  const [characterModal, setCharacterModal] = useState();

  let arrayCharacter = [];
  let countCharacters = -1;
  let charactersShow = [];

  const getCharacters = async () => {
    await fetch(`https://rickandmortyapi.com/api/character`)
      .then((res) => res.json())
      .then((data) => {
        const pages = data.info.pages;
        const temp = data.results;
        temp.forEach((character) => {
          arrayCharacter.push(character);
        });
        for (let i = 0; i < pages - 1; i++) {
          const url =
            "https://rickandmortyapi.com/api/character?page=" + String(i + 2);
          getOtherCharacters(url);
        }
      });
  };

  const getOtherCharacters = async (url) => {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const charactersOthersPages = data.results;
        charactersOthersPages.forEach((character) => {
          arrayCharacter.push(character);
          countCharacters = Number(data.info.count);
          if (arrayCharacter.length === countCharacters) {
            arrayCharacter.sort((a, b) => {
              if (a.id > b.id) return 1;
              if (a.id < b.id) return -1;
            });
            setCharacters(arrayCharacter);
            setIsLoaded(true);
          }
        });
      });
  };

  const handleCharacterModal = (character) => {
    setTempModal(true);
    setCharacterModal(character);
  };

  const card = (character, key) => {
    const { image, name } = character;
    setCharacterModal(character);
    return (
      <div
        key={key}
        className="card"
        onClick={handleCharacterModal.bind(this, character)}
      >
        <div>
          <img src={image} alt="" />
        </div>
        <div className="card-name">
          <Typography>{name}</Typography>
        </div>
      </div>
    );
  };

  const populateCharacters = () => {
    characters.forEach((character, index) => {
      charactersShow.push([card(character, index)]);
    }, setCharacterShow(charactersShow));
  };

  useEffect(() => {
    getCharacters();
    window.addEventListener("beforeunload", () => setTempModal(false));
  }, []);

  useEffect(() => {
    populateCharacters();
  }, [characters]);

  if (
    isLoaded != true &&
    characters.length != countCharacters &&
    characterShow.length != countCharacters
  ) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        Loading...
      </div>
    );
  } else {
    return (
      <div className="container">
        {characterShow}
        <ModalCharacter
          openModal={tempModal}
          setOpenModal={setTempModal}
          characterModal={characterModal}
        />
      </div>
    );
  }
}
