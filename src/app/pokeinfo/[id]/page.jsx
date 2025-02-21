"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function PokeInfo() {
  const params = useParams();
  console.log(params);

  const [poke, setPoke] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!params.id) return; // Prevents unnecessary API calls when id is undefined

    setLoading(true);
    const fetchPokeData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.id}`
        );
        const pokeData = await response.json();
        setPoke(pokeData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPokeData();
  }, [params.id]);

  return (
    <div className="p-24">
      <Link className="bg-blue-500 text-white p-3 rounded-md" href="/">
        Go Back
      </Link>
      <div className="flex justify-center items-center mt-10 text-center">
        <div className="shadow-md p-10 rounded-md bg-gray-50 border border-indigo-200">
          {loading ? (
            <p>Loading...</p>
          ) : poke ? (
            <>
              <h3 className="text-3xl capitalize">{poke.name}</h3>
              <Image
                src={poke.sprites?.front_shiny}
                width={300}
                height={300}
                alt={poke.name}
                priority
              />
              <div className="mt-5">
                <p className="my-3">Weight: {poke.weight} kg</p>
                <p className="my-3">
                  Abilities:{" "}
                  {poke.abilities?.map((val) => (
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
                  {poke.types?.map((val) => (
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
            <p>Error loading Pokémon</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokeInfo;
