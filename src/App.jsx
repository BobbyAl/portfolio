import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticleField from "./components/libraries/ParticleField";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/Footer";


import Hero from "./pages/Hero";
import AboutMe from "./pages/AboutMe";
import Resume from "./pages/Resume";
import Extracurriculars from "./pages/Extracurriculars";
import Chooser from "./pages/Chooser";

import DevPage from "./pages/DevPage";
import UXPage from "./pages/UXPage";

function HomePage() {
  return (
    <main className="flex-1">
      <section id="hero" className="min-h-screen flex items-center justify-center"><Hero /></section>
      <section id="about" className="min-h-screen flex items-center justify-center"><AboutMe /></section>
      <section id="resume" className="min-h-screen flex items-center justify-center"><Resume /></section>
      <section id="extracurricular" className="min-h-screen flex items-center justify-center"><Extracurriculars /></section>
      <section id="chooser" className="min-h-screen flex items-center justify-center"><Chooser /></section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <div className="fixed inset-0 -z-10">
          <ParticleField />
        </div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dev" element={<DevPage />} />
            <Route path="/ux" element={<UXPage />} />
          </Routes>  
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
