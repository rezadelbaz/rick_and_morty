import { BeakerIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function CharacterList({
  characters,
  isLoading,
  onSelectCharacter,
  characterId,
}) {
  if (isLoading) return <div className="characters-list">Loading...</div>;
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character
          item={item}
          onSelectCharacter={onSelectCharacter}
          characterId={characterId}
        />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ item, onSelectCharacter, characterId }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "👨" : "👩"}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
        ></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
      <button className="icon red" onClick={() => onSelectCharacter(item.id)}>
        {characterId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
