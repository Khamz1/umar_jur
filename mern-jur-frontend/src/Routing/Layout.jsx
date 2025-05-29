import Container from "@mui/material/Container";
import { Header } from "../components";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <Container maxWidth="lg">
        <Outlet/>
      </Container>
    </div>
  );
}

export default Layout;
