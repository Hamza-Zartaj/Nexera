import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import UserDashboardLayout from "./layouts/UserDashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />} />
        <Route path="user/*" element={<UserDashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
