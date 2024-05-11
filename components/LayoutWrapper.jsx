import React from "react";
import Navbar3 from "./Navbar3";
import Footer from "./Footer";
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import Favbar from "./Favbar";

function LayoutWrapper({ children }) {
  return (
    <main>
      <Favbar />

      <section className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
        <div className="flex-1 flex flex-col h-full w-full">{children}</div>
        <Footer />
      </section>

      <Toaster position="top-center" richColors />
    </main>
  );
}

export default LayoutWrapper;
