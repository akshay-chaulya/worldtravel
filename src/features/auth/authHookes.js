import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../services";
import { logout, setUser } from "./authSlice.js";
import { useEffect } from "react";
import {
  setErrorNotification,
  setInfoMessage,
  setLoading,
  setSuccessNotification,
} from "../ui/feedbackSlice.js";

import { useNavigate } from "react-router-dom";
import { selectApiStatus } from "../ui/feedbackSelectors.js";
import {
  structuredError,
  checkFileType,
  getToken,
  removeToken,
  setToken,
} from "../../utils";

export const useCheckAuth = () => {
  const isQueryEnable = useSelector(selectApiStatus);
  const dispatch = useDispatch();
  const token = getToken();

  const { data, error, isSuccess, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      const { data } = await authApi.get("/check-auth", {
        headers: { Authorization: token },
      });
      return data;
    },
    enabled: isQueryEnable && !!token, // Ensure query only runs if token exists
    // retry: 3, // Disable retries in case of failure
    // retryDelay: 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // Prevent auto refetch on window focus
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }

    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    }

    if (error) {
      dispatch(logout());
      dispatch(setErrorNotification(structuredError(error)));
    }
  }, [isSuccess, data, error, isLoading, dispatch]);
  return { data, error, isSuccess, isLoading };
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData) => {
      const { email, password } = userData;

      // Validate if email and password exist
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      if (password.length < 6) {
        throw new Error("Password has to be minimum six later");
      }

      if (!email.endsWith("@gmail.com")) {
        throw new Error("Invalid email");
      }

      await new Promise((r) => setTimeout(r, 2000));

      // Make the API call
      const { data } = await authApi.post("/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data; // Return the response data
    },
    onError: (error) => {
      // Dispatch the error notification
      dispatch(setErrorNotification(structuredError(error)));
    },
    onSuccess: (data) => {
      // Dispatch the user data to Redux (assuming `data.user` contains user info)
      if (data?.token) {
        setToken(data.token);
      }

      // Dispatch a success notification
      dispatch(setSuccessNotification(data));

      if (data?.success) navigate("/app");
    },
  });
};

export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (userData) => {
      // inputs validation check
      const { imgFile, firstName, lastName, email, password, confirmPassword } =
        userData;
      if (!firstName || !lastName || !email || !password || !confirmPassword)
        throw new Error("Invalid Credantial!");
      if (!email.endsWith("@gmail.com")) throw new Error("Invalid email");
      if (password !== confirmPassword)
        throw new Error("Password and confirmPassword doesn't match");
      if (imgFile && !checkFileType(imgFile))
        throw new Error("Selected file isn't a image file!");

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatarUrl", imgFile);

      // api call
      const { data } = await authApi.post("/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onError: (error) => {
      // Dispatch the error notification
      dispatch(setErrorNotification(structuredError(error)));
    },
    onSuccess: (data) => {
      dispatch(setInfoMessage(data));
      if (data?.success) navigate("/verify-email");
    },
  });
};

export const useVerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (code) => {
      if (!code || code < 6) throw new Error("Invalid token!");

      const { data } = await authApi.post("/verify-email", { code });
      return data;
    },
    onMutate: () => {
      // Set loading state to true before making the request
      dispatch(setLoading(true));
    },
    onError: (error) => {
      // Dispatch the error notification
      dispatch(setErrorNotification(structuredError(error)));
    },
    onSuccess: (data) => {
      // Dispatch the user data to Redux (assuming `data.user` contains user info)
      if (data?.token) {
        setToken(data.token);
      }

      // Dispatch a success notification
      dispatch(setSuccessNotification(data));

      if (data?.success) navigate("/app");
    },
  });
};

export const useResetPassword = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (email) => {
      if (!email || !email.endsWith("@gmail.com"))
        throw new Error("Invalid email");

      const { data } = await authApi.post("/forgot-password", { email });
      return data;
    },
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onError: (error) => {
      // Dispatch the error notification
      dispatch(setErrorNotification(structuredError(error)));
    },
    onSuccess: (data) => {
      dispatch(setSuccessNotification(data));
    },
  });
};

export const useCreateNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ token, passwords }) => {
      const { password, confirmPassword } = passwords;
      if (!token) throw new Error("unauthorized access");
      if (!password || !confirmPassword) throw new Error("Invalid Credantial");
      if (password !== confirmPassword)
        throw new Error("Password and confirmPassword doesn't match");
      if (password.length < 6)
        throw new Error("password must be minimum 6 characters");

      const { data } = await authApi.post(`/reset-password/${token}`, {
        password,
      });
      return data;
    },
    onMutate: () => {
      // Set loading state to true before making the request
      dispatch(setLoading(true));
    },
    onError: (error) => {
      // Dispatch the error notification
      dispatch(setErrorNotification(structuredError(error)));
    },
    onSuccess: (data) => {
      // Dispatch a success notification
      dispatch(setSuccessNotification(data));
      if (data?.success) navigate("/login");
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return () => {
    // Perform the logout action
    dispatch(logout());

    // Remove the token from local storage
    removeToken();

    // Invalidate or reset the "user" query to ensure fresh state
    queryClient.clear();
  };
};
