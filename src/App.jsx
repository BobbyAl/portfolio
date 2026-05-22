import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/Footer";

import Hero from "./pages/Hero";
import AboutMe from "./pages/AboutMe";
import Experience from "./pages/Experience";
import Extracurriculars from "./pages/Extracurriculars";
import Chooser from "./pages/Chooser";

import DevGallery from "./pages/DevGallery";
import DevPage from "./pages/DevPage";
import UXGallery from "./pages/UXGallery";
import UXPage from "./pages/UXPage";

function HomePage() {
  return (
    <main className="flex-1 flex flex-col w-full items-center">
      <section id="hero"             className="w-full min-h-screen flex items-center justify-center"><Hero /></section>
      <section id="about"            className="w-full min-h-screen flex items-center justify-center"><AboutMe /></section>
      <section id="experience"       className="w-full min-h-screen flex items-center justify-center"><Experience /></section>
      <section id="extracurriculars" className="w-full min-h-screen flex items-center justify-center overflow-hidden"><Extracurriculars /></section>
      <section id="chooser"          className="w-full min-h-screen flex items-center justify-center"><Chooser /></section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen" style={{ background: '#f8f7f4' }}>
        <div className="relative z-10 flex flex-col min-h-screen">
          <NavBar />
          <Routes>
            <Route path="/"    element={<HomePage />} />
            <Route path="/dev"     element={<DevGallery />} />
            <Route path="/dev/:id" element={<DevPage />} />
            <Route path="/ux"      element={<UXGallery />} />
            <Route path="/ux/:id"  element={<UXPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
