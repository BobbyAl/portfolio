import PixelBlast from "./components/libraries/PixelBlast";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/Footer";
import Tablet from "./components/ui/Tablet";



function App() {

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <PixelBlast color="#148EFF" />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <Tablet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App
