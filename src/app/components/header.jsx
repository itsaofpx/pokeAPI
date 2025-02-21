"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();

  const [pokeName, setPokeName] = useState("");

  const handleInput = (e) => {
    setPokeName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/pokesearch/${pokeName}`)
  };

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 h-[300px] flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-white text-5xl">NextJS Pokemon Finder APP</h1>
        <p className="text-white text-2xl">Find your favorite pokemon</p>
        <form onSubmit={handleSubmit} action="" className="flex mt-2">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-md"
            placeholder="Pokemon Name.."
            onChange={handleInput}
          ></input>
          <button
            className="inline-flex items-center mx-2 px-4 py-2 rounded-md bg-green-500 text-white shadow-md"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
