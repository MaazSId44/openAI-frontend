import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemManagement from "./pages/ItemManagement";
import OpenAIPrompt from "./pages/OpenAIPrompt";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemManagement />} />
          <Route path="/openai" element={<OpenAIPrompt />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
