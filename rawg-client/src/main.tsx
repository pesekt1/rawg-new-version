import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import ms from "ms";
import theme from "./theme";
import router from "./routes";
import "./main.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      retry: 3,
      staleTime: ms("5s"),
      cacheTime: ms("10s"),
    },
  },
});

const sentryDsn: string = import.meta.env.VITE_SENTRY_DSN;

Sentry.init({
  dsn: sentryDsn,
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>An error has occurred.</p>}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ChakraProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
