import { useState } from "react";
import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomePage from "./pages/Home";
import AboutUs from "./pages/Aboutus";
import { Toaster } from "react-hot-toast";
import Course from "./pages/Course";

function App() {
  const Layout = ({ children }) => (
    <div className="min-h-screen  flex flex-col bg-gradient-to-b from-[#735FF2] to-[#43378C]">
      <Header />

      <main className="flex-1 ">
        <div className="container mx-auto max-w-full">{children}</div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/course"
          element={
            <Layout>
              <Course />
            </Layout>
          }
        />
      </Routes>
          <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
