import { useState, useEffect } from "react";
import React from "react";
import "./Cards.css";
import ModalCharacter from "../Modal/ModalCharacter";
import { Typography } from "@mui/material";

export type objectCharacter = {
  id: number;
  image: string;
  name: string;
  gender: string;
  location: objectOriginAndLocation;
  origin: objectOriginAndLocation;
  species: string;
  status: string;
};

export type objectOriginAndLocation = {
  name: string;
}

export default function Characters() {
  const [characters, setCharacters] = useState<objectCharacter[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [characterShow, setCharacterShow] = useState<JSX.Element[]>([]);
  const [tempModal, setTempModal] = useState(false);
  const [characterModal, setCharacterModal] = useState<objectCharacter>({} as objectCharacter);

  let arrayCharacter: objectCharacter[];
  let countCharacters: number = -1;
  let charactersShow: JSX.Element[];

  const getCharacters = async () => {
    await fetch(`https://rickandmortyapi.com/api/character`)
      .then((res) => res.json())
      .then((data) => {
        const pages = data.info.pages;
        const temp = data.results;
        temp.forEach((character: objectCharacter) => {
          arrayCharacter.push(character);
        });
        for (let i = 0; i < pages - 1; i++) {
          const url =
            "https://rickandmortyapi.com/api/character?page=" + String(i + 2);
          getOtherCharacters(url);
        }
      });
  };



  const getOtherCharacters = async (url: string) => {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const charactersOthersPages = data.results;
        charactersOthersPages.forEach((character: objectCharacter) => {
          arrayCharacter.push(character);
          countCharacters = Number(data.info.count);
          if (arrayCharacter.length === countCharacters) {
            arrayCharacter.sort((a: objectCharacter, b: objectCharacter) => {
              if (a.id > b.id) return 1;
              if (a.id < b.id) return -1;
              return 1;
            });
            setCharacters(arrayCharacter);
            setIsLoaded(true);
          }
        });
      });
  };

  const handleCharacterModal = (character: objectCharacter) => {
    setTempModal(true);
    setCharacterModal(character);
  };

  const card = (character: objectCharacter, key: number): JSX.Element => {
    const { image, name } = character;
    setCharacterModal(character);
    return (
      <div
        key={key}
        className="card"
        onClick={() => handleCharacterModal(character)}
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
      charactersShow.push(card(character, index));
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
