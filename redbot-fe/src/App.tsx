import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { Impact } from './components/Impact';
import { GetInvolved } from './components/GetInvolved';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Impact />
        <GetInvolved />
      </main>
      <Footer />
    </div>
  );
}

export default App;