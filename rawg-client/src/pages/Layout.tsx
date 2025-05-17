import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { Box } from "@chakra-ui/react";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  return (
    <Box mt={{ base: 2, md: 5 }}>
      <ScrollToTop />
      <Box mx={{ base: 2, md: 5 }}>
        <NavBar />
      </Box>
      <Box p={{ base: 2, md: 5 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default Layout;
