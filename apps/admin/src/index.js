import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import "./index.css";

const ENVIRONMENT = process.env.REACT_APP_ENV || "dev";

Sentry.init({
  dsn: "https://3dbef7f6034c2f030eeb578b1b9fa1ef@o1025952.ingest.us.sentry.io/4508895195758592",
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  environment: ENVIRONMENT,
});

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <Sentry.ErrorBoundary fallback={<p>Something went wrong!</p>}>
      <App />
    </Sentry.ErrorBoundary>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
