import React from "react";
import { Router, Route } from "wouter";
import AdminPage from "../components/AdminPage/AdminPage";
import UserPage from "../components/UserPage/SetUp/AirConditionerControl.jsx";



const AppRoutes = () => (
  <Router>
    <Route path="/admin">
      <AdminPage />
    </Route>
    <Route path="/">
      <UserPage />
    </Route>
  </Router>
);

export default AppRoutes;