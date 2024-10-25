'use server'

import { Watchlist } from "../types/watchlist";
let watchlist: Watchlist[] = [];


export const getWatchlist = async () => {
  return watchlist;
};

export const addToWatchlist = async (movie: Watchlist) => {
  const exists = watchlist.find((item: Watchlist) => item?.id === movie?.id);
  if (!exists) {
    watchlist.push(movie);
  }
  return watchlist;
};

export const removeFromWatchlist = async (id: number) => {
  watchlist = watchlist.filter((movie) => movie.id !== id);
  return watchlist;
};


