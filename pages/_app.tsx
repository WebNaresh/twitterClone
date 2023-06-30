import "@/styles/globals.css";
import { Inter } from "next/font/google";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <GoogleOAuthProvider clientId="278197798339-3kse5e1p2n6neq34g0bmtbpl00mad21s.apps.googleusercontent.com">
        <Component {...pageProps} />
        <Toaster />
      </GoogleOAuthProvider>
    </div>
  );
}
