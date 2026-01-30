import Hero from "../components/Hero";
import Products from "./products";
import "../styles/hero.css";

function Home() {
  return (
    <>
      {/* Hero principal */}
      <Hero />

      {/* Listado de productos */}
      <Products />
    </>
  );
}

export default Home;
