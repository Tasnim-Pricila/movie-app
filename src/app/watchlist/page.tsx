"use client";

import { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "../actions/watchlist";
import Image from "next/image";
import type { Watchlist } from "../types/watchlist";
import Link from "next/link";

const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState<Watchlist[]>([]);

  const getList = async () => {
    const data = await getWatchlist();
    setWatchlistData(data);
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
      {watchlistData?.length > 0 ? (
        <div className="grid grid-cols-8 gap-4">
          {watchlistData?.map((movie: Watchlist) => (
            <div key={movie?.id} style={{ margin: "10px" }}>
              <Link href={`/movies/${movie?.id}`} key={movie?.id}>
                <Image
                  src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`}
                  alt={movie.title}
                  width={150}
                  height={225}
                  placeholder="blur"
                  blurDataURL={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`}
                />
              </Link>
              <p>{movie?.title}</p>
              <p className="text-gray-600 mt-1 text-sm">
                Release Date: {movie?.release_date}
              </p>
              <p className="text-gray-600 text-sm">
                Rating: {movie?.vote_average}
              </p>
              <button
                onClick={() => handleRemove(movie?.id)}
                className="bg-green-600 text-white py-2 px-4 rounded"
              >
                Remove from Watchlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No data</p>
      )}
    </div>
  );
};

export default Watchlist;
