import Header from "./Header";
import Footer from "./Footer";

const DecorativeDots = () => (
  <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,black_1px,transparent_0)] [background-size:18px_18px]" />
);

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      
      {/* Background global */}
      <DecorativeDots />

      <div className="relative z-10">
        <Header />
        {children}
        <Footer />
      </div>

    </div>
  );
}