"use client";

import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "@/app/actions/watchlist";
import { Watchlist } from "@/app/types/watchlist";
import React, { useEffect, useState } from "react";

const WatchlistButton = ({ movie }: { movie: Watchlist }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = async () => {
    await addToWatchlist(movie);
    setIsAdded(true);
  };

  const handleRemove = async () => {
    await removeFromWatchlist(movie.id);
    setIsAdded(false);
  };
  useEffect(() => {
    const getList = async () => {
      const watchlist = await getWatchlist();
      console.log(watchlist);
    };
    getList();
  }, [isAdded]);
    
  return (
    <div className="my-4">
      {isAdded ? (
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
