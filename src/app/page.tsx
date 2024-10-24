"use client";

import Image from "next/image";
import { Movie } from "./types/movie";
import Loading from "./loading";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearch } from "./context/SearchContext";

export default function Home() {
  const { searchQuery } = useSearch();
  console.log(searchQuery);
  const fetchMovies = async ({ pageParam }: { pageParam: number }) => {
    const baseUrl = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchQuery}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    const res = await fetch(
      `${baseUrl}&page=${pageParam}`
    );
    const data = await res.json();
    return data;
  };

  const {
    data: movies,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", searchQuery],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    initialPageParam: 1,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage]);

  if (isFetching && !isFetchingNextPage) return <Loading />;

  return (
    <div>
      <h1 className="text-xl pt-4 font-semibold text-center text-blue-500">{searchQuery ? `Results for "${searchQuery}"` : "Popular Movies"}</h1>
      <div className="grid grid-cols-8 gap-4 mt-4">
        {movies?.pages?.map((page) =>
          page?.results?.map((movie: Movie) => (
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
                placeholder="blur"
                blurDataURL={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
          ))
        )}
      </div>
      {isFetchingNextPage && <p>Loading more movies...</p>}
    </div>
  );
}
