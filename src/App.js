import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomeBanner from "./components/WelcomeBanner";
import { ConfigProvider } from "./context/ConfigContext";
import { getRouterBasename } from "./services/configService";

function App() {
  return (
    <ConfigProvider>
      <Router basename={getRouterBasename()}>
        <Routes>
          <Route path="/:userId/:is_manager/:fname/:certificate" element={<WelcomeBanner />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;