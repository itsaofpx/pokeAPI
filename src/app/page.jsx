import Image from "next/image";
import Header from "./components/header";
import PokeData from "./components/PokeData";
export default function Home() {
  return (
    <>
      <Header/>
      <PokeData/>
    </>
  )
}