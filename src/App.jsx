import PixelBlast from "./components/libraries/PixelBlast";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/Footer";
import Hero from "./pages/Hero";
import AboutMe from "./pages/AboutMe";



function App() {

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <PixelBlast 
          color="#148EFF"
          patternScale={2}
          patternDensity={1}
          enableRipples
          transparent
        />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-1">
          <section className="min-h-screen flex items-center justify-center">
            <Hero />
          </section>
          <section className="min-h-screen flex items-center justify-center">
            <AboutMe />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App
