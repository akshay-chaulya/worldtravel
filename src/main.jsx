import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/store.js";
import "./index.css";

// Create a react query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 10 * 1000,
    }
  }
});

createRoot(document.getElementById("root")).render(
  <>
    {/* Redux Provider  */}
    <Provider store={store}>
      {/* React Query Client  */}
      <QueryClientProvider client={queryClient}>
        {/* Routes  */}
        <App />
      </QueryClientProvider>
    </Provider>
  </>
);
