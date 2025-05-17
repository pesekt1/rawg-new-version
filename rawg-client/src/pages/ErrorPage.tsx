/**
 * ErrorPage
 * ----------
 * This component is used as the errorElement for React Router routes.
 * It integrates with Sentry to capture and report route errors and 404s:
 * - If a route error is present, it is sent to Sentry using Sentry.captureException.
 * - If no error is present (e.g. 404), a warning message is sent using Sentry.captureMessage.
 * This ensures that both unexpected errors and navigation to non-existent routes are logged in Sentry.
 */

import { Box } from "@chakra-ui/react";
import NavBar from "../components/NavBar/NavBar";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import * as Sentry from "@sentry/react";
import React from "react";
import error404Image from "../assets/404-error.png"; // Import 404 image
import error500Image from "../assets/500-error.png"; // Import 500 image

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
      <Box
        position="relative"
        height="100vh"
        backgroundImage={
          isRouteErrorResponse(error)
            ? `url(${error404Image})` // Use imported 404 image
            : `url(${error500Image})` // Use imported 500 image
        }
        backgroundSize="contain" // Maintain aspect ratio
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundColor="rgba(0, 0, 0, 0.8)"
          zIndex="0"
        />
        <Box
          zIndex="1"
          textAlign="center"
          padding={5}
          backgroundColor="rgba(255, 255, 255, 0.4)" // Keep text background slightly opaque
          borderRadius="md"
          boxShadow="lg"
        >
          <Box fontSize="4xl" fontWeight="bold" mb={4}>
            {isRouteErrorResponse(error)
              ? "404 - Page Not Found"
              : "Unexpected Error"}
          </Box>
          <Box fontSize="lg">
            {isRouteErrorResponse(error)
              ? "The page you are looking for does not exist."
              : "Something went wrong. Please try again later."}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ErrorPage;
