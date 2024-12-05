import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";
import { Character } from "./CharacterList";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;

function Logo() {
  return <div className="navbar__logo">Rick And morty🚀</div>;
}

export function Search({ query, setQuery, searchResult }) {
  return (
    <div className="nav__search">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="text-field"
        placeholder="search..."
      />
      <div className="navbar__result">Found {searchResult} character</div>
    </div>
  );
}

export function Favorite({ favorites, onDelete }) {
  const [open, setOpen] = useState(false);
  console.log(favorites);
  return (
    <div className="nav__fav">
      <Modal title="Your Favorite list" onOpen={setOpen} open={open}>
        {favorites.length !== 0 ? (
          favorites.map((item) => (
            <Character item={item}>
              {" "}
              <button className="icon red" onClick={() => onDelete(item.id)}>
                <TrashIcon />
              </button>
            </Character>
          ))
        ) : (
          <span className="Modal_text">there is No Favorite here</span>
        )}
      </Modal>

      <button className="heart">
        <HeartIcon
          className="icon"
          onClick={() => {
            setOpen(!open);
          }}
        />
        <span className="badge">{favorites.length}</span>
      </button>
    </div>
  );
}
