import React from "react";
import { CssBaseline, Container } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserListPage from "./pages/users";
import UserDetailsPage from "./pages/user-details";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <Routes>
          <Route exact path="/" element={<UserListPage />} />
          <Route path="/user/:login" element={<UserDetailsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
