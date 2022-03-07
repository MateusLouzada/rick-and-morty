import { useState, useEffect } from 'react';
import './Cards.css';


export default function Episodes() {
    const [episodes, setEpisodes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [episodeShow, setEpisodeShow] = useState([])

    let arrayEpisodes = [];
    let countVerification = -1;
    let episodesShow = [];

    const getEpisodes = () => {
        fetch(`https://rickandmortyapi.com/api/episode`)
            .then(res => res.json())
            .then(data => {
                const pages = data.info.pages;
                const temp = data.results;
                temp.forEach(episode => {
                    arrayEpisodes.push(episode)
                });
                for (let i = 0; i < pages - 1; i++) {
                    const url = 'https://rickandmortyapi.com/api/episode?page=' + String(i + 2)
                    fetch(url)
                        .then(res => res.json())
                        .then(data => {
                            const episodesOtherPages = data.results;
                            episodesOtherPages.forEach(episode => {
                                arrayEpisodes.push(episode)
                                countVerification = Number(data.info.count)
                                if (arrayEpisodes.length === data.info.count) {
                                    arrayEpisodes.sort((a, b) => {
                                        if (a.id > b.id) return 1
                                        if (a.id < b.id) return -1
                                    })
                                    setEpisodes(arrayEpisodes);
                                    setIsLoaded(true);
                                }
                            })
                        })
                }
            })
    }


    const card = (name, episode, key) => {
        return (
            <div key={key} className='card card-episode'>
                <div className='inside-card-episode'>{episode}</div>
                <hr style={{width: '100%'}} />
                <div className='inside-card-episode'>{name}</div>
            </div>
        )

    }

    const populateEpisodes = () => {
        episodes.forEach((episodeInside, index) => {
          const { name, episode } = episodeInside;
          episodesShow.push([card(name, episode, index)])
        }, setEpisodeShow(episodesShow))
    
      }

    useEffect(() => {
        getEpisodes()
    }, [])

    useEffect(() => {
        populateEpisodes();
      }, [episodes])


    if (isLoaded != true && episodes.length != countVerification && episodeShow.length != countVerification) {
        return <div>Loading...</div>
    } else {
        //console.log(episodes[0])
        return (
            <div className='container'>{episodeShow}</div>
        )
    }
}
