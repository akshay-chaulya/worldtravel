import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { userApi } from "../../services";
import {
  setErrorNotification,
  setLoading,
  setSuccessNotification,
} from "../../features/ui/feedbackSlice";
import { structuredError } from "../../utils";

export const useContactUs = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (cradentials) => {
      const { data } = await userApi.post("/contact-us", { ...cradentials });
      return data;
    },
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onError: (error) => {
      dispatch(setErrorNotification(structuredError(error)));
    },
    onSuccess: (data) => {
      dispatch(setSuccessNotification(data));
    },
  });
};
