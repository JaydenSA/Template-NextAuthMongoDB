import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";

export default async function Home() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full">
      <Navbar />
      <Hero />
    </div>
  );
}
