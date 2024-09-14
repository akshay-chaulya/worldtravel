import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { setMapSidebarStatus } from "../features/user/cities/citiesSlice";
import { selectMapSidebarStatus } from "../features/user/cities/citiesSelectors";

const MapSidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectMapSidebarStatus);

  return (
    <div
      className={`z-10 flex flex-col items-center gap-y-6 p-5 md:px-28 lg:px-5 max-sm:px-1 bg-[rgb(45,52,57)] text-white md:row-start-1 lg:relative absolute lg:w-auto w-full h-full lg:translate-x-0 transition-transform sm:rounded-xl shadow-md ${
        isSidebarOpen ? "translate-x-0" : "translate-x-[-150%]"
      } `}
    >
      <button
        className="absolute right-5 top-6 bg-[rgb(107,114,128)] rounded-full py-1 px-3 lg:hidden block"
        onClick={() => dispatch(setMapSidebarStatus(false))}
      >
        X
      </button>
      <ul className="app-nav bg-[rgb(107,114,128)] text-white outline-none flex rounded-md">
        {["cities", "Countries"].map((item) => (
          <li key={item}>
            <NavLink
              className="py-1 px-3 uppercase text-inherit block rounded-md transition-all"
              to={item.toLowerCase()}
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>

      <Outlet />
    </div>
  );
};

export default MapSidebar;
