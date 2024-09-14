import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorNotification,
  setLoading,
  setSuccessNotification,
} from "../../ui/feedbackSlice";
import { citiesApi } from "../../../services";
import { useNavigate } from "react-router-dom";
import { selectCitiesStates } from "./citiesSelectors";
import { useEffect } from "react";
import { setCities, setCountries, setSelectedCity } from "./citiesSlice";
import { structuredError, getToken, isValidDate } from "../../../utils";

export const useAddCities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (userData) => {
      if (!userData.cityName)
        throw new Error(
          "Something problem in this loction. Because city is empty!"
        );
      if (!userData.visitDate || !isValidDate(userData.visitDate))
        throw new Error("Invalid date");

      const { data } = await citiesApi.post(
        "/add",
        { ...userData },
        { headers: { Authorization: getToken() } }
      );
      return data;
    },
    onMutate: () => dispatch(setLoading(true)),
    onError: (error) => {
      dispatch(setErrorNotification(structuredError(error)));
    },
    onSuccess: (data) => {
      dispatch(setSuccessNotification(data));
      if (data.success) navigate(-1);
    },
  });
};

export const useFeatchCities = () => {
  const dispatch = useDispatch();
  const { currentPage, citiesPerPage } = useSelector(selectCitiesStates);
  const { data, error, isLoading } = useQuery({
    queryKey: ["cities", currentPage, citiesPerPage],
    queryFn: async () => {
      const { data } = await citiesApi.get(
        `?limit=${citiesPerPage}&page=${currentPage}`,
        { headers: { Authorization: getToken() } }
      );
      return data;
    },
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (error) dispatch(setErrorNotification(structuredError(error)));
    if (data) {
      dispatch(setCities(data));
    }
  }, [data, error, isLoading, dispatch]);

  return { data, error, isLoading };
};

export const useFeatchCountries = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const { data } = await citiesApi.get("/countries", {
        headers: { Authorization: getToken() },
      });
      return data;
    },
  });

  useEffect(() => {
    if (error) dispatch(setErrorNotification(structuredError(error)));
    if (data) {
      dispatch(setCountries(data));
    }
  }, [data, error, isLoading, dispatch]);

  return { data, error, isLoading };
};

export const useDeleteCity = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await citiesApi.delete(`/delete/${id}`, {
        headers: { Authorization: getToken() },
      });
      return data;
    },
    onMutate: () => dispatch(setLoading(true)),
    onError: (error) => dispatch(setErrorNotification(structuredError(error))),
    onSuccess: (data) => dispatch(setSuccessNotification(data)),
  });
};

export const useFeatchCity = (id) => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery({
    queryKey: ["city", id],
    queryFn: async () => {
      const { data } = await citiesApi.get(`/${id}`, {
        headers: { Authorization: getToken() },
      });
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  useEffect(() => {
    if (error) dispatch(setErrorNotification(structuredError(error)));
    if (data) {
      dispatch(setSelectedCity(data?.data?.city));
    }
  }, [data, error, isLoading, dispatch]);

  return { data, error, isLoading };
};
