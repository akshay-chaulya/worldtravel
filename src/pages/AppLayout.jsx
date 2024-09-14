import { Map, MapSidebar } from "../components";

const AppLayout = () => {
  return (
    <section className="sm:py-8 sm:px-6 w-full h-full  bg-gray-100 flex items-center justify-center">
      <div className="relative w-full min-h-screen grid gap-8 lg:grid-cols-2 items-start transition-all duration-300">
        <Map className="shadow-lg rounded-lg overflow-hidden" />
        <MapSidebar className="shadow-lg rounded-lg bg-white p-6" />
      </div>
    </section>
  );
};

export default AppLayout;
