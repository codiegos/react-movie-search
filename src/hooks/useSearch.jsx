import { useEffect, useRef, useState } from "react";

export const useSearch = () => {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("Cannot search a empty movie");
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("Can't search a movie with a number");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
};
