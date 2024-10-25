// "use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import WatchlistButton from "./WatchlistButton";
import { Recommendation } from "@/app/types/recommendation";

const MovieDetails = async ({ params }: { params: { movieId: number } }) => {
  const { movieId } = params;

  // Fetch mnovie details
  const baseUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const res = await fetch(baseUrl, {
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    throw new Error("Movie not found");
  }
  const movie = await res.json();

  // Fetch movie cast
  const castResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const casts = await castResponse.json();
  // console.log(movie);

  const recommendationsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const recommendations = await recommendationsRes.json();
  // console.log(recommendations);

  return (
    <div>
      <div className="flex flex-col items-center my-4 px-4 md:px-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.title}
          width={300}
          height={450}
          placeholder="blur"
          blurDataURL={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          className="w-full max-w-xs md:max-w-md lg:max-w-lg"
        />
        <h1 className="text-2xl md:text-3xl font-semibold py-2 text-center">
          {movie?.title}
        </h1>
        <p className="text-center text-sm md:text-base">{movie?.overview}</p>
        <p className="text-center text-sm md:text-base">
          <strong>Release Date:</strong> {movie?.release_date}
        </p>
        <p className="text-center text-sm md:text-base">
          <strong>Genres:</strong>{" "}
          {movie?.genres
            ?.map((genre: { name: string }) => genre?.name)
            .join(", ")}
        </p>
        <div className="my-4">
          <WatchlistButton movie={movie} />
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold py-4 underline mb-4">
          Cast:
        </h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {casts?.cast?.map(
            (member: {
              name: string;
              character: string;
              profile_path: string;
            }) => (
              <li
                key={member?.name}
                className="text-center flex flex-col justify-center items-center"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w200${member?.profile_path}`}
                  alt={member?.name}
                  width={100}
                  height={100}
                  placeholder="blur"
                  blurDataURL={`https://image.tmdb.org/t/p/w500${member?.profile_path}`}
                  className="w-[100px] h-[100px] object-cover rounded-full"
                />
                <strong className="block mt-2 text-sm md:text-base">
                  {member?.name}
                </strong>
                <span className="text-xs md:text-sm text-gray-600">
                  as {member?.character}
                </span>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-center text-2xl font-semibold pb-4 text-blue-400">
          Recommended Movies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-4 px-4">
          {recommendations?.results?.map((rec: Recommendation) => (
            <Link
              href={`/movies/${rec?.id}`}
              key={rec?.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex flex-col items-center m-2">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${rec?.poster_path}`}
                  alt={rec?.title}
                  width={150}
                  height={225}
                  className="rounded-md"
                />
                <p
                  className="text-sm font-semibold text-center mt-2 truncate w-full"
                  title={rec?.title}
                >
                  {rec?.title}
                </p>
                <p className="text-xs text-gray-600 text-center">
                  {rec?.release_date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
