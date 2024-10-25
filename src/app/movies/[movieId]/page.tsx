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
      <div className="flex flex-col justify-center items-center">
        <h1>{movie?.title}</h1>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.title}
          width={300}
          height={450}
          placeholder="blur"
          blurDataURL={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        />
        <p>{movie?.overview}</p>
        <p>
          <strong>Release Date:</strong> {movie?.release_date}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie?.genres?.map((genre: { name: string }) => genre?.name).join(", ")}
        </p>
        <WatchlistButton movie={movie} />
        <h3>Cast:</h3>
        <ul className="grid grid-cols-12 gap-4">
          {casts?.cast?.map(
            (member: {
              name: string;
              character: string;
              profile_path: string;
            }) => (
              <li key={member?.name}>
                <Image
                  src={`https://image.tmdb.org/t/p/w200${member?.profile_path}`}
                  alt={member?.name}
                  width={100}
                  height={100}
                  placeholder="blur"
                  blurDataURL={`https://image.tmdb.org/t/p/w500${member?.profile_path}`}
                />
                <strong>{member?.name}</strong> <br /> as {member?.character}
              </li>
            )
          )}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-center text-2xl font-semibold pb-4 text-blue-400">
          Recommended Movies
        </h3>
        <div className="grid grid-cols-8 gap-4 ">
          {recommendations?.results?.map((rec: Recommendation) => (
            <Link href={`/movies/${rec?.id}`} key={rec?.id}>
              <div className="m-4">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${rec?.poster_path}`}
                  alt={rec?.title}
                  width={150}
                  height={225}
                />
                <p>{rec?.title}</p>
                <p>{rec?.release_date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
