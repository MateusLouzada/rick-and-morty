import { useState, useEffect } from "react";
import "./Cards.css";
import { Typography } from "@mui/material";

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [locationShow, setLocationsShow] = useState([]);

  let arrayLocations = [];
  let countVerification = -1;
  let locationsShow = [];

  const getLocations = async () => {
    await fetch(`https://rickandmortyapi.com/api/location`)
      .then((res) => res.json())
      .then((data) => {
        const pages = data.info.pages;
        const temp = data.results;
        temp.forEach((location) => {
          arrayLocations.push(location);
        });
        for (let i = 0; i < pages - 1; i++) {
          const url =
            "https://rickandmortyapi.com/api/location?page=" + String(i + 2);
          getOthersLocations(url);
        }
      });
  };

  const getOthersLocations = async (url) => {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const locationsOtherPages = data.results;
        locationsOtherPages.forEach((location) => {
          arrayLocations.push(location);
          countVerification = Number(data.info.count);
          if (arrayLocations.length === data.info.count) {
            arrayLocations.sort((a, b) => {
              if (a.id > b.id) return 1;
              if (a.id < b.id) return -1;
            });
            setLocations(arrayLocations);
            setIsLoaded(true);
          }
        });
      });
  };

  const card = (location, key) => {
    const { name, type } = location;
    return (
      <div key={key} className="card card-episode">
        <div className="inside-card-episode">
          <Typography>{name}</Typography>
        </div>
        <hr style={{ width: "100%" }} />
        <div className="inside-card-episode">
          <Typography>{type}</Typography>
        </div>
      </div>
    );
  };

  const populateLocations = () => {
    locations.forEach((locationInside, index) => {
      locationsShow.push([card(locationInside, index)]);
    }, setLocationsShow(locationsShow));
  };

  useEffect(() => {
    getLocations();
  }, []);

  useEffect(() => {
    populateLocations();
  }, [locations]);

  if (isLoaded != true && locations.length != countVerification) {
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
    //console.log(locations[0])
    return <div className="container">{locationShow}</div>;
  }
}
