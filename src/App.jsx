import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function App() {

  const [characters, setCharacters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  let arrayCharacter = [];

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then(res => res.json())
      .then(data => {
        //console.log(data)
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
                if (arrayCharacter.length === data.info.count) {
                  setCharacters(arrayCharacter)
                  arrayCharacter.sort((a,b) => {
                    if(a.id > b.id) return 1
                    if(a.id < b.id) return -1
                  })
                  setIsLoaded(true)
                }
              })
            })
        }

      })
  }, [])

  if (isLoaded != true) {
    return <div>Loading...</div>
  } else {
    return (
      <div>{characters[800].name}</div>
    )
  }

}
