import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Search, Favorite } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [character, setCharacter] = useState(2);
  const [favorites, setFavorites] = useLocalStorage("FAVORITE", []);
  const controller = new AbortController();
  const signal = controller.signal;
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);
  // Start add Favorite to local strage//

  // End add Favorite to local strage//
  const handleSelectCharacter = (id) => {
    setCharacter((prevId) => (prevId === id ? null : id));
  };

  const favoriteHandler = (char) => {
    if (favorites.map((fav) => fav.id).includes(character)) {
      toast.error("your character has already been");
    } else {
      setFavorites((prevChar) => [...prevChar, char]);
      toast.success("your character has been added successfully");
    }
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/characters")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Ridi SolTan:");
  //       return res.json();
  //     })
  //     .then((data) => setCharacters(data.results.slice(0, 5)))
  //     .catch((err) => {
  //       toast.error(err.message);
  //     })
  //     .finally(setIsLoading(false));
  // }, []);
  // useEffect(() => {}, [query]);

  const handleDeleteFavorite = (id) => {
    setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };
  return (
    <div className="app">
      <Toaster />

      <Navbar searchResult={characters.length}>
        <Search
          query={query}
          setQuery={setQuery}
          searchResult={characters.length}
        />
        <Favorite favorites={favorites} onDelete={handleDeleteFavorite} />
      </Navbar>
      <div className="main">
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
          characterId={character}
        />
        <CharacterDetail characterId={character} favHandler={favoriteHandler} />
      </div>
    </div>
  );
}

export default App;
