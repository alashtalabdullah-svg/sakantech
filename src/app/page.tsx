import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Partners from "@/components/sections/partners";
import AboutStrip from "@/components/sections/about-strip";
import Contact from "@/components/sections/contact";
import Chatbot from "@/components/ui/chatbot";

export default function Home() {
  return (
    <main style={{ minHeight:"100vh", background:"#fff" }}>
      <Navbar />
      <Hero />
      <Services />
      <AboutStrip />
      <Partners />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
