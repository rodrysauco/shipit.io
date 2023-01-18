import { useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./index.css";
import { Routes as Switch, Route, BrowserRouter } from "react-router-dom";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
