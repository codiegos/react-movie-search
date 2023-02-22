import { useCallback, useState } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";
import { SearchIcon, SortByAscIcon } from "./components/Icons";

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => getMovies({ search }), 350),
    [getMovies]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (e) => {
    const newSearch = e.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="pt-12">
        <h1 className="text-5xl font-semibold pb-2 text-center">
          Search movie🎬
        </h1>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            value={search}
            type="text"
            name="search"
            placeholder="Avengers, Star Wars..."
            className={`outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              error && "border-red-500 focus:border-red-500"
            }`}
            onChange={handleChange}
          />
          <button type="submit" className="hover:scale-105">
            <SearchIcon />
          </button>
          <label
            htmlFor="sort-checkbox"
            className={`flex justify-center items-center hover:scale-105 cursor-pointer ${
              sort && "bg-green-200 rounded-full"
            } my-1`}
          >
            <SortByAscIcon />
          </label>
          <input
            type="checkbox"
            onChange={handleSort}
            checked={sort}
            id="sort-checkbox"
            hidden
          />
        </form>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </header>
      <main className="pt-12">
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </div>
  );
}

export default App;
