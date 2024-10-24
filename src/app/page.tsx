"use client";

import Image from "next/image";
import { Movie } from "./types/movie";
import Loading from "./loading";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const fetchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const data = await res.json();
    return data.results;
  };

  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  return (
    <div className="grid grid-cols-6 gap-4 mt-4">
      {isLoading && <Loading />}
      {movies?.map((movie: Movie) => (
        <div
          key={movie.id}
          className="max-w-xs rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-200"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt={movie?.title}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {movie?.title}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Release Date: {movie?.release_date}
            </p>
            <p className="text-gray-600 text-sm">
              Rating: {movie?.vote_average}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
