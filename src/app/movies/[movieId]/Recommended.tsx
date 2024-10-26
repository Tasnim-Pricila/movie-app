import { Recommendation } from '@/app/types/recommendation';
import { Response } from '@/app/types/response';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Recommended = ({
  recommendations,
}: {
  recommendations: Response;
}) => {
  return (
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
  );
};

export default Recommended
