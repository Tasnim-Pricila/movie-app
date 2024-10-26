"use client";

import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "@/app/actions/watchlist";
import { Movie } from "@/app/types/movie";
import React, { useEffect, useState } from "react";

const WatchlistButton = ({ movie }: { movie: Movie }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [watchlistData, setWatchlistData] = useState<Movie[]>([]);

  const getList = async () => {
    const watchlist = await getWatchlist();
    setWatchlistData(watchlist)
  };

  const handleAdd = async () => {
    await addToWatchlist(movie);
    setIsAdded(true);
  };

  const handleRemove = async () => {
    await removeFromWatchlist(movie.id);
    setIsAdded(false);
  };
  useEffect(() => {
    getList();
  }, [isAdded]);

  const exists = watchlistData.find((item: Movie) => item?.id === movie?.id);

  return (
    <div className="my-4">
      {exists || isAdded ? (
        <button
          onClick={handleRemove}
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          Remove from Watchlist
        </button>
      ) : (
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Add to Watchlist
        </button>
      )}
    </div>
  );
};

export default WatchlistButton;
