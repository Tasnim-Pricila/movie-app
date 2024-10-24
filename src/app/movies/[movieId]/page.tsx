import Image from "next/image";
import React from "react";

const MovieDetails = async ({ params }: { params: { movieId: number } }) => {
  const { movieId } = params;

  // Fetch mnovie details
  const baseUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const res = await fetch(baseUrl);
  const movie = await res.json();

  // Fetch movie cast
  const castResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const casts = await castResponse.json();
  console.log(movie, casts);

  return (
    <div>
      <h1>{movie?.title}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        alt={movie?.title}
        width={300}
        height={450}
      />
      <p>{movie?.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie?.release_date}
      </p>
      <p>
        <strong>Genres:</strong>{" "}
        {movie?.genres
          ?.map((genre: { name: string }) => genre?.name)
          .join(", ")}
      </p>
      <h3>Cast:</h3>
      <ul className="grid grid-cols-12 gap-4">
        {casts?.cast?.map(
          (member: {
            name: string;
            character: string;
            profile_path: string;
          }) => (
            <li key={member.name}>
              <Image
                src={`https://image.tmdb.org/t/p/w200${member?.profile_path}`}
                alt={member?.name}
                width={50}
                height={75}
              />
              <strong>{member?.name}</strong> as {member?.character}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default MovieDetails;
