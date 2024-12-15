import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CharacterDetail({ characterId, favHandler }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        setCharacter(data);
        const episodeId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        setEpisodes([episodeData].flat().slice(0, 5));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    if (characterId) fetchData();
  }, [characterId]);

  if (isLoading) return <div style={{ flex: 1 }}>loading data</div>;

  if (!character || !characterId)
    return <div style={{ flex: 1 }}>Please select a charachter</div>;

  return (
    <div style={{ flex: 1 }}>
      <CharachterSubInfo character={character} favHandler={favHandler} />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

const CharachterSubInfo = ({ character, favHandler }) => {
  return (
    <div className="character-detail">
      {/* <LazyLoadImage/> */}
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨" : "👩"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""} `}
          ></span>
          <span>&nbsp;{character.status}</span>
          <span>-&nbsp;{character.species}</span>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          <button
            className="btn btn--primary"
            onClick={() => favHandler(character)}
          >
            Add to favorite
          </button>
        </div>
      </div>
    </div>
  );
};

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);
  const sortHandler = () => {
    setSortBy((is) => !is);
  };
  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes</h2>
        <button onClick={sortHandler}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sortBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")}- {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
