/**
 * ErrorPage
 * ----------
 * This component is used as the errorElement for React Router routes.
 * It integrates with Sentry to capture and report route errors and 404s:
 * - If a route error is present, it is sent to Sentry using Sentry.captureException.
 * - If no error is present (e.g. 404), a warning message is sent using Sentry.captureMessage.
 * This ensures that both unexpected errors and navigation to non-existent routes are logged in Sentry.
 */

import { Box, Heading, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar/NavBar";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import * as Sentry from "@sentry/react";
import React from "react";

const ErrorPage = () => {
  const error = useRouteError();

  React.useEffect(() => {
    if (error) {
      Sentry.captureException(error);
    } else {
      Sentry.captureMessage("404 Not Found - Route does not exist", "warning");
    }
  }, [error]);

  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Heading>Oops...</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected error has occurred."}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
