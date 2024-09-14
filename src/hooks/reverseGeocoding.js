import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { reversGeoApiUrl, reversGeoApiKey } from "../config";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setErrorNotification } from "../features/ui/feedbackSlice";

const useReverseGeocoding = ({ lat, lng }) => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery({
    queryKey: ["locationData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${reversGeoApiUrl}?lat=${lat}&lon=${lng}&apiKey=${reversGeoApiKey}`
      );
      return data;
    },
  });

  useEffect(() => {
    if (error) dispatch(setErrorNotification(error));
  }, [error, dispatch]);

  return { data: data?.features[0]?.properties, isLoading };
};

export default useReverseGeocoding;
