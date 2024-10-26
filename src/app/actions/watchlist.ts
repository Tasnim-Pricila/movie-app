"use server";

import { Movie } from "../types/movie";

let watchlist: Movie[] = [];

export const getWatchlist = async (): Promise<Movie[]> => {
  return watchlist;
};

export const addToWatchlist = async (movie: Movie): Promise<Movie[]> => {
  const exists = watchlist.find((item: Movie) => item?.id === movie?.id);
  if (!exists) {
    watchlist.push(movie);
  }
  return watchlist;
};

export const removeFromWatchlist = async (id: number): Promise<Movie[]> => {
  watchlist = watchlist.filter((movie) => movie.id !== id);
  return watchlist;
};
