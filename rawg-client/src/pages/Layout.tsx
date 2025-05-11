import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { Box } from "@chakra-ui/react";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  return (
    <Box mt={5}>
      <ScrollToTop />
      <NavBar />
      <Box p={5}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default Layout;
