import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMapSidebarStatus } from "../features/user/cities/citiesSlice";
import { selectCities } from "../features/user/cities/citiesSelectors";
import { useGetUserLocation } from "../hooks";

const Map = () => {
  const cities = useSelector(selectCities);
  const { data: userPostion, isLoading } = useGetUserLocation();
  const dispatch = useDispatch();

  return (
    <div className="relative w-full h-full sm:rounded-xl shadow-lg bg-gray-100 overflow-hidden ">
      {!userPostion && (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-red-600 font-bold text-center p-4 border border-red-600 rounded ">
            You denied the location. Please allow the browser to track your
            location.
          </div>
        </div>
      )}

      {!isLoading && userPostion && (
        <div className="relative flex justify-center items-center h-full">
          {/* Sidebar Toggle Button for Mobile View */}
          <button
            onClick={() => dispatch(setMapSidebarStatus(true))}
            className="absolute z-10 top-4 right-4 bg-black text-white px-4 py-2 rounded-md opacity-80 lg:hidden hover:opacity-100 transition-opacity transform hover:scale-105"
          >
            Console
          </button>

          {/* Map Container */}
          <MapContainer
            center={userPostion}
            zoom={14}
            scrollWheelZoom={true}
            className="w-full h-full "
          >
            {/* Map Tile Layer */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Markers for Cities */}
            {cities.map(({ _id, positions, cityName, lastDescription }) =>
              positions.map(({ lat, lng }, i) => (
                <Marker key={_id + i} position={[lat, lng]}>
                  <Popup>
                    <div className="text-sm font-semibold text-gray-800">
                      {lastDescription || cityName}
                    </div>
                  </Popup>
                </Marker>
              ))
            )}

            {/* User Position Marker */}
            <Marker key={userPostion.lat} position={userPostion} title="It'you">
              <Popup>
                <div className="text-sm font-semibold text-gray-800">
                  It&apos;s you
                </div>
              </Popup>
            </Marker>
            {/* DetectClick Component */}
            <DetectClick />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

function DetectClick() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useMapEvent({
    click: (e) => {
      dispatch(setMapSidebarStatus(true));
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

export default Map;
