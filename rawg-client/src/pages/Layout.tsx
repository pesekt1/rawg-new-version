import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { Box } from "@chakra-ui/react";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  return (
    <Box mt={5}>
      <ScrollToTop />
      <NavBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default Layout;
