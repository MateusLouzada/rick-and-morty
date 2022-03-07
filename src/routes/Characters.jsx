import { useState, useEffect } from 'react';
import './Cards.css';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [characterShow, setCharacterShow] = useState([])

  let arrayCharacter = [];
  let countCharacters = -1;
  let charactersShow = [];

  const getCharacters = () => {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then(res => res.json())
      .then(data => {
        const pages = data.info.pages;
        const temp = data.results;
        temp.forEach(character => {
          arrayCharacter.push(character)
        });
        for (let i = 0; i < pages - 1; i++) {
          const url = 'https://rickandmortyapi.com/api/character?page=' + String(i + 2)
          fetch(url)
            .then(res => res.json())
            .then(data => {
              const charactersOthersPages = data.results;
              charactersOthersPages.forEach(character => {
                arrayCharacter.push(character)
                countCharacters = Number(data.info.count)
                if (arrayCharacter.length === countCharacters) {
                  arrayCharacter.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                  })
                  setCharacters(arrayCharacter)
                  setIsLoaded(true)
                }
              })
            })
        }
      })
  }

  const card = (name, image, key) => {
    return (
      <div key={key} className='card'>
        <div>
          <img src={image} alt="" />
        </div>
        <div className='card-name'>{name}</div>
      </div>
    )

  }

  const populateCharacters = () => {
    characters.forEach((character, index) => {
      const { name, image } = character;
      charactersShow.push([card(name, image, index)])
    }, setCharacterShow(charactersShow))

  }

  useEffect(() => {
    getCharacters();
  }, [])

  useEffect(() => {
    populateCharacters();
  }, [characters])

  if (isLoaded != true && characters.length != countCharacters && characterShow.length != countCharacters) {
    return <div>Loading...</div>
  } else {
    //console.log(characters[0])
    return (
      <div className='container'>{characterShow}</div>
    )
  }

}
