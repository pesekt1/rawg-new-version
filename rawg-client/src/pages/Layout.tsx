import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import ScrollToTop from "../components/ScrollToTop";
import UserPanel from "../domains/user/UserPanel";
import BrowseList from "../components/BrowseList";
import GenreList from "../domains/genres/GenreList";
import StoreList from "../domains/stores/StoreList";
import PublisherList from "../domains/publishers/PublisherList";
import DeveloperList from "../domains/developers/DeveloperList";

const responsivePadding = { base: 2, md: 4 };

const Layout = () => {
  return (
    <Box p={responsivePadding}>
      <ScrollToTop />
      <Box pb={responsivePadding}>
        <NavBar />
      </Box>
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{ base: "1fr", lg: "200px 1fr" }}
      >
        <Show above="lg">
          <GridItem area={"aside"}>
            <UserPanel />
            <BrowseList />
            <GenreList />
            <StoreList />
            <PublisherList />
            <DeveloperList />
          </GridItem>
        </Show>
        <GridItem area={"main"}>
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
};
export default Layout;
