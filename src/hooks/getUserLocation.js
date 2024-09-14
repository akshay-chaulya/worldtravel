import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setErrorNotification } from "../features/ui/feedbackSlice";
import { structuredError } from "../utils";

const useGetUserLocation = () => {
  const dispatch = useDispatch();

  // Create a Promise-based function to handle geolocation
  const getLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator?.geolocation) {
        return reject(new Error("Your browser does not support geolocation"));
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve([pos.coords.latitude, pos.coords.longitude]),
        (err) => reject(err)
      );
    });

  // Fetch user's location using react-query
  const { data, isLoading } = useQuery({
    queryKey: ["userLocation"],
    queryFn: getLocation,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  });

  return { data, isLoading };
};

export default useGetUserLocation;
