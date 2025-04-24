import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  return (
    <Box mt={5}>
      <NavBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default Layout;
