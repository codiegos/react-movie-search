import NotFoundImage from "../assets/NotFoundImage.png";
export const Movies = ({ movies }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center">
      {movies?.map((movie) => (
        <li
          className="flex flex-col justify-center items-center border bg-white rounded-b-lg"
          key={movie.id}
        >
          <img
            src={movie.poster !== "N/A" ? movie.poster : NotFoundImage}
            alt={movie.title}
            className="h-96 w-80"
          />
          <div className="flex flex-col justify-center items-center py-4 border-t-2 w-80 ">
            <h3
              className={`font-semibold ${
                movie.title.length > 42 && "text-sm"
              } text-center`}
            >
              {movie.title}
            </h3>
            <p>{movie.year}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
