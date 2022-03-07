import { useState, useEffect } from 'react';
import './Cards.css';


export default function Locations() {

    const [locations, setLocations] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [locationShow, setLocationsShow] = useState([]);

    let arrayLocations = [];
    let countVerification = -1;
    let locationsShow = [];


    const getLocations = () => {
        fetch(`https://rickandmortyapi.com/api/location`)
            .then(res => res.json())
            .then(data => {
                const pages = data.info.pages;
                const temp = data.results;
                temp.forEach(location => {
                    arrayLocations.push(location)
                });
                for (let i = 0; i < pages - 1; i++) {
                    const url = 'https://rickandmortyapi.com/api/location?page=' + String(i + 2)
                    fetch(url)
                        .then(res => res.json())
                        .then(data => {
                            const locationsOtherPages = data.results;
                            locationsOtherPages.forEach(location => {
                                arrayLocations.push(location)
                                countVerification = Number(data.info.count)
                                if (arrayLocations.length === data.info.count) {
                                    arrayLocations.sort((a, b) => {
                                        if (a.id > b.id) return 1
                                        if (a.id < b.id) return -1
                                    })
                                    setLocations(arrayLocations)
                                    setIsLoaded(true)
                                }
                            })
                        })
                }
            })
    }

    const card = (name, type, key) => {
        return (
            <div key={key} className='card card-episode'>
                <div className='inside-card-episode'>{name}</div>
                <hr style={{width: '100%'}} />
                <div className='inside-card-episode'>{type}</div>
            </div>
        )

    }

    const populateLocations = () => {
        locations.forEach((locationInside, index) => {
          const { name, type } = locationInside;
          locationsShow.push([card(name, type, index)])
        }, setLocationsShow(locationsShow))
    
      }

    useEffect(() => {
      getLocations()
    }, [])

    useEffect(() => {
        populateLocations();
      }, [locations])
    
    if (isLoaded != true && locations.length != countVerification) {
        return <div>Loading...</div>
    } else {
        //console.log(locations[0])
        return (
            <div className='container'>{locationShow}</div>
        )
    }
}
