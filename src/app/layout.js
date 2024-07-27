import Nav from "../../components/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "creative writes",
  description: "Write some creative, enspiring and freely",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
