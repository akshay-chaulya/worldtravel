import { BtnPrimary } from "../components";

export default function Home() {
  return (
    <section className="h-screen w-full home bg-black text-white">
      <div className="w-full h-full px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center gap-6">
        <h1 className="text-3xl leading-tight md:text-4xl lg:text-5xl font-bold">
          You travel the world.
          <br />
          Worldtravel keeps track of your adventures.
        </h1>
        <h2 className="font-medium text-lg md:text-xl lg:text-2xl">
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <BtnPrimary
          to="/login"
          text="Start tracking now"
          className="cta text-lg md:text-xl px-6 md:px-8 py-3 md:py-4"
        />
      </div>
    </section>
  );
}
