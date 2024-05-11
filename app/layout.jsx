import { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import Providers from "@/components/Providers";
import { constructMetadata } from "@/lib/utils";
import Navbar2 from "@/components/Navbar2";
import Navbar3 from "@/components/Navbar3";
import LayoutWrapper from "@/components/LayoutWrapper";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={recursive.className}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </body>
      </Providers>
    </html>
  );
}
{
  /* <html lang="en">
<Providers>
  <body className={recursive.className}>
    <LayoutWrapper>{children}</LayoutWrapper>
  </body>
</Providers>
</html> */
}
{
  /* <html lang="en">
      <Providers>
        <body className={recursive.className}>
          <Navbar3 />

          <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
            <div className="flex-1 flex flex-col h-full">
              <Providers>{children}</Providers>
              {children}
            </div>
            <Footer />
          </main>

          <Toaster position="top-center" richColors />
        </body>
      </Providers>
    </html> */
}
