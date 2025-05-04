import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomeBanner from "./components/WelcomeBanner";
import { ConfigProvider } from "./context/ConfigContext";

function App() {
  return (
    <ConfigProvider>
      <Router basename="/CampusTopApp">
        <Routes>
          <Route path="/:userId/:certificate" element={<WelcomeBanner />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;