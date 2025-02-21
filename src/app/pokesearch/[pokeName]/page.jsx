"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function PokeResult() {
  const params = useParams();
  const [pokeData, setPokeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokeData = async () => {
    if (!params.pokeName) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.pokeName}`
      );

      if (!response.ok) throw new Error("Pokémon not found!");

      const data = await response.json();
      setPokeData(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokeData();
  }, [params.pokeName]);

  return (
    <div className="p-24">
      <Link className="bg-blue-500 text-white p-3 rounded-md" href="/">
        Go Back
      </Link>
      <div className="flex justify-center items-center mt-10 text-center">
        <div className="shadow-md p-10 rounded-md bg-gray-50 border border-indigo-200">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : pokeData ? (
            <>
              <h3 className="text-3xl capitalize">{pokeData.name}</h3>
              <Image
                src={pokeData.sprites?.front_default || "/fallback.png"}
                width={300}
                height={300}
                alt={pokeData.name}
                priority
              />
              <div className="mt-5">
                <p className="my-3">Weight: {pokeData.weight} kg</p>
                <p className="my-3">
                  Abilities:{" "}
                  {pokeData.abilities?.map((val) => (
                    <span
                      key={val.ability.name}
                      className="bg-gray-500 text-white px-3 py-1 mx-1 rounded-md"
                    >
                      {val.ability.name}
                    </span>
                  ))}
                </p>
                <p className="my-3">
                  Types:{" "}
                  {pokeData.types?.map((val) => (
                    <span
                      key={val.type.name}
                      className="bg-gray-500 text-white px-3 py-1 mx-1 rounded-md"
                    >
                      {val.type.name}
                    </span>
                  ))}
                </p>
              </div>
            </>
          ) : (
            <p>No Pokémon data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokeResult;
