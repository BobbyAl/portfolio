import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticleField from "./components/libraries/ParticleField";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/Footer";


import Hero from "./pages/Hero";
import AboutMe from "./pages/AboutMe";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Extracurriculars from "./pages/Extracurriculars";
import Chooser from "./pages/Chooser";

import DevPage from "./pages/DevPage";
import UXPage from "./pages/UXPage";

function HomePage() {
  return (
    <main className="flex-1 flex flex-col w-full items-center">
      <section id="hero" className="w-full min-h-screen flex items-center justify-center"><Hero /></section>
      <section id="about" className="w-full min-h-screen flex items-center justify-center"><AboutMe /></section>
      <section id="experience" className="w-full min-h-screen flex items-center justify-center"><Experience /></section>
      <section id="education" className="w-full min-h-screen flex justify-center"><Education /></section>
      <section id="extracurriculars" className="w-full min-h-screen flex items-center justify-center overflow-hidden"><Extracurriculars /></section>
      <section id="chooser" className="w-full min-h-screen flex items-center justify-center"><Chooser /></section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen selection:bg-white/30 selection:text-white overflow-hidden">
        {/* Modern ambient background elements */}
        <div className="fixed inset-0 -z-20 bg-[#050505]">
          <ParticleField />
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1.5px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] pointer-events-none"></div>
          {/* Glowing orbs to fill empty space */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"></div>
          <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none"></div>
        </div>
        <div className="relative z-10 flex flex-col min-h-screen text-white">
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
