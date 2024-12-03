import { HeartIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";

function Navbar({ searchResult, children }) {
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

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}

export function Favorite({ searchResult, favorites }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Modal title="this is title" onOpen={setOpen} open={open}>
        this modal
      </Modal>
      <div className="navbar__result">Found {searchResult} character</div>
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
