"use client";

import { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "../actions/watchlist";
import Image from "next/image";
import type { Watchlist } from "../types/watchlist";
import Link from "next/link";
import Loading from "../loading";

const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(false);

  const getList = async () => {
    setLoading(true);
    const data = await getWatchlist();
    if (data) {
      setLoading(false);
      setWatchlistData(data);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleRemove = async (id: number) => {
    await removeFromWatchlist(id);
    getList();
  };

  return (
    <div>
      {loading && <Loading />}
      {!loading && watchlistData?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-4 my-4 px-4">
          {watchlistData?.map((movie: Watchlist) => (
            <div
              key={movie?.id}
              className="flex flex-col items-center bg-white rounded shadow-sm"
            >
              <Link
                href={`/movies/${movie?.id}`}
                key={movie?.id}
                className="hover:opacity-90"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`}
                  alt={movie.title}
                  width={150}
                  height={225}
                  placeholder="blur"
                  blurDataURL={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`}
                  className="rounded-md"
                />
              </Link>
              <p
                className="text-sm font-semibold text-center mt-2 truncate w-full"
                title={movie?.title}
              >
                {movie?.title}
              </p>
              <p className="text-gray-600 text-xs text-center mt-1">
                Release Date: {movie?.release_date}
              </p>
              <p className="text-gray-600 text-xs text-center">
                Rating: {movie?.vote_average}
              </p>
              <button
                onClick={() => handleRemove(movie?.id)}
                className="bg-green-600 text-white text-sm py-1 px-3 mt-2 rounded hover:bg-green-700 transition-colors"
              >
                Remove from Watchlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg font-semibold text-gray-500 py-8">
          <span className="inline-block  px-4 py-2 rounded-md shadow-sm">
            No movies in your watchlist yet!
          </span>
        </p>
      )}
    </div>
  );
};

export default Watchlist;
